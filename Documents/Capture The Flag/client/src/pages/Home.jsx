import { useAuth } from "../context/AuthContext";
import "../css/Home.css";

function Home() {
  const { user } = useAuth();

  return (
    <div className="home-container">

      {/* Background Grid */}
      <div className="cyber-grid"></div>

      <div className="home-hero">
        {/* <div className="hero"> */}
        <img
          // src="src/images/image1.jpg"   // <-- replace with your image
          // src="src/images/image2.jpg"   // <-- replace with your image
          // src="src/images/image3.jpeg"   // <-- replace with your image
          src="src/images/image4.webp"   // <-- replace with your image
          // src="src/images/image6.webp"   // <-- replace with your image
          // src="src/images/image5.png"   // <-- replace with your image
          alt="Cybersecurity"
          className="hero-image"
        />

        <h1 className="home-title">🕵️ Capture The Flag Platform</h1>

        <p className="home-subtitle">
          Test your hacking skills. Solve puzzles. Break systems (legally).  
        </p>

        {user ? (
          <p className="welcome-msg">
            Welcome back, <b>{user.first_name} {user.last_name}</b> 👋  
          </p>
        ) : (
          <p className="welcome-msg">Log in to start solving challenges!</p>
        )}

        <div className="home-buttons">
          <a href="/challenges" className="btn-primary">Start Challenges</a>
          {!user && <a href="/register" className="btn-secondary">Create Account</a>}
        </div>
      </div>

      {/* Optional Feature Boxes */}
      <div className="features">
        <div className="feature-card">
          <h3>🔐 Real CTF Challenges</h3>
          <p>Crack codes, decrypt ciphers, solve puzzles, and find hidden flags.</p>
        </div>

        <div className="feature-card">
          <h3>🧠 Learn as You Play</h3>
          <p>Improve your cybersecurity skills with hands-on challenges.</p>
        </div>

        <div className="feature-card">
          <h3>🏆 Leaderboard</h3>
          <p>Compete with others and see how you rank.</p>
        </div>
      </div>

    </div>
  );
}

export default Home;
