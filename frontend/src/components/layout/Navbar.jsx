import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">AI Goal Planner</Link>
        {user && (
          <div className="flex gap-4 items-center">
            <Link to="/dashboard" className="hover:underline">Dashboard</Link>
            <Link to="/planner" className="hover:underline">Planner</Link>
            <Link to="/analytics" className="hover:underline">Analytics</Link>
            <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded hover:bg-red-600">
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
