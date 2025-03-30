// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDVrkt-wDhcjjAmtN7HyhUFfB8pILLr9eM",
  authDomain: "web-jsi-afa17.firebaseapp.com",
  projectId: "web-jsi-afa17",
  storageBucket: "web-jsi-afa17.firebasestorage.app",
  messagingSenderId: "699270388597",
  appId: "1:699270388597:web:0115f90e1da654c173513c",
  measurementId: "G-X13CZPRHG1"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = firebase.auth();

// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();

// Initialize Cloud Storage and get a reference to the service
const storage = firebase.storage();