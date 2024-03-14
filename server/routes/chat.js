const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middlewares/auth");
const {
  newGroupChat,
  getMyChats,
  getMyGroups,
  addMembers,
} = require("../controllers/chat");

router.use(isAuthenticated);

router.post("/new", newGroupChat);
router.put("/add", addMembers);

router.get("/my", getMyChats);
router.get("/my/groups", getMyGroups);
module.exports = router;
