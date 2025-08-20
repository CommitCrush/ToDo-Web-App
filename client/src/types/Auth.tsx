import { createContext } from "react";

export type User = {
  _id: string;
  username: string;
  email: string;
};

export type AuthContextType = {
  isLoggedIn: boolean;
  loading: boolean;
  user: User | null;
  setIsLoggedIn: (val: boolean) => void;
  setUser: (user: User | null) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default AuthContext;