import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function RegisterForm() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Registrierung erfolgreich. Bitte E-Mail bestätigen.");
        setTimeout(() => {
          navigate("/"); // Weiterleitung zum Login
        }, 2000);
      } else {
        setMessage(data.message || "Fehler bei der Registrierung.");
      }
    } catch  {
      setMessage("Serverfehler oder keine Verbindung.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">
            Join TaskFlow
          </h1>
          <p className="text-lg text-slate-600">
            Create your account to get started
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-3xl font-bold text-center text-slate-800 mb-8">Create Account</h2>

            <div>
              <input
                name="username"
                type="text"
                placeholder="Username"
                value={form.username}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 text-lg transition-all duration-200"
              />
            </div>

            <div>
              <input
                name="email"
                type="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 text-lg transition-all duration-200"
              />
            </div>

            <div>
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 text-lg transition-all duration-200"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg text-lg"
            >
              Create Account ✨
            </button>
            
            <p className="text-center text-slate-600">
              Already have an account?{" "}
              <Link to="/" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
                Sign in here
              </Link>
            </p>

            {message && (
              <div className={`px-4 py-3 rounded-xl text-center ${
                message.includes('erfolgreich') 
                  ? 'bg-green-50 border border-green-200 text-green-700'
                  : 'bg-red-50 border border-red-200 text-red-700'
              }`}>
                {message}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
