// function toggleMenu() {
//     console.log("ok");
//     const dropdownMenu = document.getElementById('dropdownMenu');
//     dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
// }

// Optional: Close the menu if the user clicks outside of it
// window.onclick = function(event) {
//     if (!event.target.closest('.menu-container')) {
//         document.getElementById('dropdownMenu').style.display = 'none';
//     }
// };

// document.getElementById('menu-icon').addEventListener("click", () => {
//     toggleMenu();
// })

// const signInContainer = document.getElementById("signin-link");
// signInContainer.innerHTML = '<i class="fas fa-sign-in-alt fa-lg"></i>';
// const signIn = document.createElement('span');
// signIn.innerHTML = "Sign In / Sign Up";
// signInContainer.classList.add('sign-in-btn');
// signInContainer.title = 'Sign In';

// signInContainer.appendChild(signIn);


// const exportContainer = document.getElementById("export-button");
// const exportFiles = document.createElement('span');
// exportContainer.innerHTML = '<i class="fas fa-file-export fa-lg"></i>';
// exportContainer.classList.add('export-files-btn');
// exportFiles.innerHTML = "Export";
// exportContainer.title = 'Export File(s)';

// exportContainer.appendChild(exportFiles);

 
// const importContainer = document.getElementById("import-button");
// const importFiles = document.createElement('span');
// importContainer.innerHTML = '<i class="fas fa-file-import fa-lg"></i>';
// const importButton = document.createElement('input');
// importButton.type = "file";
// importButton.id = "fileInput";
// importButton.accept = ".csv";
// importFiles.classList.add('file-label');
// importFiles.for = "fileInput";
// importFiles.innerHTML = 'Import';
// importContainer.title = 'Import File';

// importContainer.appendChild(importButton);
// importContainer.appendChild(importFiles);

// const reloadContainer = document.getElementById("reloadButton");
// // const reloadExt = document.createElement('button');
// reloadContainer.innerHTML = '<i class="fas fa-sync fa-lg"></i>Reload Extension';
// reloadContainer.classList.add('reload-ext-btn');
// reloadContainer.title = 'Reload Extension';

// importContainer.addEventListener("click", () => {
//     document.getElementById('fileInput').click();
// });

// document.getElementById('fileInput').addEventListener('change', handleFileUpload);




// var extpay = ExtPay('savemytabs'); //monthly plan
// var extpay2 = ExtPay('url-keeper');//yearly
// var extpay3 = ExtPay('jpndjejkgdndefekojliilkmhgjncpgk'); //one time payment

// importScripts('ExtPay.js');

// const extensionId = chrome.runtime.id;
// console.log('Using Extension ID:', extensionId);


// // check which plan user has
// document.getElementById("monthlyPayment").addEventListener('click', () => {
//     console.log("MONTHLY");
//     extpay.openPaymentPage();
//     // Define the variable
//     let variableName = "savemytabs";
//     // Store it in local storage
//     localStorage.setItem("Plan", variableName);
// }) 

// document.getElementById("yearlyPayment").addEventListener('click', () => {
//     console.log("YEARLY");
//     extpay2.openPaymentPage();
//     let variableName = "yearly";

//     // Store it in local storage
//     localStorage.setItem("Plan", variableName);
// }) 

// document.getElementById("one-timePayment").addEventListener('click', () => {
//     console.log("ONETIME");
//     extpay3.openPaymentPage();
//     let variableName = "onetime";

//     // Store it in local storage
//     localStorage.setItem("Plan", variableName);
// }) 

// function selectPlan(planId) {


//     // Save the selected plan in chrome.storage
//     chrome.storage.sync.set({ selectedPlan: planId }, () => {
//         console.log(`Plan selected: ${planId}`);
//         // Optionally notify the user
//         alert("Plan selected successfully!");
//     });

