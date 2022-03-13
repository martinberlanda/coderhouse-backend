import FirebaseProxie from "../proxies/firebaseProxie.js";

export default class FirebaseContainer {
  constructor(collection) {
    this.collection = collection;
  }

  async createOne(item) {
    try {
      let doc = await FirebaseProxie.FirestoreCollection(this.collection).add(
        item
      );
      return { ...item, id: doc.id };
    } catch (error) {
      console.error(error);
    }
  }

  async findOne(id) {
    try {
      const doc = await FirebaseProxie.FirestoreCollection(this.collection).doc(id).get();
      return { ...doc.data(), id: doc.id };
    } catch (error) {
      console.error(error);
    }
  }

  async updateOne(id, item) {
    try {
      await FirebaseProxie.FirestoreCollection(this.collection).doc(id).update(item);
    } catch (error) {
      console.error(error);
    }
  }

  async findAll() {
    try {
      const items = await FirebaseProxie.FirestoreCollection(this.collection).get();
      return items.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    } catch (error) {
      console.error(error);
    }
  }

  async deleteAll() {
    try {
      const items = await FirebaseProxie.FirestoreCollection(this.collection).get();
      items.forEach(doc => doc.ref.delete());
    } catch (error) {
      console.error(error);
    }
  }

  async deleteOne(id) {
    try {
      await FirebaseProxie.FirestoreCollection(this.collection).doc(id).delete();
    } catch (error) {
      console.error(error);
    }
  }
}
