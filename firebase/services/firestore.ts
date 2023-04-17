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
  },
  async getUserQuizes(userId: string) {
    const userRef = doc(db, 'users', userId)
    const quizesCollection = collection(userRef, 'quizes')

    const quizesSnap = await getDocs(quizesCollection)
    const quizes = quizesSnap.docs.map(quiz => {
      return quiz.data()
    })
    
    return quizes
  }
}

export const quizAPI = {
  async getQuiz() {
    const docRef = doc(db, 'quizes', '7C02UxWR6mUjMYQ9OyDz')
    const quiz = await getDoc(docRef)
    return quiz.data()
  }
}