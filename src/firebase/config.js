import firebase from "firebase/app";
import "firebase/firestore"
import "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyAuV5Q1q5728XvAIOx8CcKNrhj2Yp2t3As",
    authDomain: "chattytime-6b32f.firebaseapp.com",
    projectId: "chattytime-6b32f",
    storageBucket: "chattytime-6b32f.appspot.com",
    messagingSenderId: "464139258454",
    appId: "1:464139258454:web:3321fd72c6390e40e389f7"
  };

  //init firebase
  firebase.initializeApp(firebaseConfig)

  //init services 
  const projectFireStore = firebase.firestore()
  const projectAuth = firebase.auth()

  //timestamp
  const timestamp = firebase.firestore.Timestamp



  export { projectFireStore, projectAuth, timestamp }