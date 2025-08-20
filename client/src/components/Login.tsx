import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

interface LoginFormProps {
  onLogin: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    try {
      //const url = import.meta.env.ITE_API_URL;
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
        setMessage(data.message || " login failed ");
        return;
      }
      console.log("Login successful");
      
      setEmail("");
      setPassword("");
      onLogin();
      navigate("/");
    } catch (error) {
      console.log("Login error:", error);
      
    }
  };

  return (
    <div className="animate-fade-in">
      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <h2 className="text-3xl text-center font-bold text-slate-800 mb-8">Welcome Back</h2>
        
        <div>
          <input
            className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 text-lg transition-all duration-200"
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 text-lg transition-all duration-200"
          />
        </div>
        
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg text-lg"
        >
          Sign In ✨
        </button>
        
        <p className="text-center text-slate-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
            Create one here
          </Link>
        </p>

        {message && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-center">
            {message}
          </div>
        )}
      </form>
    </div>
  );
};

export default LoginForm;
