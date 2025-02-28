// const extpay = ExtPay('savemytabs');
// extpay.startBackground();

// let userPaid = false;

// extpay.getUser().then(user => {
//     userPaid = user.paid;
    
//     if (user.paid) {
//         // User is signed in
//         document.getElementById('profile-link').style.display = 'inline';
//         document.getElementById('signin-link').style.display = 'none';
//         document.getElementById('search-container').style.display = 'block';
//     } else {
//         // User is not signed in
//         document.getElementById('profile-link').style.display = 'none';
//         document.getElementById('signin-link').style.display = 'inline';
//         document.getElementById('search-container').style.display = 'none';

//     }
//     // Optionally, add user info to the profile icon or popup
//     document.getElementById('profile-link').addEventListener('click', () => {
//         // You can redirect or show user info here if needed
//         window.location.href = 'profile.html';
//     });
   
// });https://extensionpay.com/extension/savemytabs?api_key=b645a25e-4df3-4953-bb53-853e756e8532

// // Add event listener to the sign-in link
// document.getElementById('signin-link').addEventListener('click', () => {
//     extpay.openLoginPage();
// });

// // Get modal elements
// const modal = document.getElementById('customModal');
// const closeButton = document.querySelector('.close-button');
// const modalMessage = document.getElementById('modalMessage');
// const modalInput = document.getElementById('modalInput');
// const modalSubmitButton = document.getElementById('modalSubmitButton');

// let myLeads = {};
// let currentFolder = null;
// const inputEl = document.getElementById('input-el');
// const saveInputBtn = document.getElementById('input-btn');
// const deleteAllBtn = document.getElementById('delete-el');
// const tabSaveBtn = document.getElementById('tab-btn');
// const addFolderBtn = document.getElementById('add-folder-btn');
// const input_fcb = document.getElementById('input-fcb');
// const currentFolderNameEl = document.getElementById('current-folder-name');
// const folderContent = document.getElementById('folder-content');
// const searchBar = document.getElementById('search-bar');

// const leadsStorage = JSON.parse(localStorage.getItem("myLeads"));
// if (leadsStorage) {
//     myLeads = leadsStorage;
//     const folders = Object.keys(myLeads);
//     if (folders.length > 0) {
//         currentFolder = folders[0];
//         render(currentFolder);
//     } 
// } else {
//     promptNewFolder();
// }

// searchBar.addEventListener('input', () => {
//     const query = searchBar.value.toLowerCase();
//     if (query in myLeads) {
//         switchFolder(query);
//         return;
//     }
//     const results = {};
//     if (currentFolder && myLeads[currentFolder]) {
//         const filteredLeads = myLeads[currentFolder].filter(lead =>
//             lead.title.toLowerCase().includes(query) || lead.url.toLowerCase().includes(query));
//         if (filteredLeads.length > 0) {
//             results[currentFolder] = filteredLeads;
//         }
//     }
//     renderSearchResults(results);


// });

// function promptNewFolder() {
//     const newFolder = prompt("No folders available. Please create a new folder", "new");

//         if (newFolder) {
//             createFolder(newFolder);
//             switchFolder(newFolder);
//         }
//         else{
//             // alert("No folders available. Please create a new folder");
//         }
// }

// function render(folder) {
//     folderContent.innerHTML = "";
//     if (!myLeads[folder]) {
//         myLeads[folder] = [];
//     }
//     const leads = myLeads[folder];
//     for (let i = 0; i < leads.length; i++) {
//         const li = document.createElement("li");

//         const urlContainer = document.createElement("div");
//         urlContainer.classList.add("url-container");

//         const favicon = document.createElement("img");
//         favicon.src = leads[i].favicon;
//         favicon.classList.add("favicon");

//         const title = document.createElement("div");
//         title.textContent = leads[i].url;
//         title.classList.add("title");

//         const a = document.createElement("a");
//         a.href = leads[i].url;
//         a.target = "_blank";
//         a.textContent = leads[i].title;

//         const btnContainer = document.createElement("div");
//         btnContainer.classList.add("btn-container");

//         const editBtn = document.createElement("button");
//         editBtn.innerHTML = '<i class="fas fa-edit fa-lg"></i>';
//         editBtn.classList.add('edit-folder-button');
//         editBtn.addEventListener('click', () => toggleEdit(folder, i, title, a, li));

//         const deleteBtn = document.createElement("button");
//         deleteBtn.innerHTML = '<i class="fas fa-trash-alt fa-lg"></i>';
//         deleteBtn.classList.add("delete");
//         deleteBtn.addEventListener('click', () => deleteItem(folder, i));

//         urlContainer.appendChild(favicon);
//         urlContainer.appendChild(a);
//         urlContainer.appendChild(title);
//         btnContainer.appendChild(editBtn);
//         btnContainer.appendChild(deleteBtn);

//         li.appendChild(urlContainer);
//         li.appendChild(btnContainer);
//         folderContent.appendChild(li);
//     }

//     updateFolderButtons();
// }

// function renderSearchResults(results) {
//     folderContent.innerHTML = "";
//     for (const folder in results) {
//         const leads = results[folder];
//         for (let i = 0; i < leads.length; i++) {
//             const li = document.createElement("li");

//             const urlContainer = document.createElement("div");
//             urlContainer.classList.add("url-container");

//             const favicon = document.createElement("img");
//             favicon.src = leads[i].favicon;
//             favicon.classList.add("favicon");

//             const title = document.createElement("div");
//             title.textContent = leads[i].url;
//             title.classList.add("title");

//             const a = document.createElement("a");
//             a.href = leads[i].url;
//             a.target = "_blank";
//             a.textContent = leads[i].title;

//             const btnContainer = document.createElement("div");
//             btnContainer.classList.add("btn-container");

//             const editBtn = document.createElement("button");
//             editBtn.innerHTML = '<i class="fas fa-edit fa-lg"></i>';
//             editBtn.classList.add('edit-folder-button');
//             editBtn.addEventListener('click', () => toggleEdit(folder, i, title, a, li));

//             const deleteBtn = document.createElement("button");
//             deleteBtn.innerHTML = '<i class="fas fa-trash-alt fa-lg"></i>';
//             deleteBtn.classList.add("delete");
//             deleteBtn.addEventListener('click', () => deleteItem(folder, i));

//             urlContainer.appendChild(favicon);
//             urlContainer.appendChild(a);
//             urlContainer.appendChild(title);
//             btnContainer.appendChild(editBtn);
//             btnContainer.appendChild(deleteBtn);

//             li.appendChild(urlContainer);
//             li.appendChild(btnContainer);
//             folderContent.appendChild(li);
//         }
//     }
// }

// deleteAllBtn.addEventListener('click', () => {
//     if (currentFolder && myLeads[currentFolder]) {
//         myLeads[currentFolder] = [];
//         localStorage.setItem("myLeads", JSON.stringify(myLeads));
//         render(currentFolder);
//     }
// });

