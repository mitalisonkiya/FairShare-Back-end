const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "fairshare-secret-key"; // change for production

// =========================
// USER SIGNUP
// =========================
exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existing = await User.findOne({ email });
        if (existing) return res.json({ error: "Email already registered" });

        const hash = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            password: hash
        });

        await user.save();

        res.json({ message: "Signup successful" });

    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};

// =========================
// USER LOGIN
// =========================
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.json({ error: "User not found" });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.json({ error: "Incorrect password" });

        const token = jwt.sign(
            { id: user._id, email: user.email },
            JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.json({
            message: "Login successful",
            token,
            name: user.name,
            email: user.email
        });

    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};
exports.signup = (req, res) => {
    const db = req.app.get("db");
    const { name, email, password } = req.body;

    db.run(
        "INSERT INTO users (name,email,password) VALUES (?,?,?)",
        [name, email, password],
        function (err) {
            if (err) return res.json({ success: false });

            res.json({ success: true });
        }
    );
};

exports.login = (req, res) => {
    const db = req.app.get("db");
    const { email, password } = req.body;

    db.get(
        "SELECT * FROM users WHERE email=? AND password=?",
        [email, password],
        (err, row) => {
            if (!row) return res.json({ success: false });

            res.json({ success: true, userId: row.id });
        }
    );
};
