import { FirestoreUser } from '../entities/user';
import firebaseApp from '../config';
import { CollectionReference, DocumentData, addDoc, collection, doc, getDoc, getDocs, getFirestore, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { Answer, AnswerToUpdate, Quiz } from 'firebase/entities/quiz';
import { FirebaseError } from 'firebase/app';

const db = getFirestore(firebaseApp);

const createCollection = <T = DocumentData>(collectionName: string) => {
  return collection(db, collectionName) as CollectionReference<T>
}

const usersCollection = createCollection<FirestoreUser>('users') 
const quizesCollection = createCollection<Quiz>('quizes')
const answersCollection = createCollection<Answer>('answers')

export const userAPI = {
  async getUser(id: string) {
    const docRef = doc(usersCollection, id)
    const user = await getDoc(docRef);
    return user.data();
  },
  async addUser(userData: FirestoreUser) {
    await setDoc(doc(usersCollection, userData.id), {
      ...userData
    })
  },
  async getUserAnswers(userId: string) {
    const q = query(answersCollection, where('userId', '==', userId))

    const answersSnap = await getDocs(q)
    const answers = answersSnap.docs.map(answer => {
      return answer.data()
    })
    
    return answers
  },
  async checkIfAlreadyAnswered(userId: string, quizId: string) {
    const q = query(answersCollection, where('userId', '==', userId), where("quizId", '==', quizId))
    const answersSnap = await getDocs(q)

    const answered = !answersSnap.empty
    return answered
  },
  async saveAnswers(data: Answer) {
    let error = null
    try {
      const createdAnswerRef = await addDoc(answersCollection, data)
      await updateDoc(createdAnswerRef, {
        id: createdAnswerRef.id
      })
  
      return {result: createdAnswerRef.id, error}
    } catch (e) {
      if (e instanceof FirebaseError) {
        error = e.message
      } else {
        error = 'Unexpected error'
      }
      return {result: null, error}
    }
  },
  async getUserAnswersById(answersId: string) {
    const answerDocRef = doc(answersCollection,answersId)
    
    let error = null
    let result = null

    try {
      const docSnap = await getDoc(answerDocRef)
      if(docSnap.exists()) {
        result = docSnap.data()
      } else {
        error = "Ваші відповіді не знайдено:("
      }

      return {result, error}
    } catch (e) {
      if (e instanceof FirebaseError) {
        error = e.message
      } else {
        error = 'Unexpected error'
      }
      return {result: null, error}
    }

  },
  async editAnswersById(answersId: string, data: AnswerToUpdate) {
    const answerDocRef = doc(answersCollection, answersId)

    let error = null
    
    try { 
      const docSnap = await getDoc(answerDocRef)
      if (docSnap.exists()) await updateDoc(answerDocRef, data)
      return {result: "OK", error: null}
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
  async getQuizes() {
    const quizesSnap = await getDocs(quizesCollection)
    const quizes = quizesSnap.docs.map(quiz => {
      return quiz.data()
    })
    return quizes
  },
  async getQuizById(quizId: string) {
    const docRef = doc(quizesCollection, quizId)
    const quiz = await getDoc(docRef)
    return quiz.data()
  }
}