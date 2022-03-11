import MariaDbContainer from "../../containers/MariaDbContainer.js";

export default class CarritoDaoMariaDb extends MariaDbContainer {
  constructor() {
    super("shopping-cart");
  }
}
