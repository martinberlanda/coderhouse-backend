import mongoose from "mongoose";
const urlMongoDb = "mongodb://localhost:27017/ecommerce";

export default class MongoDbContainer {
  constructor(Model) {
    this.Model = Model;
  }

  async createOne(item) {
    let newItem;
    mongoose
      .connect(urlMongoDb)
      .then(async () => {
        try {
          newItem = new this.Model(item);
          await newItem.save();
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
    return newItem;
  }

  async findOne(id) {
    let item;
    await mongoose
      .connect(urlMongoDb)
      .then(async () => {
        try {
          item = await this.Model.findOne({ id });
        } catch (error) {
          console.error(`Error: ${error}`);
        } finally {
          await mongoose.disconnect().catch((err) => {
            console.error(err);
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });

      if (item) return item;
      else return { error: "The next id didn't match any object: " + id };
  }

  async updateOne(id, item) {
    await mongoose.connect(urlMongoDb).then(async () => {
      try {
        await this.Model.updateOne({ _id: id }, { $set: item });
      } catch (error) {
        console.error(`Error: ${error}`);
      } finally {
        await mongoose.disconnect().catch((err) => {
          console.error(err);
        });
      }
    });
  }

  async findAll() {
    let items;
    await mongoose.connect(urlMongoDb).then(async () => {
      try {
        items = await this.Model.find();
      } catch (error) {
        console.error(`Error: ${error}`);
      } finally {
        await mongoose.disconnect().catch((err) => {
          console.error(err);
        });
      }
    });
    return items;
  }

  async deleteAll() {
    await mongoose.connect(urlMongoDb).then(async () => {
      try {
        await this.Model.deleteAll();
      } catch (error) {
        console.error(`Error: ${error}`);
      } finally {
        await mongoose.disconnect().catch((err) => {
          console.error(err);
        });
      }
    });
  }

  async deleteOne(id) {
    await mongoose.connect(urlMongoDb).then(async () => {
      try {
        await this.Model.deleteOne({ _id: id });
      } catch (error) {
        console.error(`Error: ${error}`);
      } finally {
        await mongoose.disconnect().catch((err) => {
          console.error(err);
        });
      }
    });
  }
}
