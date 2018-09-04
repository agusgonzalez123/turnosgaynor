import firebase from 'firebase'

var config = {
  apiKey: "AIzaSyAM5JEJg6g1YDnE1n0Y6VqImejwhkCHZ9A",
  authDomain: "zapatillas-45019.firebaseapp.com",
  databaseURL: "https://zapatillas-45019.firebaseio.com",
  projectId: "zapatillas-45019",
  storageBucket: "zapatillas-45019.appspot.com",
  messagingSenderId: "151377232815"
};
firebase.initializeApp(config);

export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth
