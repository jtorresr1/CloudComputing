import firebase from 'firebase/app'
import 'firebase/firestore'

// firebase init
var firebaseConfig = {
  apiKey: "AIzaSyDBd1req9foamAWs9AzbSqMOrEPlmRlRA8",
  authDomain: "sistemaregistroclo.firebaseapp.com",
  databaseURL: "https://sistemaregistroclo-default-rtdb.firebaseio.com",
  projectId: "sistemaregistroclo",
  storageBucket: "sistemaregistroclo.appspot.com",
  messagingSenderId: "332991578711",
  appId: "1:332991578711:web:58f463f5d7c17e4d7d1912",
  measurementId: "G-KB5F8QQFZ2"
};

export default firebase.initializeApp(firebaseConfig);
/*
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// utils
const db = firebase.firestore()

// collection references
const usersCollection = db.collection('users')
const MouseCollection = db.collection('mouse')
const KeyboardCollection = db.collection('teclados')
const SellsCollection = db.collection('ventas')

// export utils/refs
export {
  db,
  usersCollection,
  MouseCollection,
  KeyboardCollection,
  SellsCollection
}
*/
