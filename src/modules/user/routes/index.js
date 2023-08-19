const { Router } = require("express");
const uploadImage = require("../../../middleware/file.middleware");
const { createUser, login } = require("../service/user.service");
const { check } = require("express-validator");
const { validateFields } = require("../../../middleware/validate-fileds");
const { ValidCustom } = require("../../../middleware/custom-validation");
const routes = Router();

routes.post("/", uploadImage, createUser);

routes.post(
  "/login",
  [
    check("email", "correo no valido").isEmail(),
    check("password", "contraseña vacia").not().isEmpty(),
    // check("custom", "valor invalido").custom(ValidCustom),
    validateFields,
  ],
  login
);
module.exports = routes;