//     // Notify the background script to initialize ExtPay with the new plan
//     chrome.runtime.sendMessage({
//         action: "initializeExtPay",
//         planId: planId
//     });

    // Destroy the previous ExtPay instance, if any
    // if (currentExtPay) {
    //     currentExtPay.destroy(); // Destroy the previous instance to avoid conflicts
    //     console.log("Previous ExtPay instance destroyed.");
    // }

    // Initialize the new ExtPay instance based on the selected plan
    // let extpay;
    // if (planId === 'savemytabs') {
    //     extpay = ExtPay('savemytabs');
    //     console.log('wha');
    //     extpay.startBackground();
    // } else if (planId === 'url-keeper') {
    //     extpay = ExtPay('url-keeper');
    // } else if (planId === 'jpndjejkgdndefekojliilkmhgjncpgk') {
    //     extpay = ExtPay('jpndjejkgdndefekojliilkmhgjncpgk');
    // }
    
    // currentExtPay = extpay; // Set the current instance to the new one

    // Open the payment page for the selected plan
    // extpay.openPaymentPage()
        // .then(() => {
        //     console.log("Payment page opened successfully");
        // })
        // .catch((error) => {
        //     console.error("Error opening payment page:", error);
        //     alert("Error opening payment page. Please try again.");
        // });
// }

// Assuming you have a function to handle plan selection
// function onPlanSelected(newProjectId) {
//     // Send message to background.js to reset the ExtPay ID
//     // chrome.runtime.sendMessage({ action: "resetExtPayId" }, (response) => {
//     //     if (response.success) {
//     //         console.log("ExtPay ID reset successful.");
//  // Now set the new ExtPay ID for the selected plan
//  chrome.runtime.sendMessage({ type: 'PLAN_SELECTED', projectId: newProjectId }, (response) => {

//     if (response.success) {
//         console.log(`ExtPay ID set to ${newProjectId}`);
//     } else {
//         console.error("Failed to set ExtPay ID.");
//     }
// });
// const extpay = ExtPay(newProjectId);
  
// // Check the user's subscription status
// extpay.getUser().then(user => {
//   if (user.paid) {
//     console.log('User is subscribed.');
//   } else {
//       extpay.openPaymentPage();
//     console.log('User is not subscribed.');
//   }
// });
//         // } else {
//         //     console.error("Failed to reset ExtPay ID.");
//         // }
//     // });
//     // chrome.storage.sync.set({ projectId: newProjectId }, () => {
//     //     if (chrome.runtime.lastError) {
//     //       console.error('Error saving ExtPay project ID:', chrome.runtime.lastError);
//     //     } else {
//     //       console.log('ExtPay project ID saved:', newProjectId);
//     //     }
//     //   });
// }


// let extpay;
// check which plan user has
// if(document.getElementById("monthlyPayment") || document.getElementById("yearlyPayment") || document.getElementById("one-timePayment")){
// if(document.getElementById("monthlyPayment") != null){
// document.getElementById("monthlyPayment").addEventListener('click', () => {
//     console.log("MONTHLY");
//     var newProjectId = "savemytabs";
//     // Define the variable
//     // onPlanSelected("savemytabs");
//     chrome.runtime.sendMessage({ type: 'PLAN_SELECTED', projectId: newProjectId }, (response) => {

//         if (response.success) {
//             console.log(`ExtPay ID set to ${newProjectId}`);
//         } else {
//             console.error("Failed to set ExtPay ID.");
//         }
//     });
//     const extpay = ExtPay(newProjectId);
      
//     // Check the user's subscription status
//     extpay.getUser().then(user => {
//       if (user.paid) {
//         console.log('User is subscribed.');
//       } else {
//           extpay.openPaymentPage();
//         console.log('User is not subscribed.');
//       }
//     });
//     // extpay.startBackground();

//     // Store it in local storage
//     // localStorage.setItem("Plan", variableName);
// }) 



  // const extpay = ExtPay(newProjectId);
  // try {
  //   // Open payment page and wait for subscription
  //   console.log("Opening ExtPay payment page...");
  //    extpay.openPaymentPage();
    
  //   // After the payment page is closed, check user status
  //   const user = extpay.getUser();
    
  //   if (user.paid) {
  //     console.log("User is subscribed.");
      
  //     // Extract email (ExtensionPay doesn't provide username or password)
  //     if (user.email) {
  //       console.log("User email:", user.email);
  
  //       // Send user email to background.js
  //       chrome.runtime.sendMessage(
  //         {
  //           action: "registerUser",
  //           email: user.email,
  //         },
  //         (response) => {
  //           if (response.success) {
  //             console.log(response.message); // Success message
  //           } else {
  //             console.error(response.message); // Error message
  //           }
  //         }
  //       );
  //     } else {
  //       console.error("No email found for the user.");
  //     }
  //   } else {
  //     console.log("User is not subscribed.");
  //   }
  // } catch (error) {
  //   console.error("Error occurred while handling payment:", error);
  // }
  
          
           

