import React, {createContext, useState, useContext } from 'react';
import axios from 'axios';
import firebase from '../../firebase';

const UserContext = createContext([]);

const fetchUsers = async () => {
    const response = [];
    const db = firebase.firestore();
    let user = [];
    try {
        await db.collection("user").doc(firebase.auth().currentUser.uid)
            .onSnapshot(function(querySnapshot) {
                //var cities = [];
                // querySnapshot.forEach(function(doc) {
                //     response.push(doc.data());
                // });
                console.log(querySnapshot.data());
                user.push(querySnapshot.data())
            });
        } catch(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorCode, " - ", errorMessage)
            // ...
          }

    //const response = await axios.get('https://jsonplaceholder.typicode.com/users');

    return user;
}

export const UserContextProvider = ({children}) => {
    const [users, setUsers] = useState([]);
    const requestUsers = () => {
        fetchUsers().then((users) => {
            setUsers(users);
            console.log("user: ", users)
        });
    }
    return <UserContext.Provider value={{users, requestUsers}}>{children}</UserContext.Provider>
}

export const useUser = () => {
    return useContext(UserContext);
}