// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import {
  getAuth,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDAUEF78ssMc3h7jAv3X_XIouKR0_pHTZk",
  authDomain: "remider-ai-2ed1c.firebaseapp.com",
  projectId: "remider-ai-2ed1c",
  storageBucket: "remider-ai-2ed1c.firebasestorage.app",
  messagingSenderId: "489913769050",
  appId: "1:489913769050:web:2afe9ac58982001b674c63",
  measurementId: "G-NJ4GGXXYX9",
};

// Initialize Firebase
// Проверяем, инициализировано ли уже приложение (защита от Fast Refresh)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
// export const auth = getAuth(app)
export const db = getFirestore(app);
export const auth = getAuth(app);