const jwt = require("jsonwebtoken");

const isLogin = (req, res, next) => {
  try {
    const headerObj = req.headers;
    const token = headerObj["authorization"].split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.id;
    req.body.userId = userId;
    next();
  } catch (err) {
    res.status(401).send({
      message: "You are not authenticated",
      data: err,
      success: false,
    });
  }
};
module.exports = isLogin;
