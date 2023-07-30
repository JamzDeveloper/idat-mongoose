const { Router } = require("express");
const {
  createCategory,
  findAll,
  deleteOne,
  findOne,
} = require("../services/category.service");

const routes = Router();

routes.post("/", createCategory);
routes.get("/", findAll);
routes.delete("/", deleteOne);
routes.get("/:id", findOne);
module.exports = routes;