// saveInputBtn.addEventListener('click', () => {
//     const urlInput = document.getElementById('input-el').value.trim();
//     const validationMessage = document.getElementById('validation-message');
//     const urlPattern = /^(https?:\/\/|www\.)[\w-]+(\.[\w-]+)*(\.[a-z]{2,})$|^[\w-]+(\.[\w-]+)*(\.[a-z]{2,})$/i;

//     if (urlPattern.test(urlInput)) {
//         if (currentFolder) {
//             // Save the URL from the textbox along with its title and favicon
//             chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//                 const tab = tabs[0];
//                 const newEntry = {
//                     title: urlInput,  // Use the URL from the textbox
//                     a: urlInput,
//                     url: urlInput,
//                     favicon: tab.favIconUrl || '' // Use the current tab's favicon or default to empty
//                 };
                
//                 if (!myLeads[currentFolder]) {
//                     myLeads[currentFolder] = [];
//                 }
                
//                 myLeads[currentFolder].push(newEntry);
//                 localStorage.setItem("myLeads", JSON.stringify(myLeads));
//                 render(currentFolder);
//             });
            
//             validationMessage.style.color = 'green';
//             validationMessage.textContent = 'Valid URL';
           
//         } else {
//             if (Object.keys(myLeads).length === 0) {
//                 showAlert("Please create a folder first"); 
//                 // showCustomModal('Please create a folder first', function(userInput) {
//                 //     console.log('User input:', userInput);
//                 // });                           
//             }
//         }
//     } else {
//         validationMessage.style.color = 'red';
//         validationMessage.textContent = 'Invalid URL. It must start with "https://", "http://", "www.", or contain ".com"';
//     }
// });

// tabSaveBtn.addEventListener('click', () => {

//     if (currentFolder) {
//         chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//             const tab = tabs[0];
//             if (!myLeads[currentFolder]) {
//                 myLeads[currentFolder] = [];
//             }
//             myLeads[currentFolder].push({ title: tab.title, a: tab.url, url: tab.url, favicon: tab.favIconUrl });
//             localStorage.setItem("myLeads", JSON.stringify(myLeads));
//             render(currentFolder);
//         });
//     } else {
//         if (Object.keys(myLeads).length === 0) {
//             // alert("Please create a folder first");
//             showAlert("Please create a folder first");
//         }
//     }
// });

// addFolderBtn.addEventListener('click', () => {
//     const folderName = input_fcb.value;
//     console.log(userPaid);
//     if (userPaid == false && Object.keys(myLeads).length < 3) 
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
// });

// function createFolder(name) {
//     if (!myLeads[name]) {
//         myLeads[name] = [];
//     }
//     updateFolderButtons();
//     localStorage.setItem("myLeads", JSON.stringify(myLeads));
// }

// function switchFolder(name) {
//     currentFolder = name;
//     currentFolderNameEl.textContent = name;
//     document.querySelectorAll('.folder-button').forEach(button => {
//         button.classList.remove('active');
//         if (button.textContent === name) {
//             button.classList.add('active');
//         }
//     });
//     render(currentFolder);
// }

// function updateFolderButtons() {
//     const folderButtonsContainer = document.querySelector('.folder-buttons');
//     folderButtonsContainer.innerHTML = '';

//     Object.keys(myLeads).forEach(folder => {
//         const folderButton = document.createElement('div');
//         folderButton.classList.add('folder-button');
//         folderButton.dataset.folder = folder;
//         if (folder === currentFolder) {
//             folderButton.classList.add('active');
//         }

//         const folderName = document.createElement('span');
//         folderName.textContent = folder;
//         folderName.addEventListener('click', () => switchFolder(folder));

//         const editBtn = document.createElement('button');
//         editBtn.innerHTML = '<i class="fas fa-edit fa-lg"></i>';
//         editBtn.classList.add('edit-folder-button');
//         editBtn.addEventListener('click', () => editFolder("Enter new folder name:", folderName.textContent));

//         const deleteBtn = document.createElement('button');
//         deleteBtn.innerHTML = '<i class="fas fa-trash-alt fa-lg"></i>';
//         deleteBtn.setAttribute('data-folder', 'folder');
//         deleteBtn.classList.add('delete-folder-button');
//         deleteBtn.addEventListener('click', () => deleteFolder(folder));

//         const folderModifyContainer = document.createElement("div");
//         folderModifyContainer.classList.add("folder-modify-container");

//         // Append buttons to the folder button
//         folderButton.appendChild(folderName);
//         folderModifyContainer.appendChild(editBtn);
//         folderModifyContainer.appendChild(deleteBtn);
//         folderButton.appendChild(folderModifyContainer);
//         folderButtonsContainer.appendChild(folderButton);
//     });
//     localStorage.setItem("myLeads", JSON.stringify(myLeads));
// }

// function deleteItem(folder, index) {
//     myLeads[folder].splice(index, 1);
//     localStorage.setItem("myLeads", JSON.stringify(myLeads));
//     render(currentFolder);
// }

// function deleteFolder(name) {
//     // Remove the folder and its contents
//     delete myLeads[name];

//     // Save the updated myLeads to localStorage
//     localStorage.setItem("myLeads", JSON.stringify(myLeads));

//     // Update the folder buttons to reflect the changes
//     updateFolderButtons();

//     // Check if there are any remaining folders
//     if (Object.keys(myLeads).length === 0) {
//         // If no folders remain, prompt the user to create a new folder
//         currentFolder = null;
//         folderContent.innerHTML = "<p style='color:white;'>No folders available. Please create a new folder.</p>";
//         currentFolderNameEl.textContent = "";
//     } else {
//         // If folders remain, set currentFolder to the first available folder and render it
//         currentFolder = Object.keys(myLeads)[0];
//         render(currentFolder);
//     }
// }

// function toggleEdit(folder, index, titleEl, urlEl, li) {
//     const newFolderName = showInputTwice("Enter New Title & URL: ", "Enter New Title & URL: ",titleEl.textContent, urlEl.textContent);
//     const newTitle = newFolderName.url;
//     const newURL = newFolderName.title;

//     if (newTitle && newTitle.trim() !== '' || newURL && newURL.trim() !== '') {
    
//         myLeads[folder][index].title = newTitle;
//         myLeads[folder][index].url = newURL;
//         // delete myLeads[folder];

//         localStorage.setItem("myLeads", JSON.stringify(myLeads));
//         currentFolderNameEl.textContent = modalInput;
//         render(currentFolder);
//     }
// }

// // Function to show the custom prompt
// function editFolder(message, folder) {
//     const newFolderName = showInput(message, folder);

//     // Your logic here to handle the new folder name
//     if ( newFolderName && newFolderName.trim() !== '') {
//         myLeads[newFolderName] = myLeads[folder];
//         delete myLeads[folder];
        
//         localStorage.setItem("myLeads", JSON.stringify(myLeads));
//         //  currentFolder = newFolderName;
//         currentFolderNameEl.textContent = newFolderName;
//         updateFolderButtons();
//     }  
// }


// let isAlertShown = false;
// let isInputShown = false;

