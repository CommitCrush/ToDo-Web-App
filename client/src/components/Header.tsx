import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hook/UseAuth';

interface HeaderProps {
  onLogout?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      if (onLogout) onLogout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <header className="bg-gradient-to-r from-slate-800 to-slate-900 text-white shadow-xl">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold hover:text-blue-300 transition-all duration-300 flex items-center">
              <span className="bg-blue-500 text-white px-3 py-1 rounded-lg mr-2">📝</span>
              TaskFlow
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="hover:text-blue-300 transition-all duration-200 font-medium"
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className="hover:text-blue-300 transition-all duration-200 font-medium"
            >
              About
            </Link>
            
            {isLoggedIn && (
              <Link 
                to="/todos" 
                className="hover:text-blue-300 transition-all duration-200 font-medium"
              >
                Todos
              </Link>
            )}
          </nav>

          {/* Auth Section */}
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition-all duration-200 font-medium"
              >
                Logout
              </button>
            ) : (
              <div className="flex items-center space-x-3">
                <Link 
                  to="/" 
                  className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg transition-all duration-200 font-medium"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="border border-blue-400 hover:bg-blue-500 px-4 py-2 rounded-lg transition-all duration-200 font-medium"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;