import express from "express";
import { productDao } from "../daos/index.js";

const productsRoute = express.Router();
const contenedor = new productDao["Archivo"]();

productsRoute.get("/", async (req, res) => {
  res.status(200).json(await contenedor.findAll());
});

productsRoute.get("/:id", async (req, res) => {
  let id = parseInt(req.params.id);
  res.status(200).json(await contenedor.getById(id));
});

productsRoute.post("/", async (req, res) => {
  if (req.headers.administrador === "true") {
    let product = req.body;
    res.status(200).json(await contenedor.newProduct(product));
  } else {
    res.status(401).json({
      error: -1,
      description: "ruta 'productos/' método 'POST' no autorizada",
    });
  }
});

productsRoute.post("/:id", async (req, res) => {
  if (req.headers.administrador == "true") {
    let id = parseInt(req.params.id);
    let product = req.body;
    res.status(200).json(await contenedor.saveProduct(id, product));
  } else {
    res.status(401).json({
      error: -1,
      description: "ruta 'productos/id' método 'POST' no autorizada",
    });
  }
});

productsRoute.delete("/:id", async (req, res) => {
  if (req.headers.administrador === "true") {
    let id = parseInt(req.params.id);
    res.status(200).json(await contenedor.deleteById(id));
  } else
    res.status(401).json({
      error: -1,
      description: "ruta 'productos/id' método 'DELETE' no autorizada",
    });
});

export default productsRoute;
