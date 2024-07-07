const express = require("express");

const router = express.Router();
const userSignup = require("../controller/Signup");
const SignInController = require("../controller/SIgnin");
const authToken = require("../middleware/authToken");
const userDetailsController = require("../controller/userDetails");
const userLogout = require("../controller/userLogout");

router.post("/signup", userSignup);
router.post("/login", SignInController);
router.get("/user-details", authToken, userDetailsController);
router.get("/userLogout",userLogout)

module.exports = router;
