import { useRoutes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Shell } from "./components/Shell";
import { routes } from "./routes/routes";

export default function App() {
  const element = useRoutes(routes);

  return (
    <AuthProvider>
      <Shell>{element}</Shell>
    </AuthProvider>
  );
}
