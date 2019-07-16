import { Router } from 'express';
console.log('++++++++++++++++++++++i was good here++++++++++++++++9');

import UserController from '../controllers/UserController';

console.log('++++++++++++++++++++++i was good here++++++++++++++++5');

const router = Router();

/**
 * @description creates a new user
 * @param {string}
 * @param {function}
 */
router.post('/auth/signup', UserController.signup);

export default router;
