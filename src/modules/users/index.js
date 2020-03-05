import React, {createContext, useState, useContext } from 'react';
import axios from 'axios';
import * as firebase from 'firebase';

const UserContext = createContext([]);

const fetchUsers = async () => {
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
    
    return response;
}

export const UserContextProvider = ({children}) => {
    const [users, setUsers] = useState([]);
    const requestUsers = () => {
        fetchUsers().then((users) => {
            setUsers(users);
        });
    }
    return <UserContext.Provider value={{users, requestUsers}}>{children}</UserContext.Provider>
}

export const useUser = () => {
    return useContext(UserContext);
}