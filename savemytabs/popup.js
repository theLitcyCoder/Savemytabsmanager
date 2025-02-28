// import { ExtPay } from 'ExtPay.js';
// importScripts('ExtPay.js');
const extpay = ExtPay('jpndjejkgdndefekojliilkmhgjncpgk');
// var extpay2 = ExtPay('url-keeper');
// var extpay3 = ExtPay('jpndjejkgdndefekojliilkmhgjncpgk');
extpay.startBackground();

var selectedExtpay;
const extensionId = chrome.runtime.id;
console.log('Current Extension ID:', extensionId);

const firebaseConfig = {
    apiKey: "AIzaSyDUt2fW-Ejfb4Ctb0TeIvKLB-S9o2tyI9w",
    authDomain: "savemytabs-ac4d6.firebaseapp.com",
    databaseURL: "https://savemytabs-ac4d6-default-rtdb.firebaseio.com",
    projectId: "savemytabs-ac4d6",
    storageBucket: "savemytabs-ac4d6.firebasestorage.app",
    messagingSenderId: "476416480968",
    appId: "1:476416480968:web:0263115d3f8ee14d85b7fd",
    measurementId: "G-CWFQ08G4Z0"
};
  
// // Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
// // const auth = firebase.auth();
const db2 = firebase.firestore();

console.log(extpay);
console.log(typeof extpay.openLoginPage);

// extpay.getUser().then(user => {
    
//     const userData = {
//         lastUpdated: firebase.firestore.FieldValue.serverTimestamp(),
//     };

//     if (user.paidAt) userData.userpaiddate = user.paidAt;
//     if (user.installedAt) userData.userinstalleddate = user.installedAt;
//     if (user.email) userData.email = user.email;
//     if (user.paid !== undefined) userData.subscribed = user.paid;

//     db2.collection("users").doc(user.email).set(userData)
//     .then(() => console.log("User saved to Firestore:", userData))
//     .catch(error => console.error("Error saving user:", error));
//     console.log("✅ Payment recorded in Firebase.");
// });

// Function to fetch IP address
function getIPAddress() {
    return fetch("https://api.ipify.org?format=json")
        .then(response => response.json())
        .then(data => data.ip)
        .catch(error => {
            console.error("Error fetching IP address:", error);
            return null;
        });
}

extpay.getUser().then(async user => {
    let userId = user.email;
    
    if (!userId) {
        // If no email, try getting the user's IP address
        userId = await getIPAddress();
        if (!userId) {
            console.error("Could not determine user identity.");
            return; // Stop execution if no email or IP
        }
    }

    const userRef = db2.collection("users").doc(userId);

    userRef.get().then((doc) => {
        const userData = {
            lastUpdated: firebase.firestore.FieldValue.serverTimestamp(),
        };

        if (user.paidAt) userData.userpaiddate = user.paidAt;
        if (user.installedAt) userData.userinstalleddate = user.installedAt;
        if (user.email) userData.email = user.email;
        if (user.paid !== undefined) userData.subscribed = user.paid;

        if (!user.email) userData.ip = userId; // Save IP only if no email

        if (doc.exists) {
            userRef.update(userData)
                .then(() => console.log("✅ User updated in Firestore:", userData))
                .catch(error => console.error("Error updating user:", error));
        } else {
            userRef.set(userData)
                .then(() => console.log("✅ New user saved to Firestore:", userData))
                .catch(error => console.error("Error saving new user:", error));
        }
    }).catch(error => console.error("Error checking Firestore:", error));
});



async function getAllUserEmails() {
    try {
        // Reference Firestore users collection
        const usersCollection = firebase.firestore().collection("users");
        
        // Fetch all documents
        const querySnapshot = await usersCollection.get();
  
        const emails = [];
        querySnapshot.forEach((doc) => {
            emails.push(doc.id); // Assuming user email is the document ID
        });
  
        console.log("✅ All user emails:", emails);
        return emails;
    } catch (error) {
        console.error("❌ Error fetching users:", error);
    }
  }
  
  // Call function
  getAllUserEmails();
// function selectPlan(planId) {
//     // Save the selected plan in chrome.storage
//     chrome.storage.sync.set({ selectedPlan: planId }, () => {
//       console.log(`Plan selected: ${planId}`);
//       // Optionally notify the user
//       alert("Plan selected successfully!");
//     });
  
//     // Notify the background script to initialize ExtPay with the new plan
// //   chrome.runtime.sendMessage({ action: "initializeExtPay", planId }, (response) => {
//     // if (response?.success) {
//     //   console.log("ExtPay initialized in background:", planId);
//       chrome.runtime.sendMessage({
//         action: "initializeExtPay",
//         planId: planId
//     });
 
//       // Initialize ExtPay locally and open the payment page
//       const  extpay = ExtPay(planId);
//     //   extpay.startBackground();
    

//       extpay.openPaymentPage()
//         .then(() => console.log("Payment page opened successfully"))
//         .catch((error) => console.error("Error opening payment page:", error));
//     // } else {
//     //   console.error("Failed to initialize ExtPay in background:", response?.error);
//     //   alert("Error initializing payment. Please try again.");
//     // }
// //   });
//   }


let currentExtPay = null; // Track the current active ExtPay instance




// Function to determine which ExtPay instance to use or prompt the user for payment
// function selectExtPay() {
//     // Check the plan status of each ExtPay instance
//     return extpay.getUser().then(user => {
//         if (user.plan) {
//             return extpay; // Return savemytabs if the user has a plan
//         }
//         return extpay2.getUser().then(user2 => {
//             if (user2.plan) {
//                 return extpay2; // Return url-keeper if the user has a plan
//             }
//             return extpay3.getUser().then(user3 => {
//                 if (user3.plan) {
//                     return extpay3; // Return jpndjejkgdndefekojliilkmhgjncpgk if the user has a plan
//                 }

//                 // No plan found for any instance; prompt the user for payment options
//                 return promptUserForPaymentOption();
//             });
//         });
//     });
// }

// Function to determine which ExtPay instance to use or prompt the user for payment
// function userSignedIn() {
//     // Check the plan status of each ExtPay instance
//     let retrievedValue = localStorage.getItem("variableName");
//     console.log(retrievedValue);

//     // if(retrievedValue == "monthly"){
//        extpay.getUser().then(user => {
   
//             userPaid = user.paid;
            
//             if (user.paid) {
//                 // User is signed in
//                 // document.getElementById('profile-link').style.display = 'inline';
//                 document.getElementById('signin-link').style.display = 'none';
//                 document.getElementById('search-container').style.display = 'block';
               
//             } else {
//                 document.getElementById('profile-link').style.display = 'inline';
//                 // User is not signed in
//                 // document.getElementById('profile-icon-container').style.display = 'none';
//                 document.getElementById('signin-link').style.display = 'block';
//                 document.getElementById('search-container').style.display = 'none';    
//             }
//         })
    // }

    // if(retrievedValue == "yearly"){
    //     extpay2.getUser().then(user => {
   
    //         userPaid = user.paid;
            
    //         if (user.paid) {
    //             // User is signed in
    //             // document.getElementById('profile-link').style.display = 'inline';
    //             document.getElementById('signin-link').style.display = 'none';
    //             document.getElementById('search-container').style.display = 'block';
                
    //         } else {
    //             document.getElementById('profile-link').style.display = 'inline';
    //             // User is not signed in
    //             // document.getElementById('profile-icon-container').style.display = 'none';
    //             document.getElementById('signin-link').style.display = 'block';
    //             document.getElementById('search-container').style.display = 'none';    
    //         }
    //     })
    // }
    // chrome.runtime.sendMessage({ action: "resetPlanId" });
    // chrome.storage.local.clear(() => {
    //     console.log("Extension storage cleared for the new ExtPay ID.");
    // });
   
    // if(retrievedValue == "onetime"){
    //    extpay3.getUser().then(user => {
   
    //         userPaid = user.paid;
            
    //         if (user.paid) {
    //             // User is signed in
    //             // document.getElementById('profile-link').style.display = 'inline';
    //             document.getElementById('signin-link').style.display = 'none';
    //             document.getElementById('search-container').style.display = 'block';
    //             extpay3;
    //         } else {
    //             document.getElementById('profile-link').style.display = 'inline';
    //             // User is not signed in
    //             // document.getElementById('profile-icon-container').style.display = 'none';
    //             document.getElementById('signin-link').style.display = 'block';
    //             document.getElementById('search-container').style.display = 'none';    
    //         }
    //     })
    // }
    
      
// }
// function tryFunction() {
//     let u = userPaid();
//     if(user.plan){
//         console.log(user.plan.)
//     }
// }

let userPaid = false;



if(document.getElementById('upgrade')){
    // Add event listener to the sign-in link
    document.getElementById('upgrade').addEventListener('click', () => {
        // extpay.openLoginPage();
        window.open('PlanPage.html', '_blank');

    });
}

if(document.getElementById('upgrade2')){
    // Add event listener to the sign-in link
    document.getElementById('upgrade2').addEventListener('click', () => {
        // extpay.openLoginPage();
        window.open('PlanPage.html', '_blank');

    });
}
if(document.getElementById('profile-button')){
    // Add event listener to the sign-in link
    document.getElementById('profile-button').addEventListener('click', () => {
        window.location.href = 'profile.html';
    });
}

// if(document.getElementById('signIn')){
    // Add event listener to the sign-in link
    document.getElementById('signIn').addEventListener('click', () => {
        // extpay.openPaymentPage();
        
              extpay.openLoginPage();
          
    });
// }

if(document.getElementById('planpage')){
    // Add event listener to the sign-in link
    document.getElementById('planpage').addEventListener('click', () => {
        window.open('PlanPage.html', '_blank');
    });
}

let setDrag = false;

// Function to check user status and update UI
function checkUserStatus() {
    // Check the "signed-out" flag first
    chrome.storage.local.get(['signedOut'], (result) => {
      const isSignedOut = result.signedOut;
  
    //   if (isSignedOut) {
      
    //   } else {
        // Fetch user subscription status from ExtPay
        extpay.getUser()
          .then(user => {
           
            
            if(user.paid && !user.subscriptionCancelAt){
               
                console.log('User data2:', user);
                console.log('User is subscribed.');

                if(document.getElementById('upgrade')){
                 document.getElementById('upgrade').style.display = 'none';
                }
                if(document.getElementById('upgrade2')){
                    document.getElementById('upgrade2').style.display = 'none';
                }
                if(document.getElementById('planpage')){
                    document.getElementById('planpage').style.display = 'block';
                }
                if(document.querySelector('.search-container')){
                 document.querySelector('.search-container').style.display = 'block'; 
                }
                if(document.getElementById('signIn')){
                    document.getElementById('signIn').style.display = 'none';
                }
             setDrag = true;
             chrome.storage.local.set({ 'setDrag': true });
            }else{
                console.log('User is locally signed odut.');
                console.log('User is not subscribed.');
                chrome.storage.local.set({ 'setDrag': false });
                    if(document.getElementById('planpage')){
                        document.getElementById('planpage').style.display = 'none';
                    }
                    if(document.getElementById('export-button')){
                        document.getElementById('export-button').style.display = 'none';
                    }
                    if(document.getElementById('import-button')){
                        document.getElementById('import-button').style.display = 'none';
                    }
                    if (document.querySelectorAll('.save-session-button').length > 0) {
                        document.querySelectorAll('.save-session-button').forEach(button => {
                            button.style.display = 'none';
                        });
                    }
                    if(document.getElementById('profile-plan')){
                        document.getElementById('profile-plan').style.display = 'none';
                    }
                    if(document.getElementById('tab3button')){
                        document.getElementById('tab3button').style.display = 'none';
                    }
                    if(document.getElementById('tab3')){
                        document.getElementById('tab3').style.display = 'none';
                    }
                    if(document.getElementById('upgrade')){
                        document.getElementById('upgrade').style.display = 'block';
                    }
                    if(document.getElementById('upgrade2')){
                        document.getElementById('upgrade2').style.display = 'block';
                    }
                    if(document.getElementById('signIn')){
                        document.getElementById('signIn').style.display = 'block';
                    }
                    if(document.querySelector('.search-container')){
                        document.querySelector('.search-container').style.display = 'none';
                    }
                    setDrag = false;
            }
           
          })
          .catch(error => {
            console.error('Error fetching user data:', error);
            console.log('User is not subscribed.');
      setDrag = false;
            if(document.getElementById('planpage')){
                document.getElementById('planpage').style.display = 'none';
            }
            if(document.getElementById('profile-plan')){
                document.getElementById('profile-plan').style.display = 'none';
            }
            if(document.getElementById('export-button')){
                document.getElementById('export-button').style.display = 'none';
            }
            if(document.getElementById('import-button')){
                document.getElementById('import-button').style.display = 'none';
            }
            if (document.querySelectorAll('.save-session-button').length > 0) {
                document.querySelectorAll('.save-session-button').forEach(button => {
                    button.style.display = 'none';
                });
            }
            if(document.getElementById('tab3button')){
                document.getElementById('tab3button').style.display = 'none';
            }
            if(document.getElementById('tab3')){
                document.getElementById('tab3').style.display = 'none';
            }
            if(document.getElementById('upgrade')){
                document.getElementById('upgrade').style.display = 'block';
            }
            if(document.getElementById('upgrade2')){
                document.getElementById('upgrade2').style.display = 'block';
            }
            if(document.getElementById('signIn')){
                document.getElementById('signIn').style.display = 'block';
            }
            if(document.querySelector('.search-container')){
                document.querySelector('.search-container').style.display = 'none';
            }
          });
    //   }
    });
  }

