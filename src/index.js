import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import products from "./routes/products.route.js";
import shoppingCart from "./routes/shopping-cart.route.js";
import Products from "./classes/products.js";
import { createServer } from "http";
import { Server } from "socket.io";
import "dotenv/config";
import cors from "cors";

let contenedor = new Products();

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
app.use("/api/productos", products);
app.use("/api/carrito", shoppingCart);

app.use(function (req, res) {
  res.json({
    error: -2,
    description: "ruta no implementada",
  });
});

/* Servidor */
const server = httpServer.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${server.address().port}`);
});
server.on("error", (error) => console.error(error));
