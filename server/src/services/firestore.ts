import * as admin from 'firebase-admin';

import * as serviceAccount from '../configs/serviceAccountKey.json';
import { User } from '../types/user';

// Initialize Firestore
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

// Connect Firestore database
const db: FirebaseFirestore.Firestore = admin.firestore();

export const getUsers: () => Promise<User[]> = async () => {
  try {
    const result: User[] = [];

    const usersRef: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData> = db.collection('users');
    const snapshot = await usersRef.get();

    snapshot.forEach((document: FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>) => {
      result.push(document.data() as User);
    });

    return result;
  } catch (error) {
    console.error(error);

    return [];
  }
};

class Firestore {
  public Users: User[] | undefined;

  constructor() {}

  async init() {
    this.Users = this.Users ?? (await getUsers());
  }
}

export default new Firestore();
