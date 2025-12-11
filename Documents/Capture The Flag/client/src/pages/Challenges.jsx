import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import "../css/Challenges.css";

function Challenges() {
  const [challenges, setChallenges] = useState([]);
  const [solved, setSolved] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      const resChallenges = await api.get("/challenges");
      setChallenges(resChallenges.data);

      if (user) {
        try {
          const resSolved = await api.get("/challenges/solved", {
            withCredentials: true,
          });
          setSolved(resSolved.data);
        } catch {
          console.log("Cannot load solved challenges");
        }
      }
    };

    load();
  }, [user]);

  const openChallenge = (id) => {
    if (!user) return alert("Log in to access this challenge.");
    navigate(`/challenge/${id}`);
  };

  return (
    <div className="challenges-container">
      <h1 className="page-title">Challenges</h1>

      <div className="challenges-grid">
        {challenges.map((c) => (
          <div
            key={c.id}
            className={`challenge-card ${
              user && solved.includes(c.id) ? "solved" : ""
            }`}
          >
            <h3 className="challenge-title">
              {c.title}{" "}
              {user && solved.includes(c.id) && (
                <span className="solved-tag">✔ Solved</span>
              )}
            </h3>

            <p className="challenge-desc">{c.description}</p>

            <p className={`difficulty ${c.difficulty}`}>
              Difficulty: {c.difficulty}
            </p>

            <button
              className="view-btn"
              onClick={() => openChallenge(c.id)}
            >
              View Challenge
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Challenges;
