import express from "express";
import Contenedor from "../classes/contenedor.js";

const productos = express.Router();

let contenedor = new Contenedor("productos.txt");

productos.get("/", async (req, res) => {
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
