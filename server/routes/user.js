const express = require("express");
const router = express.Router();
const { newUser, deleteUser, login, getMyProfile } = require("../controllers/user");
const { singleAvatar } = require("../middlewares/multer");

router.post("/signup", singleAvatar, newUser);
router.post("/login", login);

// router.get('/amish0301', getMyProfile);
// router.post("/:id", deleteUser);

module.exports = router;