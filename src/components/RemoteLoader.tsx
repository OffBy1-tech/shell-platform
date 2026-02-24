import React, { Suspense, lazy, ComponentType } from "react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface RemoteLoaderProps {
  /**
   * The dynamic import of the remote module.
   * Usage:
   *   <RemoteLoader
   *     loader={() => import("remoteApp/HomePage")}
   *     fallback={<div>Loading...</div>}
   *   />
   */
  loader: () => Promise<{ default: ComponentType<RemoteComponentProps> }>;
  fallback?: React.ReactNode;
  componentProps?: RemoteComponentProps;
}

/**
 * Props the shell passes down to every remote component.
 * Extend this interface as your platform's contract evolves.
 */
export interface RemoteComponentProps {
  /** The JWT (or other) token so remotes can call authenticated APIs. */
  authToken?: string | null;
  /** Base path this remote is mounted on — useful for nested React Router routes. */
  basePath?: string;
  /** Arbitrary additional props — prefer explicit keys over using this. */
  [key: string]: unknown;
}

// ---------------------------------------------------------------------------
// Error boundary
// ---------------------------------------------------------------------------

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class RemoteErrorBoundary extends React.Component<
  { children: React.ReactNode; remoteName?: string },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode; remoteName?: string }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error(
      `[RemoteLoader] Failed to load remote "${this.props.remoteName ?? "unknown"}":`,
      error,
      info
    );
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "1rem", color: "red" }}>
          <strong>Failed to load remote module.</strong>
          <pre style={{ fontSize: "0.75rem" }}>{this.state.error?.message}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

// ---------------------------------------------------------------------------
// RemoteLoader
// ---------------------------------------------------------------------------

/**
 * RemoteLoader wraps a lazily-imported federated component with Suspense and
 * an error boundary so failures are isolated and don't crash the shell.
 *
 * @example
 * // In your route definitions:
 * <RemoteLoader
 *   loader={() => import("remoteApp/HomePage")}
 *   componentProps={{ authToken: token, basePath: "/app" }}
 * />
 */
export function RemoteLoader({
  loader,
  fallback = <div>Loading remote…</div>,
  componentProps = {},
}: RemoteLoaderProps) {
  // `lazy` caches the promise — calling loader() multiple times is safe.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const Remote = React.useMemo(() => lazy(loader), [loader]);

  return (
    <RemoteErrorBoundary>
      <Suspense fallback={fallback}>
        <Remote {...componentProps} />
      </Suspense>
    </RemoteErrorBoundary>
  );
}
