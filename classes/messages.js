import options from "../utils/options.js";
import Knex from "knex";

export default class Messages {
  async save(objeto) {
    const knex = Knex(options.optionsMariaDb);
    let id = await knex("messages")
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
    const knex = Knex(options.optionsMariaDb);
    const product = await knex
      .from("messages")
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
    const knex = Knex(options.optionsMariaDb);
    const products = await knex
      .from("messages")
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
    const knex = Knex(options.optionsMariaDb);
    await knex
      .from("messages")
      .del()
      .then(() => {
        console.log(`Mensajes eliminados`);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        knex.destroy();
      });
  }

  async deleteById(id) {
    const knex = Knex(options.optionsMariaDb);
    await knex
      .from("messages")
      .where("id", id)
      .del()
      .then(() => {
        console.log(`Mensaje con id ${id} eliminado`);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        knex.destroy();
      });
  }
}