// }

// document.querySelectorAll(".planInUse").forEach(plan => {
//     plan.addEventListener("click", function () {
//         // Remove selection from other plans
//         document.querySelectorAll(".planInUse").forEach(p => p.classList.remove("selected"));

//         // Select the clicked plan
//         this.classList.add("selected");
        
//         // Check the radio input
//         const radioInput = this.querySelector("input[type='radio']");
//         if (radioInput) {
//             radioInput.checked = true;
           
//             // Check if the selected plan is monthly or yearly
//             // if (radioInput.value === "monthly") {
//                 // console.log("Monthly plan selected");
//                 handlePlanSelection(radioInput.value);
//             // } else if (radioInput.value === "yearly") {
                
//                 handlePlanSelection(radioInput.value);
//                 console.log("plan selected: ", radioInput.value);
//             // }
//         }
//     });
// });
// let newProjectId="";
// // Function to handle plan selection
// function handlePlanSelection(planType) {
//   if(planType == "monthly"){
//     newProjectId = "savemytabs";
//     console.log("monthly");
//   } else if (planType === "yearly") {
//     newProjectId = "url-keeper";
//     console.log("yearly");
// }
// console.log("Selected Plan:", newProjectId);

    
// }
// document.getElementById("selectPlan").addEventListener("click", function () {
//   console.log("Sending PLAN_SELECTED:", newProjectId);
//   // After sending the selected plan info
// chrome.runtime.sendMessage({ type: 'PLAN_SELECTED', projectId: newProjectId }, (response) => {
//   if (response?.success) {
//       console.log(`+project info sent ${newProjectId}`);
//       // Reload the extension after successfully sending project info
//       chrome.runtime.reload();
//   } else {
//       console.error("Failed to set project info.");
//   }
// });

//   chrome.storage.sync.set({ extpayProjectId: "url-keeper" }, () => {
//     if (chrome.runtime.lastError) {
//         console.error("❌ Failed to save project ID:", chrome.runtime.lastError);
      
//     }else{
//       console.log(`✅ Successfully saved project ID: ${newProjectId}`);

//       // Retrieve the stored value to confirm it's set
//       chrome.storage.sync.get("extpayProjectId", (result) => {
//        console.log("🔍 Stored extpayProjectId:", result.extpayProjectId);
//    });
//    const extpay = ExtPay(newProjectId);
//    extpay.getUser().then(user => {
//                  if (user.paid) {
//                      console.log('User is subscribed.');
//                  } else {
//                      extpay.openPaymentPage();
//    }
//  });
//     }
  
// });
   
// });

//WORKS
// const monthlyPaymentButton = document.getElementById("monthlyPayment");
// if (monthlyPaymentButton && !monthlyPaymentButton.dataset.listenerAdded) {
//     monthlyPaymentButton.dataset.listenerAdded = true; // Mark that the listener is added
//     monthlyPaymentButton.addEventListener('click', async () => {
//         // event.preventDefault();
//         console.log("MONTHLY button clicked");
//           // onPlanSelected("savemytabs");
//         const newProjectId = "savemytabs";
//         if (!newProjectId) {  // Check if newProjectId is set
//           console.error("❌ No project ID set before sending the message!");
//           return;
//       }
//         const extpay = ExtPay(newProjectId);
//         try {
//           // Open payment page and wait for subscription
//           console.log("Opening ExtPay payment page...");
//           await extpay.openPaymentPage();
          
//           // After the payment page is closed, check user status
//           const user = await extpay.getUser();
          
