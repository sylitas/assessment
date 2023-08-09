import { generateToken } from '../libraries/jwt';
import { findUnique } from '../libraries/prismaClient';
import { md5Hash } from '../utils';
import { TABLE_NAME } from '../utils/const';

export default async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = md5Hash(password);
  const userInfo = await findUnique(TABLE_NAME.USERS, { where: { email, password: hashedPassword } });
  if (!userInfo) return res.status(401).json({ message: 'Unauthorized' });
  const { email: emailUser, role, firstname, lastname } = userInfo;
  const accessToken = generateToken({
    email: emailUser,
    role,
    firstname,
    lastname,
  });

  return res.json({ accessToken });
};
