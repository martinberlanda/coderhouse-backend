import ProductosDaoSqlite3 from "./productos/ProductosDaoSqlite3.js";
import ProductosDaoMariaDb from "./productos/ProductosDaoMariaDb.js";
import ProductosDaoMemoria from "./productos/ProductosDaoMemoria.js";
import ProductosDaoArchivo from "./productos/ProductosDaoArchivo.js";
// import ProductosDaoMongoDb from "./productos/ProductosDaoMongoDb.js";
// import ProductosDaoFirebase from "./productos/ProductosDaoFirebase.js";

import CarritoDaoSqlite3 from "./carritos/CarritoDaoSqlite3.js";
import CarritoDaoMariaDb from "./carritos/CarritoDaoMariaDb.js";
import CarritoDaoMemoria from "./carritos/CarritoDaoMemoria.js";
import CarritoDaoArchivo from "./carritos/CarritoDaoArchivo.js";
// import CarritoDaoMongoDb from "./carritos/CarritoDaoMongoDb.js";
// import CarritoDaoFirebase from "./carritos/CarritoDaoFirebase.js";

export const productDao = { 
    Sqlite3: ProductosDaoSqlite3,
    MariaDb: ProductosDaoMariaDb,
    Memoria: ProductosDaoMemoria,   
    Archivo: ProductosDaoArchivo,
    //MongoDb: ProductosDaoMongoDb,
    //Firebase: ProductosDaoFirebase
}

export const shopingCartDao = {
    Sqlite3: CarritoDaoSqlite3,
    MariaDb: CarritoDaoMariaDb,
    Memoria: CarritoDaoMemoria,
    Archivo: CarritoDaoArchivo,
    //MongoDb: CarritoDaoMongoDb,
    //Firebase: CarritoDaoFirebase
};

