import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

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
    } catch (err) {
      setMessage(err.response?.data?.message || "Error submitting flag");
    }
  };

  if (!challenge) return <p>Loading…</p>;

  return (
    <div>
      <h2>{challenge.title}</h2>
      <p>{challenge.description}</p>
      <p><strong>Difficulty:</strong> {challenge.difficulty}</p>

      <h3>Submit Flag</h3>
      <input
        placeholder="Enter flag"
        value={flag}
        onChange={(e) => setFlag(e.target.value)}
      />
      <button onClick={submitFlag}>Submit</button>

      {message && <p><strong>{message}</strong></p>}
    </div>
  );
}

export default ChallengeView;
