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
    } catch (error) {
      setMessage("Serverfehler oder keine Verbindung.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold text-center">Registrieren</h2>

      <input
        name="username"
        type="text"
        placeholder="Benutzername"
        value={form.username}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <input
        name="email"
        type="email"
        placeholder="@-email"
        value={form.email}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <input
        name="password"
        type="password"
        placeholder="Passwort"
        value={form.password}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Registrieren
      </button>
      <p className="text-sm text-center text-gray-700">
        Bereist registriert?{" "}
        <Link to="/dashboard" className="text-blue-600 hover:underline">
          Jetzt einlogen
        </Link>
      </p>

      {message && <p className="text-sm text-center">{message}</p>}
    </form>
  );
}

export default RegisterForm;