let db;
let myLeads = {};
const folderUrlStates = {}
let currentFolderChoice = null;
let currentFolder = null;
// Define UI elements and initialize
const inputEl = document.getElementById('input-el');
const saveInputBtn = document.getElementById('input-btn');
const tabSaveBtn = document.getElementById('tab-btn');
const addFolderBtn = document.getElementById('add-folder-btn');
const input_fcb = document.getElementById('input-fcb');
const currentFolderNameEl = document.getElementById('current-folder-name');
const folderContent = document.getElementById('folder-content');
const searchBar = document.getElementById('search-bar');
const checkboxChecker = document.querySelectorAll('lead-checkbox');
// Dragging variables - leads
let draggedItem = null;
let draggedOverFolder = null;
let draggedOverLeadIndex = null;
// Dragging variables - folders
let dragSrcEl = null;

// Initialize the database
function initialize() {
// Run the checkUserStatus function on page load

    let request = indexedDB.open('myDatabase', 1);
    request.onupgradeneeded = function(event) {
        db = event.target.result;
        // Create object stores
        let leadStore = db.createObjectStore('objects', { keyPath: 'id', autoIncrement: true });
        leadStore.createIndex('folderId', 'folderId', { unique: true });
    };

    request.onsuccess = function(event) {
        db = event.target.result;
       
        loadFolders();
        updateUI();
        checkUserStatus();
        showCurrentTabs();
        updateFolders();
        showAllSavedSessions();
        console.log("success");
    };

    request.onerror = function(event) {
        console.error('Database error:', event.target.error);
    };
}

// const profileContainer = document.getElementById("profile-button");
// if(profileContainer){
//     profileContainer.innerHTML = '<i class="fas fa-user-circle"></i>';
//     const profile = document.createElement('span');
//     profile.innerHTML = "Profile";
//     profileContainer.classList.add('profile-icon');
//     profileContainer.title = 'Profile';

//     profileContainer.appendChild(profile);
// }

const upgradeContainer = document.getElementById("upgrade");
if(upgradeContainer){
    upgradeContainer.innerHTML = '<i class="fas fa-solid fa-arrow-up-from-bracket fa-lg" style="color: #ffffff;"></i>    ';
    const upgrade = document.createElement('span');
    upgrade.innerHTML = "Upgrade";
    upgradeContainer.title = 'Upgrade';

    upgradeContainer.appendChild(upgrade);
}

const signInContainer = document.getElementById("signIn");
if(signInContainer){
    signInContainer.innerHTML = '<i class="fas fa-sign-in-alt fa-lg"></i>';
    const signIn = document.createElement('span');
    signIn.innerHTML = "SignIn";
    signInContainer.title = 'SignIn';

    signInContainer.appendChild(signIn);
}

const exportContainer = document.getElementById("export-button");
if(exportContainer){
    const exportFiles = document.createElement('span');
    exportContainer.innerHTML = '<i class="fas fa-file-export fa-lg"></i>';
    exportContainer.classList.add('export-files-btn');
    exportFiles.innerHTML = "Export";
    exportContainer.title = 'Export File(s)';

    exportContainer.appendChild(exportFiles);
}
 
const importContainer = document.getElementById("import-button");
if(importContainer){
    const importFiles = document.createElement('span');
    importContainer.innerHTML = '<i class="fas fa-file-import fa-lg"></i>';
    const importButton = document.createElement('input');
    importButton.type = "file";
    importButton.id = "fileInput";
    importButton.accept = ".csv";
    importFiles.classList.add('file-label');
    importFiles.for = "fileInput";
    importFiles.innerHTML = 'Import';
    importContainer.title = 'Import File';

    importContainer.appendChild(importButton);
    importContainer.appendChild(importFiles);
}

const reloadContainer = document.getElementById("reloadButton");
if(reloadContainer){
    // const reloadExt = document.createElement('button');
    reloadContainer.innerHTML = '<i class="fas fa-sync fa-lg"></i>Reload Extension';
    reloadContainer.classList.add('reload-ext-btn');
    reloadContainer.title = 'Reload Extension';

    if(importContainer){
        importContainer.addEventListener("click", () => {
            document.getElementById('fileInput').click();
        });
    }

    document.getElementById('fileInput').addEventListener('change', handleFileUpload);
}

//Display Leads from each folder
function render(folder) {
   if(!folderContent){
        return;
   }
   folderContent.innerHTML = "";
    if (!myLeads[folder]) {
        myLeads[folder] = [];
    }

    const leads = myLeads[folder];
    // Retrieve the setDrag value from chrome.storage
    chrome.storage.local.get(['setDrag'], (result) => {
        const dragState = result.setDrag;

    for (let i = 0; i < leads.length; i++) {
        const li = document.createElement("li");
        li.classList.add("leadItems");
        // if (userPaid == false && Object.keys(myLeads).length < 3) 
            //     {     
            //         if (folderName && !myLeads[folderName]) {
            //             input_fcb.value = "";
            
            //             createFolder(folderName);
            //             switchFolder(folderName);
            //         }
            //     } else {
            //         console.log("bah");
            //         extpay.openPaymentPage();
            //     }
            console.log("drag", dragState);
            if (dragState === true) {
            console.log("drag on");
            li.draggable = true; // Enable drag functionality on each item

            // Add grabbing cursor style
            li.style.cursor = "grab";

            // Event listeners for dragging with cursor change
            li.addEventListener('mousedown', () => li.style.cursor = "grabbing");
            li.addEventListener('mouseup', () => li.style.cursor = "grab");
            li.addEventListener('dragend', () => li.style.cursor = "grab");

            // Drag events to allow reordering
        
            li.addEventListener('dragstart', (e) => { handleDragStart(e, folder, i, li);
                li.classList.add("dragging");
            });
    
            
            li.addEventListener('dragover', handleDragOver);
            li.addEventListener('drop', (e) => handleDrop(e, folder, i));

            li.addEventListener('dragenter', () => li.classList.add("snap-in")); // Add snap-in animation on enter
            li.addEventListener('dragleave', () => li.classList.remove("snap-in"));
        }

        const urlContainer = document.createElement("div");
        urlContainer.classList.add("url-container");
        const urlSubContainer = document.createElement("div");
        urlSubContainer.classList.add("url-Subcontainer");

        const favicon = document.createElement("img");
        favicon.src = leads[i].favicon; // Ensure favicon is defined
        favicon.classList.add("favicon");

        const title = document.createElement("div");
        title.textContent = leads[i].url;
        title.classList.add("title");

        const a = document.createElement("a");
        a.href = leads[i].url;
        a.target = "_blank";
        a.textContent = leads[i].title;
        
        const time = document.createElement("div");
        const formattedTime = leads[i].timestamp 
        ? formatTimestamp(leads[i].timestamp) 
        : "N/A"; // Fallback if timestamp is missing
        time.textContent = formattedTime;
        time.classList.add("timestamp");
        

        // Create the copy URL button
        const copyUrlBtn = document.createElement('button');
        copyUrlBtn.innerHTML = '<i class="fas fa-copy fa-lg"></i>';
        copyUrlBtn.classList.add('copy-url-btn');
        copyUrlBtn.title = 'Copy URL';
        // Add click event listener to the copy button
        copyUrlBtn.addEventListener('click', () => {
            copyToClipboard(leads[i].url); // Call function to copy URL
        });

        const btnContainer = document.createElement("div");
        btnContainer.classList.add("btn-container");

        const editBtn = document.createElement("button");
        editBtn.innerHTML = '<i class="fas fa-edit fa-lg"></i>';
        editBtn.classList.add('edit-folder-button');
        editBtn.title = 'Edit Link Name';
        editBtn.addEventListener('click', () => toggleEdit(folder, i, title, a, li));

        // Create a checkbox for deletion
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("url-checkbox"); // Add a class for easy selection
        checkbox.setAttribute("data-folder", folder); // Set folder name as data attribute
        checkbox.setAttribute("data-url-id", leads[i].id); // Set URL ID as data attribute
        checkbox.addEventListener('click', toggleDeleteLinksButton);

        urlSubContainer.appendChild(favicon);
        urlSubContainer.appendChild(a);
        
        urlSubContainer.appendChild(title);
        urlContainer.appendChild(urlSubContainer);
        urlContainer.appendChild(time);
        btnContainer.appendChild(copyUrlBtn);
        btnContainer.appendChild(editBtn);
        btnContainer.appendChild(checkbox);

        li.appendChild(urlContainer);
        li.appendChild(btnContainer);
        folderContent.appendChild(li);
    }
});
    updateFolders();
    updateUI(); // Ensure this function is defined
}

//Leads Drag
// Drag event handlers for reordering
function handleDragStart(e, folder, index) {
    draggedItem = { folder, index };
    e.dataTransfer.effectAllowed = 'move';
    // li.classList.add("lifted"); // Apply lifted style on drag start
}

function handleDragOver(e) {
    e.preventDefault(); // Necessary for drop event to fire
    e.dataTransfer.dropEffect = 'move';
}

function handleDrop(e, targetFolder, targetIndex) {
    e.preventDefault();
    if (draggedItem) {
        const { folder, index } = draggedItem;

        // Only move within the same folder
        if (folder === targetFolder) {
            const leads = myLeads[folder];
            const draggedLead = leads.splice(index, 1)[0]; // Remove dragged item
            leads.splice(targetIndex, 0, draggedLead); // Insert at new position

            saveDataToStorage(); // Save updated order to storage
            render(folder); // Rerender with the new order
        }
        draggedItem = null; // Reset dragged item
    }
}

function formatTimestamp(timestamp) {
    if (!timestamp) {
        return "No timestamp available"; // Handle missing timestamps
    }

    const date = new Date(timestamp); // Parse ISO string into a Date object

    // Get individual date/time components
    const months = [
        "January", "February", "March", "April", "May", 
        "June", "July", "August", "September", "October", "November", "December"
    ];
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();

    // Format hours, minutes, and AM/PM
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert to 12-hour format

    return `${month} ${day}, ${year} ${hours}:${minutes} ${ampm}`;
}



function copyToClipboard(url) {
    navigator.clipboard.writeText(url).then(() => {
        console.log('URL copied to clipboard:', url);
        customAlert('URL copied to clipboard!'); // Optionally notify the user
    }).catch(err => {
        console.error('Failed to copy URL:', err);
    });
}

if(searchBar){
    // Event listener for the search bar
    searchBar.addEventListener('keydown', () => {
        const query = searchBar.value.toLowerCase(); // Get the user input in lowercase
        const results = [];

        // Search through all folders to match the leads
        for (const folder in myLeads) {
            const leads = myLeads[folder];

            // Check if any lead in the folder contains the query
            leads.forEach(lead => {
                if (lead.title.toLowerCase().includes(query) || lead.url.toLowerCase().includes(query)) {
                    // results.push({ lead, folder, time }); // Store the lead and its corresponding folder
                    results.push({ lead, folder }); // Store the lead and its corresponding folder
                }
            });
        }

        if(query == ''){
            render(currentFolder);
            return;
        }

        renderSearchResults(results); // Pass the results to the rendering function
    });
}


