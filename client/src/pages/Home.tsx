
const Home = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          Welcome to ToDo App
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Organize your tasks efficiently and stay productive!
        </p>
        <div className="bg-blue-50 p-6 rounded-lg shadow-md max-w-2xl mx-auto">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">
            Get Started
          </h2>
          <p className="text-gray-700 mb-4">
            Create an account or login to start managing your tasks.
          </p>
          <div className="flex justify-center space-x-4">
            <a 
              href="/register" 
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              Sign Up
            </a>
            <a 
              href="/login" 
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition-colors"
            >
              Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;