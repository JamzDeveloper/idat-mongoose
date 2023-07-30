const express = require("express");
const mongoose = require("mongoose");
const categoryRoutes = require("../modules/categories/routes");
const ProductRoutes = require("../modules/product/routes/");
class Server {
  constructor() {
    this.app = express();
    this.port = 4001;
    this.originPath = "/api";
    this.categoryPath = "/category";
    this.productPath = "/product";

    //middleare

    this.middleare();

    //conection db
    this.connectionDb();

    // rutas

    this.routes();
  }

  async connectionDb() {
    await mongoose.connect("mongodb://127.0.0.1:27017/idat");
  }
  middleare() {
    //parse and reading of body
    this.app.use(express.json());
  }

  routes() {
    this.app.use(this.originPath + this.categoryPath, categoryRoutes);
    this.app.use(this.originPath + this.productPath, ProductRoutes);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server escuchando en puerto ${this.port} 🚀🚀`);
    });
  }
}

module.exports = Server;
