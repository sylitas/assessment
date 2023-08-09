import { deleteMany } from '../../../libraries/prismaClient';
import { errorHandlerForResolvers } from '../../../utils';
import { TABLE_NAME } from '../../../utils/const';

export default async ({ input: { ids } }) => {
  try {
    await deleteMany(TABLE_NAME.QUESTIONS, {
      where: { id: { in: ids } },
    });

    return { message: 'All ids had been deleted' };
  } catch (error) {
    errorHandlerForResolvers(error);
  }
};
