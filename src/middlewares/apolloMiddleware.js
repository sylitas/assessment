import { getUserInfoFromToken } from '.';
import { throwError } from '../utils';
import { ERROR_CODE } from '../utils/const';

export default {
  context: async ({ req }) => {
    const { authorization } = req.headers;
    try {
      const data = await getUserInfoFromToken(authorization);
      return data;
    } catch (error) {
      return throwError('Token expired', ERROR_CODE.UNAUTHENTICATED);
    }
  },
};
