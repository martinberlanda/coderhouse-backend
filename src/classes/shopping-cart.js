import fs from "fs";

export default class ShoppingCart {
  constructor(nameFile = "shopping-cart.txt") {
    this.nameFile = nameFile;
  }

  async #accessFile() {
    return new Promise((resolve, reject) => {
      fs.readFile(this.nameFile, "utf8", (err, data) => {
        if (err) {
          try {
            fs.writeFileSync(this.nameFile, "[]");
            console.log("Archivo no encontrado, se creará uno nuevo");
            resolve(this.#accessFile()); // Recursividad
          } catch (error) {
            console.error(error);
            reject(error);
          }
        } else resolve(data);
      });
    });
  }

  async newShoppingCart() {
    try {
      let existingShoppingCarts = JSON.parse(await this.#accessFile());
      let newShoppingCartID;
      if (existingShoppingCarts.length === 0) newShoppingCartID = 1;
      else {
        newShoppingCartID =
          existingShoppingCarts[existingShoppingCarts.length - 1].id + 1;
      }
      let newShoppingCart = {
        products: [],
        id: newShoppingCartID,
        timestamp: Date.now()
      };
      existingShoppingCarts.push(newShoppingCart);
      fs.writeFileSync(
        this.nameFile,
        JSON.stringify(existingShoppingCarts),
        (error) => {
          if (error) throw new Error(error);
        }
      );
      return newShoppingCart;
    } catch (error) {
      console.error(error);
    }
  }

  async addProduct(id, product) {
    try {
      let existingShoppingCarts = JSON.parse(await this.#accessFile());

      let shoppingCart = existingShoppingCarts.find(
        (shoppingCart) => shoppingCart.id === id
      );

      if (!shoppingCart)
        return {
          error: "No se encontró el carrito con el id: " + id,
        };
      else {
        let productAlreadyExistInCart = shoppingCart.products.find(
          (producto) => producto.id === product.id
        );

        if (productAlreadyExistInCart)
          return {
            error: product.name + " ya se encuentra en el carrito",
          };
        else shoppingCart.products = [...shoppingCart.products, product];
      }

      existingShoppingCarts[id === shoppingCart.id] = shoppingCart;

      fs.writeFileSync(
        this.nameFile,
        JSON.stringify(existingShoppingCarts),
        (error) => {
          if (error) throw new Error(error);
        }
      );
      return shoppingCart;
    } catch (error) {
      console.error(error);
    }
  }

  async deleteProductById(id, productId) {
    try {
      let existingShoppingCarts = JSON.parse(await this.#accessFile());

      let shoppingCart = existingShoppingCarts.find(
        (shoppingCart) => shoppingCart.id === id
      );

      if (!shoppingCart)
        return {
          error: "No se encontró el carrito con el id: " + id,
        };
      else {
        shoppingCart.products = shoppingCart.products.filter(
          (producto) => producto.id != productId
        );
      }

      existingShoppingCarts[id === shoppingCart.id] = shoppingCart;

      fs.writeFileSync(
        this.nameFile,
        JSON.stringify(existingShoppingCarts),
        (error) => {
          if (error) throw new Error(error);
        }
      );
      return;
    } catch (error) {
      console.error(error);
    }
  }

  async getProductsById(id) {
    try {
      let existingShoppingCarts = JSON.parse(await this.#accessFile());
      let shoppingCart = existingShoppingCarts.find(
        (shoppingCart) => shoppingCart.id === id
      );
      if (shoppingCart.products) return shoppingCart.products;
      else
        return {
          error: "No se encontraron productos en el carrito con id: " + id,
        };
    } catch (error) {
      console.error(error);
    }
  }

  async getAll() {
    try {
      return JSON.parse(await this.#accessFile());
    } catch (error) {
      console.error(error);
    }
  }

  async deleteById(id) {
    try {
      let existingShoppingCarts = JSON.parse(await this.#accessFile());
      let index = existingShoppingCarts.findIndex((cart) => cart.id === id);
      existingShoppingCarts.splice(index, 1);
      fs.writeFileSync(
        this.nameFile,
        JSON.stringify(existingShoppingCarts),
        (error) => {
          if (error) throw new Error(error);
          console.log("Se eliminó el carrito con id: " + id);
        }
      );
    } catch (error) {
      console.error(error);
    }
  }
}
