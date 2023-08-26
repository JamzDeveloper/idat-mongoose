const http = require("http");
const path = require("path");

const express = require("express");
const mongoose = require("mongoose");
var session = require("express-session");
var FileStore = require("session-file-store")(session);

const { Server: SocketServer } = require("socket.io");

const categoryRoutes = require("../modules/categories/routes");
const ProductRoutes = require("../modules/product/routes/");
const UserPath = require("../modules/user/routes");
const GroupRoutes = require("../modules/group/routes");
const { createMessage } = require("../modules/group/services/group.service");
const { checkSession } = require("../middleware/checkSession.middleware");

class Server {
  constructor() {
    this.app = express();
    this.port = 4001;
    this.originPath = "/api";
    this.categoryPath = "/category";
    this.productPath = "/product";
    this.userPath = "/user";
    this.groupPath = "/group";
    this.sessionExpressPath = "/login";
    this.server = http.createServer(this.app);
    this.io = new SocketServer(this.server, {
      cors: {
        origin: ["http://localhost:4001/", "http://192.168.1.13:4001/"],
      },
    });

    //middleare
    this.middleware();

    //conection db
    this.connectionDb();

    // rutas
    this.routes();

    this.socket();
  }
  async connectionDb() {
    await mongoose.connect("mongodb://127.0.0.1:27017/idat");
  }
  middleware() {
    this.app.use(express.static(path.join(__dirname, "../public")));

    //parse and reading of body
    this.app.use(express.json());

    this.app.use(express.urlencoded({ extended: true }));

    this.app.use(
      session({
        store: new FileStore({ path: "./sessions" }),
        secret: "mysecretkey",
        resave: false,
        saveUninitialized: true,
      })
    );
  }
  routes() {
    this.app.use(this.originPath + this.categoryPath, categoryRoutes);
    this.app.use(this.originPath + this.productPath, ProductRoutes);
    this.app.use(this.originPath + this.userPath, UserPath);
    this.app.use(this.originPath + this.groupPath, GroupRoutes);

    this.app.get(this.sessionExpressPath, (req, res) => {
      res.sendFile(path.join(__dirname, "../public/login/index.html"));
    });

    this.app.post("/session_login2", (req, res) => {
      /// obtener datos

      const { user, password } = req.body;

      ///consultar a la base de datos
      const usuario = {
        name: "jose",
        username: "jose_user",
        password: "jose_password",
      };

      //traer usuario, comparar contraseña

      //comprar contraseña
      if (usuario.username == user && usuario.password == password) {
        //agregar sesion al server
        req.session.isLoggedIn = true;
        req.session.name = usuario.name;

        //redireccionar
        res.redirect("/home");
      } else {
        res.redirect("/login");
      }
    });

    this.app.get("/home", checkSession, (req, res) => {
      res.sendFile(path.join(__dirname, "../public/home/index.html"));
    });
  }

  socket() {
    this.io.on("connection", (socket) => {
      console.log(socket.id);
      console.log("un usuario mas conectado");
      socket.on("chat message", (msg) => {
        console.log(msg);
        this.io.emit("chat message", msg.message);
        createMessage(msg.from, msg.message);
      });
    });
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log(`Server escuchando en puerto ${this.port} 🚀🚀`);
    });
  }
}

module.exports = Server;
