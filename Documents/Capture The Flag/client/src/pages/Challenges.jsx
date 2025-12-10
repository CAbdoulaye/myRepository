import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Challenges() {
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    const load = async () => {
      const res = await api.get("/challenges");
      setChallenges(res.data);
    };
    load();
  }, []);

  const openChallenge = async (challendId) => {
    navigate(`/challenge/${challendId}`);
  }

  const navigate = useNavigate();

  return (
    <div>
      <h1>Challenges</h1>

      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {challenges.map((c) => (
          <div key={c.id} style={{ border: "1px solid #ccc", padding: "15px" }}>
            <h3>{c.title}</h3>
            <p>{c.description}</p>
            <p><strong>Difficulty:</strong> {c.difficulty}</p>
            <button onClick={() => openChallenge(c.id)}>View</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Challenges;
