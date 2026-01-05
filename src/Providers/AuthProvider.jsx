import React, { useEffect, useState } from 'react';
import { RouterContextProvider } from 'react-router';
import AuthContext from '../Contexts/AuthContext';
import { createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../Firebase/firebase.init';
import axios from 'axios';

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState('');
    const [role, setRole] = useState('');
    const [authLoading, setAuthLoading] = useState(true);
    const [roleLoading, setRoleLoading] = useState(true);

    const signUp = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const saveUserInfoToDB = async user => {
        const isUserExistedRes = await axios.get(`https://adoptyco.vercel.app/users/user/${user?.email}`);
        if (isUserExistedRes.data) {
            return;
        } else {
            axios.post('https://adoptyco.vercel.app/add-user', user)
                .then(res => {
                    console.log(res);
                }).catch(error => {
                    console.log(error);
                })
        };
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
    useEffect(() => {
        if (authLoading) return;
        if (!user) {
            setRole(null) // its a warning, not an error.
            setRoleLoading(false)
            return
        }
        setRoleLoading(true)
        axios.get(`https://adoptyco.vercel.app/users/info?email=${user?.email}`)
            .then(response => {
                setRole(response.data.role);
            }).catch(error => console.log(error))
            .finally(() => setRoleLoading(false));
    }, [user, authLoading])

    const contexts = {
        user,
        role,
        authLoading,
        roleLoading,
        setUser,
        signUp,
        saveUserInfoToDB,
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