const userModel = require("../models/userModels");
const bcrypt = require("bcryptjs");

async function userRegister(req, res) {
  try {
    const { email, password, name } = req.body;
    if (!email) {
      throw new Error("please provide an email");
    }
    if (!password) {
      throw new Error("please provide an password");
    }
    if (!name) {
      throw new Error("please provide an name");
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hashSync(password, salt);

    if (!hashPassword) {
      throw new Error("something went wromg");
    }

    const payload = {
      ...req.body,
      password: hashPassword,
    };
    console.log("payload");

    const userData = new userModel(payload);
    const saveUser = await userData.save();

    res.status(201).json({
      data: saveUser,
      success: true,
      error: false,
      message: "User created successfuly",
    });
  } catch (error) {
    res.json({
      message: "error in signup controoler",
      error,
      error: true,
      success: false,
    });
    console.log("error connecting user", error);
  }
}

module.exports = userRegister;
