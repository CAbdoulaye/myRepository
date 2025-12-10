import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
// import challengeRoutes from "./routes/challengeRoutes.js";


const app = express();

app.use(express.json());
app.use(cookieParser());


// frontend allowed origin
// app.use(
//   cors({
//     origin: "http://localhost:3000", // your React dev server
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );

app.use(cors()); 


app.get("/", (req, res) => {
  res.send("Backend is working!");
});

app.use("/api/auth", authRoutes);
// app.use("/api/challenges", challengeRoutes);

export default app;
