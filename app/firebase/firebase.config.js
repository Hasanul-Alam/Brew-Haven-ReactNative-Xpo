// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCLhIEjDIzWnvMSyFJ7h9wnDoRyJe9W1i4",
  authDomain: "brew-haven-3efdb.firebaseapp.com",
  projectId: "brew-haven-3efdb",
  storageBucket: "brew-haven-3efdb.appspot.com",
  messagingSenderId: "125891197337",
  appId: "1:125891197337:web:1472c34833d30923993b08",
  measurementId: "G-7XDS0M0HC3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);