import { FirestoreUser } from '../entities/user';
import firebaseApp from '../config';
import { DocumentReference, collection, doc, getDoc, getDocs, getFirestore, setDoc } from 'firebase/firestore';

const db = getFirestore(firebaseApp);

export const userAPI = {
  async getUser(id: string) {
    const docRef = doc(db, "users", id)
    const user = await getDoc<FirestoreUser>(docRef as DocumentReference<FirestoreUser>);
    return user.data();
  },
  async addUser(userData: FirestoreUser) {
    await setDoc(doc(db, 'users', userData.id), {
      ...userData
    })
  }
}

