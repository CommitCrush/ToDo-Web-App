import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Register from "./components/Register";
import VerifyEmail from "./pages/VerifyEmail";
import Todo from "./pages/Todo";
import Contact from "./pages/Contact";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AuthProvider from "./context/AuthContext";
import { useAuth } from "./hooks/UseAuth";
import About from "./pages/About";

function AppRoutes() {
  const { isLoggedIn, loading, setIsLoggedIn } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-xl text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header onLogout={() => setIsLoggedIn(false)} />
      
      <main className="flex-1">
        <Routes>
          <Route
            path="/"
            element={<Home onLogout={() => setIsLoggedIn(false)} />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/verify" element={<VerifyEmail />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/todos"
            element={
              isLoggedIn ? (
                <Todo />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/about"
            element={
              isLoggedIn ? (
                <About />
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
      </main>
      
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;