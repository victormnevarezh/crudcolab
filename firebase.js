// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-firestore.js";

// Your web app's Firebase configuration
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDVuZAXGtkRzLYMXT5bMgdED96NO_OHKvo",
    authDomain: "crud-descolab.firebaseapp.com",
    projectId: "crud-descolab",
    storageBucket: "crud-descolab.appspot.com",
    messagingSenderId: "991205802962",
    appId: "1:991205802962:web:cf266bb445763970087e0b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore();

/**
 * Save a New Game in Firestore
 * @param {string} title
 * @param {string} genre
 * @param {string} price
 * @param {string} releaseYear
 * @param {string} developer
 */
export const saveGame = (title, genre, price, releaseYear, developer) =>
  addDoc(collection(db, "SteamCatalog"), { title, genre, price, releaseYear, developer });

export const onGetGames = (callback) =>
  onSnapshot(collection(db, "SteamCatalog"), callback);

/**
 *
 * @param {string} id
 */
export const deleteGame = (id) => deleteDoc(doc(db, "SteamCatalog", id));

export const getGame = (id) => getDoc(doc(db, "SteamCatalog", id));

export const updateGame = (id, newFields) =>
  updateDoc(doc(db, "SteamCatalog", id), newFields);

export const getGames = () => getDocs(collection(db, "SteamCatalog"));