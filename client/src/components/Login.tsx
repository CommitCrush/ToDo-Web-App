import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/UseAuth";

interface LoginFormProps {
  onLogin: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setIsLoading(true);
    
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        setMessage(data.message || "Login failed");
        return;
      }
      
      const data = await response.json();
      console.log("Login successful", data);
      
      // Set user data in context
      if (data.loggedUser) {
        setUser({
          _id: data.loggedUser._id,
          username: data.loggedUser.username,
          email: data.loggedUser.email
        });
      }
      
      setEmail("");
      setPassword("");
      onLogin();
      navigate("/");
    } catch (error) {
      console.log("Login error:", error);
      setMessage("Connection error. Please check if the server is running.");
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="animate-fade-in">
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <h2 className="text-2xl sm:text-3xl text-center font-bold text-slate-800 mb-6 sm:mb-8">
          Welcome Back
        </h2>
        
        {/* Error Message */}
        {message && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-3 sm:px-4 py-2 sm:py-3 rounded-xl text-center text-sm sm:text-base">
            {message}
          </div>
        )}
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
            Email Address
          </label>
          <input
            id="email"
            className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 text-base sm:text-lg transition-all duration-200"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 text-base sm:text-lg transition-all duration-200 pr-10 sm:pr-12"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 pr-3 sm:pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
              disabled={isLoading}
            >
              {showPassword ? (
                <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L5.05 5.05M9.878 9.878a3 3 0 105.243 5.243m0 0L9.88 9.88" />
                </svg>
              ) : (
                <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-2 sm:py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg text-base sm:text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white mr-2"></div>
              Signing In...
            </div>
          ) : (
            'Sign In ✨'
          )}
        </button>
        
        <p className="text-center text-slate-600 text-sm sm:text-base">
          Don't have an account?{" "}
          <Link 
            to="/register" 
            className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            Create one here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
