const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middlewares/auth");
const { newGroupChat } = require("../controllers/chat");

router.use(isAuthenticated);
// router.
router.post("/new", newGroupChat);
module.exports = router;