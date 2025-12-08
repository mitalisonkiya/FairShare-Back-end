// server.js
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

// CORS CONFIG (IMPORTANT)
app.use(
    cors({
        origin: [
            "https://fair-share-puce.vercel.app", // frontend URL (NO slash at end)
        ],
        methods: ["GET", "POST"],
        credentials: true,
    })
);

app.use(bodyParser.json());

// ✔ EMAIL TRANSPORTER (Gmail App Password)
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// ✔ SEND INVITE ROUTE
app.post("/send-invite", async (req, res) => {
    const { email } = req.body;

    try {
        const info = await transporter.sendMail({
            from: `FairShare <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "FairShare Group Invitation",
            html: `
                <h2>You are invited to FairShare</h2>
                <p>Click the button below to join your group:</p>
                <a href="https://fair-share-puce.vercel.app/join" 
                   style="padding:10px 20px; background:#4CAF50; color:white; text-decoration:none;">
                   Join Group
                </a>
            `,
        });

        console.log("MAIL SENT:", info.response);
        res.json({ success: true, message: "Invite sent!" });

    } catch (err) {
        console.error("MAIL ERROR:", err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// ✔ PORT FOR RENDER
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Backend running on port ${PORT}`);
});
