import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 text-white">
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-6xl font-bold mb-6">AI Goal Planner</h1>
        <p className="text-2xl mb-12">Achieve your long-term goals with AI-powered daily tasks and insights</p>
        <div className="flex gap-4 justify-center">
          <Link to="/register" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100">
            Get Started
          </Link>
          <Link to="/login" className="bg-transparent border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600">
            Login
          </Link>
        </div>
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <div className="bg-white/10 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-2">🎯 Smart Planning</h3>
            <p>AI breaks goals into milestones and daily tasks</p>
          </div>
          <div className="bg-white/10 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-2">📊 Progress Tracking</h3>
            <p>Dynamic timeline adjusts to your pace</p>
          </div>
          <div className="bg-white/10 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-2">💡 AI Insights</h3>
            <p>Get motivation and productivity suggestions</p>
          </div>
        </div>
      </div>
    </div>
  );
}
