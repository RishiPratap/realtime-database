// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getDatabase} from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "authentication-mobile-3cc47.firebaseapp.com",
  databaseURL: "https://authentication-mobile-3cc47-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "authentication-mobile-3cc47",
  storageBucket: "authentication-mobile-3cc47.appspot.com",
  messagingSenderId: "523915334890",
  appId: "1:523915334890:web:40a0a80fe759d9d6a2b393"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);