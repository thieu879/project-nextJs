// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.VITE_KEY_FIREBASE,
  authDomain: "nextjs-88ab1.firebaseapp.com",
  projectId: "nextjs-88ab1",
  storageBucket: "nextjs-88ab1.appspot.com",
  messagingSenderId: "993863198118",
  appId: "1:993863198118:web:62158ce88437e9f3e6db67"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);