const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const upload = require("../middlewares/upload");
const db = require("../db");

//Create Post
router.post(
  "/posts",
  authMiddleware,
  upload.single("image"),
  async (req, res) => {
    const { title, body } = req.body;
    const image = req.file ? req.file.path : null;

    try {
      const result = await db.query(
        `INSERT INTO posts (title, body, image, user_id)
        VALUES ($1, $2, $3, $4)
        RETURNING *`,
        [title, body, image, req.user.id],
      );
      res.status(201).json({
        message: "Post created successfully ✅",
        type: "success",
        post: result.rows[0],
      });
    } catch (err) {
      console.log(err);

      res.status(500).json({
        message: "Server error",
        type: "danger",
      });
    }
  },
);

// Get Posts
router.get("/posts", async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = 3;
  const offset = (page - 1) * limit;
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

  GROUP BY
    posts.id,
    users.id

  ORDER BY posts.created_at DESC

        LIMIT $1 OFFSET $2

`,
      [limit, offset],
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
      posts: posts,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server error",
      type: "danger",
    });
  }
});

//Single post
router.get("/posts/:id", async (req, res) => {
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

      WHERE posts.id = $1

      GROUP BY
        posts.id,
        users.id

      `,
      [id],
    );

    const post = result.rows[0];

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
        type: "danger",
      });
    }

    res.json({
      post: {
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
      },
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server error",
      type: "danger",
    });
  }
});

//Update Post
router.patch(
  "/posts/:id",
  authMiddleware,
  upload.single("image"),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { title, body } = req.body;
      const image = req.file ? req.file.path : null;

      const postResult = await db.query("SELECT * FROM posts WHERE id = $1", [
        id,
      ]);

      if (postResult.rows.length === 0) {
        return res.status(404).json({
          message: "Post not found",
          type: "danger",
        });
      }

      const post = postResult.rows[0];

      if (post.user_id !== req.user.id) {
        return res.status(403).json({
          message: "Not allowed to edit this post",
          type: "danger",
        });
      }

      const updatedPost = await db.query(
        `
      UPDATE posts
      SET
        title = COALESCE($1, title),
        body = COALESCE($2, body),
        image = COALESCE($3, image)
      WHERE id = $4
      RETURNING *
      `,
        [title, body, image, id],
      );

      res.json({
        message: "Post updated successfully ✅",
        type: "success",
        post: updatedPost.rows[0],
      });
    } catch (err) {
      console.log(err);

      res.status(500).json({
        message: "Server error",
        type: "danger",
      });
    }
  },
);

// Delete Post
router.delete("/posts/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const postResult = await db.query("SELECT * FROM posts WHERE id = $1", [
      id,
    ]);

    if (postResult.rows.length === 0) {
      return res.status(404).json({
        message: "Post not found",
        type: "danger",
      });
    }

    const post = postResult.rows[0];

    if (post.user_id !== req.user.id) {
      return res.status(403).json({
        message: "Not allowed to delete this post",
        type: "danger",
      });
    }

    await db.query("DELETE FROM posts WHERE id = $1", [id]);

    res.json({
      message: "Post deleted successfully ✅",
      type: "success",
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server error",
      type: "danger",
    });
  }
});
module.exports = router;
