// src/services/authService.js
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { firebaseApp } from "./firebaseConfig"; // ✅ import nommé

const auth = getAuth(firebaseApp); // ✅ bien initialisé avec firebaseApp

// Inscription
interface RegisterUserParams {
  email: string;
  password: string;
}

export const registerUser = async (
  email: RegisterUserParams["email"],
  password: RegisterUserParams["password"]
): Promise<import("firebase/auth").User> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

// Connexion
interface LoginUserParams {
  email: string;
  password: string;
}

interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  // Add other properties from Firebase User if needed
}

export const loginUser = async (
  email: LoginUserParams["email"],
  password: LoginUserParams["password"]
): Promise<AuthUser> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const { uid, email: userEmail, displayName } = userCredential.user;
    return { uid, email: userEmail, displayName };
  } catch (error) {
    throw error;
  }
};

// Déconnexion
export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};