function renderSearchResults(results) {
    folderContent.innerHTML = ""; // Clear previous results

    // Check if there are any results to display
    if (results.length === 0) {
        const noResultsMessage = document.createElement("p");
        noResultsMessage.textContent = "No results found.";
        noResultsMessage.style.color = "white";
        folderContent.appendChild(noResultsMessage);
        return;
    }
 

    // Group results by folder
    const groupedResults = results.reduce((acc, { lead, folder }) => {
        if (!acc[folder]) acc[folder] = [];
        acc[folder].push(lead);
        return acc;
    }, {});

    // Loop through each folder and its leads
    for (const folder in groupedResults) {
        // Create and display folder name
        const folderHeader = document.createElement("h2");
        folderHeader.textContent = "Folder ("+ folder + ")";
        folderHeader.classList.add("folder-header");
        folderContent.appendChild(folderHeader);

        // Display leads under this folder
        const leadsList = document.createElement("ul");
        leadsList.classList.add("leads-list");

        groupedResults[folder].forEach((lead, index) => {
            // Create a new list item for each lead
            const li = document.createElement("li");
            li.classList.add("lead-Items");

            const urlContainer = document.createElement("div");
            urlContainer.classList.add("url-container");
            const urlSubContainer = document.createElement("div");
            urlSubContainer.classList.add("url-Subcontainer");

            const favicon = document.createElement("img");
            favicon.src = lead.favicon || "default-favicon.png"; // Default favicon if none exists
            favicon.classList.add("favicon");

            const title = document.createElement("div");
            title.textContent = lead.url;
            title.classList.add("title");

            const a = document.createElement("a");
            a.href = lead.url;
            a.target = "_blank";
            a.textContent = lead.title;

            const time = document.createElement("div");
            const formattedTime = lead.timestamp 
            ? formatTimestamp(lead.timestamp) 
            : "N/A"; // Fallback if timestamp is missing
            time.textContent = formattedTime;
            time.classList.add("timestamp");

            // Create the copy URL button
            const copyUrlBtn = document.createElement('button');
            copyUrlBtn.innerHTML = '<i class="fas fa-copy fa-lg"></i>';
            copyUrlBtn.classList.add('copy-url-btn');
            copyUrlBtn.title = 'Copy URL';
            // Add click event listener to the copy button
            copyUrlBtn.addEventListener('click', () => {
                copyToClipboard(lead.url); // Call function to copy URL
            });

            const btnContainer = document.createElement("div");
            btnContainer.classList.add("btn-container");

            const editBtn = document.createElement("button");
            editBtn.innerHTML = '<i class="fas fa-edit fa-lg"></i>';
            editBtn.classList.add('edit-folder-button');
            editBtn.title = 'Edit Lead Name';
            editBtn.addEventListener('click', () => toggleEdit(folder, index, title, a, li)); 

            // Create a checkbox for deletion
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.classList.add("url-checkbox"); // Add a class for easy selection
            checkbox.setAttribute("data-folder", folder); // Set folder name as data attribute
            checkbox.setAttribute("data-url-id", lead.id); // Set URL ID as data attribute
            checkbox.addEventListener('click', toggleDeleteLinksButton);

            urlSubContainer.appendChild(favicon);
            urlSubContainer.appendChild(a);

            urlSubContainer.appendChild(title);
            urlContainer.appendChild(urlSubContainer);
            urlContainer.appendChild(time);           
            btnContainer.appendChild(copyUrlBtn);
            btnContainer.appendChild(editBtn);
            btnContainer.appendChild(checkbox);

            li.appendChild(urlContainer);
            li.appendChild(btnContainer);
            leadsList.appendChild(li); // Append lead to the folder's list
        });

        folderContent.appendChild(leadsList); // Append the folder's list to the main container
        
    }
       
  
}


function saveDataToStorage() {
    const transaction = db.transaction(['objects'], 'readwrite');
    const objectStore = transaction.objectStore('objects');

    // Clear the object store first
    // objectStore.clear();
    const clearRequest = objectStore.clear();
   
    clearRequest.onsuccess = function () {

        // Prepare data to save
        for (const folder in myLeads) {
            const data = {
                id: folder, // Use folder name as unique ID
                folder: folder,
                urls: myLeads[folder] // This assumes each lead has a structure that can be stored
            };
            objectStore.add(data);
        }
       

        transaction.oncomplete = function() {
            console.log("Data saved to storage successfully.");
        };
    };
    clearRequest.onerror = function (event) {
        console.error("Error clearing storage:", event.target.error);
    };
//  Loop through myLeads and update IndexedDB
//  for (const folder in myLeads) {
//     const data = {
//         id: folder, 
//         folder: folder,
//         urls: myLeads[folder] 
//     };

//     let putRequest = objectStore.put(data); // Use put() instead of add()

//     putRequest.onerror = function(event) {
//         console.error(`Error saving folder "${folder}":`, event.target.error);
//     };
// }

//     transaction.onerror = function(event) {
//         console.error("Error saving data to storage:", event.target.error);
//     };
// for (const folder in myLeads) {
//     if (!folder) { // Skip if folder is undefined
//         console.error("Skipping undefined folder key.");
//         continue;
//     }

//     const data = {
//         id: folder, 
//         folder: folder,
//         urls: myLeads[folder] 
//     };

//     let putRequest = objectStore.put(data);

//     putRequest.onerror = function(event) {
//         console.error(`Error saving folder "${folder}":`, event.target.error);
//     };
// }

// transaction.onerror = function(event) {
//     console.error("Error saving data to storage:", event.target.error);
// };
}

function removeFolder(folderName) {

    // if (!myLeads[folderName]) {
    //     console.warn(`Folder "${folderName}" not found.`);
    //     return;
    // }

    // if (folderName in myLeads) {
        delete myLeads[folderName]; // Remove from myLeads
    // }
 // Remove folder from myLeads and IndexedDB
//  if (folderName in myLeads) {
//     delete myLeads[folderName];
//     let transaction = db.transaction(['objects'], 'readwrite');
//     let objectStore = transaction.objectStore('objects');
//     objectStore.delete(folderName);
//     console.log("deleting folder for loop in remove folder");
// }
    const transaction = db.transaction(['objects'], 'readwrite');
    const objectStore = transaction.objectStore('objects');

    const deleteRequest = objectStore.delete(folderName); // Remove from IndexedDB
    // objectStore.delete(folderName);
    //     console.log("deleting folder for l
    deleteRequest.onsuccess = function () {
        console.log(`Folder "${folderName}" deleted successfully.`);
       
        saveDataToStorage();
        updateUI(); // Refresh the UI after deletion
        // displayFolders();
        // render(folderName);
        // currentFolder = null;
        // displayLeads();
    };

    deleteRequest.onerror = function (event) {
        console.error(`Error deleting folder "${folderName}":`, event.target.error);
    };
}


function toggleEdit(folder, index, titleElement, aElement, liElement) {
    // Get the current title and URL
    const newTitle = aElement.textContent;
    const newUrl = aElement.getAttribute('href');
    
    const message = "Enter the new title and URL:";
    
    // Pass the current values as defaults to customPrompt2
    customPromptDouble(message, newTitle, newUrl, function(updatedTitle, updatedUrl) 
    {
        const lead = myLeads[folder] && myLeads[folder][index]; 
        
        if (updatedTitle !== null && updatedTitle.trim() !== "") {
            aElement.textContent = updatedTitle;
            
            lead.title = updatedTitle;
            // updateLeadInDB(lead.id, folder, lead);
            // Save changes to storage
            // saveLeadsToStorage();
        }
        else{
            aElement.textContent = newTitle;
            
            lead.title = newTitle;
        }

        if (updatedUrl !== null) {
            // Update the URL attribute
            aElement.setAttribute('href', updatedUrl);
            // Update the lead in the data structure
            lead.url = updatedUrl;
    
            // Save changes to storage
            // saveLeadsToStorage();
       }else{
            aElement.setAttribute('href', newUrl);
    
            // Update the lead in the data structure
            lead.url = newUrl;
       }
       updateLeadInDB(lead.id, folder, lead);
       saveDataToStorage();
    });
   
}

function updateLeadInDB(id, folder, lead) {
    let transaction = db.transaction(['objects'], 'readwrite');
    let objectStore = transaction.objectStore('objects');

    // Create the object with folder, lead, and id
    let leadData = { id, folder, lead };

    let request = objectStore.put(leadData); // Spread lead data, ensure id is saved
    // let request = objectStore.put({ lead, folder, id }); // Spread lead data, ensure id is saved

    request.onsuccess = function() {
        console.log('Lead updated in DB');
    };

    request.onerror = function(event) {
        console.error('Error updating lead in DB:', event.target.error);
    };
}

// Load folders and leads
function loadFolders() {
    let transaction = db.transaction(['objects'], 'readonly');
    let objectStore = transaction.objectStore('objects');
    let request = objectStore.getAll();

    request.onsuccess = function(event) {
        // Build myLeads from the fetched data
        myLeads = event.target.result.reduce((acc, folder) => {
            console.log(folder.folder);
            acc[folder.folder] = folder.urls || []; // Initialize with an empty array if no URLs
            return acc;
        }, {});

        // Call displayFolders() if needed to display in the UI
        displayFolders();
    };

    request.onerror = function(event) {
        console.error('Error loading folders from DB:', event.target.error);
    };
}

// Show or hide delete buttons based on checkbox selection
function setupFolderCheckboxes() {
    const folderCheckboxes = document.querySelectorAll(".folder-checkbox");
    folderCheckboxes.forEach(checkbox => {
        checkbox.addEventListener("change", () => {
            toggleDeleteFoldersButton();
        });
    });
}

function setupUrlCheckboxes() {
    const urlCheckboxes = document.querySelectorAll(".url-checkbox");
    urlCheckboxes.forEach(checkbox => {
        checkbox.addEventListener("change", () => {
            toggleDeleteLinksButton();
        });
    });
}

// Show delete folder button if at least one folder is selected
function toggleDeleteFoldersButton() {
    const folderCheckboxes = document.querySelectorAll(".folder-checkbox");
    const deleteFoldersBtn = document.getElementById("delete-selected-folders-btn");
    const isChecked = Array.from(folderCheckboxes).some(checkbox => checkbox.checked);
 
    deleteFoldersBtn.style.visibility = isChecked ? "visible" : "hidden";
}

// Show delete links button if at least one link is selected
function toggleDeleteLinksButton() {
    const urlCheckboxes = document.querySelectorAll(".url-checkbox");
    const deleteLinksBtn = document.getElementById("delete-selected-links-btn");
    const isChecked = Array.from(urlCheckboxes).some(checkbox => checkbox.checked);

    deleteLinksBtn.style.visibility = isChecked ? "hidden" : "visible";
}

if(document.getElementById("delete-selected-links-btn")){
    document.getElementById("delete-selected-links-btn").addEventListener("click", () => {
        const urlCheckboxes = document.querySelectorAll(".url-checkbox:checked"); // Get all selected checkboxes

        urlCheckboxes.forEach(checkbox => {
            const folderName = checkbox.getAttribute("data-folder"); // Folder name from checkbox
            const urlId = checkbox.getAttribute("data-url-id"); // Lead ID from checkbox
            deleteItem(folderName, urlId); // Delete the lead by folder and ID
        });

        // Update the display if needed
        displayLeads();
        // saveDataToStorage();
        // Ensure data is saved after deletion
        // saveLeadsToStorage();
        toggleDeleteLinksButton();
    });
}

if(document.getElementById("delete-selected-folders-btn")){
    // Delete selected folders
    document.getElementById("delete-selected-folders-btn").addEventListener("click", () => {
        // const folderCheckboxes = document.querySelectorAll(".folder-checkbox:checked");
        // folderCheckboxes.forEach(checkbox => {
            // const folderName = checkbox.getAttribute("data-folder-name");
            deleteFolder();
        // });
        // updateUI();
        toggleDeleteFoldersButton();
        // displayFolders();
        // saveDataToStorage();

    });
}

// document.querySelectorAll(".lead-checkbox").forEach(element => {
//     element.addEventListener('click', () => {
//         toggleDeleteLinksButton();
//     })
// });

// function ok(){
//     // document.querySelectorAll(".url-checkbox").forEach(element => {
//     // element.addEventListener('click', () => {
//     //     toggleDeleteLinksButton();
//     // })
// // });
// }

function displayFolders() {
    const folderButtons = document.getElementById("folder-buttons");
    if(folderButtons){
        folderButtons.innerHTML = '';
    }
    let firstFolder = null; // Variable to hold the first folder's name

    for (const folder in myLeads) {
        if (!folder) { // Skip undefined folder keys
            console.error("Skipping undefined folder key.");
            continue;
        }

        const folderDiv = document.createElement("div");

        // Check if this is the first folder
        if (!firstFolder) {
            firstFolder = folder; // Set the first folder's name
        }

        // Add a click event to switch to the folder
        folderDiv.addEventListener('click', () => {
            switchFolder(folder); // Call switchFolder to display contents of the clicked folder
        });
        folderButtons.appendChild(folderDiv);

    }

    // Select the first folder by default if no folder is selected
    if (!currentFolder && firstFolder) {
        currentFolder = firstFolder;
        switchFolder(currentFolder); // Automatically display contents of the first folder
    }
    
    toggleDeleteFoldersButton(); // Update the delete button visibility
}

