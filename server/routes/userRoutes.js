import { Router } from 'express';

import UserController from '../controllers/UserController';

const router = Router();

/**
 * @description creates a new user
 * @param {string}
 * @param {function}
 */
router.post('/auth/signup', UserController.signup);

export default router;
