import prisma from '../config/db.js';
import { taskStatusSchema } from '../utils/validation.js';

export const getTodayTasks = async (req, res) => {
  try {
    const goals = await prisma.goal.findMany({
      where: { userId: req.userId, status: 'active' }
    });
    
    if (goals.length === 0) return res.json([]);
    
    const goalIds = goals.map(g => g.id);
    const currentDay = Math.max(...goals.map(g => g.completedDays + 1));
    
    const tasks = await prisma.task.findMany({
      where: {
        goalId: { in: goalIds },
        dayNumber: { lte: currentDay },
        status: 'pending'
      },
      include: { goal: true, milestone: true },
      orderBy: { dayNumber: 'asc' }
    });
    
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTaskStatus = async (req, res) => {
  try {
    const { status } = taskStatusSchema.parse(req.body);
    const task = await prisma.task.findUnique({
      where: { id: req.params.taskId },
      include: { goal: true }
    });
    
    if (!task) return res.status(404).json({ error: 'Task not found' });
    
    const goal = await prisma.goal.findFirst({
      where: { id: task.goalId, userId: req.userId }
    });
    if (!goal) return res.status(403).json({ error: 'Unauthorized' });
    
    await prisma.task.update({
      where: { id: req.params.taskId },
      data: { status }
    });
    
    const updateData = {};
    if (status === 'completed') updateData.completedDays = goal.completedDays + 1;
    if (status === 'skipped') updateData.skippedDays = goal.skippedDays + 1;
    
    if (Object.keys(updateData).length > 0) {
      const newSkipped = updateData.skippedDays || goal.skippedDays;
      updateData.estimatedFinish = new Date(goal.startDate.getTime() + (goal.plannedDays + newSkipped) * 86400000);
      await prisma.goal.update({ where: { id: goal.id }, data: updateData });
    }
    
    res.json(await prisma.task.findUnique({ where: { id: req.params.taskId } }));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const rescheduleTasks = async (req, res) => {
  try {
    const { goalId, fromDay } = req.body;
    const goal = await prisma.goal.findFirst({
      where: { id: goalId, userId: req.userId }
    });
    if (!goal) return res.status(404).json({ error: 'Goal not found' });
    
    await prisma.task.updateMany({
      where: { goalId, dayNumber: { gte: fromDay } },
      data: { dayNumber: { increment: 1 } }
    });
    
    res.json({ message: 'Tasks rescheduled' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
