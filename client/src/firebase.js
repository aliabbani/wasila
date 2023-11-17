// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "wasila-fd0eb.firebaseapp.com",
  projectId: "wasila-fd0eb",
  storageBucket: "wasila-fd0eb.appspot.com",
  messagingSenderId: "1086975400971",
  appId: "1:1086975400971:web:6213e86c73eda635443b0e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);