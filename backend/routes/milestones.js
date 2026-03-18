import express from 'express';
import { createMilestone, getMilestones } from '../controllers/milestoneController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.use(auth);
router.post('/:goalId/milestones', createMilestone);
router.get('/:goalId/milestones', getMilestones);

export default router;
