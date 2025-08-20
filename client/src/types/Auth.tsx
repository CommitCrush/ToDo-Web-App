import { createContext } from "react";

 export type AuthContextType = {
  isLoggedIn: boolean;
  loading: boolean;
  setIsLoggedIn: (val: boolean) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default AuthContext;