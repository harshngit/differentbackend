
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API,
  authDomain: "diffclothing-56379.firebaseapp.com",
  projectId: "diffclothing-56379",
  storageBucket: "diffclothing-56379.firebasestorage.app",
  messagingSenderId: "519827435001",
  appId: "1:519827435001:web:52fe8855febfee419ca128",
  measurementId: "G-MFCSG70YD3"
};



const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const database = getDatabase(app)
export const storage = getStorage(app)
export const auth = getAuth()
