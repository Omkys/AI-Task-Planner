import prisma from '../config/db.js';

export const getProgress = async (req, res) => {
  try {
    const goal = await prisma.goal.findFirst({
      where: { id: req.params.goalId, userId: req.userId }
    });
    if (!goal) return res.status(404).json({ error: 'Goal not found' });
    
    const tasks = await prisma.task.findMany({ where: { goalId: goal.id } });
    const completedTasks = tasks.filter(t => t.status === 'completed').length;
    
    const remainingDays = goal.plannedDays - goal.completedDays;
    const progressPercent = (goal.completedDays / goal.plannedDays) * 100;
    
    let pace = 'on track';
    if (goal.skippedDays > goal.plannedDays * 0.1) pace = 'behind';
    else if (goal.completedDays > goal.plannedDays * 0.5 && goal.skippedDays === 0) pace = 'ahead';
    
    res.json({
      goal,
      completedTasks,
      totalTasks: tasks.length,
      remainingDays,
      progressPercent,
      pace,
      estimatedFinish: goal.estimatedFinish
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
