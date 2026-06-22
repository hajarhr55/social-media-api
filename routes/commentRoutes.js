const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const db = require("../db");

// Create Comment
router.post("/comments", authMiddleware, async (req, res) => {
  const { body, post_id } = req.body;

  try {
    if (!body || body.trim() === "") {
      return res.status(400).json({
        message: "Comment body is required",
        type: "danger",
      });
    }

    if (!post_id) {
      return res.status(400).json({
        message: "Post id is required",
        type: "danger",
      });
    }

    const post = await db.query("SELECT * FROM posts WHERE id = $1", [post_id]);

    if (post.rows.length === 0) {
      return res.status(404).json({
        message: "Post not found",
        type: "danger",
      });
    }

    const result = await db.query(
      `
      INSERT INTO comments (body, user_id, post_id)
      VALUES ($1, $2, $3)
      RETURNING *
      `,
      [body, req.user.id, post_id],
    );

    res.status(201).json({
      message: "Comment added successfully ✅",
      type: "success",
      comment: result.rows[0],
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server error",
      type: "danger",
    });
  }
});

// Get Post Comments
router.get("/comments", async (req, res) => {
  const { post_id } = req.query;

  if (!post_id) {
    return res.status(400).json({
      message: "Post id is required",
      type: "danger",
    });
  }

  try {
    const result = await db.query(
      `
      SELECT
        comments.id,
        comments.body,
        comments.created_at,

        users.id AS author_id,
        users.username,
        users.name,
        users.image AS profile_image

      FROM comments

      JOIN users
      ON comments.user_id = users.id

      WHERE comments.post_id = $1

      ORDER BY comments.created_at DESC
      `,
      [post_id],
    );

    const comments = result.rows.map((comment) => {
      return {
        id: comment.id,
        body: comment.body,
        created_at: comment.created_at,

        author: {
          id: comment.author_id,
          username: comment.username,
          name: comment.name,
          profile_image: comment.profile_image,
        },
      };
    });

    res.json({
      comments: comments,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server error",
      type: "danger",
    });
  }
});
module.exports = router;
