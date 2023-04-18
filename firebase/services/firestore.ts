import { FirestoreUser } from '../entities/user';
import firebaseApp from '../config';
import { DocumentReference, addDoc, collection, doc, getDoc, getDocs, getFirestore, setDoc, updateDoc } from 'firebase/firestore';
import { Answer, Quiz } from 'firebase/entities/quiz';
import { FirebaseError } from 'firebase/app';

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
  async getUserAnswers(userId: string) {
    const userRef = doc(db, 'users', userId)
    const answersCollection = collection(userRef, 'answers')

    const answersSnap = await getDocs(answersCollection)
    const answers = answersSnap.docs.map(answer => {
      return answer.data() as Answer
    })
    
    return answers
  },
  async saveAnswers(userId: string, data: Answer) {
    const userRef = doc(db, 'users', userId)
    const userAnswersCollectionRef = collection(userRef, 'answers')
    let error = null

    try {
      const result = await addDoc(userAnswersCollectionRef, data)

      await updateDoc(result, {
        id: result.id
      })

      return {result, error}
    } catch (e) {
      if (e instanceof FirebaseError) {
        error = e.message
      } else {
        error = 'Unexpected error'
      }
      return {result: null, error}
    }
  }
}

export const quizAPI = {
  async getQuiz() {
    const docRef = doc(db, 'quizes', 'TwkmZZTxJedotBVapB6j')
    const quiz = await getDoc<Quiz>(docRef as DocumentReference<Quiz>)
    return quiz.data()
  }
}