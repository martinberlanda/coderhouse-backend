import MongoDbContainer from "../containers/MongoDbContainer.js";
import { MessageModel } from "../models/Messages.model.js";

export default class MensajeDaoMongoDb extends MongoDbContainer {
  constructor() {
    super(MessageModel);
  }
}
