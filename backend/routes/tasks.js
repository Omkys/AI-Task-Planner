import express from 'express';
import { getTodayTasks, updateTaskStatus, rescheduleTasks } from '../controllers/taskController.js';
import { createTask, getTasks } from '../controllers/taskCreateController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.use(auth);
router.post('/', createTask);
router.get('/', getTasks);
router.get('/today', getTodayTasks);
router.put('/:taskId/status', updateTaskStatus);
router.post('/reschedule', rescheduleTasks);

export default router;
