import { update } from '../../../libraries/prismaClient';
import { errorHandlerForResolvers } from '../../../utils';
import { TABLE_NAME } from '../../../utils/const';

export default async ({ input }) => {
  try {
    const { assessmentId, status } = input;
    await update(TABLE_NAME.ASSESSMENTS, {
      where: { id: assessmentId },
      data: { status },
    });

    return { message: 'Status of this assessment status has been updated' };
  } catch (error) {
    errorHandlerForResolvers(error);
  }
};
