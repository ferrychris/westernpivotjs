// Import Firebase SDK (using the modular Firebase v9+ SDK)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

// Your Firebase config from Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyDk3PvJ7rkxHYwb0FLn17dO1QSAQSUYKMQ",
  authDomain: "western-pivot-375509.firebaseapp.com",
  projectId: "western-pivot-375509",
  storageBucket: "western-pivot-375509.firebasestorage.app",
  messagingSenderId: "4680241477",
  appId: "1:4680241477:web:0e67b33521b155297b6e2c",
  measurementId: "G-1CJWNLRT7D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the auth service
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Get the button element
const btn = document.getElementById('googleSignInButton');

// Handle sign-in with Google
function runAuth() {
  alert("Initiating Google Sign-In");

  // Firebase sign-in with popup
  signInWithPopup(auth, provider)
    .then((result) => {
      // User signed in successfully
      const user = result.user;
      console.log("User Info:", user);

      // Handle auth success (like redirecting, storing token, etc.)
      handleAuthSuccess(user);
    })
    .catch((error) => {
      console.log("Error signing in:", error);
    });
}

function handleAuthSuccess(user) {
  alert("Auth successful");
  // Redirect or perform further actions
  window.location.href = "https://facebook.com"; // Redirect after successful login
}

// Add the event listener to the button once
btn.addEventListener("click", runAuth);
