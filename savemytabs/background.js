/***** CURRENTLY ACTIVE *****/
importScripts('firebase/firebase-app-compat.js', 'firebase/firebase-firestore-compat.js', 'firebase/firebase-database-compat.js');

importScripts('ExtPay.js');
const extpay = ExtPay('jpndjejkgdndefekojliilkmhgjncpgk');
// To load extpay script
// loadScript('ExtPay.js')
//   .then(() => {
//       // const extpay = ExtPay('jpndjejkgdndefekojliilkmhgjncpgk');
//       extpay.startBackground();
//       console.log('ExtPay loaded:', extpay);
//   })
//   .catch(error => {
//       console.error('Failed to load extpay.js:', error);
//   });
  
//   try {
//       loadScript('ExtPay.js'); // Loads extpay.js in the service worker context
//       // var extpay = ExtPay('jpndjejkgdndefekojliilkmhgjncpgk');
          
//       extpay.startBackground();
//       console.log('ExtPay loaded:', extpay);

//   } catch (error) {
//       console.error('Failed to load extpay.js:', error);
//   }
//   function loadScript(url) {
//     return new Promise((resolve, reject) => {
//         const script = document.createElement('script');
//         script.src = url;
  
//         // Append the script to the document to load it
//         document.head.appendChild(script);
  
//         // Event listeners for load and error
//         script.onload = () => {
//             console.log(`Script loaded: ${url}`);
//             resolve(script); // Resolve when the script loads
//         };
  
//         script.onerror = () => {
//             reject(new Error(`Script load error for ${url}`)); // Reject on error
//         };
//     });
//   }

// Ensure extpay is defined before calling onPaid
// Ensure extpay is initialized

// extpay.onPaid.addListener(user => {
//   console.log('user paid!')
// })

// // Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyDUt2fW-Ejfb4Ctb0TeIvKLB-S9o2tyI9w",
//     authDomain: "savemytabs-ac4d6.firebaseapp.com",
//     databaseURL: "https://savemytabs-ac4d6-default-rtdb.firebaseio.com",
//     projectId: "savemytabs-ac4d6",
//     storageBucket: "savemytabs-ac4d6.firebasestorage.app",
//     messagingSenderId: "476416480968",
//     appId: "1:476416480968:web:0263115d3f8ee14d85b7fd",
//     measurementId: "G-CWFQ08G4Z0"
// };
  
// // Initialize Firebase
// if (!firebase.apps.length) {
//     firebase.initializeApp(firebaseConfig);
// }

// // // Firebase services
// const auth = firebase.auth();
// const db = firebase.database();

// extpay.startBackground();

// const db = firebase.database();
// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message.action === "saveUserToFirestore") {
//       console.log("Received user data:", message.userData);
      
//       db.collection("users").doc(message.userData.email).set({
//           email: message.userData.email,
//           subscribed: message.userData.subscribed,
//           lastUpdated: firebase.firestore.FieldValue.serverTimestamp()
//       }).then(() => {
//           console.log("✅ User data saved in Firebase.");
//       }).catch(error => {
//           console.error("🔥 Firestore Error:", error);
//       });
//   }
// });

// extpay.getUser().then(user => {
//   if(user.paid){
//       console.log("okp");
//     }else{
//       console.log("nah");

//     }
//     if(user.onPaid){
//       console.log("okop");
//     }
// })
// extpay.onPaid.addListener(user => {
//   console.log('user paid!')
// });

// if (extpay) {
  // const user = extpay.getUser();
  // if(user.onPaid){
  //   console.log("okop");
  // }
  // // extpay.getUser = async (user) => {
  //   if(user.paid){
  //     console.log("✅ User just paid:", user.email);
  //     // Save user data to Firebase
  //     db.collection("users").doc(user.email).set({
  //         email: user.email,
  //         subscribed: true,
  //         lastUpdated: firebase.firestore.FieldValue.serverTimestamp(),
  //     });

  //     console.log("✅ Payment recorded in Firebase.");
  //   }else{
  //     console.log("nope");
  //   }
  // // };
  // extpay.getUser().then(user => {
  //   if(user.paid){
  //       console.log("okp");
  //     }else{
  //       console.log("nah");

  //     }
  //     if(user.onPaid){
  //       console.log("okop");
  //     }
  // })
  
  

