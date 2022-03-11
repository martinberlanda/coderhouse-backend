import { Schema, model } from "mongoose";

const productSchema = new Schema({
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
});

const ProductModel = model("products", productSchema);

export default ProductModel;
