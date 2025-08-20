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
import Header from "./components/Header";
import AuthProvider from "./context/AuthContext";
import { useAuth } from "./hook/UseAuth";


function AppRoutes() {
  const { isLoggedIn, loading, setIsLoggedIn } = useAuth();

  if (loading) {
    return <p className="text-center text-xl p-6">Lade .....</p>;
  }

  return (
    <>
      {/* Header ist jetzt außerhalb der Routes und immer sichtbar */}
      <Header />
      
      {/* Main Content Area */}
      <main className="min-h-screen bg-gray-200 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-6">
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
        </div>
      </main>
    </>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <AuthProvider>
        <Router>
          <AppRoutes />
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;