import React, {createContext, useState, useContext, useEffect } from 'react';
import * as firebase from './../../modules/firebase';
//import * as firebase from 'firebase';
import base from './../../modules/firebase';

const FirebaseUserContext = createContext([]);

const fetchFirebaseUser = async () => {
    const response = [];
    const db = firebase.firestore();
    db.collection("user").doc(firebase.auth().currentUser.uid)
    .onSnapshot(function(querySnapshot) {
        //var cities = [];
        querySnapshot.forEach(function(doc) {
            response.push(doc.data());
        });
        console.log("Current cities in CA: ", response.join(", "));
    });

    //const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    
    return await response;
}

export const FirebaseUserContextProvider = ({children}) => {
    const [firebaseUser, setfirebaseUser] = useState([]);
    const [currentUser, setCurrentUser] = useState([]);

    useEffect(() => {
        console.log(firebase)
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                setCurrentUser({user})
                console.log("The user is logged in");
            } 
          });
    },[]);

    const requestFirebaseUser = () => {
        fetchFirebaseUser().then((firebaseUser) => {
            setfirebaseUser(firebaseUser);
        });
    }
    return <FirebaseUserContext.Provider value={{currentUser, firebaseUser, requestFirebaseUser}}>{children}</FirebaseUserContext.Provider>
}

export const useFirebaseUser = () => {
    return useContext(FirebaseUserContext);
}