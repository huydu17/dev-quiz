const {
  register,
  login,
  getUserInfo,
} = require("../../controllers/User/userController");
const isLogin = require("../../middlewares/authMiddleware");
const userRoutes = require("express").Router();

userRoutes.post("/register", register);
userRoutes.post("/login", login);
userRoutes.get("/get-user-info", isLogin, getUserInfo);
module.exports = userRoutes;
