import { useState, useEffect } from 'react';
import { reviews, goals, ai } from '../../services/api';

export default function Review() {
  const [userGoals, setUserGoals] = useState([]);
  const [selectedGoal, setSelectedGoal] = useState('');
  const [focusLevel, setFocusLevel] = useState(3);
  const [difficulty, setDifficulty] = useState(3);
  const [blockers, setBlockers] = useState('');
  const [notes, setNotes] = useState('');
  const [insights, setInsights] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    loadGoals();
  }, []);

  const loadGoals = async () => {
    try {
      const res = await goals.getAll();
      setUserGoals(res.data.filter(g => g.status === 'active'));
      if (res.data.length > 0) setSelectedGoal(res.data[0].id);
    } catch (error) {
      console.error('Failed to load goals:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await reviews.create({
        goalId: selectedGoal,
        focusLevel,
        difficulty,
        blockers,
        notes
      });

      const insightsRes = await ai.getInsights(selectedGoal);
      setInsights(insightsRes.data.insights);
      setSubmitted(true);
    } catch (error) {
      console.error('Failed to submit review:', error);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="bg-white p-8 rounded-lg shadow text-center">
            <h2 className="text-3xl font-bold mb-4">✅ Review Submitted!</h2>
            {insights && (
              <div className="bg-blue-50 p-6 rounded-lg text-left mt-6">
                <h3 className="text-xl font-bold mb-2">💡 AI Insights</h3>
                <p className="whitespace-pre-line">{insights}</p>
              </div>
            )}
            <button
              onClick={() => setSubmitted(false)}
              className="mt-6 bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
            >
              Submit Another Review
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white p-8 rounded-lg shadow">
          <h1 className="text-3xl font-bold mb-6">Daily Review</h1>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block font-semibold mb-2">Goal</label>
              <select
                value={selectedGoal}
                onChange={(e) => setSelectedGoal(e.target.value)}
                className="w-full p-3 border rounded"
                required
              >
                {userGoals.map(g => (
                  <option key={g.id} value={g.id}>{g.title}</option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block font-semibold mb-2">Focus Level (1-5)</label>
              <input
                type="range"
                min="1"
                max="5"
                value={focusLevel}
                onChange={(e) => setFocusLevel(Number(e.target.value))}
                className="w-full"
              />
              <p className="text-center text-2xl font-bold">{focusLevel}</p>
            </div>

            <div className="mb-4">
              <label className="block font-semibold mb-2">Difficulty (1-5)</label>
              <input
                type="range"
                min="1"
                max="5"
                value={difficulty}
                onChange={(e) => setDifficulty(Number(e.target.value))}
                className="w-full"
              />
              <p className="text-center text-2xl font-bold">{difficulty}</p>
            </div>

            <div className="mb-4">
              <label className="block font-semibold mb-2">Blockers</label>
              <textarea
                value={blockers}
                onChange={(e) => setBlockers(e.target.value)}
                className="w-full p-3 border rounded"
                rows="3"
                placeholder="What blocked your progress today?"
              />
            </div>

            <div className="mb-6">
              <label className="block font-semibold mb-2">Notes</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full p-3 border rounded"
                rows="3"
                placeholder="Any additional thoughts..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
            >
              Submit Review
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
