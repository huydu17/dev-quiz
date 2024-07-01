const User = require("../../models/User/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//register
const register = async (req, res) => {
  const { userName, password, email } = req.body;
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res
        .status(200)
        .send({ message: "Account already exists", success: false });
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);
    req.body.password = hash;
    const newUser = new User(req.body);
    await newUser.save();
    res.send({
      message: "User created successfully",
      success: true,
      data: newUser,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
      data: err,
      success: false,
    });
  }
};

//login
const login = async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });
    if (!userExists) {
      return res
        .status(404)
        .send({ message: "User not found", success: false });
    }
    const isMatch = await bcrypt.compare(
      req.body.password,
      userExists.password
    );
    console.log(isMatch);
    if (!isMatch) {
      return res
        .status(404)
        .send({ message: "Valid password", success: false });
    }
    const token = jwt.sign({ id: userExists._id }, process.env.JWT_SECRET);
    res.send({
      message: "User logged in successfully",
      success: true,
      token: token,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
      data: err,
      success: false,
    });
  }
};

const getUserInfo = async (req, res) => {
  try {
    console.log(req.body.userId);
    const user = await User.findById(req.body.userId);
    console.log(user);
    res.send({
      message: "User info fetched successfully",
      success: true,
      data: user,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
      data: err,
      success: false,
    });
  }
};

module.exports = { register, login, getUserInfo };
