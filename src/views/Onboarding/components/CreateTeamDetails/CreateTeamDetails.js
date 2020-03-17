import React, { useState, useEffect, useCallback } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField,
  Typography
} from '@material-ui/core';
import { clubs } from './../../../../modules/clubs';
import { useUser } from '../../../../modules/users';
import firebase from './../../../../firebase';

const useStyles = makeStyles(() => ({
  root: {
    paddingTop: "30px"
  }
}));

const CreateTeamDetails = props => {
  const { className, history, ...rest } = props;
  const {users, requestUsers} = useUser();
    useEffect(() => {
      if(users.length === 0) {
        requestUsers();
      }
    }, [])
  const classes = useStyles();

  const [values, setValues] = useState({
    firstName: users.length > 0 ? users[0].firstName : 'Shen',
    lastName: users.length > 0 ? users[0].lastName : 'Zhi',
    teamName: '',
    clubName: '',
    role: ''
  });

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const clubNames = {...clubs}

  const roles = [
    {
      value: 'trainer-coach',
      label: 'Trainer/Coach'
    },
    {
      value: 'player',
      label: 'Player'
    },
    {
      value: 'player-coach',
      label: 'Player-Coach'
    },
    {
      value: 'staf',
      label: 'Staf'
    }
  ];

  const handleCreateTeam = useCallback( async event => {
    event.preventDefault();
    console.log("creating a team")
    const db = firebase.firestore();
    try {
      await db.collection("team").add({
        teamName: values.teamName,
        clubName: values.clubName
      }).then(function(docRef) {
        console.log("doc written with => ", docRef.id)
        db.collection("user").doc(firebase.auth().currentUser.uid).update({
          userRole: values.role,
          firstName: values.firstName,
          lastName: values.lastName,
          teamRef: db.doc(`team/${docRef.id}`)
      }).catch(function(error) {
          console.error("Error writing document: ", error);
      });
    }) 
    history.push('/your-profile');
  } catch(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorCode, " - ", errorMessage)
    }
  }
) 

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Typography variant="h1" align="center">
        
          Hi, {users ? users[0].firstName + " 👋": "there 👋"}.
      </Typography>
     
      <form
        autoComplete="off"
        noValidate
        onSubmit={handleCreateTeam}
      >
        <CardHeader
          subheader="Je kan later spelers toevoegen."
          title="Maak hier jouw team aan."
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Please specify the first name"
                label="Voornaam"
                margin="dense"
                name="firstName"
                onChange={handleChange}
                required
                value={values.firstName}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Achternaam"
                margin="dense"
                name="lastName"
                onChange={handleChange}
                required
                value={values.lastName}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Team naam"
                margin="dense"
                name="teamName"
                onChange={handleChange}
                type="string"
                value={values.teamName}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Selecteer jouw club"
                margin="dense"
                name="clubName"
                onChange={handleChange}
                required
                select
                // eslint-disable-next-line react/jsx-sort-props
                SelectProps={{ native: true }}
                value={values.clubName}
                variant="outlined"
              >
                {clubs.map(option => (
                  <option
                    key={option}
                    value={option}
                  >
                    {option}
                  </option>
                ))}
              </TextField>
            </Grid>
            
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Jouw rol"
                margin="dense"
                name="role"
                onChange={handleChange}
                required
                select
                // eslint-disable-next-line react/jsx-sort-props
                SelectProps={{ native: true }}
                value={values.role}
                variant="outlined"
              >
                {roles.map(option => (
                  <option
                    key={option.label}
                    value={option.value}
                  >
                    {option.value}
                  </option>
                ))}
              </TextField>
            </Grid>

            {/* <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Country"
                margin="dense"
                name="country"
                onChange={handleChange}
                required
                value={values.country}
                variant="outlined"
              />
            </Grid> */}
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            color="primary"
            variant="contained"
            type="submit"
          >
            Creër jouw team
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

CreateTeamDetails.propTypes = {
  className: PropTypes.string
};

export default CreateTeamDetails;