// function showAlert(message) {
//     if (!isAlertShown) {
//         isAlertShown = true;
//         alert(message);
//         isAlertShown = false;
//     }
// }


// function showInput(message, input) {
//     if (!isInputShown) {
//         isInputShown = true;
//         const returned = prompt(message, input);
//         isInputShown = false;
//         return returned;
//     }
// }

// function showInputTwice(message, message2, input, input2) {
//     if (!isInputShown) {
//         isInputShown = true;
//         const returned = prompt(message, input);
//         const returned2 = prompt(message2, input2);
//         isInputShown = false;
//         return { title: returned, url: returned2 };
//     }
// }

// Initialize ExtPay for handling payments and user status
// const extpay = ExtPay('savemytabs');
// extpay.startBackground();

// let userPaid = false;

// extpay.getUser().then(user => {
//     userPaid = user.paid;
    
//     if (user.paid) {
//         // User is signed in
//         document.getElementById('profile-link').style.display = 'inline';
//         document.getElementById('signin-link').style.display = 'none';
//         document.getElementById('search-container').style.display = 'block';
//     } else {
//         // User is not signed in
//         document.getElementById('profile-link').style.display = 'none';
//         document.getElementById('signin-link').style.display = 'inline';
//         document.getElementById('search-container').style.display = 'none';
//     }

//     document.getElementById('profile-link').addEventListener('click', () => {
//         window.location.href = 'profile.html';
//     });
// });

// // Add event listener to the sign-in link
// document.getElementById('signin-link').addEventListener('click', () => {
//     extpay.openLoginPage();
// });

// // Initialize IndexedDB
// let db;
// let myLeads = {};
// let currentFolder = null;

// let request = indexedDB.open('myDatabase', 1);

// request.onupgradeneeded = function(event) {
//     db = event.target.result;
//     let objectStore = db.createObjectStore('myObjectStore', { keyPath: 'id', autoIncrement: true });
//     objectStore.createIndex('folder', 'folder', { unique: false });
// };

// request.onsuccess = function(event) {
//     db = event.target.result;
//     loadLeadsFromDB();
// };

// request.onerror = function(event) {
//     console.error('IndexedDB error:', event.target.error);
// };

// // Functions to interact with IndexedDB
// function addLeadToDB(folder, lead) {
//     let transaction = db.transaction(['myObjectStore'], 'readwrite');
//     let objectStore = transaction.objectStore('myObjectStore');
//     let request = objectStore.add({ folder, lead });

//     request.onsuccess = function() {
//         console.log('Lead added to DB');
//     };

//     request.onerror = function(event) {
//         console.error('Error adding lead to DB:', event.target.error);
//     };
// }

// function loadLeadsFromDB() {
//     let transaction = db.transaction(['myObjectStore'], 'readonly');
//     let objectStore = transaction.objectStore('myObjectStore');
//     let request = objectStore.getAll();

//     request.onsuccess = function(event) {
//         let records = event.target.result;
//         myLeads = {}; // Reset myLeads to ensure clean state

//         records.forEach(record => {
//             if (!myLeads[record.folder]) {
//                 myLeads[record.folder] = [];
//             }
//             myLeads[record.folder].push(record.lead);
//         });

//         // Update the UI with the loaded folders
//         updateFolderButtons();

//         if (Object.keys(myLeads).length > 0) {
//             currentFolder = Object.keys(myLeads)[0];
//             render(currentFolder);
//         } else {
//             promptNewFolder();
//         }
//     };

//     request.onerror = function(event) {
//         console.error('Error loading leads from DB:', event.target.error);
//     };
// }


// function deleteLeadFromDB(id) {
//     let transaction = db.transaction(['myObjectStore'], 'readwrite');
//     let objectStore = transaction.objectStore('myObjectStore');
//     let request = objectStore.delete(id);

//     request.onsuccess = function() {
//         console.log('Lead deleted from DB');
//     };

//     request.onerror = function(event) {
//         console.error('Error deleting lead from DB:', event.target.error);
//     };
// }

// // Get modal elements
// const modal = document.getElementById('customModal');
// const closeButton = document.querySelector('.close-button');
// const modalMessage = document.getElementById('modalMessage');
// const modalInput = document.getElementById('modalInput');
// const modalSubmitButton = document.getElementById('modalSubmitButton');

// // Define UI elements and initialize
// const inputEl = document.getElementById('input-el');
// const saveInputBtn = document.getElementById('input-btn');
// const deleteAllBtn = document.getElementById('delete-el');
// const tabSaveBtn = document.getElementById('tab-btn');
// const addFolderBtn = document.getElementById('add-folder-btn');
// const input_fcb = document.getElementById('input-fcb');
// const currentFolderNameEl = document.getElementById('current-folder-name');
// const folderContent = document.getElementById('folder-content');
// const searchBar = document.getElementById('search-bar');

// searchBar.addEventListener('input', () => {
//     const query = searchBar.value.toLowerCase();
//     if (query in myLeads) {
//         switchFolder(query);
//         return;
//     }
//     const results = {};
//     if (currentFolder && myLeads[currentFolder]) {
//         const filteredLeads = myLeads[currentFolder].filter(lead =>
//             lead.title.toLowerCase().includes(query) || lead.url.toLowerCase().includes(query));
//         if (filteredLeads.length > 0) {
//             results[currentFolder] = filteredLeads;
//         }
//     }
//     renderSearchResults(results);
// });

// function promptNewFolder() {
//     const newFolder = prompt("No folders available. Please create a new folder", "new");
//     if (newFolder) {
//         createFolder(newFolder);
//         switchFolder(newFolder);
//     }
// }

// function render(folder) {
//     folderContent.innerHTML = "";
//     if (!myLeads[folder]) {
//         myLeads[folder] = [];
//     }
//     const leads = myLeads[folder];
//     for (let i = 0; i < leads.length; i++) {
//         const lead = leads[i];
//         console.log('Rendering lead:', lead); // Debugging statement

//         if (!lead) {
//             console.error('Lead is null or undefined');
//             continue; // Skip this iteration
//         }

//         const li = document.createElement("li");

//         const urlContainer = document.createElement("div");
//         urlContainer.classList.add("url-container");

//         // Check if favicon exists
//         const favicon = document.createElement("img");
//         if (lead.favicon) {
//             favicon.src = lead.favicon;
//         } else {
//             favicon.src = 'default-favicon.png'; // Fallback favicon
//         }
//         favicon.classList.add("favicon");

//         const title = document.createElement("div");
//         title.textContent = lead.url;
//         title.classList.add("title");

//         const a = document.createElement("a");
//         a.href = lead.url;
//         a.target = "_blank";
//         a.textContent = lead.title;

//         const btnContainer = document.createElement("div");
//         btnContainer.classList.add("btn-container");

//         const editBtn = document.createElement("button");
//         editBtn.innerHTML = '<i class="fas fa-edit fa-lg"></i>';
//         editBtn.classList.add('edit-folder-button');
//         editBtn.addEventListener('click', () => toggleEdit(folder, i, title, a, li));