// Toggle sort order and re-render leads within the selected folder
function toggleSortOrderLeads() {
    const isDescending = document.getElementById("sortOrderLinks").checked;

    // Ensure the current folder exists and has leads to sort
    if (!currentFolder || !myLeads[currentFolder] || !Array.isArray(myLeads[currentFolder])) return;

    // Sort leads
    myLeads[currentFolder].sort((a, b) =>
        isDescending ? b.title.localeCompare(a.title) : a.title.localeCompare(b.title)
    );

    // Re-render the sorted leads
    render(currentFolder);
}


 // Function to toggle the sort order and update the display
 function toggleSortOrder() {
    const isDescending = document.getElementById("sortOrder").checked;
    let sortlabel = "Ascending";
    sortlabel = isDescending ? "Descending" : "Ascending";
    const folderCheckboxStates = {}; // Keeps track of folder checkbox states
    
    const selectAllFoldersCheckbox = document.getElementById("select-all-folders-btn");

     // Save the current state of folder checkboxes
     document.querySelectorAll(".folder-checkbox").forEach((checkbox) => {
        const folderName = checkbox.getAttribute("data-folder-name");
        folderCheckboxStates[folderName] = checkbox.checked;
    });

    // Get folder names from myLeads and sort them
    const folderNames = Object.keys(myLeads).sort((a, b) =>
        isDescending ? b.localeCompare(a) : a.localeCompare(b)
    );

    // If no current folder is selected, default to the first folder
    if (!currentFolder && folderNames.length > 0) {
        currentFolder = folderNames[0]; // Select the first folder
    }


    // Clear the display and re-render folders in the new order
    const folderButtons = document.getElementById("folder-buttons");
    folderButtons.innerHTML = ''; // Clear existing folders

    folderNames.forEach(folder => {
     
        const folderDiv = document.createElement("div");
        // folderDiv.textContent = folder;
        folderDiv.classList.add("folder-button");

        if (folder === currentFolder) {
            folderDiv.classList.add('active');
        }

        const folderName = document.createElement('span');
        folderName.textContent = folder;

        const allCheckedButton = document.getElementById("select-all-folders-btn");
        const allCheckedurl = document.getElementById("select-all-links-btn");
        const deleteFoldersBtn = document.getElementById("delete-selected-folders-btn");
        const deleteLinksBtn = document.getElementById("delete-selected-links-btn");
        const allCheckedButtonLabel = document.querySelector(".subfilter .subfilterlinks");

        // Add click event to each folder
        folderDiv.addEventListener('click', () => {
            switchFolder(folder); // Switch to the clicked folder
            allCheckedButton.checked = false;
            allCheckedurl.checked = false;
            allCheckedurl.style.visibility = "visible";
            allCheckedButtonLabel.style.visibility = "visible";
            deleteFoldersBtn.style.visibility = "hidden";
            deleteLinksBtn.style.visibility = "hidden";
        });

        // Create a checkbox for the folder
        const checkbox = document.createElement("input");
        const checkboxButton = document.createElement("div");
        checkbox.type = "checkbox";
        checkbox.classList.add("folder-checkbox");
        checkbox.title = 'Select Folder';
        checkboxButton.classList.add("checkbox-Button");
        checkbox.setAttribute("data-folder-name", folder);

        // Restore the checkbox state
        // checkbox.checked =
        // selectAllFoldersCheckbox.checked ||
        // folderCheckboxStates[folder] || false;

        // Edit Button
        const editBtn = document.createElement('button');
        editBtn.innerHTML = '<i class="fas fa-edit fa-lg"></i>';
        editBtn.classList.add('edit-folder-button');
        editBtn.addEventListener('click', () => editFolder("Enter new folder name:", folder));

        // Container for Edit and Delete Buttons
        const folderModifyContainer = document.createElement("div");
        folderModifyContainer.classList.add("folder-modify-container");
        
        // Append buttons to the folder button
        folderDiv.appendChild(folderName);
       
        folderModifyContainer.appendChild(editBtn);
        checkboxButton.appendChild(checkbox);
        folderModifyContainer.appendChild(checkboxButton);
        folderDiv.appendChild(folderModifyContainer);
            
        // Append folder button to the container
        folderButtons.appendChild(folderDiv); // Add folder to the display
        // checkbox.addEventListener('change', toggleDeleteFoldersButton);
        
        checkbox.addEventListener('change', () => {
            const folderName = checkbox.getAttribute("data-folder-name");
            folderCheckboxStates[folderName] = checkbox.checked;
        });
        
        document.querySelectorAll('.folder-checkbox').forEach(checkbox => {
            checkbox.addEventListener('click', (e) => {
                if (e.target === checkbox) {
                    const folderButton = checkbox.closest('.folder-button'); // Get the parent folder-button
                   
                     // Set the current folder based on the folder's ID or a data attribute
                    currentFolderChoice = folderButton.getAttribute('data-folder'); // Assuming folders have a data-folder-id attribute

                    // Highlight the parent folder-button based on checkbox state
                    if (checkbox.checked) {
                        // folderButton.classList.add('highlight'); // Highlight when checked
                    } else {
                        // folderButton.classList.remove('highlight'); // Remove highlight when unchecked
                    }
                    e.stopPropagation(); // Prevent the click from reaching the parent folder button
        
                    // Check if all checkboxes are checked
                    const checkboxes = document.querySelectorAll(".folder-checkbox");

                    // Update the select-all button based on whether all checkboxes are checked
                    const allCheckedButton = document.getElementById("select-all-folders-btn");
                    const allCheckedurl = document.getElementById("select-all-links-btn");
                    const urlcheckboxes = document.querySelectorAll(".url-checkbox");

                    // Restore URL checkbox states if this folder was previously selected
                    if (folderUrlStates[currentFolder]) {
                        urlcheckboxes.forEach(urlCheckbox => {
                            const checkboxId = urlCheckbox.getAttribute('data-url-id'); // Assuming each URL checkbox has a data-url-id attribute
                            urlCheckbox.checked = folderUrlStates[currentFolder][checkboxId] || false; // Restore the previous state
                            urlCheckbox.style.visibility = checkbox.checked ? 'hidden' : 'visible'; // Update visibility
                        });
                    }

                    const anyfolderChecked = Array.from(checkboxes).every(cb => cb.checked);

                    // Set the state of the select-all button                  
                    if(allCheckedButton){
                        allCheckedButton.checked = anyfolderChecked;
                    }
                  
                    // const allCheckedurl = Array.from(urlcheckboxes).every(checkboxx => checkboxx.checked);
                    urlcheckboxes.forEach(checkboxx => {
                        const leadContent = checkboxx.closest('.leadItems');
                        
                        if (leadContent) {
                           
                            if(checkbox.checked)
                            { 
                                if (!folderUrlStates[currentFolderChoice]) {
                                    folderUrlStates[currentFolderChoice] = {};
                                }

                                const checkboxId = checkboxx.getAttribute('data-url-id');
                                folderUrlStates[currentFolderChoice][checkboxId] = checkboxx.checked; // Store the checked state
                                
                                // leadContent.classList.add('highlight');
                                // checkboxx.style.visibility = 'hidden';
                                // allCheckedurl.style.visibility = 'hidden';
                                // console.log('leadItems', checkboxx); // Log an error if .leadItems is not found

                            }
                            else
                            {
                                // leadContent.classList.remove('highlight');
                                // checkboxx.style.visibility = 'visible';
                                // allCheckedurl.style.visibility = 'visible';
                            }
                        } else {
                            console.error('leadItems element not found for URL checkbox', checkboxx); // Log an error if .leadItems is not found
                        }
                    });

                }
            });
        });
    });
    // Update the "Select All Folders" checkbox state
    const allChecked = Object.values(folderCheckboxStates).every(state => state);
    selectAllFoldersCheckbox.checked = allChecked;
}

if(document.getElementById("sortOrder")){
    //sort folders
    document.getElementById("sortOrder").addEventListener('click', () => {
        toggleSortOrder();
        if(document.getElementById("select-all-folders-btn").checked){
            const checkboxes = document.querySelectorAll(".folder-checkbox");
            const allChecked = Array.from(checkboxes).every(checkbox => checkbox.checked);
            
            checkboxes.forEach(checkbox => {
                checkbox.checked = !allChecked; // Toggle checkbox state
                updateHighlight(checkbox); // Update highlight based on new state
            });
        }
        else{
            console.log("no");
        }
    })
}

if(document.getElementById("sortOrderLinks")){
    //sort leads
    document.getElementById("sortOrderLinks").addEventListener('click', () => {
        toggleSortOrderLeads();
        if(document.getElementById("select-all-links-btn").checked){
            console.log("yyes");
            const checkboxes = document.querySelectorAll(".url-checkbox");
            const allChecked = Array.from(checkboxes).every(checkbox => checkbox.checked);
            
            checkboxes.forEach(checkbox => {
                checkbox.checked = !allChecked; // Toggle checkbox state
                updateHighlight(checkbox); // Update highlight based on new state
            });
        }
        else{
            console.log("no");
        }
    })
}

function displayLeads() {
    // const leadsContainer = document.querySelectorAll('#folder-content li'); // Select all li elements inside the folder content

    // leadsContainer.forEach((li, index) => {
        // if (currentFolder && myLeads[currentFolder]) {
            // const leads = myLeads[currentFolder]; // Get the leads for the selected folder
            render(currentFolder);
            // if (leads[index]) {
                // const lead = leads[index];
    
                // const leadItem = document.createElement('div');
                // leadItem.classList.add('url-checkbox-container');
    
                // // Create a checkbox for the lead (URL)
                // const leadCheckbox = document.createElement('input');
                // leadCheckbox.type = 'checkbox';
                // leadCheckbox.classList.add('url-checkbox');
                // leadCheckbox.setAttribute("data-url-id", lead.id);
    
                // // Append the checkbox to the lead item
                // leadItem.appendChild(leadCheckbox);
    
                // // Append the lead item to each li without removing its existing content
                // li.appendChild(leadItem);
                // leadCheckbox.addEventListener('change', toggleDeleteLinksButton);
            // }
          
        // }
    // });
}

// Function to update highlight based on checkbox state
function updateHighlight(checkbox) {
    const folderButton = checkbox.closest('.folder-button'); // Find the parent folder-button

    // Highlight the parent folder-button based on checkbox state
    if (folderButton) {
        if (checkbox.checked) {
            // folderButton.classList.add('highlight'); // Add highlight class when checked
            // console.log('Highlight added to:', folderButton); // Log when highlighting
        } else {
            // folderButton.classList.remove('highlight'); // Remove highlight class when unchecked
            // console.log('Highlight removed from:', folderButton); // Log when removing highlight
        }
    } else {
        console.error('No parent folder-button found for checkbox:', checkbox); // Log error if no parent found
    }
}

if(document.getElementById("select-all-folders-btn")){
    // Select All Folders Button Functionality
    document.getElementById("select-all-folders-btn").addEventListener("click", () => {
        const checkboxes = document.querySelectorAll(".folder-checkbox");
        const allChecked = Array.from(checkboxes).every(checkbox => checkbox.checked);
        const urlcheckboxes = document.querySelectorAll(".url-checkbox");
        const allCheckedButton = document.getElementById("select-all-links-btn");
        const allDeleteButton = document.getElementById("delete-selected-links-btn");
        const allCheckedButtonLabel = document.querySelector(".subfilterlinks");
        
        checkboxes.forEach(checkbox => {
            checkbox.checked = !allChecked; // Toggle checkbox state
            updateHighlight(checkbox); // Update highlight based on new state
        });

        urlcheckboxes.forEach(checkboxx => {
            const leadContent = checkboxx.closest('.leadItems');
            if(!checkboxx.checked || checkboxx.checked){
                if(!allChecked){
                    // leadContent.classList.add('highlight');
                    checkboxx.checked = false;
                    allDeleteButton.style.visibility = 'hidden';
                    checkboxx.style.visibility = 'hidden';
                    allCheckedButton.style.visibility = 'hidden';
                    allCheckedButtonLabel.style.visibility = 'hidden';
                }
                else
                {
                    // leadContent.classList.remove('highlight');
                    checkboxx.style.visibility = 'visible';
                    allCheckedButton.style.visibility = 'visible';
                    allCheckedButtonLabel.style.visibility = 'visible';
                }
            }
        });
        toggleDeleteFoldersButton(); // Ensure this function is defined elsewhere
    });
}

