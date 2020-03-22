import React, {createContext, useState, useContext } from 'react';
import firebase from '../../firebase';
import { useUser } from '../../modules/users';

const PlayersContext = createContext([]);

const fetchPlayers = async (teamRef) => {
    const response = [];
    const db = firebase.firestore();
    let players = [];
    console.log(teamRef)
    try {
        await db.collection("player").where("teamRef", "==", teamRef)
            .onSnapshot(function(querySnapshot) {
                console.log(querySnapshot)
                querySnapshot.forEach(function(doc) {
                    players.push(doc.data());
                    console.log(doc.data());
                });
            });
        } catch(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorCode, " - ", errorMessage)
            // ...
          }
    //const response = await axios.get('https://jsonplaceholder.typicode.com/playerss');

    return players;
}

export const PlayersContextProvider = ({children}) => {
    const [players, setPlayers] = useState([]);
    const {users, requestUsers} = useUser();
    const requestPlayers = () => {
        console.log('requesting players from players', users[0].teamRef.id)
        fetchPlayers(users[0].teamRef.id).then((players) => {
            setPlayers(players);
            console.log("players: ", players)
        });
    }
    return <PlayersContext.Provider value={{players, requestPlayers}}>{children}</PlayersContext.Provider>
}

export const usePlayer = () => {
    return useContext(PlayersContext);
}