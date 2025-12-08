// server.js
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());

// --- CORS FIX ---
app.use(cors({
    origin: [
        process.env.CLIENT_URL,
        "https://fair-share-puce.vercel.app/"
    ],
    methods: ["GET", "POST"],
}));

// --- GMAIL TRANSPORTER ---
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    }
});

// --- SEND EMAIL ---
app.post("/send-invite", async (req, res) => {
    const { email, groupName, joinLink } = req.body;

    if (!email) return res.json({ success: false, message: "No email provided" });

    try {
        await transporter.sendMail({
            from: `FairShare <${process.env.EMAIL_USER}>`,
            to: email,
            subject: `You're invited to join group: ${groupName}`,
            html: `
                <h2>FairShare Invitation</h2>
                <p>You have been invited to join <strong>${groupName}</strong></p>
                <a href="${joinLink}" 
                style="padding:10px 20px;background:#4CAF50;color:white;text-decoration:none;border-radius:5px;">
                    Join Group
                </a>
            `
        });

        return res.json({ success: true, message: "Invite sent!" });

    } catch (err) {
        return res.json({ success: false, error: err.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on PORT", PORT));
