import mongoose from "mongoose";
import { ProductSchema } from "./Product.model.js";

export const ShoppingCartSchema = new mongoose.Schema({
  timestamp: String,
  products: [ProductSchema],
});

export const ShoppingCartModel = mongoose.model(
  "shopping-carts",
  ShoppingCartSchema
);
