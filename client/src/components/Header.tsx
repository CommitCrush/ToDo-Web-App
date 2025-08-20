import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../hooks/UseAuth';

interface HeaderProps {
  onLogout?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    setIsMobileMenuOpen(false); // Close mobile menu on logout
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-gradient-to-r from-slate-800 to-slate-900 text-white shadow-xl">
      <div className="container mx-auto px-4 sm:px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <Link 
              to="/" 
              className="text-xl sm:text-2xl font-bold hover:text-blue-300 transition-all duration-300 flex items-center"
              onClick={closeMobileMenu}
            >
              <span className="bg-blue-500 text-white px-2 sm:px-3 py-1 rounded-lg mr-2">📝</span>
              TaskFlow
            </Link>
          </div>

          {/* Desktop Navigation Links */}
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

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
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

          {/* Mobile Hamburger Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden flex flex-col items-center justify-center w-8 h-8 space-y-1 focus:outline-none"
            aria-label="Toggle mobile menu"
          >
            <span 
              className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            ></span>
            <span 
              className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                isMobileMenuOpen ? 'opacity-0' : ''
              }`}
            ></span>
            <span 
              className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            ></span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="pt-4 pb-2 space-y-2">
            {/* Mobile Navigation Links */}
            <Link 
              to="/" 
              className="block px-4 py-3 hover:bg-slate-700 rounded-lg transition-all duration-200 font-medium"
              onClick={closeMobileMenu}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className="block px-4 py-3 hover:bg-slate-700 rounded-lg transition-all duration-200 font-medium"
              onClick={closeMobileMenu}
            >
              About
            </Link>
            
            {isLoggedIn && (
              <Link 
                to="/todos" 
                className="block px-4 py-3 hover:bg-slate-700 rounded-lg transition-all duration-200 font-medium"
                onClick={closeMobileMenu}
              >
                Todos
              </Link>
            )}

            {/* Mobile Auth Section */}
            <div className="pt-2 border-t border-slate-600">
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 bg-red-500 hover:bg-red-600 rounded-lg transition-all duration-200 font-medium"
                >
                  Logout
                </button>
              ) : (
                <div className="space-y-2">
                  <Link 
                    to="/" 
                    className="block px-4 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg transition-all duration-200 font-medium text-center"
                    onClick={closeMobileMenu}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className="block px-4 py-3 border border-blue-400 hover:bg-blue-500 rounded-lg transition-all duration-200 font-medium text-center"
                    onClick={closeMobileMenu}
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;