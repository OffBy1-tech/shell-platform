import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "shell",
      // ---------------------------------------------------------------------------
      // Remote apps: add entries here as you build out federated micro-frontends.
      // Each key is the alias you'll use in imports (e.g. "remoteApp/Button").
      // The URL should point to the remote's built `remoteEntry.js`.
      //
      // Example:
      //   remotes: {
      //     remoteApp: "http://localhost:5001/assets/remoteEntry.js",
      //     adminApp:  "https://admin.example.com/assets/remoteEntry.js",
      //   },
      // ---------------------------------------------------------------------------
      remotes: {
        remoteApp: "http://localhost:5001/dist/assets/remoteEntry.js"
      },

      // Shared singletons — these must match the versions declared in each remote.
      shared: {
        react: { requiredVersion: "^18.0.0" },
        "react-dom": { requiredVersion: "^18.0.0" },
        "react-router-dom": { requiredVersion: "^6.0.0" },
      },
    }),
  ],

  build: {
    // Required for module federation — prevents code splitting issues
    target: "esnext",
    minify: false,
  },

  server: {
    port: 5000,
  },

  preview: {
    port: 5000,
  },
});