//         const deleteBtn = document.createElement("button");
//         deleteBtn.innerHTML = '<i class="fas fa-trash-alt fa-lg"></i>';
//         deleteBtn.classList.add("delete");
//         deleteBtn.addEventListener('click', () => deleteItem(folder, i));

//         urlContainer.appendChild(favicon);
//         urlContainer.appendChild(a);
//         urlContainer.appendChild(title);
//         btnContainer.appendChild(editBtn);
//         btnContainer.appendChild(deleteBtn);

//         li.appendChild(urlContainer);
//         li.appendChild(btnContainer);
//         folderContent.appendChild(li);
//     }

//     updateFolderButtons();
// }


// function renderSearchResults(results) {
//     folderContent.innerHTML = "";
//     for (const folder in results) {
//         const leads = results[folder];
//         for (let i = 0; i < leads.length; i++) {
//             const li = document.createElement("li");

//             const urlContainer = document.createElement("div");
//             urlContainer.classList.add("url-container");

//             const favicon = document.createElement("img");
//             favicon.src = leads[i].favicon;
//             favicon.classList.add("favicon");

//             const title = document.createElement("div");
//             title.textContent = leads[i].url;
//             title.classList.add("title");

//             const a = document.createElement("a");
//             a.href = leads[i].url;
//             a.target = "_blank";
//             a.textContent = leads[i].title;

//             const btnContainer = document.createElement("div");
//             btnContainer.classList.add("btn-container");

//             const editBtn = document.createElement("button");
//             editBtn.innerHTML = '<i class="fas fa-edit fa-lg"></i>';
//             editBtn.classList.add('edit-folder-button');
//             editBtn.addEventListener('click', () => toggleEdit(folder, i, title, a, li));

//             const deleteBtn = document.createElement("button");
//             deleteBtn.innerHTML = '<i class="fas fa-trash-alt fa-lg"></i>';
//             deleteBtn.classList.add("delete");
//             deleteBtn.addEventListener('click', () => deleteItem(folder, i));

//             urlContainer.appendChild(favicon);
//             urlContainer.appendChild(a);
//             urlContainer.appendChild(title);
//             btnContainer.appendChild(editBtn);
//             btnContainer.appendChild(deleteBtn);

//             li.appendChild(urlContainer);
//             li.appendChild(btnContainer);
//             folderContent.appendChild(li);
//         }
//     }
// }

// deleteAllBtn.addEventListener('click', () => {
//     if (currentFolder && myLeads[currentFolder]) {
//         myLeads[currentFolder] = [];
//         let transaction = db.transaction(['myObjectStore'], 'readwrite');
//         let objectStore = transaction.objectStore('myObjectStore');
//         let index = objectStore.index('folder');
//         let request = index.openCursor(IDBKeyRange.only(currentFolder));

//         request.onsuccess = function(event) {
//             let cursor = event.target.result;
//             if (cursor) {
//                 objectStore.delete(cursor.primaryKey);
//                 cursor.continue();
//             } else {
//                 render(currentFolder);
//             }
//         };
//     }
// });

// saveInputBtn.addEventListener('click', () => {
//     if (inputEl.value && currentFolder) {
//         const faviconURL = input_fcb.value || "";
//         const newLead = {
//             url: inputEl.value,
//             title: inputEl.value,
//             favicon: faviconURL
//         };
//         myLeads[currentFolder].push(newLead);
//         addLeadToDB(currentFolder, newLead);
//         render(currentFolder);
//         inputEl.value = "";
//     }
// });

// tabSaveBtn.addEventListener('click', () => {
//     chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
//         const tab = tabs[0];
//         const faviconURL = tab.favIconUrl || "";
//         const newLead = {
//             url: tab.url,
//             title: tab.title,
//             favicon: faviconURL
//         };
//         if (currentFolder) {
//             myLeads[currentFolder].push(newLead);
//             addLeadToDB(currentFolder, newLead);
//             render(currentFolder);
//         } else {
//             promptNewFolder();
//         }
//     });
// });

// function updateFolderButtons() {
//     const folderContainer = document.querySelector('.folder-buttons');
//     folderContainer.innerHTML = "";

//     Object.keys(myLeads).forEach(folder => {
//         const folderButton = document.createElement('div');
//         folderButton.classList.add('folder-button');
//         folderButton.dataset.folder = folder;
//         if (folder === currentFolder) {
//             folderButton.classList.add('active');
//         }

//         const folderName = document.createElement('span');
//         folderName.textContent = folder;
//         folderName.addEventListener('click', () => switchFolder(folder));

//         // Edit Button
//         const editBtn = document.createElement('button');
//         editBtn.innerHTML = '<i class="fas fa-edit fa-lg"></i>';
//         editBtn.classList.add('edit-folder-button');
//         editBtn.addEventListener('click', () => editFolder("Enter new folder name:", folder));

//         // Delete Button
//         const deleteBtn = document.createElement('button');
//         deleteBtn.innerHTML = '<i class="fas fa-trash-alt fa-lg"></i>';
//         deleteBtn.classList.add('delete-folder-button');
//         deleteBtn.addEventListener('click', () => deleteFolder(folder));

//         // Container for Edit and Delete Buttons
//         const folderModifyContainer = document.createElement("div");
//         folderModifyContainer.classList.add("folder-modify-container");

//         // Append buttons to the folder button
//         folderButton.appendChild(folderName);
//         folderModifyContainer.appendChild(editBtn);
//         folderModifyContainer.appendChild(deleteBtn);
//         folderButton.appendChild(folderModifyContainer);

//         // Append folder button to the container
//         folderContainer.appendChild(folderButton);
//     });

//     if (currentFolder) {
//         const currentFolderNameEl = document.getElementById('current-folder-name');
//         currentFolderNameEl.textContent = `${currentFolder}`;
//     }
// }


// function toggleEdit(folder, index, titleElement, aElement, liElement) {
//     // Show a prompt for the new title
//     const newTitle = prompt("Enter the new title:", aElement.textContent);
    
//     // Check if the prompt returned a non-empty value
//     if (newTitle !== null && newTitle.trim() !== '') {
//         // Update the title element with the new value
//         aElement.textContent = newTitle;

//         // Update the lead data in memory
//         const lead = myLeads[folder][index];
//         lead.title = newTitle;

//         // Update the lead data in IndexedDB
//         updateLeadInDB(lead.id, lead);
//     } else {
//         // Handle empty or canceled prompt (optional)
//         if (newTitle === null) {
//             console.log("Edit canceled");
//         } else {
//             alert("Title cannot be empty");
//         }
//     }
// }


// function updateLeadInDB(id, updatedLead) {
//     let transaction = db.transaction(['myObjectStore'], 'readwrite');
//     let objectStore = transaction.objectStore('myObjectStore');
//     let request = objectStore.get(id);

//     request.onsuccess = function(event) {
//         let lead = event.target.result;
//         if (lead) {
//             lead.title = updatedLead.title; // Update the lead
//             objectStore.put(lead); // Save changes
//         }
//     };

//     request.onerror = function(event) {
//         console.error('Error updating lead in DB:', event.target.error);
//     };
// }


