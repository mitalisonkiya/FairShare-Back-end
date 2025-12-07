// server.js
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
app.use(cors({
  [origin: process.env.CLIENT_URL,"https://fair-share-nec08bt5i-mitalisonkiyas-projects.vercel.app"]
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// EMAIL TRANSPORTER
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// SEND INVITE ROUTE
app.post("/send-invite", async (req, res) => {
    const { email } = req.body;

    try {
        await transporter.sendMail({
            from: `FairShare <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "FairShare Group Invitation",
            html: `
                <h2>You are invited to FairShare</h2>
                <p>Click below to join:</p>
                <a href="http://localhost:5500">Join FairShare</a>
            `
        });

        res.json({ success: true, message: "Invite sent!" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// START SERVER
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});

