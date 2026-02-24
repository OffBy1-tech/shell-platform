import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <div style={{ textAlign: "center", paddingTop: "4rem" }}>
      <h1 style={{ fontSize: "3rem", margin: 0 }}>404</h1>
      <p style={{ color: "#666" }}>Page not found.</p>
      <Link to="/" style={{ color: "#4f46e5" }}>
        Return home
      </Link>
    </div>
  );
}
