// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    getFirestore
} from '@firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA69G7C7FmSQpCSn8ZolhMpsFLY8WTiCoE",
    authDomain: "to-do-list-345810.firebaseapp.com",
    projectId: "to-do-list-345810",
    storageBucket: "to-do-list-345810.appspot.com",
    messagingSenderId: "82230882360",
    appId: "1:82230882360:web:1c9041f81f6e4ce7f776cd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)