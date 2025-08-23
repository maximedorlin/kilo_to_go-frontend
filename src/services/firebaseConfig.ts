// src/services/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyADGw8-CLbj-xatfcdpi-XA3Ls-5XBfn3U",
  authDomain: "kilotogo-db29f.firebaseapp.com",
  projectId: "kilotogo-db29f",
  storageBucket: "kilotogo-db29f.appspot.com",
  messagingSenderId: "422170439485",
  appId: "1:422170439485:web:7268f9de9beedef27d9f54"
};

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

// ✅ Exports nommés
export { firebaseApp, auth, db, storage };
