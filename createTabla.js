import options from "./utils/options.js";
import Knex from "knex";

let sqlite3 = Knex(options.optionsSqlite3);
let mariaDb = Knex(options.optionsMariaDb);

sqlite3.schema
  .createTable("products", (table) => {
    table.increments("id");
    table.string("title", 25).notNullable();
    table.string("price", 25).notNullable();
    table.string("thumbnail", 25).notNullable();
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

mariaDb.schema
  .createTable("messages", (table) => {
    table.increments("id");
    table.string("msg", 25).notNullable();
    table.string("email", 25).notNullable();
    table.string("date", 25).notNullable();
  })
  .then(() => {
    console.log("Tabla messages creada");
  })
  .catch((error) => {
    console.log(error);
  })
  .finally(() => {
    mariaDb.destroy();
  });
