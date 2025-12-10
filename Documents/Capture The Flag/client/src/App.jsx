import { Routes, Route } from "react-router-dom";

// components
import Navbar from "./components/NavBar";
import { RequireAuth } from "./components/RequireAuth";


// pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Challenges from "./pages/Challenges";
import ChallengeView from "./pages/ChallengeView";


// context


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/challenge/:id" element={<ChallengeView />} />
        {/* Protected Routes */}
        <Route
          path="/challenges"
          element={
            <RequireAuth>
              <Challenges />
            </RequireAuth>
          }
        />
        {/* <Route
          path="/challenge/:id"
          element={
            <RequireAuth>
              <ChallengeView />
            </RequireAuth>
          }
        /> */}
      </Routes>
    </>
  );
}

export default App;
