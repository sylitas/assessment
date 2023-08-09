import { generateToken } from '../libraries/jwt';
import mongooseClient from '../libraries/mongoose/index';
import { sendEmail } from '../libraries/nodemailer';
import { findUnique } from '../libraries/prismaClient';
import { TABLE_NAME } from '../utils/const';

export default async () => {
  const records = await mongooseClient.bulkMail.find({ template: 'INVITATION' }, 50);
  const mailSentSuccess = await Promise.allSettled(
    records.map(async ({ id, email, template, additionData: { assessmentId } }) => {
      const assessment = await findUnique(TABLE_NAME.ASSESSMENTS, { where: { id: assessmentId } });
      const { isPublic } = assessment;
      const tokenBody = isPublic ? { assessmentId } : { assessmentId, email };
      const token = generateToken(tokenBody, 60 * 60 * 24 * 3, process.env.TEST_TAKER_SECRET_KEY);
      const ASSESSMENT_LINK = `${process.env.FRONTEND_LINK}/test-taker?token=${token}`;

      await sendEmail(email, template, { EMAIL: email, ASSESSMENT_LINK });
      return id;
    })
  );
  const idsSuccess = mailSentSuccess.reduce((pre, { status, value }) => {
    status === 'fulfilled' && pre.push(value);
    return pre;
  }, []);

  if (idsSuccess.length) {
    await mongooseClient.bulkMail.deleteMany({ id: { $in: idsSuccess } });
  }

  // Stop cronjob when sending all mails successfully
  if (records.length < 50 && idsSuccess.length === records.length) return { isStop: true };
  return { isStop: false };
};
