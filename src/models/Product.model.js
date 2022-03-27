import mongoose from "mongoose";

export const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    quantity: {
      type: String,
      required: true,
    },
    pictureUrl: String,
    timestamp: String,
  },
  {
    versionKey: false,
  }
);

export const ProductModel = mongoose.model("products", ProductSchema);
