"use client";

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react";

export interface User {
  name: string;
  campusName: string;
  loggedInAt: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (name: string, campusName: string) => void;
  updateProfile: (name: string, campusName: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = "flunked_user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Sync state from localStorage safely on client mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed?.name || parsed?.campusName) {
          setUser({
            name: parsed.name || "Student",
            campusName: parsed.campusName || "Campus Student",
            loggedInAt: parsed.loggedInAt || new Date().toISOString(),
          });
        }
      }
    } catch (err) {
      console.error("Failed to load user session from localStorage:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback((name: string, campusName: string) => {
    const trimmedName = name.trim() || "Student";
    const trimmedCampus = campusName.trim() || "College Campus";

    const sessionUser: User = {
      name: trimmedName,
      campusName: trimmedCampus,
      loggedInAt: new Date().toISOString(),
    };

    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(sessionUser));
    } catch (err) {
      console.error("Failed to save user profile:", err);
    }
    setUser(sessionUser);
  }, []);

  const updateProfile = useCallback(
    (name: string, campusName: string) => {
      login(name, campusName);
    },
    [login]
  );

  const logout = useCallback(() => {
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch (err) {
      console.error("Failed to remove session:", err);
    }
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        updateProfile,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
