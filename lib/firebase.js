import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// seed file goes here
// import { seedDatabase } from '../seed';

const config = {
  apiKey: 'AIzaSyCaBmza-iALJ25vnnZ_15jK2qqu5mXRURk',
  authDomain: 'connecto-4b480.firebaseapp.com',
  projectId: 'connecto-4b480',
  storageBucket: 'connecto-4b480.appspot.com',
  messagingSenderId: '521063371289',
  appId: '1:521063371289:web:a378a2c40c83046c739088',
  measurementId: 'G-YVJW8D1SQS',
};

let firebase;

if (!Firebase.apps.length) firebase = Firebase.initializeApp(config);
else firebase = Firebase.app();

const { FieldValue } = Firebase.firestore;

// console.log('firebase', firebase);

export { firebase, FieldValue };
