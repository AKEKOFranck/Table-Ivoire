// Import Firebase SDKs
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBgLCuI-tKKpM4ACzhIMjexyh66DC6-gKo",
  authDomain: "table-ivoire.firebaseapp.com",
  projectId: "table-ivoire",
  storageBucket: "table-ivoire.firebasestorage.app",
  messagingSenderId: "869856693863",
  appId: "1:869856693863:web:286191ed4490525dc74ec2",
  measurementId: "G-J0D511PNNH"
};

// Initialisation Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Authentification anonyme automatique
signInAnonymously(auth).catch((error) => {
  console.error("Erreur d’authentification anonyme :", error);
});

// Détection d’état utilisateur
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("Utilisateur connecté :", user.uid);
  } else {
    console.log("Utilisateur déconnecté");
  }
});

// Analytics (facultatif)
getAnalytics(app);

export { db, auth };
