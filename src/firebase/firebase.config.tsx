// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import firebase from "firebase/compat/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyAV0lo9tXl4kG7loC6bkSEVYi5b1DM1-u0",
  authDomain: "bizdesire-ca76e.firebaseapp.com",
  projectId: "bizdesire-ca76e",
  storageBucket: "bizdesire-ca76e.appspot.com",
  messagingSenderId: "59379158128",
  appId: "1:59379158128:web:1c2562754d651ddf63b8b5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const firestore = getFirestore(app);

export default firebase;
export { db };
