import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { tasks, goals, ai } from '../../services/api';

export default function Dashboard() {
  const [todayTasks, setTodayTasks] = useState([]);
  const [userGoals, setUserGoals] = useState([]);
  const [motivation, setMotivation] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [tasksRes, goalsRes] = await Promise.all([
        tasks.getToday(),
        goals.getAll()
      ]);
      setTodayTasks(tasksRes.data);
      setUserGoals(goalsRes.data);
      
      if (goalsRes.data.length > 0) {
        const motivationRes = await ai.getMotivation(goalsRes.data[0].id);
        setMotivation(motivationRes.data.message);
      }
    } catch (error) {
      console.error('Failed to load dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTaskStatus = async (taskId, status) => {
    try {
      await tasks.updateStatus(taskId, status);
      loadData();
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
        
        {userGoals.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow text-center">
            <h2 className="text-2xl mb-4">No goals yet!</h2>
            <Link to="/goal-setup" className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">
              Create Your First Goal
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-bold mb-4">Today's Tasks</h2>
              {todayTasks.length === 0 ? (
                <p className="text-gray-500">No tasks for today</p>
              ) : (
                <div className="space-y-3">
                  {todayTasks.map(task => (
                    <div key={task.id} className="border p-4 rounded flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold">{task.title}</h3>
                        <p className="text-sm text-gray-500">{task.estimatedMinutes} min</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleTaskStatus(task.id, 'completed')}
                          className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
                        >
                          ✓
                        </button>
                        <button
                          onClick={() => handleTaskStatus(task.id, 'skipped')}
                          className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600"
                        >
                          Skip
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-6">
              {motivation && (
                <div className="bg-blue-50 p-6 rounded-lg shadow">
                  <h2 className="text-xl font-bold mb-2">💪 Motivation</h2>
                  <p>{motivation}</p>
                </div>
              )}

              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-2xl font-bold mb-4">Active Goals</h2>
                {userGoals.filter(g => g.status === 'active').map(goal => (
                  <div key={goal.id} className="border-b pb-3 mb-3">
                    <h3 className="font-semibold">{goal.title}</h3>
                    <div className="text-sm text-gray-600">
                      <p>Completed: {goal.completedDays} / {goal.plannedDays} days</p>
                      <p>Skipped: {goal.skippedDays} days</p>
                    </div>
                    <Link to={`/analytics?goal=${goal.id}`} className="text-blue-600 text-sm hover:underline">
                      View Progress →
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
