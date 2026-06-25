const express = require("express");
const router = express.Router();
const db = require("../db");

// Get user profile
router.get("/users/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query(
      `
      SELECT
        users.id,
        users.username,
        users.name,
        users.email,
        users.image,

        COUNT(DISTINCT posts.id)::int AS posts_count,
        COUNT(DISTINCT comments.id)::int AS comments_count

      FROM users

      LEFT JOIN posts
        ON posts.user_id = users.id

      LEFT JOIN comments
        ON comments.user_id = users.id

      WHERE users.id = $1

      GROUP BY
        users.id,
        users.username,
        users.name,
        users.email,
        users.image
      `,
      [id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json({
      user: result.rows[0],
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server error",
    });
  }
});

// Get user posts
router.get("/users/:id/posts", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query(
      `
      SELECT
        posts.id,
        posts.title,
        posts.body,
        posts.image,
        posts.created_at,

        users.id AS author_id,
        users.username,
        users.name,
        users.image AS profile_image,

        COUNT(comments.id)::int AS comments_count

      FROM posts
      JOIN users
      ON posts.user_id = users.id

      LEFT JOIN comments
      ON comments.post_id = posts.id

      WHERE posts.user_id = $1

      GROUP BY
        posts.id,
        users.id

      ORDER BY posts.created_at DESC
      `,
      [id],
    );

    const posts = result.rows.map((post) => {
      return {
        id: post.id,
        title: post.title,
        body: post.body,
        image: post.image,
        created_at: post.created_at,
        comments_count: post.comments_count,
        author: {
          id: post.author_id,
          username: post.username,
          name: post.name,
          profile_image: post.profile_image,
        },
      };
    });

    res.json({
      posts,
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
