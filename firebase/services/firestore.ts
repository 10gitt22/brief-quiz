import { FirestoreUser } from '../entities/user';
import firebaseApp from '../config';
import { DocumentReference, collection, doc, getDoc, getDocs, getFirestore, setDoc } from 'firebase/firestore';
import { Quiz } from 'firebase/entities/quiz';

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
    const docRef = doc(db, 'quizes', 'TwkmZZTxJedotBVapB6j')
    const quiz = await getDoc<Quiz>(docRef as DocumentReference<Quiz>)
    return quiz.data()
  }
}