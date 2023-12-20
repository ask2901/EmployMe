// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {getAuth, sendPasswordResetEmail} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCgiE8rgCy5KPnuvvwOOcgJePe1mYx_eO0",
  authDomain: "employme-da413.firebaseapp.com",
  projectId: "employme-da413",
  storageBucket: "employme-da413.appspot.com",
  messagingSenderId: "252833940027",
  appId: "1:252833940027:web:14cce41f5e1f894fa1521e",
  measurementId: "G-PBRVWNP4NW",
};




// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore_db=getFirestore(app);

//Android : 409256310787-eiij03jhft2phuct385tshs4i3re2sod.apps.googleusercontent.com
//Package Name : com.ask2901.firstapp
//SHA : C3:21:76:99:02:AB:8A:0D:96:D6:31:B0:1B:13:4E:B0:EA:B8:A8:3F