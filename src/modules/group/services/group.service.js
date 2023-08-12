const { request, response } = require("express");
const Group = require("../model/group.model");
var CryptoJS = require("crypto-js");

const createMessage = async (from = "", message = "") => {
  var ciphertext = CryptoJS.AES.encrypt(
    message,
    "MySecretPasswordCrypto"
  ).toString();

  const newMessage = await new Group({
    from,
    message: ciphertext,
  }).save();

  return newMessage;
};

const history = async (req = request, res = response) => {
  const groupData = await Group.find({});

  const messages = groupData.map((e) => {
    const byte = CryptoJS.AES.decrypt(e.message, "MySecretPasswordCrypto");

    return {
      ...e.toJSON(),
      message: byte.toString(CryptoJS.enc.Utf8),
    };
  });

  //   console.log(messages);
  res.json(messages);
};

module.exports = {
  createMessage,
  history,
};
