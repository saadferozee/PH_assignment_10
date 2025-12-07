import React, { useEffect, useState } from 'react';
import { RouterContextProvider } from 'react-router';
import AuthContext from '../Contexts/AuthContext';
import { createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../Firebase/firebase.init';

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState('');
    const [authLoading, setAuthLoading] = useState(true);

    const signUp = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const logIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }
    const googleProvider = new GoogleAuthProvider();
    const loginWithGoogle = () => {
        return signInWithPopup(auth, googleProvider);
    }
    const updateUser = (name, photoURL) => {
        return updateProfile(auth.currentUser, {displayName: name, photoURL: photoURL})
    }
    const logOut = () => {
        return signOut(auth);
    }

    useEffect(()=> {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setAuthLoading(false);
        })
        return () => unsubscribe();
    },[])

    const contexts = {
        user,
        authLoading,
        setUser,
        signUp,
        logIn,
        loginWithGoogle,
        updateUser,
        logOut
    }

    return (
        <AuthContext.Provider value={contexts}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;