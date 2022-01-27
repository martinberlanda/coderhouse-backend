import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import productos from "./routes/products.route.js";

/* Instancia de express */
const app = express();

/* Middlewares */
app.use(morgan("tiny"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use("/api/productos", productos);

/* Servidor */
const PORT = 8080;
const server = app.listen(PORT, () => {
  console.log(`Server is listening on port ${server.address().port}`);
});
server.on("error", (error) => console.error(error));
