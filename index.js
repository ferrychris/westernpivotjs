import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Firebase config
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

// Get references to Firebase services
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

// DOM elements
const btn = document.getElementById('googleSignInButton');

// Google Sign-In function
async function runAuth() {
  alert("Initiating Google Sign-In");

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log("User Info:", user);

    const accessToken = await user.getIdToken();
    const refreshToken = user.refreshToken;

    console.log("Access Token:", accessToken);
    console.log("Refresh Token:", refreshToken);

    // Save tokens to Firestore
    await saveTokensToFirestore(user.uid, accessToken, refreshToken);

    // Save additional user data to Firestore
    await saveUserData(user);

    handleAuthSuccess(user);
  } catch (error) {
    console.error("Error signing in:", error);
  }
}

// Save authentication tokens to Firestore
async function saveTokensToFirestore(userId, accessToken, refreshToken) {
  try {
    const userDocRef = doc(db, "users", userId);
    await setDoc(userDocRef, {
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
    console.log("Tokens saved to Firestore successfully!");
  } catch (error) {
    console.error("Error saving tokens to Firestore:", error);
  }
}

// Save user data to Firestore
async function saveUserData(user) {
  const userRef = doc(db, 'users', user.uid);
  await setDoc(userRef, {
    email: user.email,
    name: user.displayName,
    profilePic: user.photoURL
  });
  console.log("User data saved to Firestore successfully!");
}

// Handle authentication success
function handleAuthSuccess(user) {
  alert("Auth successful");
  window.location.href = "https://creo-labs.com/"; // Redirect after successful login
}

// Add event listener for the Google Sign-In button
btn.addEventListener("click", runAuth);
