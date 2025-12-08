const express = require("express");
const router = express.Router();
const db = require("../db");

// GET GROUP DETAILS FOR JOIN PAGE
router.get("/join/:token", (req, res) => {
    const token = req.params.token;

    db.get(`SELECT * FROM group_invites WHERE token = ?`, [token], (err, invite) => {
        if (err || !invite) {
            return res.status(400).json({ error: "Invalid link" });
        }

        db.get(`SELECT * FROM groups WHERE id = ?`, [invite.group_id], (err, group) => {
            if (!group) return res.status(404).json({ error: "Group not found" });

            res.json({
                status: "ok",
                group_id: group.id,
                group_name: group.name
            });
        });
    });
});

// JOIN GROUP
router.post("/join-group", (req, res) => {
    const { token, name, email } = req.body;

    db.get(`SELECT * FROM group_invites WHERE token = ?`, [token], (err, invite) => {
        if (!invite) return res.status(400).json({ error: "Invalid invite link" });

        db.run(
            `INSERT INTO members (group_id, name, email) VALUES (?, ?, ?)`,
            [invite.group_id, name, email],
            (err) => {
                if (err) return res.status(400).json({ error: "Failed to join group" });

                res.json({ status: "ok", message: "Joined group successfully" });
            }
        );
    });
});

module.exports = router;
