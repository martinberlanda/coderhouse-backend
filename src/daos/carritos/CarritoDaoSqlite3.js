import Sqlite3Container from "../../containers/Sqlite3Container.js";

export default class CarritoDaoSqlite3 extends Sqlite3Container {
  constructor() {
    super("shopping-cart");
  }
}
