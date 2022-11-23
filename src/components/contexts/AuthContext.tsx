import { authService } from "@/services/auth";
import { createContext, useState } from "react";

type AuthContextData = {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<any>;
  logout: () => void;
  me: () => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
};

const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  async function login(username: string, password: string) {
    const result = await authService.login(username, password);
    setIsAuthenticated(true);
    return result
  }

  async function logout() {
    authService.deleteToken();
    setIsAuthenticated(false);
    window.location.reload();
  }

  function me() {
    isAuthenticated ? authService.me() : null;
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, login, logout, me }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
