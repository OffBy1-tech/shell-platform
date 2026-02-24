import React, { createContext, useContext, useState, useCallback } from "react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface User {
  id: string;
  name: string;
  email: string;
  roles: string[];
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

export interface AuthContextValue extends AuthState {
  login: (user: User, token: string) => void;
  logout: () => void;
}

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

const AuthContext = createContext<AuthContextValue | null>(null);

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>(() => {
    // Rehydrate from sessionStorage on page load (replace with your real auth
    // mechanism — e.g. an OAuth callback, a JWT refresh endpoint, etc.)
    const stored = sessionStorage.getItem("auth");
    if (stored) {
      try {
        return JSON.parse(stored) as AuthState;
      } catch {
        /* ignore malformed data */
      }
    }
    return { user: null, token: null, isAuthenticated: false };
  });

  const login = useCallback((user: User, token: string) => {
    const next: AuthState = { user, token, isAuthenticated: true };
    setAuthState(next);
    sessionStorage.setItem("auth", JSON.stringify(next));
  }, []);

  const logout = useCallback(() => {
    const next: AuthState = { user: null, token: null, isAuthenticated: false };
    setAuthState(next);
    sessionStorage.removeItem("auth");
  }, []);

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

/**
 * useAuth() — consume auth state anywhere in the shell or in remotes that
 * receive it as a prop / shared context.
 */
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an <AuthProvider>");
  }
  return ctx;
}
