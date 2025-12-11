import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(""); // clear error on change
  };

  const validatePassword = (password) => {
    // At least 8 chars, one uppercase, one lowercase, one number, one special char
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePassword(form.password)) {
      setError(
        "Password must be at least 8 characters, include uppercase, lowercase, number, and special character."
      );
      return;
    }

    try {
      // const salt = bcrypt.genSaltSync(10);
      // const hashedPassword = bcrypt.hashSync(form.password, salt);

      await api.post("/auth/register", {
        ...form,
        password: form.password,
      });

      alert("Registered!");
      navigate("/login"); // redirect after success
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="first_name" placeholder="First Name" onChange={handleChange} />
      <input name="last_name" placeholder="Last Name" onChange={handleChange} />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} />
      {error && <p style={{ color: "red", marginTop: "5px" }}>{error}</p>}
      <button className="btn-primary" type="submit">Register</button>
    </form>
  );
}

export default Register;
