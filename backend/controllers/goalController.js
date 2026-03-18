import prisma from '../config/db.js';
import { goalSchema } from '../utils/validation.js';

export const createGoal = async (req, res) => {
  try {
    const data = goalSchema.parse(req.body);
    const startDate = new Date(data.startDate);
    const estimatedFinish = new Date(startDate.getTime() + data.plannedDays * 86400000);
    
    const goal = await prisma.goal.create({
      data: { ...data, startDate, estimatedFinish, userId: req.userId }
    });
    res.status(201).json(goal);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getGoals = async (req, res) => {
  try {
    const goals = await prisma.goal.findMany({
      where: { userId: req.userId },
      orderBy: { createdAt: 'desc' }
    });
    res.json(goals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getGoal = async (req, res) => {
  try {
    const goal = await prisma.goal.findFirst({
      where: { id: req.params.id, userId: req.userId }
    });
    if (!goal) return res.status(404).json({ error: 'Goal not found' });
    res.json(goal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateGoal = async (req, res) => {
  try {
    const goal = await prisma.goal.updateMany({
      where: { id: req.params.id, userId: req.userId },
      data: req.body
    });
    if (goal.count === 0) return res.status(404).json({ error: 'Goal not found' });
    res.json(await prisma.goal.findUnique({ where: { id: req.params.id } }));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteGoal = async (req, res) => {
  try {
    await prisma.goal.deleteMany({
      where: { id: req.params.id, userId: req.userId }
    });
    res.json({ message: 'Goal deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
