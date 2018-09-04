import firebase from 'firebase'

var config = {
    apiKey: "AIzaSyCyBhHdD8NupRoEoBrYUQGYXJrdgtpPG3Q",
    authDomain: "turnosgaynor.firebaseapp.com",
    databaseURL: "https://turnosgaynor.firebaseio.com",
    projectId: "turnosgaynor",
    storageBucket: "turnosgaynor.appspot.com",
    messagingSenderId: "871309201374"
  };
  firebase.initializeApp(config);

export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth
