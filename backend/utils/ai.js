import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' });

export const generatePlan = async (title, description, plannedDays) => {
  try {
    const prompt = `Create a structured plan for this goal:
Title: ${title}
Description: ${description}
Duration: ${plannedDays} days

Generate:
1. 3-5 milestones (JSON array with "title" and "order")
2. Daily tasks distributed across ${plannedDays} days (JSON array with "title", "dayNumber", "estimatedMinutes", "milestoneOrder")

Return ONLY valid JSON: {"milestones": [...], "tasks": [...]}`;

    const result = await model.generateContent(prompt);
    const text = result.response.text().replace(/```json\n?|\n?```/g, '').trim();
    return JSON.parse(text);
  } catch (error) {
    console.error('AI Generation Error:', error);
    return {
      milestones: [
        { title: 'Getting Started', order: 1 },
        { title: 'Core Learning', order: 2 },
        { title: 'Practice & Apply', order: 3 }
      ],
      tasks: Array.from({ length: Math.min(plannedDays, 10) }, (_, i) => ({
        title: `Day ${i + 1} Task`,
        dayNumber: i + 1,
        estimatedMinutes: 60,
        milestoneOrder: Math.floor(i / (plannedDays / 3)) + 1
      }))
    };
  }
};

export const generateMotivation = async (goal, completedDays, skippedDays) => {
  try {
    const prompt = `Generate a motivational message for:
Goal: ${goal.title}
Completed: ${completedDays} days
Skipped: ${skippedDays} days
Total planned: ${goal.plannedDays} days

Keep it under 50 words, encouraging and actionable.`;

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    return `Keep pushing forward! You've completed ${completedDays} days. Every step counts toward your goal.`;
  }
};

export const generateInsights = async (reviews) => {
  try {
    const prompt = `Analyze these daily reviews and provide productivity insights:
${reviews.map(r => `Focus: ${r.focusLevel}/5, Difficulty: ${r.difficulty}/5, Blockers: ${r.blockers || 'None'}`).join('\n')}

Provide 3 actionable suggestions in under 100 words.`;

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    return 'Keep tracking your progress. Consistency is key to achieving your goals.';
  }
};
