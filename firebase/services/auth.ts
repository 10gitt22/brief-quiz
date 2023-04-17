import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut as signOutFirebase} from "firebase/auth";
import { auth } from "../config";
import { FirestoreUser } from "../entities/user";
import { userAPI } from "./firestore";
import { FirebaseError } from "firebase/app";

export async function signUp(data: { name: string, email: string, password: string }) {
  const { name, email, password } = data
  let error = null
  try {
    const createdUser = await createUserWithEmailAndPassword(auth, email, password)

    const userForFirestore: FirestoreUser = {
      id: createdUser.user.uid,
      email: email,
      name: name,
      role: 'user',
    }

    await userAPI.addUser(userForFirestore);
    return {result: createdUser, error}

  } catch (e) {
    if (e instanceof FirebaseError) {
      error = e.message
    } else {
      error = 'Unexpected error'
    }
    return {result: null, error}
  }
}

export async function logIn(email: string, password: string) {
  let error = null
  try {
    const result = await signInWithEmailAndPassword(auth, email, password)
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

export async function signOut() {
  let error = null
  try {
    const result = await signOutFirebase(auth)
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