if(document.getElementById("select-all-links-btn")){
    // Select/Deselect all items
    document.getElementById("select-all-links-btn").addEventListener("click", () => {
        const checkboxes = document.querySelectorAll(".url-checkbox");
        const allChecked = Array.from(checkboxes).every(checkbox => checkbox.checked);
        checkboxes.forEach(checkbox => {
            checkbox.checked = !allChecked;
        });
        console.log("at the click");
        toggleDeleteLinksButton();
    });

    function checkallFolderboxes(){
        const checkboxes = document.querySelectorAll(".url-checkbox");
        const allChecked = Array.from(checkboxes).every(checkbox => checkbox.checked);
        checkboxes.forEach(checkbox => {
            checkbox.checked = !allChecked;
        });
        toggleDeleteLinksButton();
    }
}

// Toggle delete buttons visibility
function toggleDeleteFoldersButton() {
    const checkboxes = document.querySelectorAll(".folder-checkbox:checked");
    const deleteButton = document.getElementById("delete-selected-folders-btn");
    if(!deleteButton){
        return;
    }
    const allCheckedButtonLabel = document.querySelector(".subfilter .subfilterlinks");
    deleteButton.style.visibility = checkboxes.length > 0 ? 'visible' : 'hidden';
    if(allCheckedButtonLabel)
    allCheckedButtonLabel.style.visibility = checkboxes.length > 0 ? 'hidden' : 'visible';
}

function toggleDeleteLinksButton() {
    const checkboxes = document.querySelectorAll(".url-checkbox:checked");
    const deleteButton = document.getElementById("delete-selected-links-btn");
    if(!deleteButton){
        console.log("for select all delete doesnt exist");
        return;
    }
    console.log("for select all delete appears");

    deleteButton.style.visibility = checkboxes.length > 0 ? 'visible' : 'hidden';
}


// Function to delete a folder
function deleteFolder() {
    const selectedFolders = document.querySelectorAll('.folder-checkbox:checked');
    const selectAllFoldersCheckbox = document.getElementById("select-all-folders-btn");

    selectAllFoldersCheckbox.checked = false; 
  

    // Check if any folders are selected
    if (selectedFolders.length > 0) {
        selectedFolders.forEach(folderCheckbox => {
            const folderName = folderCheckbox.getAttribute('data-folder-name');
                
            // Remove folder from myLeads and IndexedDB
            if (folderName in myLeads) {
                // delete myLeads[folderName];
                // let transaction = db.transaction(['objects'], 'readwrite');
                // let objectStore = transaction.objectStore('objects');
                // objectStore.delete(folderName);
                removeFolder(folderName);
            }
                    // console.log(`Folder "${folderName}" deleted successfully.`);
                    // displayLeads();
                    // saveDataToStorage();
                    // updateUI(); // Refresh the UI after deletion
                    // displayFolders();
                    // render(folderName);
                    // currentFolder = null;
                    // displayLeads();
                
                // deleteRequest.onerror = function (event) {
                    // console.error(`Error deleting folder "${folderName}":`, event.target.error);
                // };
            // }
        });
    }

    // selectedFolders.forEach(folderCheckbox => {
    //     const folderName = folderCheckbox.getAttribute('data-folder-name');
       
    //     if (folderName in myLeads) {
    //         delete myLeads[folderName]; // Remove from memory
    //         objectStore.delete(folderName); // Remove from IndexedDB
    //     }
    // });

    // transaction.oncomplete = function () {
    //     console.log("Selected folders deleted successfully.");
        
    //     // displayLeads();

    //     // updateUI();
    //     // Refresh UI after deletion
    //     // displayLeads();
    // };

    // transaction.onerror = function (event) {
    //     console.error("Error deleting folders:", event.target.error);
    // };
      // Check if any folders are selected
    //   if (selectedFolders.length > 0) {
    //     selectAllFoldersCheckbox.checked = false;
         
    //     selectedFolders.forEach(folderCheckbox => {
    //           const folderName = folderCheckbox.getAttribute('data-folder-name');
              
    //           if (folderName in myLeads) {
    //             delete myLeads[folderName];
    //             let transaction = db.transaction(['objects'], 'readwrite');
    //             let objectStore = transaction.objectStore('objects');
    //             objectStore.delete(folderName);
    //             removeFolder(folderName);
    //             saveDataToStorage();
    //         }
    //           // Save updated data
    //         //   saveDataToStorage();
    //         //   updateUI();
    //         //   displayLeads();
    //           displayFolders();
              
    //       });
        
    //   } else {
    //       console.log("No folders selected for deletion.");
    //   }
  }
  

// Function to delete a lead
function deleteItem(folder, id) {
    console.log(`checking Folder "${folder}" and "${id}.`);
    // Check if folder exists
    // if (!myLeads[folder]) {
    //     console.error(`Folder "${folder}" not found.`);
    //     return;
    // }

    console.log("Before Deletion:", myLeads[folder]); // Debugging

    // Find the index of the item with the given ID
    const index = myLeads[folder].findIndex(lead => lead.id == id);
    console.log("Index found:", index);
    // Find and remove lead from myLeads
    if (index !== -1) {
        myLeads[folder].splice(index, 1); // Remove lead from array

        // Remove lead from IndexedDB
        let transaction = db.transaction(['objects'], 'readwrite');
        let objectStore = transaction.objectStore('objects');
        // objectStore.delete(id); // Delete lead by ID
        const deleteRequest = objectStore.delete(id);
        
        deleteRequest.onsuccess = function() {
            console.log(`Item with ID "${id}" deleted from IndexedDB.`);
        };

        deleteRequest.onerror = function(event) {
            console.error(`Error deleting item from IndexedDB:`, event.target.error);
        };
        // Save the updated data back to storage
        saveDataToStorage();
    }else{
        console.log(`Folder "${folder}" and "${id} not deleted.`)
    }
}

if(addFolderBtn){
    // Add folder button click event
    addFolderBtn.addEventListener('click', () => {
        customPrompt("Enter a folder name:", function(folderName) {
            if (folderName) {
                createFolder(folderName);
                switchFolder(folderName);
            }
        });
    });
}


function createFolder(name) {
    if (!myLeads[name]) {
        myLeads[name] = [];

        // Save to storage
        saveDataToStorage();
        updateUI();
    }
    // console.log("checking leads data ", myLeads[name]);
    // if (myLeads[name]) {
    //     console.warn(`Folder "${name}" already exists or is invalid.`);
    //     return;
    // }

    // myLeads[name] = [];

    // // Save to IndexedDB
    // let transaction = db.transaction(['objects'], 'readwrite');
    // let objectStore = transaction.objectStore('objects');

    // let data = {
    //     id: name, 
    //     folder: name,
    //     urls: []
    // };

    // let addRequest = objectStore.add(data);

    // addRequest.onsuccess = function () {
    //     console.log(`Folder "${name}" added successfully.`);
    //     saveDataToStorage();
    //     // displayFolders(); // Refresh UI
    //     updateUI();
    // };

    // addRequest.onerror = function (event) {
    //     console.error(`Error adding folder "${name}":`, event.target.error);
    // };
}


function updateUI() {
    const folderContainer = document.querySelector('.folder-buttons');
    
    if(folderContainer){
        folderContainer.innerHTML = "";
    }
   
    const folders = Object.keys(myLeads);
   
    // If no current folder is selected, default to the first folder
    if (!currentFolder && folders.length > 0) {
        currentFolder = folders[0]; // Select the first folder
    }
   
    folders.forEach(folder => {
       
        const folderButton = document.createElement('div');
        folderButton.classList.add('folder-button');
       
        if (folder === currentFolder) {
            folderButton.classList.add('active');
        }

        const folderName = document.createElement('span');
        folderName.textContent = folder.charAt(0).toUpperCase() + folder.slice(1).toLowerCase();

        // new code for drag and drop from browser
        // Drag-and-drop functionality
        folderButton.addEventListener('dragover', (event) => {
            event.preventDefault(); // Necessary to allow dropping
            folderButton.classList.add('drag-over'); // Optional: Add a visual cue
        });

        folderButton.addEventListener('dragleave', () => {
            folderButton.classList.remove('drag-over'); // Remove visual cue
        });

        folderButton.addEventListener('drop', (event) => {
            event.preventDefault();
            folderButton.classList.remove('drag-over');
    
            const url = event.dataTransfer.getData('text/plain'); // Get the dragged URL
    
            if (url && currentFolder) {
                // Add the URL to the corresponding folder in myLeads
                if (!myLeads[folder]) {
                    myLeads[folder] = [];
                }
    
                myLeads[folder].push({ id: Date.now(), url }); // Add the link with a unique ID
                switchFolder(folder); // Refresh the folder contents
            }
        });

        const allCheckedButton = document.getElementById("select-all-folders-btn");
        const allCheckedurl = document.getElementById("select-all-links-btn");
        const deleteFoldersBtn = document.getElementById("delete-selected-folders-btn");
        const deleteLinksBtn = document.getElementById("delete-selected-links-btn");
       
        folderButton.addEventListener('click', () => {
            switchFolder(folder);
           
            allCheckedButton.checked = false;
            allCheckedurl.checked = false;
            allCheckedurl.style.visibility = "visible";

            deleteFoldersBtn.style.visibility = "hidden";
            deleteLinksBtn.style.visibility = "hidden";
          });

        
        // Create a checkbox for the folder
        const checkbox = document.createElement("input");
        const checkboxButton = document.createElement("div");
        checkbox.type = "checkbox";
        checkbox.classList.add("folder-checkbox");
        checkbox.title = 'Select Folder';
        checkboxButton.classList.add("checkbox-Button");
        checkbox.setAttribute("data-folder-name", folder);
        checkbox.addEventListener('change', toggleDeleteFoldersButton);

        // Edit Button
        const editBtn = document.createElement('button');
        editBtn.innerHTML = '<i class="fas fa-edit fa-lg"></i>';
        editBtn.classList.add('edit-folder-button');
        editBtn.title = 'Edit Folder Name';
        editBtn.addEventListener('click', () => editFolder("Enter new folder name:", folder));

        // Container for Edit and Delete Buttons
        const folderModifyContainer = document.createElement("div");
        folderModifyContainer.classList.add("folder-modify-container");

        // Append buttons to the folder button
        folderButton.appendChild(folderName);
        checkboxButton.appendChild(checkbox);
        folderModifyContainer.appendChild(editBtn);
        folderModifyContainer.appendChild(checkboxButton);
        folderButton.appendChild(folderModifyContainer);
        folderContainer.appendChild(folderButton);

        document.querySelectorAll('.folder-checkbox').forEach(checkbox => {
            checkbox.addEventListener('click', (e) => {
                if (e.target === checkbox) {
                    const folderButton = checkbox.closest('.folder-button'); // Get the parent folder-button
                   
                     // Set the current folder based on the folder's ID or a data attribute
                    currentFolderChoice = folderButton.getAttribute('data-folder'); // Assuming folders have a data-folder-id attribute

                    // Highlight the parent folder-button based on checkbox state
                    if (checkbox.checked) {
                        // folderButton.classList.add('highlight'); // Highlight when checked
                    } else {
                        // folderButton.classList.remove('highlight'); // Remove highlight when unchecked
                    }
                    e.stopPropagation(); // Prevent the click from reaching the parent folder button
        
                    // Check if all checkboxes are checked
                    const checkboxes = document.querySelectorAll(".folder-checkbox");

                    // Update the select-all button based on whether all checkboxes are checked
                    const allCheckedButton = document.getElementById("select-all-folders-btn");
                    const allCheckedurl = document.getElementById("select-all-links-btn");
                    const urlcheckboxes = document.querySelectorAll(".url-checkbox");

                    // Restore URL checkbox states if this folder was previously selected
                    if (folderUrlStates[currentFolder]) {
                        urlcheckboxes.forEach(urlCheckbox => {
                            const checkboxId = urlCheckbox.getAttribute('data-url-id'); // Assuming each URL checkbox has a data-url-id attribute
                            urlCheckbox.checked = folderUrlStates[currentFolder][checkboxId] || false; // Restore the previous state
                            urlCheckbox.style.visibility = checkbox.checked ? 'hidden' : 'visible'; // Update visibility
                        });
                    }

                    const anyfolderChecked = Array.from(checkboxes).every(cb => cb.checked);

                    // Set the state of the select-all button                  
                    if(allCheckedButton){
                        allCheckedButton.checked = anyfolderChecked;
                    }
                  
                    // const allCheckedurl = Array.from(urlcheckboxes).every(checkboxx => checkboxx.checked);
                    urlcheckboxes.forEach(checkboxx => {
                        const leadContent = checkboxx.closest('.leadItems');
                        
                        if (leadContent) {
                           
                            if(checkbox.checked)
                            { 
                                if (!folderUrlStates[currentFolderChoice]) {
                                    folderUrlStates[currentFolderChoice] = {};
                                }

                                const checkboxId = checkboxx.getAttribute('data-url-id');
                                folderUrlStates[currentFolderChoice][checkboxId] = checkboxx.checked; // Store the checked state
                                // leadContent.classList.add('highlight');
                                checkboxx.style.visibility = 'hidden';
                                allCheckedurl.style.visibility = 'hidden';
                            }
                            else
                            {
                                // leadContent.classList.remove('highlight');
                                checkboxx.style.visibility = 'visible';
                                allCheckedurl.style.visibility = 'visible';
                            }
                        } else {
                            console.error('leadItems element not found for URL checkbox', checkboxx); // Log an error if .leadItems is not found
                        }
                    });

                }
            });
        });
        
    });

    // Automatically select and display the first folder if no folder is currently selected
    if (!currentFolder && folders.length > 0) {
        currentFolder = folders[0]; // Set the first folder as the current folder
        switchFolder(currentFolder); // Display the contents of the first folder
    }
    
    const leadsContainer = document.querySelectorAll('#folder-content li .btn-container'); // Select all li elements inside the folder content

    leadsContainer.forEach((li, index) => {
        if (currentFolder && myLeads[currentFolder]) {
            const leads = myLeads[currentFolder]; // Get the leads for the selected folder
    
            if (leads[index]) {
                const lead = leads[index];
    
                // Create a container for the checkbox
                const leadItem = document.createElement('div');
                leadItem.classList.add('url-checkbox-container');
    
                // Create a checkbox for the lead (URL)
                const leadCheckbox = document.createElement('input');
                leadCheckbox.type = 'checkbox';
                leadCheckbox.classList.add('url-checkbox');
                leadCheckbox.title = 'Select Link';
                leadCheckbox.setAttribute("data-folder", currentFolder);
                leadCheckbox.setAttribute("data-url-id", lead.id);
    
                // Append the checkbox to the lead item
                leadItem.appendChild(leadCheckbox);
    
                // Append the lead item to each li without removing its existing content
                li.appendChild(leadItem);
    
                // Add an event listener to toggle the checkbox when the container is clicked
                leadItem.addEventListener('click', (event) => {
                    // Toggle the checkbox only if the click is not directly on the checkbox
                    if (event.target !== leadCheckbox) {
                        leadCheckbox.checked = !leadCheckbox.checked;
                    }
    
                    // Call the toggleDeleteLinksButton function
                    toggleDeleteLinksButton();
                });
    
                // Ensure the `change` event still triggers the button toggle
                leadCheckbox.addEventListener('change', toggleDeleteLinksButton);
            }
        }
    });
}

