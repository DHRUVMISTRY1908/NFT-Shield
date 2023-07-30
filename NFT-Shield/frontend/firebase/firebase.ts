// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQl6OTT9wErme6zl6eoNXyZDDbTm7_Vng",
  authDomain: "nft-warranty-976f6.firebaseapp.com",
  projectId: "nft-warranty-976f6",
  storageBucket: "nft-warranty-976f6.appspot.com",
  messagingSenderId: "6980662596",
  appId: "1:6980662596:web:c8a84ba1de40d952bb1311",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const storage = getStorage(app);

export const initFirebase = () => {
  return app;
};
export const auth = getAuth(app);
