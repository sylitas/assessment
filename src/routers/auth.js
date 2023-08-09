import { Router } from 'express';
import authHandler from '../handler/auth';

const router = Router();

router.post('/login', authHandler);

export default router;
