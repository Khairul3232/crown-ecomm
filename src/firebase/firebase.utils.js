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

export const createUserProfileDocument = async (userAuth, additionalData) => { 
    if (!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    // if user does not exist
    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }
    return userRef;
};

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => { 
    const collectionRef = firestore.collection(collectionKey);
    // console.log(collectionRef);

    const batch = firestore.batch();
    objectsToAdd.forEach(obj => { 
        const newDocRef = collectionRef.doc(); // create new and auto generate id
        // console.log(newDocRef);
        batch.set(newDocRef, obj);
    });

    return await batch.commit();
};

export const convertCollectionsSnapshotToMap = collections => { 
    const transformedCollection = collections.docs.map(doc => { 
        const { title, items } = doc.data();
        return {
            routeName: encodeURI(title.toLowerCase()), // encodeURI takes in a string and convert it to version url browser can read
            id: doc.id,
            title,
            items
        };
    });
    // console.log("transformedCollection: ", transformedCollection);
    return transformedCollection.reduce((accumulator, collection) => { 
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    }, {});
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