// function switchFolder(folder) {
//     // currentFolder = folder;
//     // render(folder);
//     console.log('Switching to folder:', folder); // Debug log
//     if (folder !== currentFolder) {
//         currentFolder = folder;
//         render(folder);
//     }
// }

// function createFolder(folderName) {
//     if (!myLeads[folderName]) {
//         myLeads[folderName] = [];
      
//          // Save the new folder to IndexedDB
//          let transaction = db.transaction(['myObjectStore'], 'readwrite');
//          let objectStore = transaction.objectStore('myObjectStore');
//          let request = objectStore.add({ folder: folderName, lead: null });
//          loadLeadsFromDB();
//          updateFolderButtons();
//          request.onsuccess = function() {
//              console.log('Folder added to DB:', folderName);
//               // Ensure this is called after adding the folder
//          };
 
//          request.onerror = function(event) {
//              console.error('Error adding folder to DB:', event.target.error);
//          };
//      } else {
//          console.log('Folder already exists:', folderName);
//      }
    
// }

// addFolderBtn.addEventListener('click', function() {
//     const folderName = prompt("Enter a folder name:");
//     if (folderName) {
//         createFolder(folderName);
//     }
// });

// function deleteItem(folder, index) {
//     if (myLeads[folder] && myLeads[folder][index]) {
//         const lead = myLeads[folder][index];
//         deleteLeadFromDB(lead.id);
//         myLeads[folder].splice(index, 1);
//         render(folder);
//     }
// }

// function deleteFolder(name) {
//     // Remove the folder and its contents from IndexedDB
//     let transaction = db.transaction(['myObjectStore'], 'readwrite');
//     let objectStore = transaction.objectStore('myObjectStore');
//     let index = objectStore.index('folder');
//     let request = index.openCursor(IDBKeyRange.only(name));

//     request.onsuccess = function(event) {
//         let cursor = event.target.result;
//         if (cursor) {
//             objectStore.delete(cursor.primaryKey);
//             cursor.continue();
//         } else {
//             // Once deletion is complete, update UI
//             delete myLeads[name];
//             updateFolderButtons();

//             // Check if there are any remaining folders
//             if (Object.keys(myLeads).length === 0) {
//                 currentFolder = null;
//                 folderContent.innerHTML = "<p style='color:white;'>No folders available. Please create a new folder.</p>";
//                 currentFolderNameEl.textContent = "";
//             } else {
//                 currentFolder = Object.keys(myLeads)[0];
//                 render(currentFolder);
//             }
//         }
//     };
// }

// function editFolder(message, oldFolderName) {
//     // Show prompt to get the new folder name
//     const newFolderName = prompt(message, oldFolderName);

//     if (newFolderName && newFolderName.trim() !== '') {
//         // Check if the new folder name already exists
//         if (myLeads[newFolderName]) {
//             alert('A folder with this name already exists.');
//             return;
//         }

//         // Update folder name in myLeads
//         myLeads[newFolderName] = myLeads[oldFolderName];
//         delete myLeads[oldFolderName];

//         // Update folder names in IndexedDB
//         updateFolderInDB(oldFolderName, newFolderName);

//         // Update the UI
//         updateFolderButtons();

//         // Update the current folder name if necessary
//         if (currentFolder === oldFolderName) {
//             currentFolder = newFolderName;
//             currentFolderNameEl.textContent = newFolderName;
//         }
//         render(currentFolder);
//     }  
// }

// function updateFolderInDB(oldFolderName, newFolderName) {
//     let transaction = db.transaction(['myObjectStore'], 'readwrite');
//     let objectStore = transaction.objectStore('myObjectStore');
//     let index = objectStore.index('folder');
//     let request = index.openCursor(IDBKeyRange.only(oldFolderName));

//     request.onsuccess = function(event) {
//         let cursor = event.target.result;
//         if (cursor) {
//             let lead = cursor.value;
//             lead.folder = newFolderName; // Update the folder name
//             objectStore.put(lead); // Save changes
//             cursor.continue();
//         } else {
//             console.log('Folder names updated in DB');
//         }
//     };

//     request.onerror = function(event) {
//         console.error('Error updating folder names in DB:', event.target.error);
//     };
// }

//Initialize storage and IndexedDB
function initialize() {

    // Initialize IndexedDB
    let request = indexedDB.open('myDatabase', 1);

    request.onupgradeneeded = function(event) {
        db = event.target.result;
        let leadStore = db.createObjectStore('leads', { keyPath: 'id', autoIncrement: true });
        leadStore.createIndex('folderId', 'folderId', { unique: false });

        // Create an object store for folders
        let folderStore = db.createObjectStore('folders', { keyPath: 'folder' });
    };

    request.onsuccess = function(event) {
        db = event.target.result;
        loadLeadsFromDB();
    };

    request.onerror = function(event) {
        console.error('IndexedDB error:', event.target.error);
    };
}

// Save leads to chrome.storage.sync
function saveLeadsToStorage(folderId, leads) {
    let transaction = db.transaction(['leads'], 'readwrite');
    let leadStore = transaction.objectStore('leads');

    leads.forEach(lead => {
        leadStore.put({
            id: folderId + '-' + lead.url,  // Unique ID per URL (optional)
            folderId: folderId,
            url: lead.url,
            title: lead.title
        });
    });

    transaction.oncomplete = function() {
        console.log("Leads have been saved to IndexedDB.");
    };

    transaction.onerror = function(event) {
        console.error("Error saving leads: ", event);
    };
}



// Load leads from chrome.storage.sync
function loadLeadsFromStorage(callback) {
    chrome.storage.sync.get(['myLeads'], function(result) {
        if (result.myLeads) {
            myLeads = result.myLeads;
        } else {
            myLeads = {};
        }
        callback();
    });
}

// Initialize ExtPay
const extpay = ExtPay('savemytabs');
extpay.startBackground();

let userPaid = false;

extpay.getUser().then(user => {
    userPaid = user.paid;
    
    if (user.paid) {
        document.getElementById('profile-link').style.display = 'inline';
        document.getElementById('signin-link').style.display = 'none';
        document.getElementById('search-container').style.display = 'block';
    } else {
        document.getElementById('profile-link').style.display = 'none';
        document.getElementById('signin-link').style.display = 'inline';
        document.getElementById('search-container').style.display = 'none';
    }

    document.getElementById('profile-link').addEventListener('click', () => {
        window.location.href = 'profile.html';
    });
});

document.getElementById('signin-link').addEventListener('click', () => {
    extpay.openLoginPage();
});

let db;
let myLeads = {};
let currentFolder = null;

// Functions to interact with IndexedDB
function addLeadToDB(folder, lead) {
    let transaction = db.transaction(['myObjectStore'], 'readwrite');
    let objectStore = transaction.objectStore('myObjectStore');
    let request = objectStore.add({ folder, lead });

    request.onsuccess = function() {
        let id = request.result; // Get the ID of the newly added item
        lead.id = lead.id; // Assign the ID to the lead object

        if (!myLeads[folder]) {
            myLeads[folder] = [];
        }

        myLeads[folder].push(lead); // Add the lead with ID to the in-memory storag
        
        saveLeadsToStorage(folder); // Save to storage
        render(folder);
    };

    request.onerror = function(event) {
        console.error('Error adding lead to DB:', event.target.error);
    };
}