// Listen for messages from other parts of the extension
// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//     if (request.action === "registerUser") {
//       const { email, username, password } = request;
  
//       if (!email || !username || !password) {
//         sendResponse({ success: false, message: "Missing required fields." });
//         return; // Exit early if data is incomplete
//       }

//       // Handle Firebase authentication and database operations
//       auth
//         .createUserWithEmailAndPassword(email, password)
//         .then((userCredential) => {
//           console.log("User registered:", userCredential.user.uid);
          
//           // Save additional user details in the database
//           return db.ref('users/' + userCredential.user.uid).set({
//             username,
//             email,
//           });
//         })
//         .then(() => {
//           console.log("User data saved in database.");
//           sendResponse({ success: true, message: "User registered and data saved!" });
//         })
//         .catch((error) => {
//           console.error("Error during registration:", error.message);
//           sendResponse({ success: false, message: error.message });
//         });
  
//       // Return true to indicate asynchronous response
//       return true;
//     }
//   });
  
  


// Example usage: Log when service worker initializes
console.log("Firebase initialized in background.js");


// background.js
console.log("Background service worker running...");

// Reload extension
function reloadExtension() {
    chrome.runtime.reload(); // This reloads only the current extension
    console.log("Extension reloaded");
}

// Optional: Reload extension command FOR CERTAIN BROWSERS NOT SURE WHICH ONES YEAT AND MAY NEED TO SET COMMANDS
chrome.commands.onCommand.addListener((command) => {
    if (command === "reload_extension") {
        chrome.runtime.reload();
        console.log("Extension reloaded");
    }
});

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     if (message.action === "registerUser") {
//       const { email, password } = message;
  
//       auth.createUserWithEmailAndPassword(email, password)
//         .then(userCredential => {
//           console.log("User registered:", userCredential.user.uid);
//           sendResponse({ success: true });
//         })
//         .catch(error => {
//           console.error("Error registering user:", error);
//           sendResponse({ success: false, error: error.message });
//         });
  
//       return true; // Indicates async response
//     }
//   });
  



// var extpay = ExtPay('savemytabs');
// var extpay2 = ExtPay('url-keeper');
// var extpay3 = ExtPay('jpndjejkgdndefekojliilkmhgjncpgk');
// extpay.startBackground();
// extpay2.startBackground();
// extpay3.startBackground();
// const extensionId = chrome.runtime.id;
// var extpay = ExtPay(extensionId);
// extpay.startBackground();
// Initialize ExtPay instances for different APIs
// const extpayInstances = {
    // savemytabs: ExtPay(extensionId),
// };

// Start the background services for all instances
// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     if (message.action === "resetPlanId") {
//         chrome.storage.local.remove("currentPlanId", () => {
//             console.log("Plan ID reset.");
//             sendResponse({ status: "reset" });
//         });
//         return true; // Indicates asynchronous response
//     }
// });


// let ext;

// changeExtPayId("savemytabs");
// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     if (message.action === "initializeExtPay") {
//         const planId = message.planId;
//         // const extpay = ExtPay(planId);
       
//         // Log user or payment status
//         extpay.getUser().then((user) => {
//             if (user.paid) {
//                 console.log("User is subscribed to the plan.");
//             } else {
//                 console.log("User is not subscribed.",planId);
//                 extpay.openPaymentPage(); // Open payment page if not subscribed
//             }
//         }).catch((error) => {
//             console.error("Error fetching user:", error);
//         });
//     }
// });



// Example: Changing the ExtPay ID at the start
// changeExtPayId("jpndjejkgdndefekojliilkmhgjncpgk");

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     if (message.action === "resetPlanId") {
//         chrome.storage.local.remove("currentPlanId", () => {
//             console.log("Plan ID reset.");
//             sendResponse({ status: "reset" });
//         });
//         return true; // Indicates asynchronous response
//     }
//     if (message.action === "initializeExtPay") {
//         const planId = message.planId;

//         // Update ExtPay ID dynamically if needed
//         if (planId && planId !== extId) {
//             console.log(`Updating ExtPay ID to: ${planId}`);
//             changeExtPayId(planId);
//         }

//         // Log user or payment status
//         extpay.getUser().then((user) => {
//             if (user.paid) {
//                 console.log("User is subscribed to the plan.");
//                 sendResponse({ status: "paid" }); // Respond back with subscription status
//             } else {
//                 console.log("User is not subscribed to the plan.", planId);
//                 extpay.openPaymentPage(); // Open payment page if not subscribed
//                 sendResponse({ status: "not_paid" });
//             }
//         }).catch((error) => {
//             console.error("Error fetching user:", error);
//             sendResponse({ status: "error", error });
//         });

//         // Return true to indicate async response
//         return true;
//     }
// });

// extpay.openPaymentPage()
        // .then(() => {
        //     console.log("Payment page opened successfully");
        // })
        // .catch((error) => {
        //     console.error("Error opening payment page:", error);
        //     alert("Error opening payment page. Please try again.");
        // });


// let extId = "1"; // Default ExtPay ID
// let extpay;

// Dynamically change the ExtPay ID
// function changeExtPayId(newId) {
//     if (newId && typeof newId === "string") {
//         console.log(`Switching ExtPay ID from: ${extId} to ${newId}`);

//         // Update ExtPay ID and reinitialize without reloading
//         extId = newId;
//         extpay = ExtPay(extId); // Create a new instance
//         console.log(`Switched to new ExtPay ID: ${extId}`);
//         // chrome.runtime.reload();

//         // Clear any custom cached user data (optional)
       
//     } else {
//         console.error("Invalid ExtPay ID provided.");
//     }
// }

// // Listen for messages from planpage.js
// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     if (message.action === "resetExtPayId") {
//         // Clear the stored ExtPay ID
//         chrome.storage.local.remove('extPayId', () => {
//             if (chrome.runtime.lastError) {
//                 console.error("Error clearing ExtPay ID:", chrome.runtime.lastError);
//                 sendResponse({ success: false });
//             } else {
//                 console.log("ExtPay ID cleared successfully.");
//                 sendResponse({ success: true });
//             }
//         });
//         return true;  // Keep the message channel open for the async response
//     }

//     if (message.action === "setExtPayId") {
//         // Set the new ExtPay ID (plan ID) in storage
//         // chrome.storage.local.set({ extPayId: message.planId }, () => {
//             // if (chrome.runtime.lastError) {
//                 // console.error("Error setting ExtPay ID:", chrome.runtime.lastError);
//                 // sendResponse({ success: false });
//                 const planId = message.planId;

//  // Update ExtPay ID dynamically if needed
       
//             // console.log(`Updating ExtPay ID to: ${planId}`);
//             // changeExtPayId(planId);
//             // extpay = ExtPay(planId);
//             if (planId && planId !== extId) {
//                             console.log(`Updating ExtPay ID to: ${planId}`);
//                             changeExtPayId(planId);
//                         }

//         // Log user or payment status
//         extpay.getUser().then((user) => {
//             if (user.paid) {
//                 console.log("User is subscribed to the plan.");
//                 sendResponse({ status: "paid" }); // Respond back with subscription status
//             } else {
//                 console.log("User is not subscribed to the plan.", planId);
//                 extpay.openPaymentPage(); // Open payment page if not subscribed
//                 sendResponse({ status: "not_paid" });
//             }
//         }).catch((error) => {
//             console.error("Error fetching user:", error);
//             sendResponse({ status: "error", error });
//         });

//             // } else {
//             //     console.log(`ExtPay ID set to ${message.planId}`);
//             //     sendResponse({ success: true });
//             // }
//         // });
//         return true;  // Keep the message channel open for the async response
//     }

    
// });

// let extpay;

// chrome.storage.sync.get('extpayProjectId', ({ extpayProjectId }) => {
//     if (!extpayProjectId) {
//       console.error('No ExtPay project ID found!');
//       return;
//     }
//     console.log("Extpay is ", extpayProjectId);
//     extpay = ExtPay(extpayProjectId);
//     extpay.getUser().then(user => {
//       if (user.paid) {
//         console.log('User is subscribed.');
//       } else {
//         console.log('User is not subscribed.');
//         return extpay;
//       }
//     });
//   });
  

// function plan(){
//     extpay.openPaymentPage();
// }

  
// function initializeExtPay() {
//   // Get the ExtPay project ID from storage
//   chrome.storage.sync.get('extpayProjectId', ({ extpayProjectId }) => {
//     if (!extpayProjectId) {
//       console.error('No ExtPay project ID found!');
//       return;
//     }
    
//     console.log('ExtPay is:', extpayProjectId);
//     const extpay = ExtPay(extpayProjectId);

//     // Check the user's subscription status
//     extpay.getUser().then(user => {
//       if (user.paid) {
//         console.log('User is subscribed.');
//       } else {
//           extpay.openPaymentPage();
//         console.log('User is not subscribed.');
//       }
//     });
//   });
// }
//   // Listen for changes to the selected plan (assuming you use chrome.runtime.onMessage or similar)
//   chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     if (message.type === 'PLAN_SELECTED') {
//       console.log('New ExtPay p');
//       // When the plan changes, store the new ExtPay project ID
//       chrome.storage.sync.set({ extpayProjectId: message.projectId }, () => {
//         console.log('New ExtPay project ID saved:', message.projectId);
  
//         // Reinitialize ExtPay with the new project ID
//         initializeExtPay();
//       });
//     }
//   });
  
  //tryout


//   // Listen for changes in chrome.storage.sync
// chrome.storage.onChanged.addListener((changes, area) => {
//   if (area === "sync" && changes.extpayProjectId) {
//       const newProjectId = changes.extpayProjectId.newValue;
//       console.log("🔄 Detected ExtPay Project ID change:", newProjectId);

//       // Initialize ExtPay with new project ID
//       initializeExtPay(newProjectId);
//   }
// });

// chrome.storage.sync.get("extpayProjectId", (result) => {
 
//   if (chrome.runtime.lastError) {
//     console.error("❌ Error retrieving extpayProjectId:", chrome.runtime.lastError);
//     return;
//   }
//   if (!result.extpayProjectId) {
//     console.warn("⚠️ No extpayProjectId found in storage.");
//     return;
//   }

//   console.log("🔍 Stored extpayProjectId:", result.extpayProjectId);
  
//   const newProjectId = result.extpayProjectId;
  
//   // Ensure initializeExtPay function exists before calling
//   if (typeof initializeExtPay === "function") {
//     initializeExtPay(newProjectId);
//   } else {
//     console.error("❌ initializeExtPay is not defined!");
//   }
// });
  
//   // Function to initialize ExtPay
//   function initializeExtPay(projectId) {
//     if (!projectId) {
//         console.error("❌ No ExtPay project ID provided!");
//         return;
//     }
  
//     console.log("🚀 Initializing ExtPay with:", projectId);
    // const extpay = ExtPay(projectId);
  
    // extpay.getUser().then(user => {
    //     if (user.paid) {
    //         console.log("✅ User is subscribed.");
    //     } else {
    //         console.log("🔄 User is not subscribed, opening payment page...");
    //         extpay.openPaymentPage();
    //     }
    // });
  // }
// Initialize ExtPay when the background script runs
// initializeExtPay();

//TRY OUT
// Load Firebase dynamically (if needed)
// const firebaseScript = document.createElement("script");
// firebaseScript.src = "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
// document.head.appendChild(firebaseScript);

// firebaseScript.onload = () => {
//   const firestoreScript = document.createElement("script");
//   firestoreScript.src = "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";
//   document.head.appendChild(firestoreScript);

//   firestoreScript.onload = () => {
//     console.log("✅ Firebase loaded in background.js");

//     // Initialize Firebase
//     const firebaseConfig = {
//       apiKey: "AIzaSyDUt2fW-Ejfb4Ctb0TeIvKLB-S9o2tyI9w",
//       authDomain: "savemytabs-ac4d6.firebaseapp.com",
//       databaseURL: "https://savemytabs-ac4d6-default-rtdb.firebaseio.com",
//       projectId: "savemytabs-ac4d6",
//       storageBucket: "savemytabs-ac4d6.firebasestorage.app",
//       messagingSenderId: "476416480968",
//       appId: "1:476416480968:web:0263115d3f8ee14d85b7fd",
//       measurementId: "G-CWFQ08G4Z0"
//     };

//     firebase.initializeApp(firebaseConfig);
//     const db = firebase.firestore();

//     console.log("✅ Firebase initialized in background.js!");

//     // Listen for messages from content scripts or popup
//     chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//       if (request.action === "saveUser") {
//         const { email } = request;
        
//         db.collection("users").doc(email).set({ email, timestamp: new Date() })
//           .then(() => {
//             console.log("✅ User saved:", email);
//             sendResponse({ success: true, message: "User saved successfully!" });
//           })
//           .catch(error => {
//             console.error("❌ Error saving user:", error);
//             sendResponse({ success: false, message: "Failed to save user." });
//           });

//         return true; // Keep the message channel open for async response
//       }
//     });
//   };
// };


// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message.action === "signOutExtPay") {
//       console.log("Signing out from ExtPay...");

//       // Remove ExtPay user data from storage
//       chrome.storage.sync.remove(["extpayUser"], () => {
//           console.log("✅ ExtPay user data removed.");
//       });

//       // Reload extension to reset state
//       chrome.runtime.reload();

//       sendResponse({ success: true, message: "User signed out from ExtPay" });
//   }
// });



//check if extension is installed
chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === "install" || details.reason === "update") {
        checkForUpdates();
    }
});


