const { Router } = require("express");
const { createProducts, findAll } = require("../services/product.service");

const routes = Router();

routes.post("/", createProducts);
routes.get("/", findAll);

module.exports = routes;
