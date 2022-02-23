import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const optionsSqlite3 = {
  client: "better-sqlite3",
  connection: {
    filename: path.resolve(__dirname, "./DB/ecommerce/ecommerce.db3"),
  },
  useNullAsDefault: true,
};

const optionsMariaDb = {
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "ecommerce",
  },
};

const exportedMethods = { optionsSqlite3, optionsMariaDb };

export default exportedMethods;
