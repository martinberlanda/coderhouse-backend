import { Schema, model } from "mongoose";

const shoppingCartSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  msg: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

const ShoppingCartModel = model("shopping-carts", shoppingCartSchema);

export default ShoppingCartModel;
