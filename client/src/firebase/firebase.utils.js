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

export const createUserProfileDocument = async (userAuth, additioanlData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if(!snapShot.exists) {
    const {displayName, email}= userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
          displayName,
          email,
          createdAt,
          ...additioanlData
      })
    } catch (error) {
        console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const addCollectionAndDocuments = async (
    collectionKey, objectToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();
  objectToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj)
  });

  return await batch.commit();

};

export const convertCollectionsSnapshotToMap = (collection) => {
  const transformedCollection = collection.docs.map(doc => {
    const {title, items} = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    }
  });

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {})
};


export const getCurrentUser = () => {
  console.log('1 call')
  return new Promise((resolve, reject) => {
    console.log('CALLED')
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      console.log(userAuth, unsubscribe);
      unsubscribe();
      resolve(userAuth);
    }, reject)
  });
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({prompt: 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;