import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();       // Clears auth context
    navigate("/login");
  };

  return (
    <nav style={{ padding: "10px", background: "#f3f3f3", marginBottom: "20px" }}>
      <Link to="/" style={{ marginRight: "15px" }}>Home</Link>

      {!user && (
        <>
          <Link to="/login" style={{ marginRight: "15px" }}>Login</Link>
          <Link to="/register" style={{ marginRight: "15px" }}>Register</Link>
        </>
      )}

      {user && (
        <>
          <Link to="/challenges" style={{ marginRight: "15px" }}>Challenges</Link>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </nav>
  );
}

export default Navbar;
