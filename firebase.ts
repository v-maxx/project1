
// Import the functions you need from the SDKs you need
import {initializeApp,getApp,getApps} from "firebase/app";
import {getAnalytics} from "firebase/analytics";
import {getAuth} from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCiBNYzNw9l408GTkHcJbnMVQz76zJx9SU",
    authDomain: "application-manager-ba97d.firebaseapp.com",
    projectId: "application-manager-ba97d",
    storageBucket: "application-manager-ba97d.appspot.com",
    messagingSenderId: "496613706956",
    appId: "1:496613706956:web:dd8891f342ac5f4d9b0669",
    measurementId: "G-QT3S23JNMM"
};

// Initialize Firebase
const app =getApps().length===0  ? initializeApp(firebaseConfig) :getApp();
const analytics = getAnalytics(app);
const  auth=getAuth(app)
auth.useDeviceLanguage()
 export {auth}