/**** NOT DONE YET ((set this for monthly, yearly SUBSCRIBERS)) */
//check for updates 
// function checkForUpdates() {
//     // Fetch the manifest file to get the current version of the extension
//     const currentVersion = chrome.runtime.getManifest().version;

//     // Use the Chrome Web Store API or a GitHub API if hosted there
//     const latestVersionUrl = 'https://chrome.google.com/webstore/detail/jpndjejkgdndefekojliilkmhgjncpgk';
    
//     fetch(latestVersionUrl)
//         .then(response => response.json())
//         .then(data => {
//             const latestVersion = data.version; // Extract the latest version
//             if (latestVersion > currentVersion) {
//                 // Show update button to notify the user
//                 document.getElementById('update-button').classList.remove('hidden');
//             }
//         })
//         .catch(error => console.error('Error checking for updates:', error));
// }

// Call this function regularly (e.g., once a day)
// setInterval(checkForUpdates, 86400000); // Checks once per day
function checkForUpdates() {
    // Fetch the manifest file to get the current version of the extension
    const currentVersion = chrome.runtime.getManifest().version;

    // Use an API to fetch the latest version
    const latestVersionUrl = 'https://chrome.google.com/webstore/detail/jpndjejkgdndefekojliilkmhgjncpgk'; // Replace with your API endpoint

    fetch(latestVersionUrl)
        .then(response => response.json())
        .then(data => {
            const latestVersion = data.version; // Extract the latest version
            if (latestVersion > currentVersion) {
                // Show update button to notify the user
                const updateButton = document.getElementById('update-button');
                if (updateButton) {
                    updateButton.classList.remove('hidden');
                }
            }
        })
        .catch(error => console.error('Error checking for updates:', error));
}

chrome.runtime.onStartup.addListener(() => {
    checkForUpdates();
});

document.addEventListener("DOMContentLoaded", () => {
    checkForUpdates();
});    
    


    
   
/************  IN PROGRESS ****/
// var extpay2 = ExtPay('url-keeper');
// var extpay3 = ExtPay('jpndjejkgdndefekojliilkmhgjncpgk');
