import { auth } from "../config/firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut as firebaseSignOut} from "firebase/auth";

export const signUp = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        return user;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const signIn = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        return user;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const signOut = async () => {
    try {
        await firebaseSignOut(auth);
    } catch (error) {
        console.error('signout error: ', error);
    }
};
