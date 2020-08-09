import firebase from "firebase";
require("firebase/firestore");
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCAMGRTxV4TTXYuD85GsGwhvvyAr_Q6ti4",
  authDomain: "vue-store-64b6e.firebaseapp.com",
  databaseURL: "https://vue-store-64b6e.firebaseio.com",
  projectId: "vue-store-64b6e",
  storageBucket: "vue-store-64b6e.appspot.com",
  messagingSenderId: "480307158505",
  appId: "1:480307158505:web:f89349a971af697c65ff78",
  measurementId: "G-M6T0334TDN",
};
// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
firebase.analytics();

export { fb, db };
