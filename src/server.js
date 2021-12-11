const express = require("express");
const Archivo = require("./Archivos");
// const mensajes = new Archivo("mensajes.txt");
const app = express();
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const DB = require("./knex")
const productos = new DB("mysql");
const mensajes = new DB("sqlite3")
productos.createTableProducts()
mensajes.createTableMessages()

// Source thumbnail: https://www.iconfinder.com/iconsets/fantasy-and-role-play-game-adventure-quest


// El uso del static me estaba generando inconveninetes a la hora de ejecutar, no se porque
// app.use("/static", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.set("views", "../public/views");

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("../public/views/pages/formulario");
});


io.on("connection", (socket) => {
  console.log("Nuevo Cliente conectado");
  productos.getProducts().then(productList =>
    io.sockets.emit("product", productList))
  mensajes.getMessages().then(data => {io.sockets.emit("chat", data)})   
  socket.on("updateProducts", (data) => {
    productos.insertProduct(data);
    productos.getProducts().then(productList =>
      {io.sockets.emit("product", productList), console.log(productList)})
  });
  socket.on("updateChat", (data) => {
    mensajes.insertMessages(data)
    mensajes.getMessages().then(data => {io.sockets.emit("chat", data); console.log(data)}) 
  });
});

const PORT = 8080;
httpServer.listen(PORT, () => console.log("Server On"));
httpServer.on("error", (error) => {
  console.log(error);
});
