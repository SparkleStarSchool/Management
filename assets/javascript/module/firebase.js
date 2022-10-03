const firebaseConfig = {
    apiKey: "AIzaSyA4Fq56WoffBQIC0Yz38dHNqMdFNiF-jPU",
    authDomain: "website-3319d.firebaseapp.com",
    databaseURL: "https://website-3319d-default-rtdb.firebaseio.com",
    projectId: "website-3319d",
    storageBucket: "website-3319d.appspot.com",
    messagingSenderId: "251478574974",
    appId: "1:251478574974:web:2b7de25205f051582ad52f",
    measurementId: "G-CSN9V0RMMB"
  };

firebase.initializeApp(firebaseConfig);
// Initialize Firebase and auth
const db = firebase.database();
const auth= firebase.auth();