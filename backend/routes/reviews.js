import express from 'express';
import { createReview, getReviews } from '../controllers/reviewController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.use(auth);
router.post('/', createReview);
router.get('/:goalId', getReviews);

export default router;