//           if (user.paid) {
//             console.log("User is subscribed.");
            
//             // Extract email (ExtensionPay doesn't provide username or password)
//             if (user.email) {
//               console.log("User email:", user.email);
        
//               // Send user email to background.js
//               chrome.runtime.sendMessage(
//                 {
//                   action: "registerUser",
//                   email: user.email,
//                 },
//                 (response) => {
//                   if (response.success) {
//                     console.log(response.message); // Success message
//                   } else {
//                     console.error(response.message); // Error message
//                   }
//                 }
//               );
//             } else {
//               console.error("No email found for the user.");
//             }
//           } else {
//             console.log("User is not subscribed.");
//           }
//         } catch (error) {
//           console.error("Error occurred while handling payment:", error);
//         }
        
                
                 
//     });
// }
// import { db, setDoc, doc } from "./firebase.js";
// const newProjectId = "savemytabs"; // Example project ID
// const extpay = ExtPay(newProjectId);
// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
var extpay = ExtPay('jpndjejkgdndefekojliilkmhgjncpgk');

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

// if (!firebase.apps.length) {
//     firebase.initializeApp(firebaseConfig);
// }

// // Initialize Firebase
//  db = firebase.firestore();

console.log("✅ Firebase initialized in planpage.js");

//TRYING
// document.getElementById("monthlyPayment").addEventListener("click", async () => {
//     console.log("MONTHLY button clicked");
//     const newProjectId = "savemytabs";

//     if (!newProjectId) {
//         console.error("❌ No project ID set before sending the message!");
//         return;
//     }

//     const extpay = ExtPay(newProjectId);

//     try {
//         console.log("Opening ExtPay payment page...");
//         await extpay.openPaymentPage();

//         const user = await extpay.getUser();

//         if (user.paid) {
//             console.log("✅ User is subscribed:", user.email);

//             if (user.email) {
//                 // Send email to background.js to save in Firestore
//                 chrome.runtime.sendMessage(
//                     {
//                         action: "saveUser",
//                         email: user.email
//                     },
//                     (response) => {
//                         if (response.success) {
//                             console.log(response.message);
//                         } else {
//                             console.error(response.message);
//                         }
//                     }
//                 );
//             } else {
//                 console.error("❌ No email found for the user.");
//             }
//         } else {
//             console.log("❌ User is not subscribed.");
//         }
//     } catch (error) {
//         console.error("❌ Error occurred while handling payment:", error);
//     }
// });

const monthlyPaymentButton = document.getElementById("one-timePayment");

if (monthlyPaymentButton && !monthlyPaymentButton.dataset.listenerAdded) {
    monthlyPaymentButton.dataset.listenerAdded = true; // Mark that the listener is added
    
    monthlyPaymentButton.addEventListener('click', async () => {
        // extpay.openPaymentPage();
        try {
            console.log("Opening ExtPay payment page...");
            await extpay.openPaymentPage();  // Opens Stripe payment page
    
                // After payment, check user status
                // const user = await extpay.getUser();
                // console.log("User details:", user);
                
                // if (user) {
                // if (user.paid && user.email) {
                //     console.log("✅ User subscribed:", user.email);
                
                //     // Save user data to Firebase Firestore
                //         await db.collection("users").doc(user.email).set({
                //             email: user.email,
                //             subscribed: true,
                //             lastUpdated: firebase.firestore.FieldValue.serverTimestamp(),
                //         });
                //         console.log("✅ User data saved in Firebase.");
                // } else {
                //     console.log("❌ User did not subscribe.");
                // }
        } catch (error) {
            console.error("Error handling subscription:", error);
        }
    });
 
}


// const functions = require("firebase-functions");
// const admin = require("firebase-admin");
// const stripe = require("stripe")("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");

// admin.initializeApp();
// db = admin.firestore();

// exports.createStripeCustomer = functions.firestore
//     .document("users/{email}")
//     .onCreate(async (snap, context) => {
//         const email = context.params.email;
//         const customer = await stripe.customers.create({ email });

//         await db.collection("users").doc(email).update({ stripeCustomerId: customer.id });

//         return { success: true, stripeCustomerId: customer.id };
//     });

