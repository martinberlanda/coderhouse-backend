import MongoDbContainer from "../../containers/MongoDbContainer.js";
import { ShoppingCartModel } from "../../models/ShoppingCart.model.js";

export default class CarritoDaoMongoDb extends MongoDbContainer {
  constructor() {
    super(ShoppingCartModel);
  }
}
