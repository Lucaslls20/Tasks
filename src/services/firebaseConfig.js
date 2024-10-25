
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyBNL2iJXpTv6KqF-bJ-OiPT82OVc-ur2uM",
    authDomain: "tasks-4468d.firebaseapp.com",
    projectId: "tasks-4468d",
    storageBucket: "tasks-4468d.appspot.com",
    messagingSenderId: "365883752452",
    appId: "1:365883752452:web:a09d787746a0255d1af551",
    measurementId: "G-EXWK7B2WFN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
isSupported().then(supported => {
    if (supported) {
      const analytics = getAnalytics(app);
    }
  });
export const auth = getAuth(app)
export const db = getFirestore(app)
