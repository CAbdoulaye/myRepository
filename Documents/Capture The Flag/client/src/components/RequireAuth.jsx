import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export function RequireAuth({ children }) {
  const { user } = useAuth();

  if (!user) {
    alert("Log in to see page");
    return <Navigate to="/login" replace />;
  }

  return children;
}
