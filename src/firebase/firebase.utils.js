import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDd5PtMy7_rPtGz8yehcpGE5qx6IbaKwk8",
  authDomain: "crown-db-1ff60.firebaseapp.com",
  databaseURL: "https://crown-db-1ff60.firebaseio.com",
  projectId: "crown-db-1ff60",
  storageBucket: "crown-db-1ff60.appspot.com",
  messagingSenderId: "282087969483",
  appId: "1:282087969483:web:21bde29a909e0ee7f0014e",
  measurementId: "G-8G5VM7C5JT"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        ...additionalData
      });
    } catch (e) {
      console.log("error creating user: ", e.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