function loadLeadsFromDB() {
    let transaction = db.transaction(['myObjectStore'], 'readonly');
    let objectStore = transaction.objectStore('myObjectStore');
    let request = objectStore.getAll();

    request.onsuccess = function(event) {
        let records = event.target.result;

        // Clear previous leads to avoid duplicates
        myLeads = {};

        records.forEach(record => {
            if (!myLeads[record.folder]) {
                myLeads[record.folder] = [];
            }
            // myLeads[record.folder].push(record.lead);
            myLeads[record.folder].push({ ...record.lead, id: record.id }); // Store ID with the lead
        });

        if (Object.keys(myLeads).length > 0) {
            currentFolder = Object.keys(myLeads)[0];
            render(currentFolder);
        } else {
            promptNewFolder();
        }

        saveLeadsToStorage(); // Save to storage
    };

    request.onerror = function(event) {
        console.error('Error loading leads from DB:', event.target.error);
    };
}

function deleteLeadFromDB(id) {
    let transaction = db.transaction(['myObjectStore'], 'readwrite');
    let objectStore = transaction.objectStore('myObjectStore');
    let request = objectStore.delete(id);

    request.onsuccess = function() {
        console.log('Lead deleted from DB');
        saveLeadsToStorage(); // Save to storage
    };

    request.onerror = function(event) {
        console.error('Error deleting lead from DB:', event.target.error);
    };
}

// Get modal elements
const modal = document.getElementById('customModal');
const closeButton = document.querySelector('.close-button');
const modalMessage = document.getElementById('modalMessage');
const modalInput = document.getElementById('modalInput');
const modalSubmitButton = document.getElementById('modalSubmitButton');

// Define UI elements and initialize
const inputEl = document.getElementById('input-el');
const saveInputBtn = document.getElementById('input-btn');
const deleteAllBtn = document.getElementById('delete-el');
const tabSaveBtn = document.getElementById('tab-btn');
const addFolderBtn = document.getElementById('add-folder-btn');
const input_fcb = document.getElementById('input-fcb');
const currentFolderNameEl = document.getElementById('current-folder-name');
const folderContent = document.getElementById('folder-content');
const searchBar = document.getElementById('search-bar');

searchBar.addEventListener('input', () => {
    const query = searchBar.value.toLowerCase();
    if (query in myLeads) {
        switchFolder(query);
        return;
    }
    const results = {};
    if (currentFolder && myLeads[currentFolder]) {
        const filteredLeads = myLeads[currentFolder].filter(lead =>
            lead.title.toLowerCase().includes(query) || lead.url.toLowerCase().includes(query));
        if (filteredLeads.length > 0) {
            results[currentFolder] = filteredLeads;
        }
    }
    renderSearchResults(results);
});

function promptNewFolder() {
    // const newFolder = prompt("No folders available. Please create a new folder", "new");


    customPrompt("No folders available. Please create a new folder", function(userInput) {
        if (userInput) {  // Check if user input is not empty
            createFolder(userInput);  // Use the userInput as the new folder name
            switchFolder(userInput);  // Switch to the newly created folder
        }
    });
    
}

function render(folder) {
    folderContent.innerHTML = "";
    if (!myLeads[folder]) {
        myLeads[folder] = [];
    }
    const leads = myLeads[folder];
    for (let i = 0; i < leads.length; i++) {
        const li = document.createElement("li");

        const urlContainer = document.createElement("div");
        urlContainer.classList.add("url-container");

        const favicon = document.createElement("img");
        favicon.src = leads[i].favicon;
        favicon.classList.add("favicon");

        const title = document.createElement("div");
        title.textContent = leads[i].url;
        title.classList.add("title");

        const a = document.createElement("a");
        a.href = leads[i].url;
        a.target = "_blank";
        a.textContent = leads[i].title;

        const btnContainer = document.createElement("div");
        btnContainer.classList.add("btn-container");

        const editBtn = document.createElement("button");
        editBtn.innerHTML = '<i class="fas fa-edit fa-lg"></i>';
        editBtn.classList.add('edit-folder-button');
        editBtn.addEventListener('click', () => toggleEdit(folder, i, title, a, li));

        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = '<i class="fas fa-trash-alt fa-lg"></i>';
        deleteBtn.classList.add("delete");
        deleteBtn.addEventListener('click', () => deleteItem(folder, leads[i].id));

        urlContainer.appendChild(favicon);
        urlContainer.appendChild(a);
        urlContainer.appendChild(title);
        btnContainer.appendChild(editBtn);
        btnContainer.appendChild(deleteBtn);

        li.appendChild(urlContainer);
        li.appendChild(btnContainer);
        folderContent.appendChild(li);
    }

    updateFolderButtons();
}

function renderSearchResults(results) {
    folderContent.innerHTML = "";
    for (const folder in results) {
        const leads = results[folder];
        for (let i = 0; i < leads.length; i++) {
            const li = document.createElement("li");

            const urlContainer = document.createElement("div");
            urlContainer.classList.add("url-container");

            const favicon = document.createElement("img");
            favicon.src = leads[i].favicon;
            favicon.classList.add("favicon");

            const title = document.createElement("div");
            title.textContent = leads[i].url;
            title.classList.add("title");

            const a = document.createElement("a");
            a.href = leads[i].url;
            a.target = "_blank";
            a.textContent = leads[i].title;

            const btnContainer = document.createElement("div");
            btnContainer.classList.add("btn-container");

            const editBtn = document.createElement("button");
            editBtn.innerHTML = '<i class="fas fa-edit fa-lg"></i>';
            editBtn.classList.add('edit-folder-button');
            editBtn.addEventListener('click', () => toggleEdit(folder, i, title, a, li));

            const deleteBtn = document.createElement("button");
            deleteBtn.innerHTML = '<i class="fas fa-trash-alt fa-lg"></i>';
            deleteBtn.classList.add("delete");
            deleteBtn.addEventListener('click', () => deleteItem(folder, i));

            urlContainer.appendChild(favicon);
            urlContainer.appendChild(a);
            urlContainer.appendChild(title);
            btnContainer.appendChild(editBtn);
            btnContainer.appendChild(deleteBtn);

            li.appendChild(urlContainer);
            li.appendChild(btnContainer);
            folderContent.appendChild(li);
        }
    }
}

addFolderBtn.addEventListener('click', function() {
    customPrompt("Enter a folder name:", function(folderName) {
        if (folderName) {
            createFolder(folderName);
            switchFolder(folderName);
        }
    });
});

