import { v4 as uuidv4 } from 'uuid';
import mongooseClient from '../../../libraries/mongoose';
import { errorHandlerForResolvers, isEmptyStringNullOrUndefined } from '../../../utils';
import cronjob from '../../../cronjob';
import { create } from '../../../libraries/prismaClient';
import { TABLE_NAME, TEST_TAKER_STATE } from '../../../utils/const';

const sendingInvitation = async ({ emails, template, additionData }) => {
  if (isEmptyStringNullOrUndefined(additionData.assessmentId)) throw new Error('Missing assessmentId');
  // Put emails to db for pending sending
  await mongooseClient.bulkMail.create(emails.map((email) => ({ id: uuidv4(), email, template, additionData })));
  cronjob.perMinute.start();
  // Add record to assessment db for calculated
  const errorSentEmails = (
    await Promise.allSettled(
      emails.map(async (email) => {
        try {
          await create(TABLE_NAME.TEST_TAKER_ASSESSMENT, {
            data: {
              state: TEST_TAKER_STATE.SENT,
              resultId: null,
              assessment: { connect: { id: additionData.assessmentId } },
              testTaker: { connectOrCreate: { where: { email }, create: { email } } },
            },
          });
          return { isSent: true, email };
        } catch (error) {
          return { isSent: false, email };
        }
      })
    )
  ).reduce((pre, { value: { isSent, email } }) => {
    !isSent && pre.push(email);
    return pre;
  }, []);

  return errorSentEmails.length
    ? `You just send this assessment's invited link again to : ${errorSentEmails.join(', ')}`
    : 'Your bulk mail is pending to send';
};

export default async ({ input }) => {
  try {
    const mailingMapper = {
      // TODO: Add template email here
      INVITATION: async () => sendingInvitation(input),
      DEFAULT: () => {
        throw new Error('No template found');
      },
    };

    const template = Object.prototype.hasOwnProperty.call(mailingMapper, input.template) ? input.template : 'DEFAULT';

    const message = await mailingMapper[template]();

    return { message };
  } catch (error) {
    errorHandlerForResolvers(error);
  }
};
