import express from 'express';
import { aiGeneratePlan, aiMotivation, aiReviewInsights } from '../controllers/aiController.js';
import { auth } from '../middleware/auth.js';
import rateLimit from 'express-rate-limit';

const router = express.Router();

const aiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: 'Too many AI requests, please try again later'
});

router.use(auth);
router.use(aiLimiter);

router.post('/generate-plan', aiGeneratePlan);
router.post('/motivation', aiMotivation);
router.post('/review-insights', aiReviewInsights);

export default router;
