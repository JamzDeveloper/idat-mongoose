const { request, response } = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../model/user.model");

const saltRounds = 10;

const createUser = async (req = request, res = response) => {
  const { name, email, password, phone, avatar } = req.body;

  const newPassword = await bcrypt.hashSync(password, saltRounds);

  const newUser = await User({
    name,
    email,
    password: newPassword,
    phone,
    photo: avatar,
  }).save();

  res.json(newUser);
};

const login = async (req = request, res = response) => {
  // const result = validationResult(req);

  // console.log(result.errors);
  // if (result.errors.length > 0) {
  //   return res.status(400).json({
  //     error: result.errors[0].msg,
  //   });
  // }

  // console.log(result);
  const { email, password } = req.body;
  const userFound = await User.findOne({
    email,
  });

  if (!userFound) {
    return res.status(400).json({
      error: "user not found",
    });
  }

  const match = await bcrypt.compare(password, userFound.password);

  if (!match) {
    return res.status(401).json({
      error: "contraseña incorrecta",
    });
  }

  const token = jwt.sign({ _id: userFound._id }, "super_secret", {
    expiresIn: 60 * 60,
  });

  console.log(token);

  res.json({
    user: userFound,
    tokens: {
      accessToken: token,
    },
  });
};

module.exports = {
  createUser,
  login,
};
