import firebase from 'firebase/app';

import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyCxuGxa89Zik84YWn1YC-rq--D6AczlVlM",
  authDomain: "crwn-db-eef52.firebaseapp.com",
  databaseURL: "https://crwn-db-eef52.firebaseio.com",
  projectId: "crwn-db-eef52",
  storageBucket: "crwn-db-eef52.appspot.com",
  messagingSenderId: "579647033192",
  appId: "1:579647033192:web:db0220fda9ae823e8310dd",
  measurementId: "G-BQYQ9WR9C9"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;