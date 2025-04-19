// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBAykRr_CvjBpKIQlCeYGroS5Bk8cq20qw",
  authDomain: "econest-2d21b.firebaseapp.com",
  projectId: "econest-2d21b",
  storageBucket: "econest-2d21b.firebasestorage.app",
  messagingSenderId: "1042262663698",
  appId: "1:1042262663698:web:ee1d33385aee6ea59eaecb",
  measurementId: "G-KJJG38SVJ3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };