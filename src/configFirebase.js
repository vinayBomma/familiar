import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBb65dc9umHZ3Z0eaf0Sd_MLumHorZEudk",
  authDomain: "familiar-293013.firebaseapp.com",
  databaseURL: "https://familiar-293013.firebaseio.com",
  projectId: "familiar-293013",
  storageBucket: "familiar-293013.appspot.com",
  messagingSenderId: "120451297244",
  appId: "1:120451297244:web:ddc2e304adfc425c812919",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const db = firebaseApp.firestore();
