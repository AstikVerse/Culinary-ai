
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// Replace these placeholders with your actual Firebase project configuration from the Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyC2mbFLTxsbVLAezIAmgDU0j9zaDEaQMvE",
  authDomain: "culinaryai-20d5b.firebaseapp.com",
  projectId: "culinaryai-20d5b",
  storageBucket: "culinaryai-20d5b.firebasestorage.app",
  messagingSenderId: "269198070372",
  appId: "1:269198070372:web:8e5a369f615bb8405e0571",
  measurementId: "G-KSRE8FRF7X"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
