import express from "express";
import { productDao } from "../daos/index.js";

const productsRoute = express.Router();
const contenedor = new productDao[process.env.DATABASE]();

productsRoute.get("/", async (req, res) => {
  res.status(200).json(await contenedor.findAll());
});

productsRoute.get("/:id", async (req, res) => {
  let id = req.params.id;
  res.status(200).json(await contenedor.findOne(id));
});

productsRoute.post("/", async (req, res) => {
  if (req.headers.administrador === "true") {
    let item = req.body;
    res.status(200).json(await contenedor.createOne(item));
  } else {
    res.status(401).json({
      error: -1,
      description: "ruta 'productos/' método 'POST' no autorizada",
    });
  }
});

productsRoute.post("/:id", async (req, res) => {
  if (req.headers.administrador == "true") {
    let id = req.params.id;
    let item = req.body;
    res.status(200).json(await contenedor.updateOne(id, item));
  } else {
    res.status(401).json({
      error: -1,
      description: "ruta 'productos/id' método 'POST' no autorizada",
    });
  }
});

productsRoute.delete("/:id", async (req, res) => {
  if (req.headers.administrador === "true") {
    let id = req.params.id;
    res.status(200).json(await contenedor.deleteOne(id));
  } else
    res.status(401).json({
      error: -1,
      description: "ruta 'productos/id' método 'DELETE' no autorizada",
    });
});

productsRoute.delete("/", async (req, res) => {
  if (req.headers.administrador === "true") {
    res.status(200).json(await contenedor.deleteAll());
  } else
    res.status(401).json({
      error: -1,
      description: "ruta 'productos/' método 'DELETE' no autorizada",
    });
});

export default productsRoute;
