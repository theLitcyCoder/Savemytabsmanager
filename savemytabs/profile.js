document.addEventListener("DOMContentLoaded", () => {
    // Initialize extpay
    const extpay = ExtPay('savemytabs'); // Ensure this initialization is correct

    // Check if extpay and getUser method are available
    if (typeof extpay !== 'undefined' && typeof extpay.getUser === 'function') {
        // Optionally start background processes if needed
        // extpay.startBackground(); 
        document.getElementById("status").style.padding = "10px";
        document.getElementById("status").style.textTransform = "capitalize";
        // Fetch user data
        extpay.getUser().then(user => {
            if (user.paid) {
                // Update profile.html with user data
                const optionsWithTime = { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric', 
                    hour: 'numeric', 
                    minute: 'numeric', 
                    hour12: true
                };
                const fullDate = user.paidAt.toLocaleDateString('en-US', optionsWithTime);
                
                console.log(fullDate); // Example: "February 17, 2025, 3:45 PM"                

                document.getElementById("paid").textContent = fullDate;
                document.getElementById("email").textContent = user.email;
                document.getElementById("status").textContent = "Paid";
                if (document.querySelectorAll('.basic .both').length > 0) {
                    document.querySelectorAll('.basic .both').forEach(button => {
                        button.style.display = 'none';
                    });
                }
                if (document.querySelectorAll('.paid').length > 0 && document.querySelectorAll('.both').length > 0) {
                    document.querySelectorAll('.paid').forEach(button => {
                        button.style.display = 'block';
                    });
                    document.querySelector(".basicc").style.display = 'none';
                }
                document.getElementById("status").style.color = "black";
                document.getElementById("status").style.backgroundColor = "lightgreen";
                // Add more fields as needed
            } else {
                document.getElementById("paid").textContent = 'Not paid';
                document.getElementById("email").textContent = 'Not available';
                document.getElementById("status").textContent = 'Not Paid' ;
                document.getElementById("status").style.color = "white";
                document.getElementById("status").style.backgroundColor = "#914141";
                if (document.querySelectorAll('.basic').length > 0) {
                    document.querySelectorAll('.basic').forEach(button => {
                        button.style.display = 'block';
                    });
                }
                if (document.querySelectorAll('.paid').length > 0) {
                    document.querySelectorAll('.paid').forEach(button => {
                        button.style.display = 'none';
                    });
                }
            }
        }).catch(error => {
            console.error('Error fetching user data:', error);
            document.getElementById("username").textContent = 'Error loading data';
            document.getElementById("email").textContent = 'Error loading data';
        });
    } else {
        console.error('extpay is not initialized or getUser method is not available');
        document.getElementById("username").textContent = 'Service not available';
        document.getElementById("email").textContent = 'Service not available';
    }
});

document.querySelectorAll('.feature').forEach(feature => {
    feature.addEventListener('click', function () {
        // Close all feature contents first
        document.querySelectorAll('.feature-content').forEach(content => {
            content.style.maxHeight = null;
            content.style.padding = "0 15px";
        });

        // Remove 'active' class from all feature elements
        document.querySelectorAll('.feature').forEach(item => {
            item.classList.remove('active');
        });

        // Toggle the clicked feature
        this.classList.add('active');
        let content = this.nextElementSibling;

        if (content.style.maxHeight) {
            content.style.maxHeight = null;
            content.style.padding = "0 15px";
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
            content.style.padding = "10px 15px";
        }
    });
});

// document.getElementById("refresh").addEventListener("click", () => {
//     const userEmail = "user@example.com"; // Replace with actual logic to fetch user email

//     chrome.runtime.sendMessage(
//         { action: "checkSubscription", email: userEmail },
//         (response) => {
//             if (response?.subscribed) {
//                 document.getElementById("status").textContent = "✅ Subscribed";
//             } else {
//                 document.getElementById("status").textContent = "❌ Not Subscribed";
//             }
//         }
//     );
// });