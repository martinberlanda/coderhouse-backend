import express from "express";
import { shopingCartDao } from "../daos/index.js";

const shoppingCartRoute = express.Router();

const contenedor = new shopingCartDao["Archivo"]();

shoppingCartRoute.get("/:id/productos", async (req, res) => {
  let id = parseInt(req.params.id);
  res.status(200).json(await contenedor.getProductsById(id));
});

shoppingCartRoute.post("/", async (req, res) => {
  res.status(200).json(await contenedor.newShoppingCart());
});

shoppingCartRoute.post("/:id/productos", async (req, res) => {
  let product = req.body;
  let id = parseInt(req.params.id);
  res.status(200).json(await contenedor.addProduct(id, product));
});

shoppingCartRoute.delete("/:id", async (req, res) => {
  let id = parseInt(req.params.id);
  res.status(200).json(await contenedor.deleteById(id));
});

shoppingCartRoute.delete("/:id/productos/:id_prod", async (req, res) => {
  let id = parseInt(req.params.id);
  let productId = parseInt(req.params.id_prod);
  res.status(200).json(await contenedor.deleteProductById(id, productId));
});

export default shoppingCartRoute;
