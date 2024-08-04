import express from 'express';
import * as authController from '../controllers/auth';
import { verifyToken } from '../utils/jwtToken';

const router = express.Router();

router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/logout', authController.logout);
router.route('/me').get(verifyToken(), authController.me);

export default router;
