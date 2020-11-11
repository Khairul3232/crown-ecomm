import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCUh_esO2CzB7BBx4Wnj2MiETxvYIWOsPY",
    authDomain: "crown-db-4b740.firebaseapp.com",
    databaseURL: "https://crown-db-4b740.firebaseio.com",
    projectId: "crown-db-4b740",
    storageBucket: "crown-db-4b740.appspot.com",
    messagingSenderId: "909871063595",
    appId: "1:909871063595:web:7b6caa1a5f88193e00806e",
    measurementId: "G-Y6K51X1ZWS"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
