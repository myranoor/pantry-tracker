// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics,isSupported } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// my web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAdNHcUDJbNy0BQDwqfSiBxG9lZ9a4oBGk",
  authDomain: "pantry-tracker-app-95227.firebaseapp.com",
  projectId: "pantry-tracker-app-95227",
  storageBucket: "pantry-tracker-app-95227.appspot.com",
  messagingSenderId: "770116103409",
  appId: "1:770116103409:web:3a860f05f78b33fcfa4d50",
  measurementId: "G-5K02XELW2D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const initAnalytics = async () => {
  if (typeof window !== 'undefined') {
    const analyticsSupported = await isSupported();
    if (analyticsSupported) {
      const analytics = getAnalytics(app);
    }
  }
};
const firestore = getFirestore(app);
export{app,firebaseConfig};
export { firestore };