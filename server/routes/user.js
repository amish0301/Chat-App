const express = require("express");
const router = express.Router();
const {
  newUser,
  deleteUser,
  login,
  getMyProfile,
} = require("../controllers/user");
const { singleAvatar } = require("../middlewares/multer");
const { isAuthenticated } = require("../middlewares/auth");

router.post("/signup", singleAvatar, newUser);
router.post("/login", login);

router.get("/me", isAuthenticated, getMyProfile);
// router.post("/:id", deleteUser);

module.exports = router;