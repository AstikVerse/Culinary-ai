// Standard modular Firebase imports for v9+ SDK
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyC2mbFLTxsbVLAezIAmgDU0j9zaDEaQMvE",
  authDomain: "culinaryai-20d5b.firebaseapp.com",
  projectId: "culinaryai-20d5b",
  storageBucket: "culinaryai-20d5b.firebasestorage.app",
  messagingSenderId: "269198070372",
  appId: "1:269198070372:web:8e5a369f615bb8405e0571",
  measurementId: "G-KSRE8FRF7X"
};

// Initialize the Firebase instance using the modular approach
// Fixed: Using the correct modular import for initializeApp from 'firebase/app'
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);