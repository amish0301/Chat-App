const express = require("express");
const router = express.Router();
const { newUser } = require("../controllers/user");

router.post("/signup", newUser);
// router.post("/login", login);

module.exports = router;