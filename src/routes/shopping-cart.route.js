import express from "express";
import { shopingCartDao } from "../daos/index.js";

const shoppingCartRoute = express.Router();

const contenedor = new shopingCartDao[process.env.DATABASE]();

/* shoppingCartRoute.get("/:id/productos", async (req, res) => {
  let id = req.params.id
  res.status(200).json(await contenedor.getProductsById(id));
});

shoppingCartRoute.post("/", async (req, res) => {
  res.status(200).json(await contenedor.newShoppingCart());
});

shoppingCartRoute.post("/:id/productos", async (req, res) => {
  let product = req.body;
  let id = req.params.id;
  res.status(200).json(await contenedor.addProduct(id, product));
});

shoppingCartRoute.delete("/:id", async (req, res) => {
  let id = parseInt(req.params.id);
  res.status(200).json(await contenedor.deleteById(id));
});

shoppingCartRoute.delete("/:id/productos/:id_prod", async (req, res) => {
  let id = req.params.id;
  let productId = req.params.id_prod;
  res.status(200).json(await contenedor.deleteProductById(id, productId));
}); */

shoppingCartRoute.get("/", async (req, res) => {
  res.status(200).json(await contenedor.findAll());
});

shoppingCartRoute.get("/:id", async (req, res) => {
  let id = req.params.id;
  res.status(200).json(await contenedor.findOne(id));
});

shoppingCartRoute.post("/", async (req, res) => {
  if (req.headers.administrador === "true") {
    let item = req.body;
    res.status(200).json(await contenedor.createOne(item));
  } else {
    res.status(401).json({
      error: -1,
      description: "ruta 'carrito/' método 'POST' no autorizada",
    });
  }
});

shoppingCartRoute.post("/:id", async (req, res) => {
  if (req.headers.administrador == "true") {
    let id = req.params.id;
    let item = req.body;
    res.status(200).json(await contenedor.updateOne(id, item));
  } else {
    res.status(401).json({
      error: -1,
      description: "ruta 'carrito/id' método 'POST' no autorizada",
    });
  }
});

shoppingCartRoute.delete("/:id", async (req, res) => {
  if (req.headers.administrador === "true") {
    let id = req.params.id;
    res.status(200).json(await contenedor.deleteOne(id));
  } else
    res.status(401).json({
      error: -1,
      description: "ruta 'carrito/id' método 'DELETE' no autorizada",
    });
});

shoppingCartRoute.delete("/", async (req, res) => {
  if (req.headers.administrador === "true") {
    res.status(200).json(await contenedor.deleteAll());
  } else
    res.status(401).json({
      error: -1,
      description: "ruta 'carrito/' método 'DELETE' no autorizada",
    });
});

export default shoppingCartRoute;
