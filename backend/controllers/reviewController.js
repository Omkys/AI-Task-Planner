import prisma from '../config/db.js';
import { reviewSchema } from '../utils/validation.js';

export const createReview = async (req, res) => {
  try {
    const data = reviewSchema.parse(req.body);
    const goal = await prisma.goal.findFirst({
      where: { id: data.goalId, userId: req.userId }
    });
    if (!goal) return res.status(404).json({ error: 'Goal not found' });
    
    const review = await prisma.dailyReview.create({ data });
    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getReviews = async (req, res) => {
  try {
    const goal = await prisma.goal.findFirst({
      where: { id: req.params.goalId, userId: req.userId }
    });
    if (!goal) return res.status(404).json({ error: 'Goal not found' });
    
    const reviews = await prisma.dailyReview.findMany({
      where: { goalId: req.params.goalId },
      orderBy: { date: 'desc' }
    });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
