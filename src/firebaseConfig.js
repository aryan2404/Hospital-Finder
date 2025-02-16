import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAS08Sj0GPK1D4TUjtL5U9OOGWPvwuat4w",
  authDomain: "hospital-locator-e852c.firebaseapp.com",
  projectId: "hospital-locator-e852c",
  storageBucket: "hospital-locator-e852c.firebasestorage.app",
  messagingSenderId: "960404782385",
  appId: "1:960404782385:web:455a76f1cf22efd2bc0410",
  measurementId: "G-5YR75VKDRT"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup, signOut };
