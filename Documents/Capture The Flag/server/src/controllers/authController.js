import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "../config/db.js";
import dotenv from "dotenv";
dotenv.config();
// import bcrypt from "bcrypt";

 
// create account
export const register = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  if (!first_name || !last_name || !email || !password)
    return res.status(400).json({ message: "All fields required" });

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) return res.status(500).json({ message: "Server error" });

      if (results.length > 0)
        return res.status(400).json({ message: "Email already exists" });

      // hash password here (backend only)
      const hashedPassword = await bcrypt.hash(password, 10);

      const createdAt = new Date();

      db.query(
        `INSERT INTO users (first_name, last_name, email, password, role, created_at)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [first_name, last_name, email, hashedPassword, "user", createdAt],
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
  const { email, password } = req.body; // raw password

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) return res.status(500).json({ message: "Server error" });
      if (results.length === 0)
        return res.status(400).json({ message: "Invalid credentials" });

      const user = results[0];

      // compare raw to hashed
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
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
        path: "/",
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
  // console.log(req.user)
  return res.json({ user: req.user }); // req.user = decoded JWT
};
