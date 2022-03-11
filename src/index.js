import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";

import productsRoute from "./routes/products.route.js";
import shoppingCartRoute from "./routes/shopping-cart.route.js";

import { createServer } from "http";
import { Server } from "socket.io";
import "dotenv/config";
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
app.use("/api/carrito", shoppingCartRoute);

app.use((req, res) => {
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
