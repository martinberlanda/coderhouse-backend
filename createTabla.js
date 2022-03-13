import { optionsSqlite3, optionsMariaDb } from "./src/utils/options.js";
import Knex from "knex";

let sqlite3 = Knex(optionsSqlite3);
let mariaDb = Knex(optionsMariaDb);

sqlite3.schema
  .createTable("products", (table) => {
    table.increments("id");
    table.string("title", 25).notNullable();
    table.string("price", 25).notNullable();
    table.string("pictureUrl", 25).notNullable();
    table.string("quantity", 25).notNullable();
    table.string("timestamp", 25).notNullable();
  })
  .then(() => {
    console.log("Tabla products creada");
  })
  .catch((error) => {
    console.log(error);
  })
  .finally(() => {
    sqlite3.destroy();
  });

sqlite3.schema
  .createTable("shopping-carts", (table) => {
    table.increments("id");
    table.string("timestamp", 25).notNullable();
  })
  .then(() => {
    console.log("Tabla shopping-carts creada");
  })
  .catch((error) => {
    console.log(error);
  })
  .finally(() => {
    sqlite3.destroy();
  });

mariaDb.schema
  .createTable("products", (table) => {
    table.increments("id");
    table.string("msg", 25).notNullable();
    table.string("email", 25).notNullable();
    table.string("pictureUrl", 25).notNullable();
    table.string("quantity", 25).notNullable();
    table.string("timestamp", 25).notNullable();
  })
  .then(() => {
    console.log("Tabla products creada");
  })
  .catch((error) => {
    console.log(error);
  })
  .finally(() => {
    mariaDb.destroy();
  });

mariaDb.schema
  .createTable("shopping-carts", (table) => {
    table.increments("id");
    table.string("timestamp", 25).notNullable();
  })
  .then(() => {
    console.log("Tabla shopping-carts creada");
  })
  .catch((error) => {
    console.log(error);
  })
  .finally(() => {
    mariaDb.destroy();
  });
