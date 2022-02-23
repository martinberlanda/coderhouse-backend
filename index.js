import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import productos from "./routes/products.route.js";
import Products from "./classes/products.js";
import Messages from "./classes/messages.js";
import { createServer } from "http";
import { Server } from "socket.io";

let productContainer = new Products();
let messagessContainer = new Messages();

/* Instancia de express */
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

/* Middlewares */
app.use(morgan("tiny"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/api/productos", productos);

/* Conf. Motor de plantillas */
app.set("views", "./views");
app.set("view engine", "ejs");

/* Socket */
let msgs = [];
io.on("connection", async (socket) => {
  console.log(`Nuevo cliente conectado: ${socket.id}`);
  socket.emit("products", await productContainer.getAll());
  socket.emit("msgs", await messagessContainer.getAll());

  socket.on("newMsg", async (data) => {
    await messagessContainer.save(data);
    io.sockets.emit("msgs", await messagessContainer.getAll());
  });

  socket.on("newProduct", async (data) => {
    await productContainer.save(data);
    io.sockets.emit("products", await productContainer.getAll());
  });

  socket.on("disconnect", () => {
    socket.disconnect();
    console.log("Client disconnected");
  });
});

/* Rutas */
app.get("/", async (req, res) => {
  res.render("formulario");
});

app.get("/productos", async (req, res) => {
  let products = await productContainer.getAll();
  res.render("productos", { products });
});

/* Servidor */
const PORT = 8080;
const server = httpServer.listen(PORT, () => {
  console.log(`Server is listening on port ${server.address().port}`);
});
server.on("error", (error) => console.error(error));
