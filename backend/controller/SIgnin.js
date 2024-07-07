const bcrypt = require("bcryptjs");
const userModel = require("../models/userModels");
const jwt = require("jsonwebtoken");

async function SignInController(req, res) {
  try {
    const { email, password } = req.body;

    if (!email) {
      throw new Error("please provide an email");
    }
    if (!password) {
      throw new Error("please provide an password");
    }

    const user = await userModel.findOne({ email: email });
    if (!user) {
      throw new Error("user doesn't exist");
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    console.log("checkedPassword", checkPassword);

    if (checkPassword) {
      const tokenData = {
        id: user._id,
        email: user.email,
      };
      const token = await jwt.sign(
        {
          data: tokenData,
        },
        process.env.SECRET_KEY,
        { expiresIn: "1hr" }
      );

      const tokenOption = {
        httpOnly: true,
        secure: true,
      };

      res.cookie("token", token, tokenOption).status(200).json({
        data: token,
        success: true,
        error: false,
        message: "User login successfuly",
      });
    } else {
      throw new Error("password is incorrect");
    }
  } catch (error) {
    res.json({
      message: error.message || error,
      error: true,
      success: false,
    });
    console.log("error connecting user", error);
  }
}

module.exports = SignInController;
