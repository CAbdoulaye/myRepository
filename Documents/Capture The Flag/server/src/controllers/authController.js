import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "../config/db.js";
import dotenv from "dotenv";
dotenv.config();


// create account
export const register = (req, res) => {
  console.log("test")
  const { first_name, last_name, email, password } = req.body;

  if (!first_name || !last_name || !email || !password)
    return res.status(400).json({ message: "All fields required" });

  // check if email already exists
  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    (err, results) => {
      if (err) return res.status(500).json({ message: "Server error" });

      if (results.length > 0)
        return res.status(400).json({ message: "Email already exists" });

      const createdAt = new Date();

      // frontend already hashed the password
      db.query(
        `INSERT INTO users (first_name, last_name, email, password, role, created_at)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [first_name, last_name, email, password, "user", createdAt],
        (err2) => {
          if (err2) return res.status(500).json({ message: "Database error" });

          return res.status(201).json({ message: "User registered successfully" });
        }
      );
    }
  );
};


// log in
export const login = (req, res) => {
  const { email, password } = req.body; // password = hashed from frontend

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    (err, results) => {
      if (err) return res.status(500).json({ message: "Server error" });
      if (results.length === 0)
        return res.status(400).json({ message: "Invalid credentials" });

      const user = results[0];

      // Direct comparison (frontend hash must match stored hash)
      if (password !== user.password)
        return res.status(400).json({ message: "Invalid credentials" });

      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
      });

      return res.json({
        message: "Login successful",
        user: {
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          role: user.role,
        },
      });
    }
  );
};


// LOG OUT
export const logout = (req, res) => {
  res.clearCookie("token");
  return res.json({ message: "Logged out" });
};


// Get current user
export const me = (req, res) => {
  return res.json({ user: req.user }); // req.user = decoded JWT
};
