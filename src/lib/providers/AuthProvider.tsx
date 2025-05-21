"use client";

import {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { notifications } from "@/lib/services/notifications";

interface User {
  id: number;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(document.cookie.includes("auth-token="));
  }, []);

  const login = (token: string, user: User) => {
    document.cookie = `auth-token=${token}; path=/`;
    setIsAuthenticated(true);
    notifications.success("Login successful!");
    router.push("/dashboard");
  };

  const logout = () => {
    document.cookie = "auth-token=; max-age=0; path=/";
    setIsAuthenticated(false);
    router.push("/login");
  };

  const value = {
    user: null,
    isAuthenticated,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
