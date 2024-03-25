const express = require("express");
const router = express.Router();
const {
  newUser,
  deleteUser,
  login,
  getMyProfile,
  logout,
  searchUser,
} = require("../controllers/user");
const { singleAvatar } = require("../middlewares/multer");
const { isAuthenticated } = require("../middlewares/auth");
const {
  registerValidator,
  validateHandler,
  loginValidator,
} = require("../lib/validators");

router.post(
  "/signup",
  singleAvatar,
  registerValidator(),
  validateHandler,
  newUser
);

router.post("/login", loginValidator(), validateHandler, login);

// middleware
router.use(isAuthenticated);

router.get("/search", searchUser);
router.get("/logout", logout);
// router.post("/:id", deleteUser);

// personal info routes
router.get("/me", getMyProfile);

module.exports = router;
