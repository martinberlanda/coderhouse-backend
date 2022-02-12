import express from "express";
import Products from "../classes/products.js";

const products = express.Router();

const contenedor = new Products();

products.get("/", async (req, res) => {
  res.status(200).json(await contenedor.getAll());
});

products.get("/:id", async (req, res) => {
  let id = parseInt(req.params.id);
  res.status(200).json(await contenedor.getById(id));
});

products.post("/", async (req, res) => {
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

products.post("/:id", async (req, res) => {
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

products.delete("/:id", async (req, res) => {
  if (req.headers.administrador === "true") {
    let id = parseInt(req.params.id);
    res.status(200).json(await contenedor.deleteById(id));
  } else
    res.status(401).json({
      error: -1,
      description: "ruta 'productos/id' método 'DELETE' no autorizada",
    });
});

export default products;
