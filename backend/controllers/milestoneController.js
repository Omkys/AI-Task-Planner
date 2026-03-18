import prisma from '../config/db.js';

export const createMilestone = async (req, res) => {
  try {
    const goal = await prisma.goal.findFirst({
      where: { id: req.params.goalId, userId: req.userId }
    });
    if (!goal) return res.status(404).json({ error: 'Goal not found' });
    
    const milestone = await prisma.milestone.create({
      data: { ...req.body, goalId: req.params.goalId }
    });
    res.status(201).json(milestone);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getMilestones = async (req, res) => {
  try {
    const goal = await prisma.goal.findFirst({
      where: { id: req.params.goalId, userId: req.userId }
    });
    if (!goal) return res.status(404).json({ error: 'Goal not found' });
    
    const milestones = await prisma.milestone.findMany({
      where: { goalId: req.params.goalId },
      orderBy: { order: 'asc' }
    });
    res.json(milestones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
