const { request, response } = require("express");
const checkSession = (req = request, res = response, next) => {
  if (req.session && req.session.isLoggedIn == true) {
    next();
  }

  res.redirect("/login");
};

module.exports = { checkSession };
