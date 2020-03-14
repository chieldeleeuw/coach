import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCyiwpUJFBUzi784rzD3Nde9UoH9ZaUWSc",
    authDomain: "coach-a2a9b.firebaseapp.com",
    databaseURL: "https://coach-a2a9b.firebaseio.com",
    projectId: "coach-a2a9b",
    storageBucket: "coach-a2a9b.appspot.com",
    messagingSenderId: "938219420018",
    appId: "1:938219420018:web:2f240a899547ce166ec5eb",
    measurementId: "G-082J93LH46"
  };

  firebase.initializeApp(firebaseConfig);
  
  
  export default firebase;