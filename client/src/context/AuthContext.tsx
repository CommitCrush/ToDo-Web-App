import { useState, useEffect, type ReactNode } from "react";
import AuthContext, { type User } from "../types/Auth";

function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/auth/profile`,
          { credentials: "include" }
        );
        
        if (res.ok) {
          const userData = await res.json();
          setUser(userData);
          setIsLoggedIn(true);
        } else {
          setUser(null);
          setIsLoggedIn(false);
        }
      } catch {
        setUser(null);
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };
    checkLoginStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, loading, user, setIsLoggedIn, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider