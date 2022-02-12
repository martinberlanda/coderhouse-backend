import fs from "fs";

export default class Products {
  constructor(nameFile = "products.txt") {
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

  async newProduct(objeto) {
    try {
      let existingProducts = JSON.parse(await this.#accessFile());
      let id;

      if (existingProducts.length === 0) id = 1;
      else id = existingProducts[existingProducts.length - 1].id + 1;

      existingProducts.push({ ...objeto, id: id, timestamp: Date.now() });
      fs.writeFileSync(
        this.nameFile,
        JSON.stringify(existingProducts),
        (error) => {
          if (error) throw new Error(error);
        }
      );
      return { ...objeto, id: id };
    } catch (error) {
      console.error(error);
    }
  }

  async getById(id) {
    try {
      let json = JSON.parse(await this.#accessFile());
      let producto = json.find((producto) => producto.id === id);
      if (producto) return producto;
      else return { error: "No se encontró el producto con id: " + id };
    } catch (error) {
      console.error(error);
    }
  }

  async saveProduct(id, product) {
    try {
      console.log(product)
      let products = JSON.parse(await this.#accessFile());
      let productExist = products.find((p) => p.id === id);
      if (!productExist)
        return { error: "No se encontró el producto con id: " + id };
    
      let index = products.findIndex((p) => p.id === id);
      products[index] = {...product, id, timestamp: Date.now()};

      fs.writeFileSync(this.nameFile, JSON.stringify(products), (error) => {
        if (error) throw new Error(error);
      });
      return product;
    } catch (error) {
      console.error(error);
    }
  }

  async getRandom() {
    try {
      let json = JSON.parse(await this.#accessFile());
      let randomProducto = json[Math.floor(Math.random() * json.length)];
      if (randomProducto) return randomProducto;
      else return null;
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

  async deleteAll() {
    try {
      fs.writeFileSync(this.nameFile, JSON.stringify([]), (error) => {
        if (error) throw new Error(error);
        console.log("Se eliminaron todos los productos");
      });
    } catch (error) {
      console.error(error);
    }
  }

  async deleteById(id) {
    try {
      let json = JSON.parse(await this.#accessFile());
      let index = json.findIndex((producto) => producto.id === id);
      json.splice(index, 1);
      fs.writeFileSync(this.nameFile, JSON.stringify(json), (error) => {
        if (error) throw new Error(error);
        console.log("Se eliminó el producto con id: " + id);
      });
    } catch (error) {
      console.error(error);
    }
  }
}
