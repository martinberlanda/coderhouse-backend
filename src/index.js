import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import "dotenv/config";
import productsRoute from "./routes/products.route.js";
import productsTestRoute from "./routes/products-test.route.js";
import messageRoute from "./routes/messages.route.js";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

/* Instancia de express */
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

/* Middlewares */
app.use(cors({ origin: "http://localhost:4000" }));
app.use(morgan("tiny"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/api/productos", productsRoute);
app.use("/api/productos-test", productsTestRoute);
app.use("/api/mensajes", messageRoute);

/* Socket */
io.on("connection", async (socket) => {
  console.log(`Nuevo cliente conectado: ${socket.id}`);
  //socket.emit("products", await productContainer.getAll());
  //socket.emit("msgs", await messagessContainer.getAll());

  socket.on("newMsg", async (data) => {
    //await messagessContainer.save(data);
    //io.sockets.emit("msgs", await messagessContainer.getAll());
  });

  socket.on("newProduct", async (data) => {
    //await productContainer.save(data);
    //io.sockets.emit("products", await productContainer.getAll());
  });

  socket.on("disconnect", () => {
    socket.disconnect();
    console.log("Client disconnected");
  });
});

/* Servidor */
const server = httpServer.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${server.address().port}`);
});
server.on("error", (error) => console.error(error));
