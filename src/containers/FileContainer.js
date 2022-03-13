import fileSystem from "fs";

export default class FileContainer {
  constructor(fileName) {
    this.fileName = fileName;
  }

  async accessFile() {
    return new Promise((resolve, reject) => {
      fileSystem.readFile(this.fileName, "utf8", (err, data) => {
        if (err) {
          try {
            fileSystem.writeFileSync(this.fileName, "[]");
            resolve(this.accessFile());
          } catch (error) {
            console.error(error);
            reject(error);
          }
        } else resolve(data);
      });
    });
  }

  async createOne(item) {
    try {
      let existingItems = JSON.parse(await this.accessFile());
      let id;

      if (existingItems.length === 0) id = 1;
      else id = existingItems[existingItems.length - 1].id + 1;

      existingItems.push({ ...item, id: id, timestamp: Date.now() });
      fileSystem.writeFileSync(
        this.fileName,
        JSON.stringify(existingItems),
        (error) => {
          if (error) throw new Error(error);
        }
      );
      return { ...item, id };
    } catch (error) {
      console.error(error);
    }
  }

  async findOne(id) {
    try {
      let existingItems = JSON.parse(await this.accessFile());
      let item = existingItems.find((item) => item.id === id);
      if (item) return item;
      else return { error: "The next id didn't match any object: " + id };
    } catch (error) {
      console.error(error);
    }
  }

  async updateOne(id, item) {
    try {
      let existingItems = JSON.parse(await this.accessFile());
      let itemExist = existingItems.find((item) => item.id === id);
      if (!itemExist)
        return { error: "The next id didn't match any object: " + id };

      const index = existingItems.findIndex((item) => item.id === id);
      existingItems[index] = { ...item, id, timestamp: Date.now() };

      fileSystem.writeFileSync(
        this.fileName,
        JSON.stringify(existingItems),
        (error) => {
          if (error) throw new Error(error);
        }
      );
    } catch (error) {
      console.error(error);
    }
  }

  async findAll() {
    try {
      return JSON.parse(await this.accessFile());
    } catch (error) {
      console.error(error);
    }
  }

  async deleteAll() {
    try {
      fileSystem.writeFileSync(this.fileName, JSON.stringify([]), (error) => {
        if (error) throw new Error(error);
      });
    } catch (error) {
      console.error(error);
    }
  }

  async deleteOne(id) {
    try {
      let existingItems = JSON.parse(await this.accessFile());
      let index = existingItems.findIndex((item) => item.id === id);
      existingItems.splice(index, 1);
      fileSystem.writeFileSync(
        this.fileName,
        JSON.stringify(existingItems),
        (error) => {
          if (error) throw new Error(error);
        }
      );
    } catch (error) {
      console.error(error);
    }
  }
}
