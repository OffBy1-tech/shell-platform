/**
 * bootstrap.tsx
 *
 * This file exists as an async boundary required by @originjs/vite-plugin-federation.
 * Federated modules are loaded asynchronously, so the real app entry (main.tsx)
 * must be imported dynamically to give the federation runtime time to initialise.
 *
 * DO NOT put application logic here — keep it as a thin async wrapper.
 */
import("./main");
