const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const db = require("../db");
require("dotenv").config();
const token = Math.random().toString(36).substring(2, 10);
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// SEND EMAIL INVITE
router.post("/invite", (req, res) => {
    const { email, groupName, invitedBy } = req.body;

    const mailOptions = {
        from: `"FairShare" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: `You're invited to join ${groupName} on FairShare!`,
        html: `
            <div style="font-family: Arial; padding: 20px;">
                <h2>Hello!</h2>
                <p><b>${invitedBy}</b> has invited you to join the group:</p>
                <h3>${groupName}</h3>
                
                <p>Click below to join:</p>

                <a href="http://localhost:5000/join-group/${groupName}" 
                   style="background:#4e54c8;color:white;padding:10px 18px;text-decoration:none;border-radius:8px;">
                    Join Group
                </a>

                <br><br>
                <p>— FairShare Team</p>
            </div>
        `
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
            return res.json({ success: false, message: "Failed to send email" });
        }
        res.json({ success: true, message: "Invite sent successfully!" });
    });
});
const joinLink = `http://localhost:5000/join/${token}`;

const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `Join ${group_name} on FairShare`,
    html: `
        <h2>You are invited!</h2>
        <p>${invited_by} has invited you to join <b>${group_name}</b>.</p>
        <a href="${joinLink}">${joinLink}</a>
    `
};


module.exports = router;
