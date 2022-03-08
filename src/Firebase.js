// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBzRBQcuOhDtigdn0p-hs8a9dvVj3L2hcs",
  authDomain: "vit-store-61388.firebaseapp.com",
  projectId: "vit-store-61388",
  storageBucket: "vit-store-61388.appspot.com",
  messagingSenderId: "1021413987716",
  appId: "1:1021413987716:web:99003f9c760580de1839d1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);