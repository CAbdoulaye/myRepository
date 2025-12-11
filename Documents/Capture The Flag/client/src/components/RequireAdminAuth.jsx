import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export function RequireAdminAuth({ children }) {
  const { user } = useAuth();
  // console.log("user")
  // console.log(user)

  if (!user) {
    alert("Admin Restricted Page");
    return <Navigate to="/login" replace />;
  }
  else if (user.role!= "admin") {
    alert("Admin Restricted Page");
    return <Navigate to="/" replace />;
  }
  return children;
}