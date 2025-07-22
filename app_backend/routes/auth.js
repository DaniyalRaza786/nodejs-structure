const express = require("express");
const {signUp, login} = require("../controller/auth");
const {requireSignIn } = require("../middleware/authMiddleware");
const router = express.Router();
router.post("/signup",signUp);
router.post("/login",login);

module.exports = router;