import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { progress, goals } from '../../services/api';

export default function Analytics() {
  const [searchParams] = useSearchParams();
  const [goalData, setGoalData] = useState(null);
  const [progressData, setProgressData] = useState(null);
  const [userGoals, setUserGoals] = useState([]);
  const [selectedGoal, setSelectedGoal] = useState(searchParams.get('goal') || '');

  useEffect(() => {
    loadGoals();
  }, []);

  useEffect(() => {
    if (selectedGoal) loadProgress();
  }, [selectedGoal]);

  const loadGoals = async () => {
    try {
      const res = await goals.getAll();
      setUserGoals(res.data);
      if (!selectedGoal && res.data.length > 0) {
        setSelectedGoal(res.data[0].id);
      }
    } catch (error) {
      console.error('Failed to load goals:', error);
    }
  };

  const loadProgress = async () => {
    try {
      const res = await progress.get(selectedGoal);
      setProgressData(res.data);
      setGoalData(res.data.goal);
    } catch (error) {
      console.error('Failed to load progress:', error);
    }
  };

  if (!progressData) return <div className="p-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Progress Analytics</h1>

        <div className="mb-6">
          <select
            value={selectedGoal}
            onChange={(e) => setSelectedGoal(e.target.value)}
            className="p-3 border rounded"
          >
            {userGoals.map(g => (
              <option key={g.id} value={g.id}>{g.title}</option>
            ))}
          </select>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-600 mb-2">Progress</h3>
            <p className="text-3xl font-bold">{progressData.progressPercent.toFixed(1)}%</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-600 mb-2">Remaining Days</h3>
            <p className="text-3xl font-bold">{progressData.remainingDays}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-600 mb-2">Pace</h3>
            <p className="text-3xl font-bold capitalize">{progressData.pace}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-2xl font-bold mb-4">Goal Details</h2>
          <div className="space-y-2">
            <p><strong>Title:</strong> {goalData.title}</p>
            <p><strong>Completed Days:</strong> {goalData.completedDays} / {goalData.plannedDays}</p>
            <p><strong>Skipped Days:</strong> {goalData.skippedDays}</p>
            <p><strong>Estimated Finish:</strong> {new Date(progressData.estimatedFinish).toLocaleDateString()}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">Task Completion</h2>
          <div className="w-full bg-gray-200 rounded-full h-8">
            <div
              className="bg-green-500 h-8 rounded-full flex items-center justify-center text-white font-semibold"
              style={{ width: `${(progressData.completedTasks / progressData.totalTasks) * 100}%` }}
            >
              {progressData.completedTasks} / {progressData.totalTasks}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
