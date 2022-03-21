import express from "express";
import ProductMock from "../mocks/Product.mock.js";

const productsTestRoute = express.Router();

productsTestRoute.get("/", async (req, res) => {
  res.status(200).json(ProductMock.generateProducts(5));
});

export default productsTestRoute;
