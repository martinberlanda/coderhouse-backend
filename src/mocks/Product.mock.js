import {faker} from "@faker-js/faker"

class ProductMock {
  static generateProduct() {
    let product = {
      id: faker.datatype.uuid(),
      name: faker.commerce.productName(),
      price: faker.commerce.price(),
      quantity: faker.datatype.number(),
      pictureUrl: faker.image.imageUrl(),
    };

    return product;
  }

  static generateProducts(num) {
    let products = [];
    for (let i = 0; i < num; i++) {
      products.push(this.generateProduct());
    }
    return products;
  }
}

export default ProductMock;
