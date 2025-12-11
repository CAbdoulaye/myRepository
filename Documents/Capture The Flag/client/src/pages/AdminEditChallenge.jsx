import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

function AdminEditChallenge() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    difficulty: "",
    flag: "",       // Admin will replace if needed
  });

  useEffect(() => {
  api.get(`/challenges/${id}`)
    .then(res => {
      // res.data = { id, title, description, difficulty }
      setForm(prev => ({
        ...prev,
        title: res.data.title,
        description: res.data.description,
        difficulty: res.data.difficulty,
        // flag stays empty intentionally
      }));
    })
    .catch(() => alert("Error loading challenge"));
  }, [id]);


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
      await api.put(`/challenges/${id}`, form);
      alert("Challenge updated!");
      navigate("/admin");
    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
    }
  };

  // console.log(form);

  return (
    <div>
      <h2>Edit Challenge</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="title"
          value={form.title}
          placeholder="Title"
          onChange={handleChange}
        />

        <textarea
          name="description"
          value={form.description}
          placeholder="Description"
          onChange={handleChange}
        />

        <input
          name="difficulty"
          value={form.difficulty}
          placeholder="Difficulty"
          onChange={handleChange}
        />

        <input
          name="flag"
          value={form.flag}
          placeholder="New Flag (optional)"
          onChange={handleChange}
        />

        <button type="submit">Update Challenge</button>
      </form>
    </div>
  );
}
export default AdminEditChallenge;
