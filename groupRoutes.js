const express = require("express");
const router = express.Router();
const { createGroup, sendInvite, joinGroup } = require("../controllers/groupController");

router.post("/create", createGroup);
router.post("/send-invite", sendInvite);
router.get("/join/:groupId", joinGroup);

module.exports = router;
