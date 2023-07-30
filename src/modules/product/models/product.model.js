const mongoose = require("mongoose");
const TypesProduct = new mongoose.Schema({
  name: String,
  size: String,
  description: {
    type: String,
    default: "no tiene descripcion",
  },
});

const ProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  categories: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Category",
    },
  ],
  types: [TypesProduct],
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
