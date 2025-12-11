import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import "../css/ChallengeView.css";

function ChallengeView() {
  const { id } = useParams();
  const [challenge, setChallenge] = useState(null);
  const [flag, setFlag] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get(`/challenges/${id}`);
        setChallenge(res.data);
      } catch {
        setMessage("Challenge not found");
      }
    };
    load();
  }, [id]);

  const submitFlag = async () => {
    try {
      const res = await api.post(`/challenges/${id}/submit`, { flag });
      setMessage(res.data.message);
      setFlag("");
    } catch (err) {
      setMessage(err.response?.data?.message || "Error submitting flag");
    }
  };

  if (!challenge) return <p className="loading">Loading…</p>;

  return (
    <div className="challenge-view-container">
      <h2 className="challenge-title">{challenge.title}</h2>

      <p className="challenge-description">{challenge.description}</p>

      <p className={`difficulty-badge ${challenge.difficulty}`}>
        Difficulty: {challenge.difficulty}
      </p>

      <div className="submit-box">
        <h3>Submit Flag</h3>

        <input
          className="flag-input"
          placeholder="Enter flag..."
          value={flag}
          onChange={(e) => setFlag(e.target.value)}
        />

        <button className="submit-btn" onClick={submitFlag}>
          Submit
        </button>

        {message && (
          <p
            className={`response-message ${
              message.toLowerCase().includes("correct") ? "success" : "error"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default ChallengeView;
