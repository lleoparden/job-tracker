import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "./firebase";

export const signIn = async (email, password) => {
  const credential = await signInWithEmailAndPassword(auth, email, password);
  return credential.user;
};

export const register = async (email, password) => {
  const credential = await createUserWithEmailAndPassword(auth, email, password);
  return credential.user;
};

export const logOut = async () => {
  await signOut(auth);
};