// Function to switch between tabs
const tabButtons = document.querySelectorAll('.tab-button');
const tabPanels = document.querySelectorAll('.tab-panel');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons and panels
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanels.forEach(panel => panel.classList.remove('active'));

        // Add active class to the clicked button and corresponding panel
        button.classList.add('active');
        showAllSavedSessions();
        document.getElementById(button.dataset.tab).classList.add('active');
    });
});


// Function to retrieve and display all current tabs
// function showCurrentTabs() {
//     const currentTabsList = document.getElementById('current-tabs-list');
//     const currentTabsTitle = document.getElementById('tab2button');
//     if(!currentTabsList){
//         return;
//     }

//     currentTabsList.innerHTML = ''; // Clear any previous entries

//     // Check for browser support and permissions
//     if (chrome && chrome.tabs) {
//         chrome.tabs.query({}, function(tabs) {
//             currentTabsTitle.textContent = `Current Tabs (${tabs.length})`;
//             tabs.forEach(tab => {
              
//                 if (!tab.active && (tab.hidden || tab.audible)) {
//                      // Add a special CSS class if the tab is hidden
//                     if (tab.hidden) {
//                         listItem.classList.add("highlight-hidden"); // Add a CSS class for hidden tabs
//                     }
//                 }
//                     const listItem = document.createElement('li');
//                     listItem.classList.add("tabItems");

//                     const urlContainer = document.createElement("div");
//                     urlContainer.classList.add("url-container");
            
//                     const favicon = document.createElement("img");
//                     favicon.src = tab.favIconUrl; // Ensure favicon is defined
//                     console.log("here",favicon.src);
//                     favicon.classList.add("favicon");
            
//                     const title = document.createElement("div");
//                     title.textContent = tab.url;
//                     title.classList.add("title");
            
//                     const a = document.createElement("a");
//                     a.href = tab.url;
//                     a.target = "_blank";
//                     a.textContent = tab.title;
                    
//                     const leadItem = document.createElement('div');
//                     leadItem.classList.add('url-checkbox-container');

//                     // Close button
//                     const closeButton = document.createElement("button");
//                     closeButton.textContent = "Close";
//                     closeButton.classList.add('close-tab-button');
//                     closeButton.innerHTML = '<i><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></i>';
//                     closeButton.addEventListener('click', () => closeTab(tab.id));

//                     urlContainer.appendChild(favicon);
//                     urlContainer.appendChild(a);
                    
//                     urlContainer.appendChild(title);
//                     // btnContainer.appendChild(copyUrlBtn);
            
//                     listItem.appendChild(urlContainer);
//                     listItem.appendChild(closeButton);

//                     currentTabsList.appendChild(listItem);
//             });
//         });
//     } else {
//         // Alert if not running as an extension with required permissions
//         alert('Unable to access tabs. Ensure this is run as a browser extension with tab permissions.');
//     }
// }
// function showCurrentTabs() {
//     const currentTabsList = document.getElementById('current-tabs-list');
//     const currentTabsTitle = document.getElementById('tab2button');
//     if (!currentTabsList) {
//         return;
//     }

//     currentTabsList.innerHTML = ''; // Clear any previous entries

//     // Check for browser support and permissions
//     if (chrome && chrome.tabs) {
//         chrome.windows.getAll({ populate: true }, function(windows) {
//             currentTabsTitle.textContent = `Current Tabs (${windows.reduce((acc, window) => acc + window.tabs.length, 0)})`;
//             let count = 1;
//             windows.forEach(window => {
//                 const windowSection = document.createElement('div');
//                 windowSection.classList.add('window-section');

//                 const windowTitle = document.createElement('h3');
//                 windowTitle.textContent = `Window ${count++}`;
//                 windowSection.appendChild(windowTitle);

//                 window.tabs.forEach(tab => {
//                     const listItem = document.createElement('li');
//                     listItem.classList.add('tabItems');

//                     const urlContainer = document.createElement('div');
//                     urlContainer.classList.add('url-container');

//                     const favicon = document.createElement('img');
//                     favicon.src = tab.favIconUrl; // Ensure favicon is defined
//                     favicon.classList.add('favicon');

//                     const title = document.createElement('div');
//                     title.textContent = tab.url;
//                     title.classList.add('title');

//                     const a = document.createElement('a');
//                     a.href = tab.url;
//                     a.target = '_blank';
//                     a.textContent = tab.title;

//                     const leadItem = document.createElement('div');
//                     leadItem.classList.add('url-checkbox-container');

//                     // Close button
//                     const closeButton = document.createElement('button');
//                     closeButton.textContent = 'Close';
//                     closeButton.classList.add('close-tab-button');
//                     closeButton.innerHTML = '<i><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></i>';
//                     closeButton.addEventListener('click', () => closeTab(tab.id));

//                     urlContainer.appendChild(favicon);
//                     urlContainer.appendChild(a);
//                     urlContainer.appendChild(title);
//                     urlContainer.appendChild(closeButton);

//                     listItem.appendChild(urlContainer);
//                     // listItem.appendChild(closeButton);

//                     windowSection.appendChild(listItem);
//                 });

//                 currentTabsList.appendChild(windowSection);
//             });
//         });
//     } else {
//         // Alert if not running as an extension with required permissions
//         alert('Unable to access tabs. Ensure this is run as a browser extension with tab permissions.');
//     }
// }
function showCurrentTabs() {
    const currentTabsList = document.getElementById('current-tabs-list');
    const currentTabsTitle = document.getElementById('tab2button');
    if (!currentTabsList) {
        return;
    }

    currentTabsList.innerHTML = ''; // Clear any previous entries

    if (chrome && chrome.tabs) {
        chrome.windows.getAll({ populate: true }, function(windows) {
            currentTabsTitle.textContent = `Current Tabs (${windows.reduce((acc, window) => acc + window.tabs.length, 0)})`;
            let count = 1;
            windows.forEach(window => {
                const windowSection = document.createElement('div');
                windowSection.classList.add('window-section');

                const windowTitle = document.createElement('h3');
                windowTitle.textContent = `Window ${count++}`;

                // "Save as Session" Button
                const saveButton = document.createElement('button');
                saveButton.textContent = "Save as Session";
                saveButton.classList.add('save-session-button');
                saveButton.addEventListener('click', () => {
                    const sessionName = prompt("Enter a name for this session:");
                    if (sessionName) {
                        saveCurrentTabsAsSession(sessionName, window.id);
                    }
                });

                windowSection.appendChild(windowTitle);
                windowSection.appendChild(saveButton);

                window.tabs.forEach(tab => {
                    const listItem = document.createElement('li');
                    listItem.classList.add('tabItems');

                    const urlContainer = document.createElement('div');
                    urlContainer.classList.add('url-container');

                    const favicon = document.createElement('img');
                    favicon.src = tab.favIconUrl || ''; // Ensure favicon is defined
                    favicon.classList.add('favicon');

                    const title = document.createElement('div');
                    title.textContent = tab.url;
                    title.classList.add('title');

                    const a = document.createElement('a');
                    a.href = tab.url;
                    a.target = '_blank';
                    a.textContent = tab.title;

                    const closeButton = document.createElement("button");
                    closeButton.textContent = "Close";
                    closeButton.classList.add('close-tab-button');
                    closeButton.innerHTML = '<i><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></i>';
                    closeButton.addEventListener('click', () => closeTab(tab.id));

                    urlContainer.appendChild(favicon);
                    urlContainer.appendChild(a);
                    urlContainer.appendChild(title);

                    listItem.appendChild(urlContainer);
                    listItem.appendChild(closeButton);
                    windowSection.appendChild(listItem);
                });

                currentTabsList.appendChild(windowSection);
            });
        });
    } else {
        alert('Unable to access tabs. Ensure this is run as a browser extension with tab permissions.');
    }
}

// Function to close a tab by ID
function closeTab(tabId) {
    chrome.tabs.remove(tabId, function () {
        console.log('Tab closed:', tabId);
        // Optionally, refresh the list to remove the closed tab
        showCurrentTabs();
    });
}



// Display saved sessions
// function saveCurrentTabsAsSession(sessionName) {
//     // const session = [];

//     chrome.tabs.query({}, function(tabs) {
//         const session = tabs.map(tab => ({ title: tab.title, url: tab.url, favicon: tab.favIconUrl || '' }));
//         const sessions = JSON.parse(localStorage.getItem("sessions")) || {};
//         sessions[sessionName] = session;
        

//         localStorage.setItem("sessions", JSON.stringify(sessions));
//         // Save session to localStorage
//         // alert(`Session "${sessionName}" saved with ${session.length} tabs!`);
//         customAlert(`Session "${sessionName}" saved with ${session.length} tabs!`);
  
//     });
// }
function saveCurrentTabsAsSession(sessionName, windowId) {
    chrome.tabs.query({ windowId: windowId }, function(tabs) { // Fetch only tabs from this window
        const session = tabs.map(tab => ({
            title: tab.title,
            url: tab.url,
            favicon: tab.favIconUrl || ''
        }));
        
        const sessions = JSON.parse(localStorage.getItem("sessions")) || {};
        sessions[sessionName] = session;
        
        localStorage.setItem("sessions", JSON.stringify(sessions));
        
        customAlert(`Session "${sessionName}" saved with ${session.length} tabs!`);
    });
}


const sessionSaved = document.getElementById("saveSession");
if(sessionSaved){
    sessionSaved.addEventListener('click', () => {
        // const sessionName = customPrompt("Enter a name for the session:");
        customPrompt("Enter a folder name:", function(sessionName) {
            if (sessionName) {
                saveCurrentTabsAsSession(sessionName);
            }else {
                alert("Session name cannot be empty. Please try again.");
            }
        });
    });
}


function reopenSavedSession(sessionName) {
    const sessions = JSON.parse(localStorage.getItem("sessions")) || {};
    const session = sessions[sessionName];

    if (!session) {
        alert(`No session found with the name "${sessionName}"`);
        return;
    }

    session.forEach(tab => {
        chrome.tabs.create({ url: tab.url });
    });

    alert(`Session "${sessionName}" reopened!`);
}

// function displaySavedSessions() {
//     const sessions = JSON.parse(localStorage.getItem("sessions")) || {};
//     const sessionsList = document.getElementById('sessions-list');
//     sessionsList.innerHTML = ''; // Clear the list

//     for (const sessionName in sessions) {
      
