const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middlewares/auth");
const {
  newGroupChat,
  getMyChats,
  getMyGroups,
  addMembers,
  removeMembers,
  leaveGroup,
  sendAttachments
} = require("../controllers/chat");
const { attachmentsMulter } = require("../middlewares/multer");

router.use(isAuthenticated);

router.post("/new", newGroupChat);
router.put("/add", addMembers);
router.put('/remove', removeMembers);
router.delete("/leave/:id", leaveGroup);

// Send Attachments
router.post('/message', attachmentsMulter, sendAttachments);


// fetching info of user
router.get("/my", getMyChats);
router.get("/my/groups", getMyGroups);
module.exports = router;
