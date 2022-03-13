import { optionsMariaDb } from "../utils/options.js";
import Knex from "knex";

export default class MariaDbContainer {
  constructor(table) {
    this.table = table;
  }

  async createOne(item) {
    const knex = Knex(optionsMariaDb);
    let id = await knex(table)
      .insert(item)
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        knex.destroy();
      });

    return { ...item, id };
  }

  async updateOne(id, item) {
    const knex = Knex(optionsSqlite3);
    await knex(table)
      .where("id", id)
      .update(item)
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        knex.destroy();
      });
  }

  async findOne(id) {
    const knex = Knex(optionsMariaDb);
    const item = await knex
      .from(table)
      .select("*")
      .where("id", id)
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        knex.destroy();
      });

    return item;
  }

  async findAll() {
    const knex = Knex(optionsMariaDb);
    const items = await knex
      .from(table)
      .select("*")
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        knex.destroy();
      });

    return items;
  }

  async deleteAll() {
    const knex = Knex(optionsMariaDb);
    await knex
      .from(table)
      .del()
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        knex.destroy();
      });
  }

  async deleteOne(id) {
    const knex = Knex(optionsMariaDb);
    await knex
      .from(table)
      .where("id", id)
      .del()
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        knex.destroy();
      });
  }
}
