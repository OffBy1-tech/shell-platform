import { RouteObject } from "react-router-dom";
import { RemoteLoader } from "../components/RemoteLoader";
import { HomePage } from "../pages/HomePage";
import { NotFoundPage } from "../pages/NotFoundPage";

// ---------------------------------------------------------------------------
// Shell routes
//
// Add remote micro-frontend routes here as you register new remotes in
// vite.config.ts. The `loader` prop is a dynamic import of the federated
// module — TypeScript may warn about unresolved modules until the remote is
// actually registered.
//
// Example (after registering "remoteApp" in vite.config.ts):
//
//   {
//     path: "/app/*",
//     element: (
//       <RemoteLoader
//         loader={() => import("remoteApp/App")}
//         componentProps={{ basePath: "/app" }}
//       />
//     ),
//   },
// ---------------------------------------------------------------------------

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <HomePage />,
  },

  // ---- Remote micro-frontends go here ----
  {
    path: "/remote-app/*",
    element: (
      <RemoteLoader
        //@ts-ignore
        loader={() => import("remoteApp/App")}
        componentProps={{ basePath: "/remote-app" }}
      />
    ),
  },

  {
    path: "*",
    element: <NotFoundPage />,
  },
];
