import express from "express";
import { db } from "../config/db.js";
import { verifyToken } from "../middleware/auth.js";
import { adminOnly } from "../middleware/adminOnly.js";


const router = express.Router();



// ADMIN ROUTES

/* ------------------------------
   CREATE challenge (admin only)
--------------------------------*/
router.post("/", verifyToken, adminOnly, (req, res) => {
  const { title, description, difficulty, flag } = req.body;

  db.query(
    `INSERT INTO challenges (title, description, difficulty, flag)
     VALUES (?, ?, ?, ?)`,
    [title, description, difficulty, flag],
    (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Database error" });
      }
      return res.json({ message: "Challenge created" });
    }
  );
});

/* ------------------------------
   DELETE challenge (admin only)
--------------------------------*/
router.delete("/:id", verifyToken, adminOnly, (req, res) => {
  db.query("DELETE FROM challenges WHERE id = ?", [req.params.id], (err) => {
    if (err) {
        console.log(err);
        return res.status(500).json({ message: "Error deleting" });
    }
    res.json({ message: "Challenge deleted" });
  });
});

/* ------------------------------
   UPDATE challenge (admin only)
--------------------------------*/
router.put("/:id", verifyToken, adminOnly, (req, res) => {
  const { id } = req.params;
  const { title, description, difficulty, flag } = req.body;

  db.query(
    `UPDATE challenges 
     SET title = ?, description = ?, difficulty = ?, flag = ?
     WHERE id = ?`,
    [title, description, difficulty, flag, id],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Database error" });
      }

      if (result.affectedRows === 0)
        return res.status(404).json({ message: "Challenge not found" });

      return res.json({ message: "Challenge updated successfully" });
    }
  );
});

// Get ALL user submissions
router.get("/submissions", verifyToken, adminOnly, (req, res) => {
  // console.log("submissions");
  // try {
    // const { rows } = await db.query(`
    db.query(`
      SELECT 
        submissions.id,
        users.first_name,
        users.last_name,
        challenges.title AS challenge_title,
        submissions.submitted_flag,
        submissions.is_correct,
        submissions.submitted_at
      FROM submissions
      JOIN users ON submissions.user_id = users.id
      JOIN challenges ON submissions.challenge_id = challenges.id
      ORDER BY submissions.submitted_at DESC
    `,
    (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Error deleting" });
    }
    // console.log(result)
    // console.log("result")
    res.json(result);
  });
    // console.log("done")
    // console.log(rows)

    // res.json(rows);
  // } catch (err) {
    // console.error(err);
    // res.status(500).json({ error: "Failed to fetch submissions" });
  
});

// Get submissions for a specific challenge
router.get("/submission/:challengeId", adminOnly, async (req, res) => {
  const { challengeId } = req.params;

  try {
    const { rows } = await pool.query(`
      SELECT 
        submissions.id,
        users.username,
        challenges.title AS challenge_title,
        submissions.submitted_flag,
        submissions.is_correct,
        submissions.created_at
      FROM submissions
      JOIN users ON submissions.user_id = users.id
      JOIN challenges ON submissions.challenge_id = challenges.id
      WHERE submissions.challenge_id = $1
      ORDER BY submissions.created_at DESC
    `, [challengeId]);

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch submissions" });
  }
});



// USER ROUTES

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

// USER Completed Challenges
router.get("/solved", verifyToken, (req, res) => {
  const userId = req.user.id;

  const sql = `
    SELECT challenge_id
    FROM submissions
    WHERE user_id = ?
      AND is_correct = 1
  `;

  db.query(sql, [userId], (err, rows) => {
    if (err) return res.status(500).json({ message: "Database error" });
    
    const solvedIds = rows.map(r => r.challenge_id);
    res.json(solvedIds);
  });
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
        return res.status(404).json({ message: "The Challenge not found" });

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