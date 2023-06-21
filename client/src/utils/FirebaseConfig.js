import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyDNzEl-1VfhIvgH2O_yWLHu8-NLAoCY3SM",
    authDomain: "whatsapp-a2ba3.firebaseapp.com",
    projectId: "whatsapp-a2ba3",
    storageBucket: "whatsapp-a2ba3.appspot.com",
    messagingSenderId: "570201134188",
    appId: "1:570201134188:web:04f8740258264420b23449",
    measurementId: "G-R3141T1L97"
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);