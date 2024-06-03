
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "reactchatapp-58a4d.firebaseapp.com",
  projectId: "reactchatapp-58a4d",
  storageBucket: "reactchatapp-58a4d.appspot.com",
  messagingSenderId: "645978184761",
  appId: "1:645978184761:web:747394f000d4e131e3c1e8"
};


const app = initializeApp(firebaseConfig);

export const auth  =  getAuth();
export const db = getFirestore();
export const storage = getStorage();