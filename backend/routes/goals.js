import express from 'express';
import { createGoal, getGoals, getGoal, updateGoal, deleteGoal } from '../controllers/goalController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.use(auth);
router.post('/', createGoal);
router.get('/', getGoals);
router.get('/:id', getGoal);
router.put('/:id', updateGoal);
router.delete('/:id', deleteGoal);

export default router;
