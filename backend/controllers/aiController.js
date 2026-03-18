import { generatePlan, generateMotivation, generateInsights } from '../utils/ai.js';
import prisma from '../config/db.js';

export const aiGeneratePlan = async (req, res) => {
  try {
    const { title, description, plannedDays } = req.body;
    const plan = await generatePlan(title, description, plannedDays);
    res.json(plan);
  } catch (error) {
    res.status(500).json({ error: 'AI generation failed: ' + error.message });
  }
};

export const aiMotivation = async (req, res) => {
  try {
    const { goalId } = req.body;
    const goal = await prisma.goal.findFirst({
      where: { id: goalId, userId: req.userId }
    });
    if (!goal) return res.status(404).json({ error: 'Goal not found' });
    
    const message = await generateMotivation(goal, goal.completedDays, goal.skippedDays);
    res.json({ message });
  } catch (error) {
    res.status(500).json({ error: 'AI generation failed: ' + error.message });
  }
};

export const aiReviewInsights = async (req, res) => {
  try {
    const { goalId } = req.body;
    const goal = await prisma.goal.findFirst({
      where: { id: goalId, userId: req.userId }
    });
    if (!goal) return res.status(404).json({ error: 'Goal not found' });
    
    const reviews = await prisma.dailyReview.findMany({
      where: { goalId },
      orderBy: { date: 'desc' },
      take: 7
    });
    if (reviews.length === 0) return res.json({ insights: 'No reviews yet' });
    
    const insights = await generateInsights(reviews);
    res.json({ insights });
  } catch (error) {
    res.status(500).json({ error: 'AI generation failed: ' + error.message });
  }
};
