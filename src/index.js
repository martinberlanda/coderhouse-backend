import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import productos from "./routes/products.route.js";
import exphbs from "express-handlebars";
import Contenedor from "./classes/contenedor.js";
import { createServer } from "http";
import { Server } from "socket.io";

let contenedor = new Contenedor("productos.txt");

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
app.set("views", "src/views");
app.set("view engine", "ejs");

/* Socket */
let msgs = [];
io.on("connection", async (socket) => {
  console.log(`Nuevo cliente conectado: ${socket.id}`);

  socket.emit("products", await contenedor.getAll());
  socket.emit("msgs", msgs);

  socket.on("newMsg", async (data) => {
    msgs.push(data);
    io.sockets.emit("msgs", msgs);
  });

  socket.on("newProduct", async (data) => {
    await contenedor.save(data)
    io.sockets.emit("products", await contenedor.getAll());
  });
});

/* Rutas */
app.get("/", async (req, res) => {
  res.render("formulario");
});

app.get("/productos", async (req, res) => {
  let products = await contenedor.getAll();
  res.render("productos", { products });
});

/* Servidor */
const PORT = 8080;
const server = httpServer.listen(PORT, () => {
  console.log(`Server is listening on port ${server.address().port}`);
});
server.on("error", (error) => console.error(error));
