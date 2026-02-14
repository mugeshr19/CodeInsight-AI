import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed w-full top-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center font-bold text-lg shadow-lg">
            <span className="text-white">CI</span>
          </div>
          <span className="text-xl font-bold text-white">
            CodeInsight AI
          </span>
        </Link>
        
        <div className="flex gap-2 items-center">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="px-4 py-2 text-gray-300 hover:text-white hover:bg-slate-800 rounded-lg transition font-medium">
                Dashboard
              </Link>
              <Link to="/analytics" className="px-4 py-2 text-gray-300 hover:text-white hover:bg-slate-800 rounded-lg transition font-medium">
                Analytics
              </Link>
              <Link to="/profile" className="px-4 py-2 text-gray-300 hover:text-white hover:bg-slate-800 rounded-lg transition font-medium">
                Profile
              </Link>
              <button 
                onClick={handleLogout}
                className="ml-2 px-5 py-2 bg-red-500/10 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/20 transition font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="px-4 py-2 text-gray-300 hover:text-white transition font-medium">
                Login
              </Link>
              <Link 
                to="/register" 
                className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium shadow-lg shadow-indigo-500/30"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
