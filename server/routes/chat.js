const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middlewares/auth");
const {
  newGroupChat,
  getMyChats,
  getMyGroups,
  addMembers,
  removeMembers,
  leaveGroup
} = require("../controllers/chat");

router.use(isAuthenticated);

router.post("/new", newGroupChat);
router.put("/addmember", addMembers);
router.put('/removemember', removeMembers);
router.delete("/leave/:id", leaveGroup);


// fetching info of user
router.get("/my", getMyChats);
router.get("/my/groups", getMyGroups);
module.exports = router;
