import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import productos from "./routes/products.route.js";

import Contenedor from "./contenedor.js";

let contenedor = new Contenedor("productos.txt");

/* Instancia de express */
const app = express();

/* Middlewares */
app.use(morgan("tiny"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/productos", productos);

/* Motor de plantillas */
app.set("views", "./views");
app.set("view engine", "ejs");

/* Rutas */
app.get("/", (req, res) => {
  res.render("formulario");
});

app.get("/productos", async (req, res) => {
  let products = await contenedor.getAll();
  res.render("productos", { products });
});

/* Servidor */
const PORT = 8080;
const server = app.listen(PORT, () => {
  console.log(`Server is listening on port ${server.address().port}`);
});
server.on("error", (error) => console.error(error));
