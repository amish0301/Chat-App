const express = require("express");
const router = express.Router();
const { getUsers, getChats } = require("../controllers/admin");

router.get("/");

router.post("/verify/:id");
router.get("/logout");

router.get("/users", getUsers);
router.get("/chats", getChats);
router.get("/messages");

router.get("/stats");

module.exports = router;
