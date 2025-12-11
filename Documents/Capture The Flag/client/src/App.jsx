import { Routes, Route } from "react-router-dom";
import './App.css'; // Import the CSS file
// components
import Navbar from "./components/NavBar";
import { RequireAuth } from "./components/RequireAuth";
import { RequireAdminAuth } from "./components/RequireAdminAuth";

// pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Challenges from "./pages/Challenges";

// Log In Required Page
import ChallengeView from "./pages/ChallengeView";

// Admin Pages
import AdminPanel from "./pages/AdminPanel";
import AdminEditChallenge from "./pages/AdminEditChallenge";
import SubmissionsPage from "./pages/SubmissionsPage";

// User Context
import { useAuth } from "./context/AuthContext";



function App() {
  const { loading } = useAuth();
  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <Routes>
        {/* Public pages */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/challenges" element={<Challenges />} />
        
        {/* Admin pages */}
        <Route path="/admin" element={<RequireAdminAuth><AdminPanel /></RequireAdminAuth>} />
        <Route path="/admin/edit/:id" element={<RequireAdminAuth><AdminEditChallenge /></RequireAdminAuth>} />
        <Route path="/submissions" element={<RequireAdminAuth><SubmissionsPage /></RequireAdminAuth>} />

        {/* Log In Required pages */}
        <Route path="/challenge/:id" element={ <RequireAuth> <ChallengeView /> </RequireAuth> } /> 
      </Routes>
    </>
  );
}

export default App;
