import { generateToken } from '../../../libraries/jwt';
import { update } from '../../../libraries/prismaClient';
import { errorHandlerForResolvers } from '../../../utils';
import { TABLE_NAME } from '../../../utils/const';

export default async ({ input }) => {
  try {
    const { assessmentId, isPublic } = input;
    await update(TABLE_NAME.ASSESSMENTS, { where: { id: assessmentId }, data: { isPublic } });
    let publicLink = null;
    if (!isPublic) return { publicLink };
    const token = generateToken({ assessmentId }, 60 * 60 * 24 * 3, process.env.TEST_TAKER_SECRET_KEY);
    publicLink = `http://${process.env.FRONTEND_LINK}/test-taker?token=${token}`;
    return { publicLink };
  } catch (error) {
    errorHandlerForResolvers(error);
  }
};
