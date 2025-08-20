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
      setEmail("");
      setPassword("");
      onLogin();
      navigate("/dashboard");
    } catch (error) {
      setMessage("Server Fehler");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm mx-auto mt-10 flex flex-col gap-2"
    >
      <h2 className="text-xl text-center font-bold">Login</h2>
      <input
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        type="email"
        placeholder="E-Mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <br />
      <input
        type="password"
        placeholder="Passwort"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <br />
      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition-colors duration-200"
      >
        Einloggen
      </button>
      <p className="text-sm text-center text-gray-700">
        Noch kein Konto?{" "}
        <Link to="/register" className="text-blue-600 hover:underline">
          Jetzt registrieren
        </Link>
      </p>

      {message && (
        <p className="text-center text-sm text-amber-500">{message}</p>
      )}
    </form>
  );
};

export default LoginForm;
