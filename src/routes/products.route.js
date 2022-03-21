import express from "express";
import ProductoDaoMongoDb from "../daos/products.js";

const productsRoute = express.Router();

const container = new ProductoDaoMongoDb();

productsRoute.get("/", async (req, res) => {
  const items = await container.findAll();
  res.status(200).json(items);
});

productsRoute.get("/:id", async (req, res) => {
  const id = req.params.id;
  res.status(200).json(await container.findOne(id));
});

productsRoute.post("/", async (req, res) => {
  const item = req.body;
  res.status(200).json(await container.createOne(item));
});

productsRoute.post("/:id", async (req, res) => {
  const id = req.params.id;
  const item = req.body;
  res.status(200).json(await container.updateOne(id, item));
});

productsRoute.delete("/:id", async (req, res) => {
  const id = req.params.id;
  res.status(200).json(await container.deleteOne(id));
});

productsRoute.delete("/", async (req, res) => {
  res.status(200).json(await container.deleteAll());
});

export default productsRoute;
