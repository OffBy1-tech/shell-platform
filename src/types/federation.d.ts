/**
 * federation.d.ts
 *
 * TypeScript module declarations for federated remote imports.
 *
 * When you add a new remote to vite.config.ts, add a corresponding
 * declaration block here so TypeScript knows the shape of the module.
 *
 * Pattern:
 *   declare module "<remoteName>/<ExposedComponent>" {
 *     const Component: React.ComponentType<YourProps>;
 *     export default Component;
 *   }
 *
 * Example (after registering "remoteApp" in vite.config.ts):
 *
 *   declare module "remoteApp/App" {
 *     import { RemoteComponentProps } from "./components/RemoteLoader";
 *     const App: React.ComponentType<RemoteComponentProps>;
 *     export default App;
 *   }
 */
