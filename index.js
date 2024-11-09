// Import Firebase SDK (using the modular Firebase v9+ SDK)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getFirestore, doc, setDoc } from 'firebase/firestore';
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

      const accessToken = await user.getIdToken();
      const refreshToken = user.refreshToken;
  
      console.log("Access Token:", accessToken);
      console.log("Refresh Token:", refreshToken);
  
      // Store the tokens in Firestore
      await saveTokensToFirestore(user.uid, accessToken, refreshToken);

      // Handle auth success (like redirecting, storing token, etc.)
      handleAuthSuccess(user);
    })
    .catch((error) => {
      console.log("Error signing in:", error);
    });
}
async function saveTokensToFirestore(userId, accessToken, refreshToken) {
    try {
      const userDocRef = doc(db, "users", userId); // Document for each user in Firestore
      await setDoc(userDocRef, {
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
  
      console.log("Tokens saved to Firestore successfully!");
    } catch (error) {
      console.error("Error saving tokens to Firestore:", error);
    }
  }

function handleAuthSuccess(user) {
  alert("Auth successful");
  // Redirect or perform further actions
  window.location.href = "https://creo-labs.com/"; // Redirect after successful login
}

// Add the event listener to the button once
btn.addEventListener("click", runAuth);
const db = getFirestore(app);

const saveUserData = async (user) => {
  const userRef = doc(db, 'users', user.uid); // Using user UID as a document ID
  await setDoc(userRef, {
    email: user.email,
    name: user.displayName,
    profilePic: user.photoURL
  });
};