//         const listItem = document.createElement('div');
//         listItem.textContent = sessionName;
//         listItem.classList.add('session-item');

//         const reopenButton = document.createElement('button');
//         reopenButton.textContent = 'Reopen';
//         reopenButton.onclick = () => reopenSavedSession(sessionName);

//         const deleteButton = document.createElement('button');
//         deleteButton.textContent = 'Delete';
//         deleteButton.onclick = () => deleteSession(sessionName);
        
//         listItem.appendChild(reopenButton);
//         listItem.appendChild(deleteButton);
//         sessionsList.appendChild(listItem);
//     }
// }

if(document.getElementById("toggleViewButton")){
    document.getElementById("toggleViewButton").addEventListener("click", function () {
        const sessionContainerAlign = document.querySelector("#sessions-link");
        const sessionContainers = document.querySelectorAll(".session-container");
        sessionContainerAlign.classList.toggle("align");
        sessionContainerAlign.classList.toggle("icon-only-container");
        sessionContainers.forEach(container => {
            container.classList.toggle("icon-only");
        });
    });
}

function showAllSavedSessions() {
    const currentTabsList = document.getElementById('sessions-link');
    const currentTabsTitle = document.getElementById('tab3button');
    const sessions = JSON.parse(localStorage.getItem('sessions')) || {};

    if(!currentTabsList){
       return;
    }
    currentTabsList.innerHTML = ''; // Clear previous content
    currentTabsTitle.textContent = `Saved Sessions (${Object.keys(sessions).length})`;

    if (Object.keys(sessions).length === 0) {
        currentTabsList.innerHTML = '<p>No saved sessions found.</p>';
        return;
    }

    Object.entries(sessions).forEach(([sessionName, session]) => {
       
        // Create a container for each session
        const sessionContainer = document.createElement('div');
        sessionContainer.classList.add('session-container');

        //Create session title edit container
        const sessionTitleContainer = document.createElement('div');
        sessionTitleContainer.classList.add('session-title-container');

        // Add session title
        const sessionTitle = document.createElement('h3');
        sessionTitle.textContent = sessionName;
        sessionTitle.classList.add('session-title');
        sessionTitleContainer.appendChild(sessionTitle);

        const reopenButton = document.createElement('button');
        reopenButton.textContent = 'Reopen';
        reopenButton.onclick = () => reopenSavedSession(sessionName);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteSession(sessionName);

        sessionTitleContainer.appendChild(reopenButton);
        sessionTitleContainer.appendChild(deleteButton);

        sessionContainer.appendChild(sessionTitleContainer);
       
        const sessionItemsContainer = document.createElement('div');
        sessionItemsContainer.classList.add('session-items-container');
       
        session.forEach(tab => {
            const listItem = document.createElement('li');
            listItem.classList.add('tabItems');
    
            const urlContainer = document.createElement("div");
            urlContainer.classList.add("url-container");
    
            const favicon = document.createElement("img");
            favicon.src = tab.favicon; // Ensure favicon is defined
            favicon.classList.add("favicon");
    
            const title = document.createElement("div");
            title.textContent = tab.url;
            title.classList.add("title");

            const link = document.createElement('a');
            link.href = tab.url;
            link.target = '_blank'; // Open link in a new tab
            link.textContent = tab.title || tab.url;

            // Close button
            const closeButton = document.createElement("button");
            closeButton.textContent = "Close";
            closeButton.classList.add('close-tab-button');
            closeButton.innerHTML = '<i><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></i>';
            closeButton.addEventListener('click', () => closeTab(tab.id));

            urlContainer.appendChild(favicon);
            urlContainer.appendChild(link);
            urlContainer.appendChild(title);

            listItem.appendChild(urlContainer)
            sessionItemsContainer.appendChild(listItem);
        });
       
        sessionContainer.appendChild(sessionItemsContainer);
        currentTabsList.appendChild(sessionContainer);
    });
}

function deleteSession(sessionName) {
    const sessions = JSON.parse(localStorage.getItem("sessions")) || {};
    if (sessions[sessionName]) {
        delete sessions[sessionName];
        localStorage.setItem("sessions", JSON.stringify(sessions));
        showAllSavedSessions(); // Update display after deletion
        customAlert(`Session "${sessionName}" deleted successfully.`);
    } else {
        customAlert(`Session "${sessionName}" does not exist.`);
    }
}


function switchFolder(folder) {
    if (myLeads[folder]) {
        currentFolder = folder;
        render(folder);
    }
}

function editFolder(message, oldFolderName) {
    // Show prompt to get the new folder name
    customPromptOne(message, oldFolderName, function(newFolderName) {
      
    if (newFolderName && newFolderName.trim() !== '') {
        // Check if the new folder name already exists
        if (myLeads[newFolderName]) {
            customAlert('A folder with this name already exists.');
            return;
        }

        // Update folder name in myLeads
        myLeads[newFolderName] = myLeads[oldFolderName];
        delete myLeads[oldFolderName];

        // Update folder names in IndexedDB
        updateFolderInDB(oldFolderName, newFolderName);
    }  
  
 });
}

function updateFolderInDB(oldFolderName, newFolderName) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['objects'], 'readwrite');
        const objectStore = transaction.objectStore('objects');
        const index = objectStore.index('folderId');
        const request = index.openCursor(IDBKeyRange.only(oldFolderName));

        request.onsuccess = function(event) {
            const cursor = event.target.result;
            if (cursor) {
                const lead = cursor.value;
                lead.folder = newFolderName; // Update the folder name
                const updateRequest = objectStore.put(lead); // Save changes
                
                updateRequest.onsuccess = function() {
                    console.log(`Updated folder: ${oldFolderName} to ${newFolderName}`);
                    cursor.continue(); // Continue to the next record
                };

                updateRequest.onerror = function() {
                    console.error('Error updating folder in DB'); 
                    reject('Error updating folder in DB'); // Reject promise on error
                };
            } else {
                console.log('All folder names updated in DB');
                resolve(); // Resolve the promise when done
            }
        };

        request.onerror = function(event) {
            console.error('Error opening cursor for folder names:', event.target.error);
            reject(event.target.error); // Reject the promise on error
        };

        transaction.oncomplete = function() {
            console.log('Transaction completed successfully.');
        };

        transaction.onerror = function(event) {
            console.error('Transaction error:', event.target.error);
            reject(event.target.error);
        };
        // currentFolder = newFolderName;
        // currentFolderNameEl.textContent = newFolderName; // Update the UI with the new folder name
        // switchFolder(currentFolder);
       
        updateUI();

        saveDataToStorage();
    });

}

// function updateFolders(){
//     const currentFolderNameEl = document.getElementById('tab1button');
//     const currentFolderNameEl2 = document.getElementById('folder-content');
//     currentFolderNameEl2.forEach()
//     if(currentFolderNameEl){
//         console.log("amount", currentFolder.length);
//         // Ensure currentFolder exists and is not an empty string
//         if (currentFolder && currentFolder.trim().length > 0) {
//             currentFolderNameEl.textContent = `Saved Links (${currentFolder})(${currentFolder.length})`;
//             } else {
//             currentFolderNameEl.textContent = 'Saved Links';
//         }
//     }
// }
function updateFolders() {
    const currentFolderNameEl = document.getElementById('tab1button');

    if (currentFolderNameEl) {
        // console.log("amount", myLeads[currentFolder] ? myLeads[currentFolder].length : 0);

        // Ensure currentFolder exists in myLeads and has links
        if (currentFolder && myLeads[currentFolder]) {
            const linkCount = myLeads[currentFolder].length;
            currentFolderNameEl.textContent = `Saved Links (${currentFolder}) (${linkCount})`;
        } else {
            currentFolderNameEl.textContent = 'Saved Links (0)';
        }
    }
}


if(saveInputBtn){
    saveInputBtn.addEventListener('click', async () => {
        
        const urlInput = document.getElementById('input-el').value.trim();
        const validationMessage = document.getElementById('validation-message');

        // Regex pattern to validate the URL
        const urlPattern = /^(https?:\/\/|www\.)[\w-]+(\.[\w-]+)*(\.[a-z]{2,})(\/[^\s]*)?$/i;

        // Check if input is empty before validation
        if (urlInput === '') {
            validationMessage.style.color = 'red';
            validationMessage.textContent = 'Please enter a URL.';
        } else if (urlPattern.test(urlInput)) {
            // Append "https://" if not included in the URL input
            
            if (!Object.keys(myLeads).length == 0) {
                // Extract the title
                //   const title = doc.querySelector('title') ? doc.querySelector('title').innerText : 'No Title';


                const url = new URL(urlInput.startsWith('http') ? urlInput : 'https://' + urlInput);
                let faviconUrl = url.origin + '/favicon.ico';  // Construct favicon URL
                const yes="";
                const no="";


                const img = new Image();
            
                img.onload = function() {
                    console.log('Favicon exists:', faviconUrl);
                    
                    yes = "yes";
                };
            
                img.onerror = function() {
                    console.error('Favicon not found:', faviconUrl);
                    no = "no";
                };
            
                if(no != null)
                {
                    faviconUrl = url.origin + '/images/favicon.ico';
                }

                if(yes != null)
                {
                    document.getElementById('input-el').value = '';
                    faviconUrl = url.origin + '/favicon.ico';
                }

                    const newEntry = {
                        id: generateUniqueId(),
                        title: urlInput,
                        url: urlInput,
                        favicon: faviconUrl, // Use the current tab's favicon or default to empty
                        timestamp: new Date().toISOString()
                    };
                        
                        // Initialize the folder if it doesn't exist
                        if (!myLeads[currentFolder]) {
                            myLeads[currentFolder] = [];
                        }
                        
                        saveLeadToDB(newEntry, currentFolder);
                    
                    // Show success message
                    validationMessage.style.color = '#63ff63';
                    validationMessage.textContent = 'Valid URL and saved!';
                
                    setTimeout(() => {
                        validationMessage.textContent = '';
                    }, 3000)
            }
        else {
            // Alert if no folder is selected
            // if (Object.keys(myLeads).length === 0) {
                // showAlert("Please create a folder first"); 
                customAlert("Please create a folder first"); 
                // Uncomment to show custom modal if needed
                // showCustomModal('Please create a folder first', function(userInput) {
                //     console.log('User input:', userInput);
                // });                           
            // }

        }
        
        }else{
            validationMessage.style.color = 'red';
            validationMessage.textContent = 'Invalid URL. It must start with "https://", "http://", "www.", or contain ".com"';
        }
    });
}
// Add a single event listener to the save tab button
// tabSaveBtn.addEventListener('click', () => {
//     if (currentFolder) {
//         chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//             const tab = tabs[0];

//             const newEntry = {
//                 id: generateUniqueId(), // Unique ID
//                 title: tab.title,
//                 url: tab.url,
//                 favicon: tab.favIconUrl || ''
//             };

//             // if (duplicate) {
//                 console.log("New entry: ", newEntry);
//                 saveLeadToDB(newEntry, currentFolder);
//             // } else {
//                 // customAlert("This URL is already saved in the current folder.");
//             // }
//         });
//     } else {
//         customAlert("Please create a folder first.");
//     }
// });
if(tabSaveBtn){
    tabSaveBtn.addEventListener('click', () => {

         if (currentFolder) {
            console.log("show me current folder ", currentFolder);
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                const tab = tabs[0];

                const newEntry = {
                    id: generateUniqueId(), // Unique ID
                    title: tab.title,
                    url: tab.url,
                    favicon: tab.favIconUrl || '',
                    timestamp: new Date().toISOString() // Save the current timestamp
                };

                // if (duplicate) {
                    console.log("New entry: ", newEntry);
                    saveLeadToDB(newEntry, currentFolder);
                // } else {
                    // customAlert("This URL is already saved in the current folder.");
                // }
            });
        } else {
            customAlert("Please create a folder first.");
        }
    });
}


// function saveLeadsToStorage() {
//     const transaction = db.transaction(['objects'], 'readwrite'); // Assuming there's a 'leads' object store
//     const objectStore = transaction.objectStore('objects');

//     // Clear the object store first
//     objectStore.clear();

//     // Prepare and save each lead
//     myLeads.forEach((lead, index) => {
//         const data = {
//             id: index, // Using the index as a unique ID
//             url: lead.url, // Assuming each lead has a 'url' property
//             title: lead.title // Assuming each lead has a 'title' property
//         };
//         objectStore.add(data);
//     });

//     transaction.oncomplete = function() {
//         console.log("Leads saved to storage successfully.");
//     };

//     transaction.onerror = function(event) {
//         console.error("Error saving leads to storage:", event.target.error);
//     };
// }


