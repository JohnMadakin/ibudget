import { Router } from 'express';

import AuthController from '../controllers/AuthController';

const router = Router();
const auth = new AuthController();

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
router.post('/auth/login', auth.signin);


export default router;
