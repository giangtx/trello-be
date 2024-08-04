import express from 'express';
import authRouter from './auth.js';
import broadRouter from './broad.js';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/broads', broadRouter);

export default router;
