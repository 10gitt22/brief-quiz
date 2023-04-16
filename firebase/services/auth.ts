import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut as signOutFirebase} from "firebase/auth";
import { auth } from "../config";
import { FirestoreUser } from "../entities/user";
import { userAPI } from "./firestore";

export async function signUp(data: { name: string, email: string, password: string }) {
  const { name, email, password } = data
  try {
    const createdUser = await createUserWithEmailAndPassword(auth, email, password)

    const userForFirestore: FirestoreUser = {
      id: createdUser.user.uid,
      email: email,
      name: name,
      role: 'user',
    }

    await userAPI.addUser(userForFirestore);
    return createdUser
  } catch (error) {
    return 'Error'
  }
}

export async function logIn(email: string, password: string) {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password)
    return result
  } catch (error) {
    return 'Error'
  }
}

export async function signOut() {
  try {
    const result = await signOutFirebase(auth)
    return result
  } catch (error) {
    return 'Error'
  }
}