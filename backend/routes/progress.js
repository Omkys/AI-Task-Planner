import express from 'express';
import { getProgress } from '../controllers/progressController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.use(auth);
router.get('/:goalId', getProgress);

export default router;
