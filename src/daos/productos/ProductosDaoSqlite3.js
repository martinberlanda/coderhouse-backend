import Sqlite3Container from "../../containers/Sqlite3Container.js";

export default class ProductosDaoSqlite3 extends Sqlite3Container {
  constructor() {
    super("products");
  }
}
