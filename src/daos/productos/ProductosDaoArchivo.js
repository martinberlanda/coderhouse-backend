import FileContainer from "../../containers/FileContainer.js";

export default class ProductosDaoArchivo extends FileContainer {
  constructor() {
    super("products.txt");
  }

}