saveInputBtn.addEventListener('click', () => {
    const urlInput = document.getElementById('input-el').value.trim();
    const validationMessage = document.getElementById('validation-message');
    const urlPattern = /^(https?:\/\/|www\.)[\w-]+(\.[\w-]+)*(\.[a-z]{2,})$|^[\w-]+(\.[\w-]+)*(\.[a-z]{2,})$/i;

    if (urlPattern.test(urlInput)) {
        if (currentFolder) {
            // Save the URL from the textbox along with its title and favicon
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                const tab = tabs[0];
                const newEntry = {
                    title: urlInput,  // Use the URL from the textbox
                    a: urlInput,
                    url: urlInput,
                    favicon: tab.favIconUrl || '' // Use the current tab's favicon or default to empty
                };
                
                if (!myLeads[currentFolder]) {
                    myLeads[currentFolder] = [];
                }
                
                myLeads[currentFolder].push(newEntry);
                localStorage.setItem("myLeads", JSON.stringify(myLeads));
                render(currentFolder);
            });
            
            validationMessage.style.color = 'green';
            validationMessage.textContent = 'Valid URL';
            
        } else {
            if (Object.keys(myLeads).length === 0) {
                showAlert("Please create a folder first"); 
                // showCustomModal('Please create a folder first', function(userInput) {
                //     console.log('User input:', userInput);
                // });                           
            }
        }
    } else {
        validationMessage.style.color = 'red';
        validationMessage.textContent = 'Invalid URL. It must start with "https://", "http://", "www.", or contain ".com"';
    }
});

function createFolder(name) {
    if (!myLeads[name]) {
        myLeads[name] = [];
        saveLeadsToStorage(); // Save to storage
        updateFolderButtons();
    }
}

function deleteFolder(name) {
    // Remove from IndexedDB
    let transaction = db.transaction(['myObjectStore'], 'readwrite');
    let objectStore = transaction.objectStore('myObjectStore');
    let index = objectStore.index('folder');
    let request = index.openCursor(IDBKeyRange.only(name));

    request.onsuccess = function(event) {
        let cursor = event.target.result;
        if (cursor) {
            objectStore.delete(cursor.primaryKey); // Delete lead by primaryKey
            cursor.continue();
        } else {
            console.log('All leads for folder deleted from DB');
            // Remove folder from in-memory storage
            delete myLeads[name];

            // Save changes to Chrome storage
            saveLeadsToStorage();

            // Update UI
            updateFolderButtons();
            if (Object.keys(myLeads).length === 0) {
                currentFolder = null;
                folderContent.innerHTML = "<p>No folders available. Please create a new folder.</p>";
                currentFolderNameEl.textContent = "";
            } else {
                currentFolder = Object.keys(myLeads)[0];
                render(currentFolder);
            }
        }
    };

    request.onerror = function(event) {
        console.error('Error deleting leads from DB:', event.target.error);
    };
}


function updateFolderButtons() {
    const folderContainer = document.querySelector('.folder-buttons');
    folderContainer.innerHTML = "";

    Object.keys(myLeads).forEach(folder => {
        const folderButton = document.createElement('div');
        folderButton.classList.add('folder-button');
        folderButton.dataset.folder = folder;
        if (folder === currentFolder) {
            folderButton.classList.add('active');
        }

        const folderName = document.createElement('span');
        folderName.textContent = folder;
        folderName.addEventListener('click', () => switchFolder(folder));

        // Edit Button
        const editBtn = document.createElement('button');
        editBtn.innerHTML = '<i class="fas fa-edit fa-lg"></i>';
        editBtn.classList.add('edit-folder-button');
        editBtn.addEventListener('click', () => editFolder("Enter new folder name:", folder));

        // Delete Button
        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '<i class="fas fa-trash-alt fa-lg"></i>';
        deleteBtn.classList.add('delete-folder-button');
        deleteBtn.addEventListener('click', () => deleteFolder(folder));

        // Container for Edit and Delete Buttons
        const folderModifyContainer = document.createElement("div");
        folderModifyContainer.classList.add("folder-modify-container");

        // Append buttons to the folder button
        folderButton.appendChild(folderName);
        folderModifyContainer.appendChild(editBtn);
        folderModifyContainer.appendChild(deleteBtn);
        folderButton.appendChild(folderModifyContainer);

        // Append folder button to the container
        folderContainer.appendChild(folderButton);
    });

    if (currentFolder) {
        const currentFolderNameEl = document.getElementById('current-folder-name');
        currentFolderNameEl.textContent = `${currentFolder}`;
    }
}

function switchFolder(folder) {
    if (myLeads[folder]) {
        currentFolder = folder;
        render(folder);
    }
}

// Function to display folders
function displayFolders(folders) {
    const folderButtons = document.getElementById("folder-buttons");
    folderButtons.innerHTML = '';  // Clear previous folder buttons

    folders.forEach((folder, index) => {
        const folderElement = document.createElement("div");
        folderElement.className = "folder-item";
        folderElement.innerHTML = `
            <input type="checkbox" class="folder-checkbox" data-folder-index="${index}">
            <span>${folder.name}</span>
        `;
        folderButtons.appendChild(folderElement);
    });

    setupFolderCheckboxes();
}

// Function to display URLs in a folder
function displayFolderContent(folder) {
    const folderContent = document.getElementById("folder-content");
    folderContent.innerHTML = '';  // Clear previous content

    folder.urls.forEach((url, index) => {
        const urlElement = document.createElement("div");
        urlElement.className = "url-item";
        urlElement.innerHTML = `
            <input type="checkbox" class="url-checkbox" data-url-index="${index}">
            <span>${url.title} - ${url.link}</span>
        `;
        folderContent.appendChild(urlElement);
    });

    setupUrlCheckboxes();
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
    
    deleteFoldersBtn.style.display = isChecked ? "inline-block" : "none";
}

// Show delete links button if at least one link is selected
function toggleDeleteLinksButton() {
    const urlCheckboxes = document.querySelectorAll(".url-checkbox");
    const deleteLinksBtn = document.getElementById("delete-selected-links-btn");
    const isChecked = Array.from(urlCheckboxes).some(checkbox => checkbox.checked);

    deleteLinksBtn.style.display = isChecked ? "inline-block" : "none";
}

// Delete selected folders
document.getElementById("delete-selected-folders-btn").addEventListener("click", () => {
    const folderCheckboxes = document.querySelectorAll(".folder-checkbox:checked");
    folderCheckboxes.forEach(checkbox => {
        const folderIndex = checkbox.getAttribute("data-folder-index");
        folders.splice(folderIndex, 1);  // Remove the folder from the array
    });
    saveFoldersToStorage(folders);  // Save updated folder list
    displayFolders(folders);  // Refresh the folder display
    toggleDeleteFoldersButton();  // Hide the delete button if no folder is selected
});

