const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { signup, login } = require("../controllers/authController");

router.post("/signup", signup);
router.post("/login", login);

const JWT_SECRET = process.env.JWT_SECRET || "FAIRSHARE_SECRET";

// ============ USER SIGNUP ============
router.post("/signup", (req, res) => {
    const { name, email, password } = req.body;

    const hashed = bcrypt.hashSync(password, 10);

    db.run(
        `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`,
        [name, email.toLowerCase(), hashed],
        (err) => {
            if (err) return res.status(400).json({ error: "Email already exists" });

            res.json({ status: "ok" });
        }
    );
});

// ============ USER LOGIN ============
router.post("/login", (req, res) => {
    const { email, password } = req.body;

    db.get(
        `SELECT * FROM users WHERE email = ?`,
        [email.toLowerCase()],
        (err, user) => {
            if (!user) return res.status(400).json({ error: "Invalid email" });

            const match = bcrypt.compareSync(password, user.password);
            if (!match) return res.status(400).json({ error: "Incorrect password" });

            const token = jwt.sign({ id: user.id }, JWT_SECRET);

            res.json({ status: "ok", token, user });
        }
    );
});

module.exports = router;
