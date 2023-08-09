import { Router } from 'express';
import multer from 'multer';
import { singleFile } from '../handler/upload';
import validateFileUpload from '../middlewares/validateFileUpload';
import { getUserInfoFromToken } from '../middlewares';

const router = Router();

router.use(async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const data = await getUserInfoFromToken(authorization);
    req.user = data;
    return next();
  } catch (error) {
    console.log('Error :', error);
    return res.status(401).json({ message: 'UNAUTHENTICATED' });
  }
});

router.post('/singleFile', multer().single('file'), validateFileUpload, singleFile);

export default router;
