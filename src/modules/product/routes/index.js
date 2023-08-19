const { Router } = require("express");
const { createProducts, findAll } = require("../services/product.service");
const { ValidateJWT } = require("../../../middleware/vakidate-jwt");

const routes = Router();

routes.post("/", createProducts);
routes.get("/", ValidateJWT, findAll);

module.exports = routes;