function saveFoldersToStorage() {
    let transaction = db.transaction(['folders'], 'readwrite');
    let objectStore = transaction.objectStore('folders');

    // Assuming myLeads is an object where keys are folder names and values are arrays of URLs
    // for (const folder in myLeads) {
    //     const leads = myLeads[folder];
    //     const folderData = {
    //         folder: folder,
    //         urls: leads
    //     };

    //     // You may need to add an ID if required
    //     const request = objectStore.put(folderData); 

    //     request.onsuccess = function() {
    //         console.log('Folder saved to DB:', folder);
    //     };

    //     request.onerror = function(event) {
    //         console.error('Error saving folder to DB:', event.target.error);
    //     };
    // }
    folders.forEach(folder => {
        const folderData = { folder: folder };
        const request = objectStore.put(folderData);

        request.onsuccess = function() {
            console.log('Folder saved to DB:', folder);
        };

        request.onerror = function(event) {
            console.error('Error saving folder to DB:', event.target.error);
        };
    });
}


// Delete selected URLs
document.getElementById("delete-selected-links-btn").addEventListener("click", () => {
    const urlCheckboxes = document.querySelectorAll(".url-checkbox:checked");
    urlCheckboxes.forEach(checkbox => {
        const urlIndex = checkbox.getAttribute("data-url-index");
        currentFolder.urls.splice(urlIndex, 1);  // Remove the URL from the current folder
    });
    saveLeadsToStorage(currentFolder);  // Save updated URL list
    displayFolderContent(currentFolder);  // Refresh the URL display
    toggleDeleteLinksButton();  // Hide the delete button if no link is selected
});

function deleteItem(folder, id) {
 if (myLeads[folder]) {
        // Find the index of the lead with the given ID
        const index = myLeads[folder].findIndex(lead => lead.id == id);

        if (index !== -1) {
            // const leadToDelete = myLeads[folder][index];
            // console.log('Lead to delete:', leadToDelete);

            let transaction = db.transaction(['myObjectStore'], 'readwrite');
            let objectStore = transaction.objectStore('myObjectStore');
            let request = objectStore.delete(id); // Delete the entry by ID

            request.onsuccess = function() {
                console.log('Lead deleted from DB', id);
                myLeads[folder].splice(index, 1); // Remove from in-memory storage
                saveLeadsToStorage(folder); // Save updated leads to storage
                render(folder); // Update UI
            };

            request.onerror = function(event) {
                console.error('Error deleting lead from DB:', event.target.error);
            };
        } else {
            console.error('Lead not found with ID:', id);
        }
    } else {
        console.error('Folder not found:', folder);
    }
}


function editFolder(message, oldFolderName) {
    // Show prompt to get the new folder name
    // const newFolderName = prompt(message, oldFolderName);
    customPrompt1(message, oldFolderName, function(newFolderName) {
      
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

        // Update the UI
        updateFolderButtons();

        // Update the current folder name if necessary
        if (currentFolder === oldFolderName) {
            currentFolder = newFolderName;
            currentFolderNameEl.textContent = newFolderName;
        }
        render(currentFolder);
    }  
  
 });
}

function updateFolderInDB(oldFolderName, newFolderName) {
    let transaction = db.transaction(['myObjectStore'], 'readwrite');
    let objectStore = transaction.objectStore('myObjectStore');
    let index = objectStore.index('folder');
    let request = index.openCursor(IDBKeyRange.only(oldFolderName));

    request.onsuccess = function(event) {
        let cursor = event.target.result;
        if (cursor) {
            let lead = cursor.value;
            lead.folder = newFolderName; // Update the folder name
            objectStore.put(lead); // Save changes
            cursor.continue();
        } else {
            console.log('Folder names updated in DB');
        }
    };

    request.onerror = function(event) {
        console.error('Error updating folder names in DB:', event.target.error);
    };
}

function toggleEdit(folder, index, titleElement, aElement, liElement) {
    // Get the current title and URL
    const newTitle = aElement.textContent;
    const newUrl = aElement.getAttribute('href');
    
    const message = "Enter the new title and URL:";

    // Pass the current values as defaults to customPrompt2
    customPrompt2(message, newTitle, newUrl, function(updatedTitle, updatedUrl) {
        const lead = myLeads[folder][index];
        
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
       
    });
    updateLeadInDB(lead.id, folder, lead);
    saveLeadsToStorage(folder);
}


function updateLeadInDB(id, folder, lead) {
    let transaction = db.transaction(['myObjectStore'], 'readwrite');
    let objectStore = transaction.objectStore('myObjectStore');
    let request = objectStore.put({ lead, folder, id }); // Ensure ID is included

    request.onsuccess = function() {
        console.log('Lead updated in DB');
        
    };

    request.onerror = function(event) {
        console.error('Error updating lead in DB:', event.target.error);
    };
}


document.getElementById('delete-el').addEventListener('click', () => {
    if (currentFolder) {
        deleteFolder(currentFolder);
        promptNewFolder();
    }
});

function generateUniqueId() {
    return 'id_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// Add a single event listener to the save tab button
tabSaveBtn.addEventListener('click', () => {
    if (currentFolder) {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const tab = tabs[0];
            const uniqueId = generateUniqueId(); 
            const newEntry = {
                id: uniqueId,
                title: tab.title,
                url: tab.url,
                favicon: tab.favIconUrl || ''
            };
             console.log("new id: ", uniqueId);
            addLeadToDB(currentFolder, newEntry); // Only call this once
            loadLeadsFromDB();
        });
    } else {
        showAlert("Please create a folder first");
    }
});

// Initialize everything
initialize();

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

  function customPrompt2(message, defaultTitle, defaultUrl, callback) {
    // Get modal elements
    const modal = document.getElementById("customModal2");
    const modalMessage = document.getElementById("modalMessage2");
    const modalInput2 = document.getElementById("modalInput2");
    const modalInput3 = document.getElementById("modalInput3");
    const submitButton = document.getElementById("submitModal2");

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
  };

  function customPrompt1(message, defaultFolderTitle, callback) {
    // Get modal elements
    const modal = document.getElementById("customModal3");
    const modalMessage = document.getElementById("modalMessage3");
    const modalInput = document.getElementById("modalInput4");
    const submitButton = document.getElementById("submitModal3");

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

  function customAlert(message) {
    // Get modal elements
    const modal = document.getElementById("customModal4");
    const modalMessage = document.getElementById("modalMessage4");
    const okButton = document.getElementById("submitModal4");

    // Set the message
    modalMessage.textContent = message;

    // Hide any input fields if present
    const modalAlert = document.getElementById("modalAlert");
    if (modalAlert) {
        modalAlert.style.display = "none"; // Hide the input field
    }

    // Show the modal
    modal.style.display = "block";

    // Handle the OK button click to close the alert
    okButton.onclick = function() {
        modal.style.display = "none";  // Hide the modal when OK is clicked
    };
}


  // Function to close the modal if the user clicks outside the modal content
  window.onclick = function(event) {
    const modal = document.getElementById("customModal");
    const modal2 = document.getElementById("customModal2");
    const modal3 = document.getElementById("customModal3");
    const modal4 = document.getElementById("customModal4");
  
   switch (event.target) {
    case modal:
        modal.style.display = "none";
        break;
    case modal2:
        modal2.style.display = "none";
        break;
    case modal3:
        modal3.style.display = "none";
        break;
    case modal4:
        modal4.style.display = "none";
        break;
    default:
        break;
}

  };