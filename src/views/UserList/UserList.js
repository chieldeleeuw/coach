import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { UsersToolbar, UsersTable } from './components';
import { useUser } from './../../modules/users';
import firebase from './../../firebase';
import { usePlayer } from '../../modules/players';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const UserList = () => {
  const {users, requestUsers} = useUser();
  const {players, requestPlayers} = usePlayer();

  //const {players, setPlayers} = useState();
 
  useEffect(() => {
    if(players.length === 0) {
      console.log('players == 0 so using effect from UserList')
      requestPlayers();
    }
    console.log(players)
  }, [])

  // useEffect(() => {
  //   requestPlayers()
  // }, [])

  // const requestPlayers = () => {
  //   const db = firebase.firestore();
  //   const teamRef = users[0].teamRef.id;
  //   //const teamDBRef = db.collection('team').doc(teamRef)
  //   console.log(teamRef)
  //   db.collection('player').where("teamRef", "==",teamRef)
  //   .onSnapshot(function(querySnapshot) {
  //     var response = [];
  //     console.log(querySnapshot)
  //     querySnapshot.forEach(function(doc) {
  //       console.log(doc.data())
  //         response.push(doc.data());
          
  //     });
  //     console.log("Current players: ", response);
  //     //setPlayers(response)
  //     });
  // }

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <UsersToolbar />
      <div className={classes.content}>
        {console.log(players)}
        <UsersTable users={players} />
      </div>
    </div>
  );
};

export default UserList;
