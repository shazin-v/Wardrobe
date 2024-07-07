const express = require("express");

const router = express.Router();
const userSignup = require("../controller/Signup");
const SignInController = require("../controller/SIgnin");

router.post("/signup", userSignup);
router.post("/login", SignInController);

module.exports = router;
