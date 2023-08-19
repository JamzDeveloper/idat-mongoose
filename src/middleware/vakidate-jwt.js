const { response, request } = require("express");
const jwt = require("jsonwebtoken");
const User = require("../modules/user/model/user.model");

const ValidateJWT = async (req = request, res = response, next) => {

    
  if (!req.headers.authorization) {
    return res.status(401).json({
      msg: "Acceso denegado",
    });
  }

  const token = req.headers.authorization.split(" ");

  var decoded = jwt.verify(token[1], "super_secret");

  const foundUser = await User.findById(decoded._id);

  if (foundUser.role != "USER") {
    return res.status(401).json({
      msg: "Acceso denegado",
    });
  }
  next();
};

module.exports = {
  ValidateJWT,
};
