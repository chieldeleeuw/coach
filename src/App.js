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
import { AuthProvider } from './modules/Auth.js';
import firebase from './firebase'

const browserHistory = createBrowserHistory();

Chart.helpers.extend(Chart.elements.Rectangle.prototype, {
  draw: chartjs.draw
});

validate.validators = {
  ...validate.validators,
  ...validators
};  

const App = () => {
  
    return (
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <Router history={browserHistory}>
            <Routes loggedIn={true}/>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    );
}

export default App