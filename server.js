// server.js
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

const app = express();

// CORS (IMPORTANT AFTER DEPLOYMENT)
app.use(
    cors({
        origin: [
            process.env.CLIENT_URL, 
            "https://fairshare-mitali.vercel.app",  // <- CHANGE TO YOUR FRONTEND URL
        ],
        methods: ["GET", "POST"],
        credentials: true,
    })
);

app.use(express.json());

// EMAIL TRANSPORTER
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,   // MUST be same as Render env
        pass: process.env.EMAIL_PASS,   // App password only
    },
});

// SEND INVITE ROUTE
app.post("/send-invite", async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ success: false, message: "Email missing" });
    }

    try {
        const mailOptions = {
            from: `FairShare <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "FairShare Group Invitation",
            html: `
                <h2>You are invited to FairShare 🎉</h2>
                <p>Click below to join:</p>
                <a href="${process.env.CLIENT_URL}" 
                   style="padding:12px 20px; background:#4CAF50; color:#fff; text-decoration:none;">
                    Join FairShare
                </a>
            `,
        };

        await transporter.sendMail(mailOptions);

        res.json({ success: true, message: "Invite sent!" });
    } catch (err) {
        console.error("Email error:", err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// SERVER START
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
