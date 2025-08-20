import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hook/UseAuth";
import LoginForm from "../components/Login";

interface HomeProps {
  onLogout: () => void;
}

const Home: React.FC<HomeProps> = ({ onLogout }) => {
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  if (!isLoggedIn) {
    // Show login form for non-authenticated users
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-slate-800 mb-4">
              Welcome to TaskFlow
            </h1>
            <p className="text-lg text-slate-600">
              Please login to manage your tasks
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <LoginForm onLogin={() => setIsLoggedIn(true)} />
          </div>
        </div>
      </div>
    );
  }

  // Show welcome dashboard for authenticated users
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-slate-800 mb-6 animate-fade-in">
            Welcome Back! 👋
          </h1>
          <p className="text-xl text-slate-600 mb-8">
            Ready to boost your productivity today?
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Main CTA Card */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8 transform hover:scale-105 transition-all duration-300">
            <div className="text-center">
              <div className="mb-6">
                <span className="text-6xl">✨</span>
              </div>
              <h2 className="text-3xl font-bold text-slate-800 mb-4">
                Create Your First Todo
              </h2>
              <p className="text-lg text-slate-600 mb-6">
                Start organizing your tasks with our intuitive drag-and-drop interface
              </p>
              <Link
                to="/todos"
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Go to Todos 🚀
              </Link>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">
                  Smart Organization
                </h3>
                <p className="text-slate-600">
                  Organize your tasks with drag-and-drop functionality
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">
                  Lightning Fast
                </h3>
                <p className="text-slate-600">
                  Quick actions and smooth animations for better UX
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
              <div className="text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎨</span>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">
                  Beautiful Design
                </h3>
                <p className="text-slate-600">
                  Clean and modern interface that's a joy to use
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;