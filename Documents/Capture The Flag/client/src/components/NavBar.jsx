import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const linkStyle = {
    marginRight: "20px",
    textDecoration: "none",
    color: "#b1a9a9ff",
    fontWeight: "500",
    transition: "color 0.3s",
  };

  const linkHover = {
    color: "#0077ff",
  };

  return (
    <nav
      style={{
        padding: "12px 24px",
        backgroundColor: "#1a1a1a",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        color: "#eee",
        marginBottom: "30px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        boxShadow: "0 2px 8px rgb(0 0 0 / 0.3)",
        borderRadius: "6px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <Link
          to="/"
          style={{ ...linkStyle, fontWeight: "700", fontSize: "1.2rem", color: "#61dafb" }}
          onMouseOver={e => (e.target.style.color = "#21a1f1")}
          onMouseOut={e => (e.target.style.color = "#61dafb")}
        >
          CTF Platform
        </Link>
      </div>

      <div style={{ display: "flex", alignItems: "center" }}>
        {!user && (
          <>
            <Link
              to="/login"
              style={linkStyle}
              onMouseOver={e => (e.target.style.color = linkHover.color)}
              onMouseOut={e => (e.target.style.color = linkStyle.color)}
            >
              Login
            </Link>
            <Link
              to="/register"
              style={linkStyle}
              onMouseOver={e => (e.target.style.color = linkHover.color)}
              onMouseOut={e => (e.target.style.color = linkStyle.color)}
            >
              Register
            </Link>
            <Link
              to="/challenges"
              style={linkStyle}
              onMouseOver={e => (e.target.style.color = linkHover.color)}
              onMouseOut={e => (e.target.style.color = linkStyle.color)}
            >
              Challenges
            </Link>
          </>
        )}

        {user && (
          <>
            <Link
              to="/challenges"
              style={linkStyle}
              onMouseOver={e => (e.target.style.color = linkHover.color)}
              onMouseOut={e => (e.target.style.color = linkStyle.color)}
            >
              Challenges
            </Link>

            {user.role === "admin" && (
              <>
                <Link
                  to="/admin"
                  style={{ ...linkStyle, fontWeight: "700", color: "#e63946" }}
                  onMouseOver={e => (e.target.style.color = "#b02a37")}
                  onMouseOut={e => (e.target.style.color = "#e63946")}
                >
                  Admin
                </Link>
                <Link
                  to="/submissions"
                  style={{ ...linkStyle, fontWeight: "700", color: "#f4a261" }}
                  onMouseOver={e => (e.target.style.color = "#c77c28")}
                  onMouseOut={e => (e.target.style.color = "#f4a261")}
                >
                  Submissions
                </Link>
              </>
            )}

            <button
              onClick={handleLogout}
              style={{
                cursor: "pointer",
                backgroundColor: "#457b9d",
                color: "#fff",
                border: "none",
                padding: "8px 16px",
                borderRadius: "4px",
                fontWeight: "600",
                transition: "background-color 0.3s",
              }}
              onMouseOver={e => (e.target.style.backgroundColor = "#1d3557")}
              onMouseOut={e => (e.target.style.backgroundColor = "#457b9d")}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
