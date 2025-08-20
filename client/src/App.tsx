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
import TodoList from "./pages/Todo";
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
      <Header />
      
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Navigate to="/home" />
            ) : (
              <main className="min-h-screen bg-gray-200 flex items-center justify-center px-4">
                <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-6">
                  <Login onLogin={() => setIsLoggedIn(true)} />
                </div>
              </main>
            )
          }
        />
        <Route 
          path="/register" 
          element={
            <main className="min-h-screen bg-gray-200 flex items-center justify-center px-4">
              <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-6">
                <Register />
              </div>
            </main>
          } 
        />
        <Route
          path="/home"
          element={
            isLoggedIn ? (
              <main className="min-h-screen bg-gray-100">
                <Home onLogout={() => setIsLoggedIn(false)} />
              </main>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/todos"
          element={
            isLoggedIn ? (
              <main className="min-h-screen bg-gray-100">
                <TodoList />
              </main>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route 
          path="/verify" 
          element={
            <main className="min-h-screen bg-gray-200 flex items-center justify-center px-4">
              <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-6">
                <VerifyEmail />
              </div>
            </main>
          } 
        />
      </Routes>
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