import mongoose from "mongoose";
import { urlMongoDb } from "../utils/options.js";

export default class MongoDbContainer {
  constructor(Model) {
    this.Model = Model;
  }

  async createOne(item) {
    mongoose
      .connect(urlMongoDb)
      .then(async () => {
        try {
          const itemCreated = new this.Model(item);
          await itemCreated.save();
          return itemCreated;
        } catch (error) {
          console.error(`Error: ${error}`);
        } finally {
          mongoose.disconnect().catch((err) => {
            console.error(err);
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  async findOne(id) {
    mongoose
      .connect(urlMongoDb)
      .then(async () => {
        try {
          let item = await this.Model.findOne({ id });
          if (item) return item;
          else return { error: "The next id didn't match any object: " + id };
        } catch (error) {
          console.error(`Error: ${error}`);
        } finally {
          mongoose.disconnect().catch((err) => {
            console.error(err);
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  async updateOne(id, item) {
    mongoose.connect(urlMongoDb).then(async () => {
      try {
        await this.Model.updateOne({ _id: id }, { $set: item });
      } catch (error) {
        console.error(`Error: ${error}`);
      } finally {
        mongoose.disconnect().catch((err) => {
          console.error(err);
        });
      }
    });
  }

  async findAll() {
    mongoose.connect(urlMongoDb).then(async () => {
      try {
        const items = await this.Model.find();
        return items;
      } catch (error) {
        console.error(`Error: ${error}`);
      } finally {
        mongoose.disconnect().catch((err) => {
          console.error(err);
        });
      }
    });
  }

  async deleteAll() {
    mongoose.connect(urlMongoDb).then(async () => {
      try {
        await this.Model.deleteAll();
      } catch (error) {
        console.error(`Error: ${error}`);
      } finally {
        mongoose.disconnect().catch((err) => {
          console.error(err);
        });
      }
    });
  }

  async deleteOne(id) {
    mongoose.connect(urlMongoDb).then(async () => {
      try {
        await this.Model.deleteOne({ _id: id });
      } catch (error) {
        console.error(`Error: ${error}`);
      } finally {
        mongoose.disconnect().catch((err) => {
          console.error(err);
        });
      }
    });
  }
}
