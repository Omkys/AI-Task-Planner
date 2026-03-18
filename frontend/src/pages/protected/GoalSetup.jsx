import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { goals, milestones, tasks, ai } from '../../services/api';

export default function GoalSetup() {
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [plannedDays, setPlannedDays] = useState(30);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Generate AI plan
      const planRes = await ai.generatePlan({ title, description, plannedDays });
      const plan = planRes.data;

      // Create goal
      const goalRes = await goals.create({
        title,
        description,
        startDate: new Date().toISOString(),
        plannedDays
      });
      const goalId = goalRes.data.id;

      const milestoneMap = {};
      for (const milestone of plan.milestones) {
        const msRes = await milestones.create(goalId, milestone);
        milestoneMap[milestone.order] = msRes.data.id;
      }

      for (const task of plan.tasks) {
        await tasks.create({
          title: task.title,
          dayNumber: parseInt(task.dayNumber),
          estimatedMinutes: parseInt(task.estimatedMinutes || 30),
          status: 'pending',
          goalId,
          milestoneId: milestoneMap[task.milestoneOrder] || null
        });
      }

      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to create goal:', error);
      alert('Failed to create goal. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white p-8 rounded-lg shadow">
          <h1 className="text-3xl font-bold mb-6">Create New Goal</h1>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block font-semibold mb-2">Goal Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 border rounded"
                placeholder="e.g., Learn Python Programming"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block font-semibold mb-2">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 border rounded"
                rows="4"
                placeholder="Describe your goal in detail..."
              />
            </div>

            <div className="mb-6">
              <label className="block font-semibold mb-2">Duration (days)</label>
              <input
                type="number"
                value={plannedDays}
                onChange={(e) => setPlannedDays(Number(e.target.value))}
                className="w-full p-3 border rounded"
                min="1"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 disabled:bg-gray-400"
            >
              {loading ? 'Generating AI Plan...' : 'Create Goal with AI'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
