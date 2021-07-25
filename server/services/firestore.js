import admin from 'firebase-admin';

// As Abel said, ES Modules in Node >= 14 no longer have require by default.
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const serviceAccount = require('../configs/serviceAccountKey.json');

// Initialize Firestore
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Connect Firestore database
const db = admin.firestore();

export const getUsers = async () => {
  try {
    const result = [];

    const usersRef = db.collection('users');
    const snapshot = await usersRef.get();

    snapshot.forEach(document => {
      result.push(document.data());
    });

    return result;
  } catch (error) {
    console.error(error)
  }
};

class Firestore {
  constructor() {
    this.Users = undefined;
  }

  async init() {
    this.Users = this.Users ?? (await getUsers());
  }
}

export default new Firestore();
