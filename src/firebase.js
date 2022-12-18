// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDG35yL5Z1qfwsGgb1oegguHwM6GdF-99c",
  authDomain: "realtor-react-4e1c9.firebaseapp.com",
  projectId: "realtor-react-4e1c9",
  storageBucket: "realtor-react-4e1c9.appspot.com",
  messagingSenderId: "1076249216522",
  appId: "1:1076249216522:web:c88c9e7e58e05a0aa1c1f3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore()