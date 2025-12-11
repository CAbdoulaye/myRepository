import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import "../css/AdminPanel.css";

function AdminPanel() {
  const [challenges, setChallenges] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    difficulty: "easy",
    flag: "",
  });

  const navigate = useNavigate();

  const loadChallenges = async () => {
    const res = await api.get("/challenges");
    setChallenges(res.data);
  };

  useEffect(() => {
    loadChallenges();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const createChallenge = async () => {
    try {
      await api.post("/challenges", form);
      alert("Challenge added!");
      loadChallenges();
      navigate(`/challenges`);
    } catch {
      alert("Error creating challenge");
    }
  };

  const deleteChallenge = async (id) => {
    if (!window.confirm("Delete challenge?")) return;

    try {
      await api.delete(`/challenges/${id}`);
      loadChallenges();
    } catch {
      alert("Error deleting");
    }
  };

  const editChallenge = async (id) => {
    navigate(`/admin/edit/${id}`);
  };

  return (
    <div className="admin-container">
      <h1 className="admin-title">Admin Panel</h1>

      {/* Create Challenge Form */}
      <div className="admin-card">
        <h2>Create Challenge</h2>

        <input
          name="title"
          placeholder="Title"
          onChange={handleChange}
          className="admin-input"
        />

        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          className="admin-input"
        />

        <select
          name="difficulty"
          onChange={handleChange}
          className="admin-input"
        >
          <option value="easy">easy</option>
          <option value="medium">medium</option>
          <option value="hard">hard</option>
        </select>

        <input
          name="flag"
          placeholder="FLAG{example}"
          onChange={handleChange}
          className="admin-input"
        />

        <button className="admin-button create" onClick={createChallenge}>
          Create Challenge
        </button>
      </div>

      {/* Challenge List */}
      <h2 className="section-header">Existing Challenges</h2>

      <div className="challenge-list">
        {challenges.map((c) => (
          <div key={c.id} className="challenge-card">
            <h3>{c.title}</h3>
            <p className="difficulty-tag">{c.difficulty}</p>

            <div className="button-row">
              <button className="admin-button edit" onClick={() => editChallenge(c.id)}>
                Edit
              </button>
              <button className="admin-button delete" onClick={() => deleteChallenge(c.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminPanel;
