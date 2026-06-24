const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const db = require("../db");
const upload = require("../middlewares/upload");

const router = express.Router();

// Register
router.post("/register", upload.single("image"), async (req, res) => {
  const { username, email, password, name } = req.body;
  const image = req.file ? req.file.path : null;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await db.query(
      `INSERT INTO users (username, email, password, name, image)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [username, email, hashedPassword, name, image],
    );

    const user = result.rows[0];

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.json({
      message: "Account created successfully ✅",
      type: "success",
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        name: user.name,
        image: user.image,
      },
    });
  } catch (err) {
    if (err.code === "23505") {
      return res.status(400).json({
        message: "Email or username already exists",
        type: "danger",
      });
    }

    console.log(err);

    return res.status(500).json({
      message: "Server error",
      type: "danger",
    });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { identifier, password } = req.body;

  try {
    const result = await db.query(
      "SELECT * FROM users WHERE email = $1 OR username = $1",
      [identifier],
    );

    const user = result.rows[0];

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
        type: "danger",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password",
        type: "danger",
      });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.json({
      message: "Login successful ✅",
      type: "success",
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        name: user.name,
        image: user.image,
      },
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