function saveLeadToDB(lead, folderName) {

    let transaction = db.transaction(['objects'], 'readwrite');
    let objectStore = transaction.objectStore('objects');
    let request = objectStore.add({
        url: lead.url,
        title: lead.title,
        folderName: folderName // Store folderName properly
    });

    request.onsuccess = function() {
        let id = request.result; // Get the ID of the newly added item
        lead.id = id; // Assign the ID to the lead object

        if (!myLeads[folderName]) {
            myLeads[folderName] = {};
        }

        myLeads[folderName].push(lead); // Add the lead with ID to the in-memory storag
        
        saveDataToStorage(); // Save to storage
        render(folderName);
    };

    request.onerror = function(event) {
        console.error('Error adding lead to DB:', event.target.error);
    };
}


// Utility function to generate a unique ID for leads
function generateUniqueId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

function customPromptDouble(message, defaultTitle, defaultUrl, callback) 
{
  // Get modal elements
  const modal = document.getElementById("customModalDouble");
  const modalMessage = document.getElementById("modalMessageDouble");
  const modalInput2 = document.getElementById("modalInputDouble");
  const modalInput3 = document.getElementById("modalInputDouble2");
  const submitButton = document.getElementById("submitModalDouble");

  // Set the message and clear input
  modalMessage.textContent = message;
  modalInput2.value = defaultTitle; // Set default title
  modalInput3.value = defaultUrl;   // Set default URL

  // Show the modal
  modal.style.display = "block";

  // Handle the submit button click
  submitButton.onclick = function() {
    const userInput2 = modalInput2.value;
    const userInput3 = modalInput3.value;
    modal.style.display = "none";  // Hide the modal
    callback(userInput2, userInput3);           // Pass the input to the callback function
  };
}

function customAlert(message) {
    // Get modal elements
    const modalAlert = document.getElementById("customAlert");
    const modalMessage = document.getElementById("modalMessageAlert");
    const okButton = document.getElementById("submitModal4");

    // Set the message
    modalMessage.textContent = message;

    // Hide any input fields if 
    if (modalAlert) {
        modalAlert.style.display = "none"; // Hide the input field
    }

    // Show the modal
    modalAlert.style.display = "block";

    // Handle the OK button click to close the alert
    okButton.onclick = function() {
        modalAlert.style.display = "none";  // Hide the modal when OK is clicked
    };
}

 // Function to show the custom popup
 function customPrompt(message, callback) {
    // Get modal elements
    const modal = document.getElementById("customModal");
    const modalMessage = document.getElementById("modalMessage");
    const modalInput = document.getElementById("modalInput");
    const submitButton = document.getElementById("submitModal");

    // Set the message and clear input
    modalMessage.textContent = message;
    modalInput.value = "";

    // Show the modal
    modal.style.display = "block";

    // Handle the submit button click
    submitButton.onclick = function() {
      const userInput = modalInput.value;
      modal.style.display = "none";  // Hide the modal
      callback(userInput);           // Pass the input to the callback function
    };
  }

  function customPromptOne(message, defaultFolderTitle, callback) {
    // Get modal elements
    const modal = document.getElementById("customModalOne");
    const modalMessage = document.getElementById("modalMessageOne");
    const modalInput = document.getElementById("modalInputOne");
    const submitButton = document.getElementById("submitModalOne");

    // Set the message and clear input
    modalMessage.textContent = message;
    modalInput.value = defaultFolderTitle !== undefined ? defaultFolderTitle : ""; // Set default title

    // Show the modal
    modal.style.display = "block";

    // Handle the submit button click
    submitButton.onclick = function() {
      const userInput = modalInput.value;
      modal.style.display = "none";  // Hide the modal
      callback(userInput);           // Pass the input to the callback function
    };
  };






function updateExtension() {
    // Inform Chrome to update the extension in the background
    chrome.runtime.reload(); // Restarts the extension to trigger the update

    // Optionally, hide the update button after clicking
    document.getElementById('update-button').classList.add('hidden');
}

// Before the update, save important data
chrome.storage.local.get(['userData'], (result) => {
    const backup = result.userData;
    console.log('User data backed up:', backup);

    // After the update, restore the data if needed
    chrome.storage.local.set({userData: backup}, () => {
        console.log('User data restored.');
    });
});


// function exportToCSV() {
//     // Prepare the data for export
//     let csvContent = "data:text/csv;charset=utf-8,"; // CSV header
//     csvContent += "Folder Name, Title, URL\n"; // Column headers

//     // Iterate over myLeads to extract folder names and leads
//     for (const folder in myLeads) {
//         if (myLeads.hasOwnProperty(folder)) {
//             myLeads[folder].forEach(lead => {
//                 const row = `${folder}, ${lead.title}, ${lead.url}`;
//                 csvContent += row + "\n"; // Add each row to CSV
//             });
//         }
//     }

//     // Encode URI and create a link to download
//     const encodedUri = encodeURI(csvContent);
//     const link = document.createElement("a");
//     link.setAttribute("href", encodedUri);
//     link.setAttribute("download", "SaveMyTabsManager_Export.csv");
//     document.body.appendChild(link); // Required for Firefox

//     link.click(); // Trigger the download
//     document.body.removeChild(link); // Clean up
// }
function generateTabId() {
    return Math.random().toString(36).substr(2, 9);
}


function exportToCSV() {
    // Prepare the data for export
    // let csvContent = "data:text/csv;charset=utf-8,"; // CSV header
    let csvContent = "Type, Folder Name/Session Name, ID, Title, URL, Favicon, Date\n"; // Column headers

    // Iterate over myLeads to extract folder names, leads, favicons, and dates
    for (const folder in myLeads) {
        if (myLeads.hasOwnProperty(folder)) {
            myLeads[folder].forEach((lead, index) => {
                console.log(`Exporting lead ${index + 1} in ${folder}:`, lead);

                const row = `"Folder", "${folder}", "${lead.id}", "${lead.title}"," ${lead.url}", "${lead.favicon || ''}", "${lead.timestamp || ''}"`;
                csvContent += row + "\n"; // Add each row to CSV
            });
        }
    }

    // Include session data from localStorage
    const sessions = JSON.parse(localStorage.getItem('sessions')) || {};
    for (const sessionName in sessions) {
        if (sessions.hasOwnProperty(sessionName)) {
            sessions[sessionName].forEach((tab, index) => {
                console.log(`Exporting session ${index + 1} in ${sessionName}:`, tab);

                const row = `"Session", "${sessionName}", "${generateTabId()}", "${tab.title}", "${tab.url}", "${tab.favicon || ''}", ""`;
                csvContent += row + "\n"; // Add each session row to CSV
            });
        }
    }

    // Encode URI and create a link to download
    // const encodedUri = encodeURI(csvContent);
    // const link = document.createElement("a");
    // link.setAttribute("href", encodedUri);
    // link.setAttribute("download", "SaveMyTabsManager_Export.csv");
    // document.body.appendChild(link); // Required for Firefox

    // link.click(); // Trigger the download
    // document.body.removeChild(link); // Clean up
        // Use Blob for a safer download
        const blob = new Blob([csvContent], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
    
        const link = document.createElement("a");
        link.href = url;
        link.download = "SaveMyTabsManager_Export.csv";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    
        URL.revokeObjectURL(url);
}





// Add an event listener to a button for exporting
if(document.getElementById('export-button')){
    document.getElementById('export-button').addEventListener('click', exportToCSV);
}

// function importFromCSV(file) {
//     const reader = new FileReader();

//     reader.onload = function (event) {
//         const csvContent = event.target.result;
//         const rows = csvContent.split("\n").slice(1); // Skip the header row

//         const importedData = {
//             myLeads: {},
//             sessions: {},
//         };

//         rows.forEach((row) => {
//             if (!row.trim()) return; // Skip empty rows

//             // Parse the row
//             const columns = row.split(",").map((col) => col.trim().replace(/^"|"$/g, "")); // Remove surrounding quotes

//             const type = columns[0];
//             const folderOrSessionName = columns[1];
//             const id = columns[2];
//             const title = columns[3];
//             const url = columns[4];
//             const favicon = columns[5];
//             const date = columns[6];

//             if (type === "Folder") {
//                 // Add to myLeads
//                 if (!importedData.myLeads[folderOrSessionName]) {
//                     importedData.myLeads[folderOrSessionName] = [];
//                 }
//                 importedData.myLeads[folderOrSessionName].push({
//                     id,
//                     title,
//                     url,
//                     favicon,
//                     timestamp: date,
//                 });
//             } else if (type === "Session") {
//                 // Add to sessions
//                 if (!importedData.sessions[folderOrSessionName]) {
//                     importedData.sessions[folderOrSessionName] = [];
//                 }
//                 importedData.sessions[folderOrSessionName].push({
//                     id,
//                     title,
//                     url,
//                     favicon,
//                 });
//             }
//         });

//         // Save the imported data to myLeads and localStorage
//         Object.assign(myLeads, importedData.myLeads);
//         localStorage.setItem("sessions", JSON.stringify(importedData.sessions));

//         console.log("Import successful!", importedData);
//         alert("Import completed successfully!");
//     };

//     reader.onerror = function () {
//         console.error("Error reading file");
//         alert("Error importing file. Please check the file format.");
//     };

//     reader.readAsText(file);
// }
function importFromCSV(file) {
    const reader = new FileReader();

    reader.onload = function (event) {
        const csvContent = event.target.result;
        const rows = csvContent.split("\n").slice(1); // Skip the header row

        const importedData = {
            myLeads: {},
            sessions: {},
        };

        rows.forEach((row) => {
            if (!row.trim()) return; // Skip empty rows

            // Parse the row
            const columns = row.split(",").map((col) => col.trim().replace(/^"|"$/g, "")); // Remove surrounding quotes

            const type = columns[0];
            const folderOrSessionName = columns[1];
            const id = columns[2];
            const title = columns[3];
            const url = columns[4];
            const favicon = columns[5];
            const date = columns[6];

            if (type === "Folder") {
                // Add to myLeads
                if (!importedData.myLeads[folderOrSessionName]) {
                    importedData.myLeads[folderOrSessionName] = [];
                }
                importedData.myLeads[folderOrSessionName].push({
                    id,
                    title,
                    url,
                    favicon,
                    timestamp: date,
                });
            } else if (type === "Session") {
                // Add to sessions
                if (!importedData.sessions[folderOrSessionName]) {
                    importedData.sessions[folderOrSessionName] = [];
                }
                importedData.sessions[folderOrSessionName].push({
                    id,
                    title,
                    url,
                    favicon,
                });
            }
        });

        // Save the imported data to myLeads and localStorage
        Object.assign(myLeads, importedData.myLeads);
        localStorage.setItem("sessions", JSON.stringify(importedData.sessions));
        // localStorage.setItem('myLeads', JSON.stringify(importedData.myLeads));

        console.log("Import successful!", importedData);

        // Update the UI
        saveDataToStorage();
        displayFolders();
        // displayLeads();

        alert("Import completed successfully!");
    };

    reader.onerror = function () {
        console.error("Error reading file");
        alert("Error importing file. Please check the file format.");
    };

    reader.readAsText(file);
}


function deleteLink(folder, url) {
    if (myLeads[folder]) {
        myLeads[folder] = myLeads[folder].filter(link => link.url !== url);
        localStorage.setItem('myLeads', JSON.stringify(myLeads)); // Save changes
        displayLeads();
    }
}

// Function to handle the file input and pass the selected file to importFromCSV
function handleFileUpload() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0]; // Get the first selected file

    if (file) {
        importFromCSV(file); // Call the import function with the file
    } else {
        alert('Please select a CSV file to import.');
    }
}

if(reloadContainer){
    reloadContainer.addEventListener("click", () => {
        chrome.runtime.reload(); // Reloads only the current extension
    });
}

function toggleMenu() {
    console.log("ok");
    const dropdownMenu = document.getElementById('dropdownMenu');
    dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
}

// Optional: Close the menu if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.closest('.menu-container')) {
        document.getElementById('dropdownMenu').style.display = 'none';
    }
};

if(document.getElementById('menu-icon')){
    document.getElementById('menu-icon').addEventListener("click", () => {
        toggleMenu();
    })
}

  // Function to close the modal if the user clicks outside the modal content
  window.onclick = function(event) {
    const modal = document.getElementById("customModal");
    const modalAlert = document.getElementById("modelAlert");
    const modalDouble = document.getElementById("customModalDouble");
    const modal1 = document.getElementById("customModalOne");
  
    switch (event.target) {
        case modal:
            modal.style.display = "none";
            break;
        case modalAlert:
            modalAlert.style.display = "none";
            break;
        case modalDouble:
            modalDouble.style.display = "none";
            break;
        case modal1:
            modal1.style.display = "none";
            break;
        default:
            break;
    }
  };

// Initialize everything
initialize();



