// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";
import {getAuth, GoogleAuthProvider, signInWithPopup, signOut, User} from 'firebase/auth';
import {useEffect, useState} from "react";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAeAOqvSS--1mNYA26NlJksBgOmV9FtyTI",
    authDomain: "stylefactory-fed11.firebaseapp.com",
    projectId: "stylefactory-fed11",
    storageBucket: "stylefactory-fed11.appspot.com",
    messagingSenderId: "453574191696",
    appId: "1:453574191696:web:876883146ff0ec57b63f55",
    measurementId: "G-M2B2J01G6Z"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const useFirestore = () => {
    return getFirestore(app)
}

export const useStorage = () => {
    return getStorage(app)
}

export const useCurrentUser = () => {
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        getAuth(app).onAuthStateChanged(
            u => {
                if (!user) {
                    setUser(u)
                }
            }
        )
    }, [])


    return user
}
export const useSignInWithGooglePopup = () => {
    const auth = getAuth(app)
    return () => signInWithPopup(auth, new GoogleAuthProvider());
}

export const useSignOut = () => {
    const auth = getAuth(app)
    return () => signOut(auth)
}