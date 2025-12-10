import express from "express";
import { db } from "../config/db.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* ------------------------------
   GET all challenges (public)
--------------------------------*/
router.get("/", (req, res) => {
  db.query(
    "SELECT id, title, description, difficulty FROM challenges",
    (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Database error" });
      }
      return res.json(results);
    }
  );
});

/* ------------------------------
   GET single challenge (public)
--------------------------------*/
router.get("/:id", (req, res) => {
  const challengeId = req.params.id;

  db.query(
    "SELECT id, title, description, difficulty FROM challenges WHERE id = ?",
    [challengeId],
    (err, results) => {
      if (err) return res.status(500).json({ message: "Database error" });

      if (results.length === 0)
        return res.status(404).json({ message: "Challenge not found" });

      return res.json(results[0]);
    }
  );
});

/* ------------------------------
   SUBMIT FLAG (login required)
--------------------------------*/
router.post("/:id/submit", verifyToken, (req, res) => {
  const challengeId = req.params.id;
  const { flag } = req.body;
  const userId = req.user.id;

  // 1. Get correct flag
  db.query("SELECT flag FROM challenges WHERE id = ?", [challengeId], (err, rows) => {
    if (err) return res.status(500).json({ message: "Database error" });
    if (rows.length === 0)
      return res.status(404).json({ message: "Challenge not found" });

    const correctFlag = rows[0].flag;
    // console.log("correctFlag ", correctFlag);
    const isCorrect = correctFlag === flag;

    // 2. Check if submission already exists for this user & challenge
    db.query(
      "SELECT id FROM submissions WHERE user_id = ? AND challenge_id = ?",
      [userId, challengeId],
      (err2, existing) => {
        if (err2) return res.status(500).json({ message: "Database error" });

        // 3. If exists → UPDATE
        if (existing.length > 0) {
          db.query(
            `UPDATE submissions 
             SET submitted_flag = ?, is_correct = ?, submitted_at = NOW()
             WHERE user_id = ? AND challenge_id = ?`,
            [flag, isCorrect, userId, challengeId],
            (err3) => {
              if (err3) return res.status(500).json({ message: "Error updating submission" });

              return res.json({
                correct: isCorrect,
                message: isCorrect ? "Correct flag!" : "Incorrect flag",
                updated: true,
              });
            }
          );

        } else {
          // 4. If not exists → INSERT
          db.query(
            `INSERT INTO submissions 
             (user_id, challenge_id, submitted_flag, is_correct, submitted_at)
             VALUES (?, ?, ?, ?, NOW())`,
            [userId, challengeId, flag, isCorrect],
            (err4) => {
              if (err4) return res.status(500).json({ message: "Error saving submission" });

              return res.json({
                correct: isCorrect,
                message: isCorrect ? "Correct flag!" : "Incorrect flag",
                created: true,
              });
            }
          );
        }
      }
    );
  });
});

export default router;
