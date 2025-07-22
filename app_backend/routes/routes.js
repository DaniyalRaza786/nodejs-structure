const express = require("express");

const userRoutes = require("./users");
const authRoutes = require("./auth");
const  router = express.Router();

router.use("/v1/user", userRoutes);
router.use("/v1/auth", authRoutes);

module.exports = router;