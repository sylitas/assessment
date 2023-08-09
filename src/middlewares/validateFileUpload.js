// import { FILE_TYPE } from '../utils/const';

export default (req, res, next) => {
  const { mimetype } = req.file;
  // TODO: file extension config here
  if (['audio', 'video'].includes(mimetype)) {
    return res.status(415).json({ message: 'Only audio or video is supported' });
  }
  next();
};
