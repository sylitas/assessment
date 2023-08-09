import { upload } from '../libraries/aws-sdk';

export const singleFile = async (req, res) => {
  const { id: userId } = req.user;
  const { originalname: filename, buffer: fileContent } = req.file;
  const key = await upload(userId, filename, fileContent).storeBucket();
  res.json(key);
};
