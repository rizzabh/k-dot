// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBr8Le1ielwH2u-2DH57pAVfapllxgtzg4",
  authDomain: "k-chat-6d80d.firebaseapp.com",
  projectId: "k-chat-6d80d",
  storageBucket: "k-chat-6d80d.appspot.com",
  messagingSenderId: "419263486909",
  appId: "1:419263486909:web:40771dd7b72de9c90990d4",
  measurementId: "G-1S9FJH1EFW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);


