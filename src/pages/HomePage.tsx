import { useAuth } from "../context/AuthContext";

// Demo login — replace with your real auth flow
const DEMO_USER = {
  id: "demo-1",
  name: "Demo User",
  email: "demo@example.com",
  roles: ["admin"],
};

export function HomePage() {
  const { isAuthenticated, login, user } = useAuth();

  return (
    <div style={{ maxWidth: 720 }}>
      <h1 style={{ marginTop: 0 }}>Shell Platform</h1>

      {isAuthenticated ? (
        <p>
          Welcome back, <strong>{user?.name}</strong>. Navigate to a registered
          remote app using the links in the nav bar.
        </p>
      ) : (
        <>
          <p>
            This is the host shell. Federated micro-frontends will appear here
            once you register them in <code>vite.config.ts</code> and add their
            routes in <code>src/routes/routes.tsx</code>.
          </p>
          <button
            style={{
              background: "#4f46e5",
              color: "#fff",
              border: "none",
              padding: "0.5rem 1.25rem",
              borderRadius: 6,
              cursor: "pointer",
              fontSize: "0.95rem",
            }}
            onClick={() => login(DEMO_USER, "demo-token-123")}
          >
            Demo Log In
          </button>
        </>
      )}

      <hr style={{ margin: "2rem 0", borderColor: "#e2e8f0" }} />

      <h2>Registering a Remote App</h2>

      <ol style={{ lineHeight: 1.8 }}>
        <li>
          Build your remote app with <code>@originjs/vite-plugin-federation</code>{" "}
          (see <code>docs/REMOTE_SETUP.md</code>).
        </li>
        <li>
          Add the remote to the <code>remotes</code> object in{" "}
          <code>vite.config.ts</code>:
          <pre
            style={{
              background: "#f8f8f8",
              padding: "0.75rem 1rem",
              borderRadius: 6,
              fontSize: "0.82rem",
              overflowX: "auto",
            }}
          >
            {`remotes: {\n  remoteApp: "http://localhost:5001/assets/remoteEntry.js",\n}`}
          </pre>
        </li>
        <li>
          Add a route in <code>src/routes/routes.tsx</code> using the{" "}
          <code>{"<RemoteLoader>"}</code> component.
        </li>
        <li>
          Add a <code>{"<NavLink>"}</code> for the remote in{" "}
          <code>src/components/Shell.tsx</code>.
        </li>
      </ol>
    </div>
  );
}
