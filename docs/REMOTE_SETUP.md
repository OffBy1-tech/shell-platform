# Remote App Setup Guide

This document explains how to create a micro-frontend app that can be consumed by the Shell Platform.

---

## 1. Create a new Vite + React + TypeScript project

```bash
npm create vite@latest my-remote-app -- --template react-ts
cd my-remote-app
npm install
```

---

## 2. Install the federation plugin

```bash
npm install -D @originjs/vite-plugin-federation
```

---

## 3. Configure `vite.config.ts`

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "remoteApp",          // Must be unique across all remotes
      filename: "remoteEntry.js", // Shell will load this file
      exposes: {
        // Key: the import path the shell uses  (e.g. import("remoteApp/App"))
        // Value: the local file to expose
        "./App": "./src/App.tsx",
      },
      shared: {
        react:            { singleton: true, requiredVersion: "^18.0.0" },
        "react-dom":      { singleton: true, requiredVersion: "^18.0.0" },
        "react-router-dom": { singleton: true, requiredVersion: "^6.0.0" },
      },
    }),
  ],
  build: {
    target: "esnext",
    minify: false,
  },
  server: {
    port: 5001,       // Each remote must use a different port
    cors: true,       // Required so the shell can fetch remoteEntry.js in dev
  },
  preview: {
    port: 5001,
    cors: true,
  },
});
```

---

## 4. Expose a root component

Your exposed component (`./src/App.tsx`) should accept the shell's standard props:

```tsx
interface RemoteAppProps {
  authToken?: string | null;
  basePath?: string;
}

export default function App({ authToken, basePath = "/" }: RemoteAppProps) {
  return (
    <div>
      <h1>My Remote App</h1>
      <p>Auth token: {authToken ?? "none"}</p>
    </div>
  );
}
```

---

## 5. Register in the Shell

**`vite.config.ts` (shell):**
```ts
remotes: {
  remoteApp: "http://localhost:5001/assets/remoteEntry.js",
},
```

**`src/types/federation.d.ts` (shell):**
```ts
declare module "remoteApp/App" {
  import { RemoteComponentProps } from "../components/RemoteLoader";
  const App: React.ComponentType<RemoteComponentProps>;
  export default App;
}
```

**`src/routes/routes.tsx` (shell):**
```tsx
{
  path: "/remote-app/*",
  element: (
    <RemoteLoader
      loader={() => import("remoteApp/App")}
      componentProps={{ basePath: "/remote-app" }}
    />
  ),
},
```

**`src/components/Shell.tsx` — add a nav link:**
```tsx
<NavLink to="/remote-app">Remote App</NavLink>
```

---

## 6. Run both together

Terminal 1 — remote:
```bash
cd my-remote-app && npm run dev
```

Terminal 2 — shell:
```bash
cd shell-platform && npm run dev
```

> **Note:** In dev mode, the remote must be running before you navigate to its route in the shell, as the federation plugin fetches `remoteEntry.js` on demand.

---

## Production

Build the remote first, then serve its `dist/` folder (or deploy to a CDN). Update the remote URL in the shell's `vite.config.ts` to the production URL before building the shell.

```bash
# Remote
cd my-remote-app && npm run build && npm run preview

# Shell (after updating remote URL)
cd shell-platform && npm run build && npm run preview
```