// const yearlyPaymentButton = document.getElementById("yearlyPayment");
// if (yearlyPaymentButton && !monthlyPaymentButton.dataset.listenerAdded) {
//   yearlyPaymentButton.dataset.listenerAdded = true; // Mark that the listener is added
//   yearlyPaymentButton.addEventListener('click', async (event) => {
//         // event.preventDefault();
//         console.log("YEARLY button clicked");

//         //  onPlanSelected("url-keeper");
//         const newProjectId = "url-keeper";
//         chrome.runtime.sendMessage({ type: 'PLAN_SELECTED', projectId: newProjectId }, (response) => {
//             if (response.success) {
//               console.log(`+project info sent ${newProjectId}`);
//             } else {
//                 console.error("Failed to set project info.");
//             }
//         });
//         // const extpay = ExtPay(newProjectId);
//         // try {
//         //    // Open payment page and wait for subscription
//         //    console.log("Opening ExtPay payment page...");
//         //    const data = await extpay.openPaymentPage();
//         //    console.log("Data returned by openPaymentPage:", data);
//         // // extpay.getUser().then(user => {
//         // //     if (user.paid) {
//         // //         console.log('User is subscribed.');
//         // //     } else {
//         //         // extpay.openPaymentPage();
               
//         //         // extpay.openPaymentPage().then((data) => {

//         //           if (data) {
//         //             const { email, username, password } = data;
//         //                console.log("info gatthere?");
//         //             if (!email || !username || !password) {
//         //               console.error("Missing required fields in data:", data);
//         //               return; // Exit if required fields are missing
//         //             }
                    
//         //             // Send user data to background.js
//         //             chrome.runtime.sendMessage(
//         //               {
//         //                 action: "registerUser",
//         //                 email,
//         //                 username,
//         //                 password,
//         //               },
//         //               (response) => {
//         //                 if (response.success) {
//         //                   console.log(response.message); // Success message
//         //                 } else {
//         //                   console.error(response.message); // Error message
//         //                 }
//         //               }
//         //             );
//         //           } else {
//         //             console.error("No data provided by extpay.openPaymentPage()");
//         //           }
//         //         } catch (error) {
//         //           console.error("Error occurred while opening payment page:", error);
//         //       }
//         // try {
//         //   // Open payment page and wait for subscription
//         //   console.log("Opening ExtPay payment page...");
//         //   await extpay.openPaymentPage();
          
//         //   // After the payment page is closed, check user status
//         //   const user = await extpay.getUser();
          
//         //   if (user.paid) {
//         //     console.log("User is subscribed.");
            
//         //     // Extract email (ExtensionPay doesn't provide username or password)
//         //     if (user.email) {
//         //       console.log("User email:", user.email);
        
//         //       // Send user email to background.js
//         //       chrome.runtime.sendMessage(
//         //         {
//         //           action: "registerUser",
//         //           email: user.email,
//         //         },
//         //         (response) => {
//         //           if (response.success) {
//         //             console.log(response.message); // Success message
//         //           } else {
//         //             console.error(response.message); // Error message
//         //           }
//         //         }
//         //       );
//         //     } else {
//         //       console.error("No email found for the user.");
//         //     }
//         //   } else {
//         //     console.log("User is not subscribed.");
//         //   }
//         // } catch (error) {
//         //   console.error("Error occurred while handling payment:", error);
//         // }  
//     });
// }
// document.getElementById("yearlyPayment").addEventListener('click', () => {
//     console.log("YEARLY");
//     onPlanSelected("url-keeper");
//     // extpay.startBackground();
//     let variableName = "yearly";
//     // extpay.startBackground();

//     // Store it in local storage
//     localStorage.setItem("Plan", variableName);
// }) 

// document.getElementById("one-timePayment").addEventListener('click', () => {
//     console.log("ONETIME");
//     // extpay3.openPaymentPage();
//     let variableName = "onetime";
   
//     // Store it in local storage
//     localStorage.setItem("Plan", variableName);
//     onPlanSelected("jpndjejkgdndefekojliilkmhgjncpgk");
// }) 
// }
