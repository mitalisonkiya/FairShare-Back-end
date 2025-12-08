// server.js
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// EMAIL SENDER SETUP
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// ROUTE TO SEND EMAIL INVITE
app.post("/send-invite", async (req, res) => {
    const { email } = req.body;

    try {
        await transporter.sendMail({
            from: `"FairShare Invite" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "You are invited to FairShare Group",
            text: "You have been invited to join a group on FairShare!",
            html: `
                <h2>FairShare Group Invitation</h2>
                <p>You have been invited to join a group on FairShare.</p>
                <p>Click below to join:</p>
                <a href="https://fairshare-backend-3nth.onrender.com">Join FairShare</a>
            `
        });

        return res.json({ success: true, message: "Invite sent!" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: error.message });
    }
});

app.listen( () => {
    console.log("Server running on https://fairshare-backend-3nth.onrender.com");
});
