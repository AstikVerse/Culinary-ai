
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, onSnapshot, collection, query, where, getDoc } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";

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

export const login = (email: string, pass: string) => signInWithEmailAndPassword(auth, email, pass);
export const signup = (email: string, pass: string) => createUserWithEmailAndPassword(auth, email, pass);
export const logout = () => signOut(auth);

// Helper for Shopping List
export const saveShoppingList = async (uid: string, items: any[]) => {
  await setDoc(doc(db, "shoppingLists", uid), { items, updatedAt: new Date().toISOString() });
};

export const syncShoppingList = (uid: string, callback: (items: any[]) => void) => {
  return onSnapshot(doc(db, "shoppingLists", uid), (doc) => {
    if (doc.exists()) {
      callback(doc.data()?.items || []);
    } else {
      callback([]);
    }
  });
};

// Helper for Chef Bookings
export const syncUserBookings = (uid: string, callback: (bookings: any[]) => void) => {
  const q = query(collection(db, "bookings"), where("userId", "==", uid));
  return onSnapshot(q, (snapshot) => {
    const bookings = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(bookings);
  });
};
