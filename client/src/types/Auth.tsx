import { createContext } from "react";

export type AuthContextType = {
  isLoggedIn: boolean;
  loading: boolean;
  setIsLoggedIn: (val: boolean) => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);