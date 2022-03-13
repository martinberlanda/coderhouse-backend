import firebaseAdmin from "firebase-admin";
import { firebaseJson } from "../utils/options.js";

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(firebaseJson),
});

export default class FirebaseProxie {
  static FirebaseApp() {
    this.firebaseApp = this.firebaseApp || firebaseAdmin;
    return this.firebaseApp;
  }

  static Firestore() {
    this.firestore = this.firestore || this.FirebaseApp().firestore();
    return this.firestore;
  }

  static FirestoreCollection(collection) {
    return this.Firestore().collection(collection);
  }
}
