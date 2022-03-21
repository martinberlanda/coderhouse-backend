import MongoDbContainer from "../containers/MongoDbContainer.js";
import { ProductModel } from "../models/Product.model.js";

export default class ProductoDaoMongoDb extends MongoDbContainer {
  constructor() {
    super(ProductModel);
  }
}
