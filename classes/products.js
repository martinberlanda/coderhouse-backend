import options from "../utils/options.js";
import Knex from "knex";

export default class Products {
  async save(objeto) {
    const knex = Knex(options.optionsSqlite3);
    let id = await knex("products")
      .insert(objeto)
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        knex.destroy();
      });

    return { ...objeto, id };
  }

  async getById(id) {
    const knex = Knex(options.optionsSqlite3);
    const product = await knex
      .from("products")
      .select("*")
      .where("id", id)
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        knex.destroy();
      });

    return product;
  }

  async getAll() {
    const knex = Knex(options.optionsSqlite3);
    const products = await knex
      .from("products")
      .select("*")
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        knex.destroy();
      });

    return products;
  }

  async deleteAll() {
    const knex = Knex(options.optionsSqlite3);
    await knex
      .from("products")
      .del()
      .then(() => {
        console.log(`Productos eliminados`);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        knex.destroy();
      });
  }

  async deleteById(id) {
    const knex = Knex(options.optionsSqlite3);
    await knex
      .from("products")
      .where("id", id)
      .del()
      .then(() => {
        console.log(`Producto con id ${id} eliminado`);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        knex.destroy();
      });
  }
}
