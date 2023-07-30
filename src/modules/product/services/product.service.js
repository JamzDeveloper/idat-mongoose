const { request, response } = require("express");

const Product = require("../models/product.model");

const createProducts = async (req, res) => {
  const { name, description, categories, types } = req.body;

  const newProduct = await new Product({
    name,
    description,
    categories,
    types,
  }).save();

  res.json(newProduct);
};

const findAll = async (req = request, res = response) => {
  const products = await Product.find({})
    .populate("categories")
    .populate({
      path: "categories",
      model: "Category",
      populate: "parentCategory",
    })
    .limit(1)
    .skip(3)
    .sort({ name: 1 });

  res.json(products);
};

module.exports = {
  createProducts,
  findAll,
};
