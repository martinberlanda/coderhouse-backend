import express from "express";
import Products from "../classes/products.js";

const productos = express.Router();

let contenedor = new Products();

productos.get("/", async (req, res) => {
  console.log("aca anda")
  console.log(await contenedor.getAll())
  res.status(200).json(await contenedor.getAll());
});

productos.get("/:id", async (req, res) => {
  let id = parseInt(req.params.id);
  res.status(200).json(await contenedor.getById(id));
});

productos.post("/", async (req, res) => {
  let product = req.body;
  res.status(200).json(await contenedor.save(product));
});

productos.delete("/:id", async (req, res) => {
    let id = parseInt(req.params.id);
    res.status(200).json(await contenedor.deleteById(id));
  });

export default productos;
