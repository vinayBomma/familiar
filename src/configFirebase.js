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

// firebase.auth().onAuthStateChanged(user => {
//   if (user) {
//       let Useruid = user.uid
//       firebase.firestore().enablePersistence()
//           .catch(function (err) {
//               if (err.code == 'failed-precondition') {
//                   // Multiple tabs open, persistence can only be enabled
//                   // in one tab at a a time.
//                   // ...
//               } else if (err.code == 'unimplemented') {
//                   // The current browser does not support all of the
//                   // features required to enable persistence
//                   // ...
//               }
//           });

//       db.collection('attData').where("uid", "==", Useruid)
//           .onSnapshot((snapshot) => {
//               snapshot.docChanges().forEach(change => {
//                   if(change === 'added'){
//                       //data added
//                   }
//               })
//           })  
//   }
// })

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const db = firebaseApp.firestore();
