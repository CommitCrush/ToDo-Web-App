import React from "react";
import { Link } from "react-router-dom";

interface HomeProps {
  onLogout: () => void;
}

const Home: React.FC<HomeProps> = ({ onLogout }) => {
  // User Daten aus localStorage holen
  const getUserData = () => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
    return null;
  };

  const user = getUserData();
  const username = user?.username || user?.email?.split('@')[0] || 'User';

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          Welcome to the Todo App, {username}! 🎉
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Ready to organize your tasks and stay productive?
        </p>
        
        {/* Todo Starter Section */}
        <div className="bg-green-50 p-8 rounded-lg shadow-md max-w-3xl mx-auto mb-8">
          <h2 className="text-2xl font-semibold text-green-800 mb-4">
            Start Managing Your Tasks
          </h2>
          <p className="text-gray-700 mb-6">
            Create, organize, and track your daily tasks efficiently.
          </p>
          
          <div className="flex justify-center space-x-4">
            <Link 
              to="/todos" 
              className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
            >
              Go to My Todos
            </Link>
            <button 
              onClick={onLogout}
              className="bg-red-500 text-white px-8 py-3 rounded-lg hover:bg-red-600 transition-colors font-semibold"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Quick Stats or Features */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">Create Tasks</h3>
            <p className="text-gray-600">Add new tasks with descriptions and due dates</p>
          </div>
          <div className="bg-yellow-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">Track Progress</h3>
            <p className="text-gray-600">Mark tasks as complete and track your productivity</p>
          </div>
          <div className="bg-purple-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-purple-800 mb-2">Stay Organized</h3>
            <p className="text-gray-600">Filter and sort your tasks by priority and status</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;