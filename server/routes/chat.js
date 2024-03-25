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
  sendAttachments,
  getChatDetails,
  renameGroup,
  deleteChat,
  getMessages,
} = require("../controllers/chat");
const { attachmentsMulter } = require("../middlewares/multer");
const {
  validateHandler,
  newChatValidator,
  addMemberValidator,
  removeMemberValidator,
  sendAttachmentsValidator,
  chatIdValidator,
  renameGroupValidator,
} = require("../lib/validators");

router.use(isAuthenticated);

router.post("/new", newChatValidator(), validateHandler, newGroupChat);
router.put("/add", addMemberValidator(), validateHandler, addMembers);
router.put("/remove", removeMemberValidator(), validateHandler, removeMembers);
router.delete("/leave/:id", chatIdValidator(), validateHandler, leaveGroup);

// Send Attachments in Message
router.post(
  "/message",
  attachmentsMulter,
  sendAttachmentsValidator(),
  validateHandler,
  sendAttachments
);

// Get messages
router.get("/message/:id", chatIdValidator(), validateHandler, getMessages);

// Get chat Details and Manipulate with chat
router
  .route("/:id")
  .get(chatIdValidator(), validateHandler, getChatDetails)
  .put(renameGroupValidator(), validateHandler, renameGroup)
  .delete(chatIdValidator(), validateHandler, deleteChat);

// fetching Personal info of user
router.get("/my", getMyChats);
router.get("/my/groups", getMyGroups);

module.exports = router;
