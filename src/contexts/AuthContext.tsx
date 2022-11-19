import { post } from "@/services/api";
import { authService } from "@/services/auth";
import { createContext, useContext, useState } from "react";

type AuthContextData = {
  isAuthenticated: boolean;
  login: (username: string, password: string) => void;
  logout: () => void;
  me: () => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
};

const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  async function login(username: string, password: string) {
    try {
      const { data } = await post("/user/login", { username, password });
      setIsAuthenticated(true);
      authService.setToken(data);
    } catch (error) {
      return error.message
    }
  }

  async function logout() {
    authService.deleteToken();
    setIsAuthenticated(false);
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
