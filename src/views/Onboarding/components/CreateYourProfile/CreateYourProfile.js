import React, {useState, useEffect, useCallback} from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Typography,
  Divider,
  Button,
  LinearProgress,
  CardHeader,
  Grid,
  TextField,
  Slider,
  Input,
  Snackbar,
  IconButton, 
} from '@material-ui/core';
import { useUser } from '../../../../modules/users';
import firebase from '../../../../firebase';
import { positions } from './../../../../modules/positions'
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';
import UnknownProfile from './../../../../images/unknown.jpg'

const useStyles = makeStyles(theme => ({
  root: {},
  details: {
    display: 'flex'
  },
  avatar: {
    marginLeft: 'auto',
    height: 110,
    width: 100,
    flexShrink: 0,
    flexGrow: 0
  },
  progress: {
    marginTop: theme.spacing(2)
  },
  uploadButton: {
    marginRight: theme.spacing(2)
  }, 
  input: {
    display: "none",
  }, 
  skillsInput: {
    
  }
  
}));

const CreateYourProfile = props => {
  const { className, history, ...rest } = props;
  const {users, requestUsers} = useUser();
  
    useEffect(() => {
      if(users.length === 0) {
        requestUsers();
      }
    }, [])

    const [values, setValues] = useState({
      avatarUrl: '',
      playerNumber: 1,
      positionShort: '',
      positionType: '',
      skillsDefending: 60,
      skillsDribbling: 60,
      skillsPace: 60,
      skillsPassing: 60,
      skillsPhysique: 60,
      skillsShooting: 60,
      GK_Diving: 60,
      GK_Handling: 60,
      GK_Kicking: 60,
      GK_Positioning: 60,
      GK_Reflexes: 60,
      GK_Speed: 60
    });

    useEffect(() => {
      console.log("effect running")
    })

    const handleChange = event => {
      setValues({
        ...values,
        [event.target.name]: event.target.value
      });
    };

    const handleSliderChange = (event, newValue) => {
      console.log(newValue, event.target.id)
      if(event.target.id) {
      setValues({
        ...values,
        [event.target.id]: newValue
        });
      }
    };

    const handleBlur = (event) => {
      if (values[event.target.id] < 0) {
        setValues(0);
      } else if (values[event.target.id] > 100) {
        setValues(100);
      }
    };

    const handleInputChange = (event) => {
      setValues({
        ...values,
        [event.target.name]: event.target.value === '' ? '' : Number(event.target.value)
       });
    };

    const handleProfileCreation = useCallback( async event => {
      event.preventDefault();
      //add logic to create the user with all data points
      const db = firebase.firestore();
      console.log('initial call')
      // try {
        await db.collection("player").add({
                  playerFirstName: users[0].firstName,
                  playerLastName: users[0].lastName,
                  avatarUrl: values.avatarUrl,
                  playerNumber: values.playerNumber,
                  position: {
                    short: values.positionShort
                  },
                  skills: {
                    defending: values.skillsDefending,
                    dribbling: values.skillsDribbling,
                    pace: values.skillsPace,
                    passing: values.skillsPassing,
                    physique: values.skillsPhysique,
                    shooting: values.skillsShooting
                  },
                  teamRef: users[0].teamRef,
                  userRef: db.doc(`user/${firebase.auth().currentUser.uid}`)
                })
                .then(function(docRef) {
                  console.log("Player document successfully written!", docRef.id);
                  db.collection("user").doc(firebase.auth().currentUser.uid).update({
                    playerRef: db.doc(`player/${docRef.id}`)
                  })
                    .catch(function(error) {
                    console.error("Error writing document: ", error);
                    
                  });
                }).then(function(){
                  console.log(props);
                  history.push('/dashboard');
                })
                .catch(function(error) {
                  console.error("Error writing document: ", error);
                });
      // catch(error) {
      //     // Handle Errors here.
      //     var errorCode = error.code;
      //     var errorMessage = error.message;
      //     alert(errorCode, " - ", errorMessage, " - ", error)
      //     // ...
      //   }
    });

    const handleProfileReset = () => {
      //Upload general avatar
      setValues({
        ...values,
        avatarUrl: UnknownProfile
      })
      
      const db = firebase.firestore();
        db.collection("user").doc(firebase.auth().currentUser.uid).update({
            avatarUrl: UnknownProfile
            }).catch(function(error) {
            alert(error.message)
          })  
        
        firebase.auth().currentUser.updateProfile({
          photoURL: UnknownProfile
          }).catch(function(error) {
          // An error happened.
        });    
      }
        

    const handleProfileUpload = event => {
      //Get file
      const file = event.target.files[0]
    
      //Create a reference
      const storageRef = firebase.storage().ref('user_avatars/' + firebase.auth().currentUser.uid)
      //Upload file
      
      const task = storageRef.put(file)
      //Update progress bar
      task.on('state_changed', 

          function progress(snapshot) {
            let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            //setAvatarUpload(percentage)
            console.log(percentage)
          },

          function error(err) {
            alert(err.message)
          },

          function complete() {
            console.log('image uploaded successfully')
            storageRef.getDownloadURL().then(function(url) {
              const db = firebase.firestore();
              console.log(url)
              setValues({
                ...values,
                avatarUrl: url
              })
              setOpen(true);
               db.collection("user").doc(firebase.auth().currentUser.uid).update({
                    avatarUrl: url
                  }).catch(function(error) {
                  alert(error.message)
                })
              
                firebase.auth().currentUser.updateProfile({
                  photoURL: url
                  }).then(function() {
                    console.log(firebase.auth().currentUser.photoURL)

                }).catch(function(error) {
                  // An error happened.
                });
                
                

            }).catch(function(error) {
              // Handle any errors
            })
          }
        )
    }

  const classes = useStyles();

  const user = {
    name: 'Shen Zhi',
    city: 'Los Angeles',
    country: 'USA',
    timezone: 'GTM-7',
    avatar: '/images/avatars/avatar_11.png'
  };

  //snackbar settings
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent>
        <div className={classes.details}>
          <div>
            <Typography
              gutterBottom
              variant="h2"
            >
              {`${users[0].userName}`}
            </Typography>
            <Typography
              className={classes.locationText}
              color="textSecondary"
              variant="body1"
            >
              {users[0].userRole}
            </Typography>
            
          </div>
          <Avatar
            className={classes.avatar}
            src={values.avatarUrl ? values.avatarUrl : firebase.auth().currentUser.photoURL}
          />
        </div>
        <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            message="Profile image succesfully uploaded!"
            action={
              <React.Fragment>
                {/* <Button color="secondary" size="small" onClick={handleClose}>
                  UNDO
                </Button> */}
                <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              </React.Fragment>
            }
          />
        <CardActions>
          <input
            accept="image/*"
            className={classes.input}
            id="contained-button-file"
            multiple
            type="file"
            onChange={handleProfileUpload}
          />
          <label htmlFor="contained-button-file">
            <Button variant="text" color="primary" component="span">
              Upload picture
            </Button>
          </label>
        <Button 
        variant="text"
        onClick={handleProfileReset}
        >
          Remove picture</Button>
      </CardActions>
        <div className={classes.progress}>
          {/* <Typography variant="body1">Profile Completeness: 70%</Typography>
          <LinearProgress
            value={70}
            variant="determinate"
          /> */}
        </div>
          <form
          autoComplete="off"
          noValidate
          onSubmit={handleProfileCreation}
        >
          <CardHeader
            subheader="Je kan dit altijd later aanpassen"
            title="Creëer jouw spelersprofiel"
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
                  label="Selecteer jouw positie"
                  margin="dense"
                  name="positionShort"
                  onChange={handleChange}
                  required
                  select
                  // eslint-disable-next-line react/jsx-sort-props
                  SelectProps={{ native: true }}
                  value={values.positionShort}
                  variant="outlined"
                >
                  {positions.map(option => (
                    <option
                      key={option.short}
                      value={option.short}
                    >
                      {option.full}
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
                  label="Jouw rugnummer"
                  margin="dense"
                  name="playerNumber"
                  onChange={handleChange}
                  required
                  number
                  // eslint-disable-next-line react/jsx-sort-props
                  SelectProps={{ native: true }}
                  value={values.playerNumber}
                  variant="outlined"
                >
                </TextField>
              </Grid>
              <Grid
                item
                md={12}
                xs={12}
              >
                <Typography
                    className={classes.locationText}
                    color="textSecondary"
                    variant="body1"
                  >
                    Skills
                  </Typography>
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                {/* <TextField
                  fullWidth
                  helperText="Defending"
                  label="Defending"
                  margin="dense"
                  name="skillsDefending"
                  onChange={handleChange}
                  required
                  value={values.skillsDefending}
                  variant="outlined"
                /> */}
                <Grid
                  container
                  spacing={2} 
                  >
                  
                <Grid 
                item 
                xs={10}>
                <Typography
                    className={classes.locationText}
                    color="textSecondary"
                    variant="body2"
                  >
                    Defending
                  </Typography>
                    <Slider
                      id="skillsDefending"
                      name="skillsDefending"
                      label="Defending"
                      value={values.skillsDefending}
                      onChange={handleSliderChange}
                      aria-labelledby="input-slider"
                    />
                </Grid>
                <Grid 
                item 
                xs={2}>
                    <Input
                      className={classes.skillsInput}
                      value={values.skillsDefending}
                      name="skillsDefending"
                      margin="dense"
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      inputProps={{
                        step: 10,
                        min: 0,
                        max: 100,
                        type: 'number',
                        'aria-labelledby': 'input-slider',
                      }}
                    />
                  </Grid>
                  </Grid>
              </Grid>
             
              {/* <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    <VolumeUp />
                  </Grid>
                  
                </Grid> */}

              <Grid
                item
                md={6}
                xs={12}
              >
                {/* <TextField
                  fullWidth
                  helperText="Dribbling"
                  label="Dribbling"
                  margin="dense"
                  name="skillsDribbling"
                  onChange={handleChange}
                  required
                  value={values.skillsDribbling}
                  variant="outlined"
                /> */}
                <Grid
                  container>
                
                <Grid 
                item 
                xs={10}>
                <Typography
                    className={classes.locationText}
                    color="textSecondary"
                    variant="body2"
                  >
                    Dribbling
                  </Typography>
                    <Slider
                      id="skillsDribbling"
                      name="skillsDribbling"
                      label="Dribbling"
                      value={values.skillsDribbling}
                      onChange={handleSliderChange}
                      aria-labelledby="input-slider-skillsDribbling"
                    />
                </Grid>
                <Grid 
                item 
                xs={2}>
                    <Input
                      className={classes.skillsInput}
                      value={values.skillsDribbling}
                      name="skillsDribbling"
                      margin="dense"
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      inputProps={{
                        step: 10,
                        min: 0,
                        max: 100,
                        type: 'number',
                        'aria-labelledby': 'input-slider-skillsDribbling',
                      }}
                    />
                  </Grid>
                  </Grid>
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                {/* <TextField
                  fullWidth
                  helperText="Pace"
                  label="Pace"
                  margin="dense"
                  name="skillsPace"
                  onChange={handleChange}
                  required
                  value={values.skillsPace}
                  variant="outlined"
                /> */}
                <Grid
                  container>
                
                <Grid 
                item 
                xs={10}>
                <Typography
                    className={classes.locationText}
                    color="textSecondary"
                    variant="body2"
                  >
                    Pace
                  </Typography>
                    <Slider
                      id="skillsPace"
                      name="skillsPace"
                      label="skillsPace"
                      value={values.skillsPace}
                      onChange={handleSliderChange}
                      aria-labelledby="input-slider-skillsPace"
                    />
                </Grid>
                <Grid 
                item 
                xs={2}>
                    <Input
                      className={classes.skillsInput}
                      value={values.skillsPace}
                      name="skillsPace"
                      margin="dense"
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      inputProps={{
                        step: 10,
                        min: 0,
                        max: 100,
                        type: 'number',
                        'aria-labelledby': 'input-slider-skillsPace',
                      }}
                    />
                  </Grid>
                  </Grid>
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                {/* <TextField
                  fullWidth
                  helperText="Passing"
                  label="Passing"
                  margin="dense"
                  name="skillsPassing"
                  onChange={handleChange}
                  required
                  value={values.skillsPassing}
                  variant="outlined"
                /> */}
                <Grid
                  container>
                
                <Grid 
                item 
                xs={10}>
                <Typography
                    className={classes.locationText}
                    color="textSecondary"
                    variant="body2"
                  >
                    Passing
                  </Typography>
                    <Slider
                      id="skillsPassing"
                      name="skillsPassing"
                      label="Passing"
                      value={values.skillsPassing}
                      onChange={handleSliderChange}
                      aria-labelledby="input-slider-skillsPassing"
                    />
                </Grid>
                <Grid 
                item 
                xs={2}>
                    <Input
                      className={classes.skillsInput}
                      value={values.skillsPassing}
                      name="skillsPassing"
                      margin="dense"
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      inputProps={{
                        step: 10,
                        min: 0,
                        max: 100,
                        type: 'number',
                        'aria-labelledby': 'input-slider-skillsPassing',
                      }}
                    />
                  </Grid>
                  </Grid>
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                {/* <TextField
                  fullWidth
                  helperText="Physique"
                  label="Physique"
                  margin="dense"
                  name="skillsPhysique"
                  onChange={handleChange}
                  required
                  value={values.skillsPhysique}
                  variant="outlined"
                /> */}
                <Grid
                  container>
                
                <Grid 
                item 
                xs={10}>
                <Typography
                    className={classes.locationText}
                    color="textSecondary"
                    variant="body2"
                  >
                    Physique
                  </Typography>
                    <Slider
                      id="skillsPhysique"
                      name="skillsPhysique"
                      label="Physique"
                      value={values.skillsPhysique}
                      onChange={handleSliderChange}
                      aria-labelledby="input-slider-skillsPhysique"
                    />
                </Grid>
                <Grid 
                item 
                xs={2}>
                    <Input
                      className={classes.skillsInput}
                      value={values.skillsPhysique}
                      name="skillsPhysique"
                      margin="dense"
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      inputProps={{
                        step: 10,
                        min: 0,
                        max: 100,
                        type: 'number',
                        'aria-labelledby': 'input-slider-skillsPhysique',
                      }}
                    />
                  </Grid>
                  </Grid>
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                {/* <TextField
                  fullWidth
                  helperText="Shooting"
                  label="Shooting"
                  margin="dense"
                  name="skillsShooting"
                  onChange={handleChange}
                  required
                  value={values.skillsShooting}
                  variant="outlined"
                />
                 */}
                 <Grid
                  container>
                
                <Grid 
                item 
                xs={10}>
                <Typography
                    className={classes.locationText}
                    color="textSecondary"
                    variant="body2"
                  >
                    Shooting
                  </Typography>
                    <Slider
                      id="skillsShooting"
                      name="skillsShooting"
                      label="Shooting"
                      value={values.skillsShooting}
                      onChange={handleSliderChange}
                      aria-labelledby="input-slider-skillsShooting"
                    />
                </Grid>
                <Grid 
                item 
                xs={2}>
                    <Input
                      className={classes.skillsInput}
                      value={values.skillsShooting}
                      name="skillsShooting"
                      margin="dense"
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      inputProps={{
                        step: 10,
                        min: 0,
                        max: 100,
                        type: 'number',
                        'aria-labelledby': 'input-slider-skillsShooting',
                      }}
                    />
                  </Grid>
                  </Grid>
              </Grid>
              
            </Grid>
          </CardContent>
          <Divider />
          {console.log(values)}
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
      </CardContent>
      <Divider />
     
    </Card>
  );
};

CreateYourProfile.propTypes = {
  className: PropTypes.string,
  avatarUrl: PropTypes.string,
  playerNumber: PropTypes.number,
  positionShort: PropTypes.string,
  positionType: PropTypes.string,
  skillsDefending: PropTypes.number,
  skillsDribbling: PropTypes.number,
  skillsPace: PropTypes.number,
  skillsPassing: PropTypes.number,
  skillsPhysique: PropTypes.number,
  skillsShooting: PropTypes.number,
  GK_Diving: PropTypes.number,
  GK_Handling: PropTypes.number,
  GK_Kicking: PropTypes.number,
  GK_Positioning: PropTypes.number,
  GK_Reflexes: PropTypes.number,
  GK_Speed: PropTypes.number
};

export default withRouter(CreateYourProfile);
