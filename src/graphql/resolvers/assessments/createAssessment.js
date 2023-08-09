import { create } from '../../../libraries/prismaClient';
import { errorHandlerForResolvers, isEmptyStringNullOrUndefined, throwError } from '../../../utils';
import { SELECT_ASSESSMENT, ERROR_CODE, TABLE_NAME } from '../../../utils/const';
import { modifyResult } from './modifyResult';

const validateRequest = (data) => {
  const { name, exams } = data;
  if ([isEmptyStringNullOrUndefined(name), !exams.length].some(Boolean)) {
    throwError('Wrong input parameters', ERROR_CODE.UNPROCESSABLE_CONTENT);
  }
};

export default async ({ input }, userInfo) => {
  try {
    validateRequest(input);
    const { name, description, breakTime, retake, exams } = input;
    const assessment = await create(TABLE_NAME.ASSESSMENTS, {
      data: {
        name,
        description,
        breakTime,
        retake,
        users: { connect: { id: userInfo.id } },
        assessmentsExams: {
          create: exams.map(({ duration, questionIds }, index) => ({
            exams: {
              create: {
                duration,
                examsQuestions: { createMany: { data: questionIds.map((questionId) => ({ questionId })) } },
              },
            },
            round: index + 1,
          })),
        },
      },
      select: SELECT_ASSESSMENT,
    });

    const modifiedAssessment = await modifyResult(assessment);

    return modifiedAssessment;
  } catch (error) {
    errorHandlerForResolvers(error);
  }
};
