import { create, findUnique } from '../../../libraries/prismaClient';
import { errorHandlerForResolvers } from '../../../utils';
import { TABLE_NAME } from '../../../utils/const';

export default async ({ input: { assessmentId } }, userInfo) => {
  try {
    const assessment = await findUnique(TABLE_NAME.ASSESSMENTS, {
      where: { id: assessmentId },
      select: {
        name: true,
        description: true,
        breakTime: true,
        retake: true,
        assessmentsExams: { select: { examId: true, round: true } },
      },
    });

    const { assessmentsExams, name, ...restAssessment } = assessment;

    const newAssessment = await create(TABLE_NAME.ASSESSMENTS, {
      data: {
        ...restAssessment,
        name: `Copy of ${name}`,
        assessmentsExams: { create: assessmentsExams },
        users: { connect: { id: userInfo.id } },
      },
    });

    return { id: newAssessment.id };
  } catch (error) {
    errorHandlerForResolvers(error);
  }
};
