const express = require("express");
const router = express.Router();
const {
  getUsers,
  getChats,
  getMessages,
  getDashboardStats,
  adminLogin,
  adminLogout,
  getAdminData,
} = require("../controllers/admin");
const { adminLoginValidator, validateHandler } = require("../lib/validators");
const { adminAuth } = require("../middlewares/auth");

router.get("/", getAdminData);

router.post("/verify", adminLoginValidator(), validateHandler, adminLogin);
router.get("/logout", adminLogout);

router.use(adminAuth);
// Only admin can access below routes

router.get("/users", getUsers);
router.get("/chats", getChats);
router.get("/messages", getMessages);
router.get("/stats", getDashboardStats);

module.exports = router;
