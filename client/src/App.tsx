import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import VerifyEmail from "./pages/VerifyEmail";
import { AuthProvider, useAuth } from "./context/AuthContext";

function AppRoutes() {
  const { isLoggedIn, loading, setIsLoggedIn } = useAuth();

  if (loading) {
    return <p className="text-center text-xl p-6">Lade .....</p>;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          isLoggedIn ? (
            <Navigate to="/home" />
          ) : (
            <Login onLogin={() => setIsLoggedIn(true)} />
          )
        }
      />
      <Route path="/register" element={<Register />} />
      <Route
        path="/home"
        element={
          isLoggedIn ? (
            <Home onLogout={() => setIsLoggedIn(false)} />
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route path="/verify" element={<VerifyEmail />} />
    </Routes>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-6">
        <AuthProvider>
          <Router>
            <AppRoutes />
          </Router>
        </AuthProvider>
      </div>
    </div>
  );
}

export default App;