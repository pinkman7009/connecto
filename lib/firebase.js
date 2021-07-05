import Firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import config from "../config/firebaseConfig";

// seed file goes here
// import { seedDatabase } from '../seed';

let firebase;

if (!Firebase.apps.length) firebase = Firebase.initializeApp(config);
else firebase = Firebase.app();

const { FieldValue } = Firebase.firestore;

// console.log('firebase', firebase);

export { firebase, FieldValue };
