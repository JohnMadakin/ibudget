import { Router } from 'express';
console.log('++++++++++++++++++++++i was good here++++++++++++++++3');
import userRoutes from './userRoutes';

const router = Router();

const url = '/api/v1';
console.log('++++++++++++++++++++++i was good here++++++++++++++++4');

// router.use(url, userRoutes);

export default router;