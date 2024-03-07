const express = require('express');
const router = express.Router();
const {
    fetchUsers,
    postUser,
    loginUser
  } = require("../controller/auth");


router.get("/signup", fetchUsers);
router.post("/signup", postUser);
router.post("/login", loginUser)
module.exports = router;