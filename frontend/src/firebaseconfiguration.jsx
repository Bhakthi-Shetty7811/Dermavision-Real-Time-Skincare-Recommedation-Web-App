import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC8uDCYbDVBAgldfyZwFbcs9fDFQ9ceFk8",
  authDomain: "dermavision-user-data.firebaseapp.com",
  projectId: "dermavision-user-data",
  storageBucket: "dermavision-user-data.appspot.com", 
  messagingSenderId: "517584226824",
  appId: "1:517584226824:web:52d53a34d71ef218011fbd",
  measurementId: "G-Y8R2PTH0BD"
};
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app); // Initialize Firestore
  
  export { auth, db };