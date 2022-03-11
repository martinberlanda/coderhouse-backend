import MariaDbContainer from "../../containers/MariaDbContainer.js";

export default class ProductosDaoMariaDb extends MariaDbContainer {
  constructor() {
    super("products");
  }
}
