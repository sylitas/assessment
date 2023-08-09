import jwt from 'jsonwebtoken';

const expired = parseInt(process.env.EXPIRED_LIMIT, 10);

export const generateToken = (data, timeExpire = expired, secret = process.env.SECRET_KEY) => {
  const token = jwt.sign({ exp: Math.floor(Date.now() / 1000) + timeExpire, data }, secret);
  return token;
};

export const tokenVerification = async (token) =>
  new Promise((resolve, reject) =>
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => (err ? reject(err) : resolve(decoded)))
  );
