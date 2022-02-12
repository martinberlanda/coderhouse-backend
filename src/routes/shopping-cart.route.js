import express from "express";
import ShoppingCart from "../classes/shopping-cart.js";
import Products from "../classes/products.js";

const products = express.Router();

const contenedor = new ShoppingCart();

products.get("/:id/productos", async (req, res) => {
  let id = parseInt(req.params.id);
  res.status(200).json(await contenedor.getProductsById(id));
});

products.post("/", async (req, res) => {
  res.status(200).json(await contenedor.newShoppingCart());
});

products.post("/:id/productos", async (req, res) => {
  let product = req.body;
  let id = parseInt(req.params.id);
  res.status(200).json(await contenedor.addProduct(id, product));
});

products.delete("/:id", async (req, res) => {
  let id = parseInt(req.params.id);
  res.status(200).json(await contenedor.deleteById(id));
});

products.delete("/:id/productos/:id_prod", async (req, res) => {
  let id = parseInt(req.params.id);
  let productId = parseInt(req.params.id_prod);
  res.status(200).json(await contenedor.deleteProductById(id, productId));
});

export default products;
