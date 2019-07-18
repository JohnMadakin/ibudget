import { Router } from 'express';
import dotenv from 'dotenv';

import AuthController from '../controllers/AuthController';
import UserAuthMiddleware from '../middleware/UserAuth';

dotenv.config();
const router = Router();
const auth = new AuthController(process.env.VERIFYEMAIL_URL);

/**
 * @description creates a new user
 * @param {string}
 * @param {function}
 */
router.post('/auth/signup', auth.signup);

/**
 * @description login a registered user
 * @param {string}
 * @param {function}
 */
router.post('/auth/login', UserAuthMiddleware.validateEmailExists, auth.signin);

router.get('/auth/verifyemail', auth.verifyEmail);

export default router;
