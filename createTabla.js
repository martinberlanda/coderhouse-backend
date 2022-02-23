import options from "./utils/options.js";
import Knex from "knex";

let knexSqlite3 = Knex(options.optionsSqlite3);
let knexMariaDb = Knex(options.optionsMariaDb);

knexSqlite3.schema
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
    knexSqlite3.destroy();
  });

knexMariaDb.schema
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
    knexMariaDb.destroy();
  });
