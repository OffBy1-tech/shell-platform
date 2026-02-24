import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Shell.css";

interface ShellProps {
  children: React.ReactNode;
}

/**
 * Shell — the persistent chrome of the host platform.
 *
 * This renders the top navigation bar and wraps all page content (including
 * remote micro-frontends). Keep this component lightweight; heavy logic
 * belongs in the pages or remotes themselves.
 */
export function Shell({ children }: ShellProps) {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="shell">
      <header className="shell-header">
        <nav className="shell-nav">
          <NavLink to="/" className="shell-brand">
            Shell Platform
          </NavLink>

          <div className="shell-nav-links">
            {/* Add NavLinks for registered remotes here */}
          </div>

          <div className="shell-auth">
            {isAuthenticated ? (
              <>
                <span className="shell-user">{user?.name}</span>
                <button className="shell-btn" onClick={handleLogout}>
                  Log out
                </button>
              </>
            ) : (
              <button className="shell-btn" onClick={() => navigate("/login")}>
                Log in
              </button>
            )}
          </div>
        </nav>
      </header>

      <main className="shell-content">{children}</main>
    </div>
  );
}
