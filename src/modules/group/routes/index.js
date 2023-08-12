const { Router } = require("express");
const { history } = require("../services/group.service");

const routes = Router();
routes.get('/history',history)
module.exports = routes;
