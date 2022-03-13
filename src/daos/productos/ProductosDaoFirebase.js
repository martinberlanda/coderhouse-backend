import FirebaseContainer from "../../containers/FirebaseContainer.js";

export default class ProductoDaoFirebase extends FirebaseContainer {
  constructor() {
    super("products");
  }
}
