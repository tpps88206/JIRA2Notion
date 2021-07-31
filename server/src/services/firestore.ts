import * as admin from 'firebase-admin';
import * as serviceAccount from '../configs/serviceAccountKey.json';

// Initialize Firestore
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as any),
});

// Connect Firestore database
const db = admin.firestore();

export const getUsers = async () => {
  try {
    const result: any = [];

    const usersRef = db.collection('users');
    const snapshot = await usersRef.get();

    snapshot.forEach(document => {
      result.push(document.data());
    });

    return result;
  } catch (error) {
    console.error(error);
  }
};

class Firestore {
  public Users: any | undefined;

  constructor() {}

  async init() {
    this.Users = this.Users ?? (await getUsers());
  }
}

export default new Firestore();
