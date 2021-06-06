import { Router } from 'express';
import autRoute from './auth.route';
import taskRoute from './task.route';
import commentRoute from './comment.route';
import userRoute from './user.route';
import auth from './middleware/auth';

const router = Router();

router.use('/api/auth', autRoute);
router.use('/api/user', auth, userRoute);
router.use('/api/task', auth, taskRoute);
router.use('/api/comment', auth, commentRoute);

export default router;
