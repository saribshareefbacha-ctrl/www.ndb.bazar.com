// Firebase SDK initializations (Auth, Firestore, Analytics)
const firebaseConfig = {
  apiKey: "AIzaSyAWD7zMR4tyMLfxFib7vosblVqCyQoaWlo",
  authDomain: "nankana-digi-bazar.firebaseapp.com",
  projectId: "nankana-digi-bazar",
  storageBucket: "nankana-digi-bazar.firebasestorage.app",
  messagingSenderId: "804173082411",
  appId: "1:804173082411:web:15b829df6b868acfc91f6e",
  measurementId: "G-X5PLP380NN"
};

// Initialize Firebase App
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const analytics = firebase.analytics();

export { app, auth, db, analytics, firebaseConfig };
