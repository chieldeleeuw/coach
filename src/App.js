import React, { Component, useEffect, useState } from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Chart } from 'react-chartjs-2';
import { ThemeProvider } from '@material-ui/styles';
import validate from 'validate.js';

import { chartjs } from './helpers';
import theme from './theme';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './assets/scss/index.scss';
import validators from './common/validators';
import Routes from './Routes';
import { useFirebaseUser, FirebaseUserContextProvider } from './modules/AuthStateListener/isLoggedIn';
import firebase, {onAuthStateChanged} from './modules/firebase'

const browserHistory = createBrowserHistory();

Chart.helpers.extend(Chart.elements.Rectangle.prototype, {
  draw: chartjs.draw
});

validate.validators = {
  ...validate.validators,
  ...validators
};  

export const App = () => {

  // const [user, setUser] = useState({ loggedIn: false });
  // useEffect(() => {
  //   //const unsubscribe = onAuthStateChanged(setUser());
  //   return () => {
  //     https://foleon.productboard.com/();
  //   };
  // }, []);
  
  // const {firebaseUser, requestFirebaseUser} = useFirebaseUser();
  // useEffect(() => {
  //     console.log(firebaseUser)
  //   if(loggedIn) {
  //     console.log("requestingFirebaseUser again")
  //     requestFirebaseUser();
  //   }
  // }, [])
  
    return (
      <ThemeProvider theme={theme}>
        <FirebaseUserContextProvider>
          <Router history={browserHistory}>
            <Routes loggedIn={true}/>
          </Router>
        </FirebaseUserContextProvider>
      </ThemeProvider>
    );
}
