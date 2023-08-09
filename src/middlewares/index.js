import { tokenVerification } from '../libraries/jwt';
import { findUnique } from '../libraries/prismaClient';
import { TABLE_NAME } from '../utils/const';

export const getUserInfoFromToken = async (authorization) => {
  const { data } = await tokenVerification(authorization);
  const user = await findUnique(TABLE_NAME.USERS, {
    where: { email: data.email },
    select: {
      id: true,
      email: true,
      usersRoles: { select: { roles: { select: { name: true } } } },
      firstname: true,
      lastname: true,
    },
  });

  const role = user.usersRoles.map(({ roles: { name } }) => name);

  delete user.usersRoles;

  return { ...user, role };
};
