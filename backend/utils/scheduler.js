import cron from 'node-cron';
import prisma from '../config/db.js';

export const startScheduler = () => {
  cron.schedule('0 9 * * *', async () => {
    console.log('⏰ Daily task reminder triggered');
    const activeGoals = await prisma.goal.findMany({ where: { status: 'active' } });
  });

  cron.schedule('0 21 * * *', async () => {
    console.log('⏰ Night review reminder triggered');
  });

  console.log('✅ Scheduler started');
};
