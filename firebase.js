// Import the functions you need from the SDKs you need
import * as firebase from "firebase";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { API_KEY } from "react-native-dotenv";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "conseducation-c0f35.firebaseapp.com",
  projectId: "conseducation-c0f35",
  storageBucket: "conseducation-c0f35.appspot.com",
  messagingSenderId: "80962351866",
  appId: "1:80962351866:web:13e4aa97734660b3c18f43",
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();

export { auth };
