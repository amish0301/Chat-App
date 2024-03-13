const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middlewares/auth");
const {
  newGroupChat,
  getMyChats,
  getMyGroups,
} = require("../controllers/chat");

router.use(isAuthenticated);
// router.
router.post("/new", newGroupChat);
router.get("/my", getMyChats);
router.get("/my/groups", getMyGroups);
module.exports = router;
