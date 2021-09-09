import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDX8HKfTKYXSCH6aldpbMgFCQA1fnK8tkM",
  authDomain: "notus-4d809.firebaseapp.com",
  projectId: "notus-4d809",
  storageBucket: "notus-4d809.appspot.com",
  messagingSenderId: "586982924616",
  appId: "1:586982924616:web:d8f49a282b2bcf46c2537d",
  measurementId: "G-8DK36BLZX8",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();
const auth = firebase.auth();

export default firebase;
export { auth, db };
