import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string()
});

export const goalSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  startDate: z.string().datetime(),
  plannedDays: z.number().min(1)
});

export const taskStatusSchema = z.object({
  status: z.enum(['pending', 'completed', 'skipped'])
});

export const reviewSchema = z.object({
  focusLevel: z.number().min(1).max(5),
  difficulty: z.number().min(1).max(5),
  blockers: z.string().optional(),
  notes: z.string().optional(),
  goalId: z.string()
});
