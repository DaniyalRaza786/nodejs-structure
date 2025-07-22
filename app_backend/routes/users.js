const express = require("express");
const {getUsers, createUser, updateUser, deleteUser} = require("../controller/users");
const {requireSignIn } = require("../middleware/authMiddleware");
const router = express.Router();
router.get("/get", requireSignIn ,getUsers);
router.post("/create", requireSignIn,createUser);
router.patch("/update",requireSignIn, updateUser);
router.delete("/delete", requireSignIn,deleteUser);

module.exports = router;