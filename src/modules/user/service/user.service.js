const { request, response } = require("express");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const User = require("../model/user.model");

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

  res.json(userFound);
};

module.exports = {
  createUser,
  login,
};
