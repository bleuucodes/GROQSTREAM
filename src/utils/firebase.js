// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCQl7c3ZqyaEabYVKBuMFfLWa47ROp1Jwo",
  authDomain: "netflixgpt-d3489.firebaseapp.com",
  projectId: "netflixgpt-d3489",
  storageBucket: "netflixgpt-d3489.firebasestorage.app",
  messagingSenderId: "298989063605",
  appId: "1:298989063605:web:26bf1633694fcadc52ddfc",
  measurementId: "G-9KNXL8SYBX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();