import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";
import { signOut } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";


// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyCe6dLrasrHUxQANTfyqLbORHLcztVP6hk",
    authDomain: "filebrowser-bee23.firebaseapp.com",
    projectId: "filebrowser-bee23",
    storageBucket: "filebrowser-bee23.firebasestorage.app",
    messagingSenderId: "738024017724",
    appId: "1:738024017724:web:45f47baf04b27a5db15839",
    measurementId: "G-QXX6PG0G6W"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Dropbox API credentials
const dropboxAccessToken = "sl.CFTVuf8QvI5SSejqxM3e7Ogj1iVxRCNOyz27i3HBpllDLz9RfZd9xbv86pMVmPAFitj35qlzuXrMf9AbdRrC9VMjQVbOUMGl_9j6IGu8OYlIvOqypGi8fONPboSZK_k_A8yXZNmaGauLEY_NeZZYOO0";

// Initialize Dropbox client
const dbx = new Dropbox.Dropbox({ accessToken: dropboxAccessToken });

// Login form submission handler
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;

        if (!email || !password) {
            alert('Please fill in all fields.');
            return;
        }

        try {
            await signInWithEmailAndPassword(auth, email, password);
            alert('Login successful!');
            window.location.href = 'FileBrowser.html'; 
        } catch (error) {
            alert(`Login failed: ${error.message}`);
        }
    });
}

// Registration form submission handler
const registrationForm = document.getElementById('registrationForm');
if (registrationForm) {
    registrationForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (password === confirmPassword) {
            createUserWithEmailAndPassword(auth, email, password)
                .then(() => {
                    alert('Registration successful!');
                    window.location.href = 'FileBrowser.html'; 
                })
                .catch((error) => alert(error.message));
        } else {
            alert('Passwords do not match.');
        }
    });
}

const logoutButton = document.getElementById("logout-button");
if (logoutButton) {
    logoutButton.addEventListener("click", () => {
        // Sign out the user from Firebase
        signOut(auth).then(() => {
            // Show a logout success message
            alert("You have been logged out successfully!");

            // Redirect to the login page (index.html) after successful logout
            window.location.href = "index.html"; // Change this to the correct login page if needed
        }).catch((error) => {
            // Handle any errors that occur during sign out
            console.error("Error logging out: ", error);
            alert("An error occurred during logout. Please try again.");
        });
    });
}


// Fetch files from Dropbox
async function fetchFiles() {
    const fileList = document.getElementById("fileList");
    fileList.innerHTML = ""; // Clear the current file list

    try {
        const response = await dbx.filesListFolder({ path: '' });
        const files = response.result.entries;
        files.forEach(file => {
            const listItem = document.createElement("li");
            listItem.textContent = file.name;
            
            // Create a "Download" button
            const downloadBtn = document.createElement("button");
            downloadBtn.textContent = "Download";
            downloadBtn.onclick = () => downloadFile(file.path_display, file.name);
            listItem.appendChild(downloadBtn);
            
            // Create a "Delete" button
            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.style.backgroundColor = "#dc3545"; // Red color for delete
            deleteBtn.style.border = "none";
            deleteBtn.style.cursor = "pointer";
            deleteBtn.onclick = () => deleteFileOrFolder(file.path_display);  // Wire up delete functionality
            listItem.appendChild(deleteBtn);
            
            // Append the list item to the file list
            fileList.appendChild(listItem);
        });
    } catch (error) {
        console.error("Error fetching files: ", error);
        alert("Error fetching files.");
    }
}

// Upload a file to Dropbox
document.getElementById("uploadForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const fileInput = document.getElementById("fileInput").files[0];
    if (!fileInput) return alert("Please select a file to upload!");

    const fileReader = new FileReader();
    fileReader.onload = async function () {
        const fileContent = fileReader.result;
        const fileName = fileInput.name;
        
        try {
            const response = await dbx.filesUpload({
                path: '/' + fileName,
                contents: fileContent
            });
            alert("File uploaded successfully!");
            console.log(response);
            fetchFiles(); // Refresh the file list
        } catch (error) {
            console.error("Error uploading file: ", error);
            alert("File upload failed.");
        }
    };
    fileReader.readAsArrayBuffer(fileInput);
});

// Download a file from Dropbox
async function downloadFile(filePath, fileName) {
    try {
        const response = await dbx.filesDownload({ path: filePath });
        console.log(response); // Log the response to inspect it

        const blob = response.result.fileBlob;  // Access the fileBlob from result (might be in response.result)
        
        if (blob instanceof Blob) {
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = fileName;
            link.click();  // Trigger the download
        } else {
            throw new Error("Downloaded file is not a valid Blob object.");
        }
    } catch (error) {
        console.error("Error downloading file: ", error);
        alert("File download failed.");
    }
}

// Delete a file or folder from Dropbox
async function deleteFileOrFolder(filePath) {
    try {
        const response = await dbx.filesDeleteV2({ path: filePath });
        alert(`Successfully deleted: ${filePath}`);
        console.log(response);
        fetchFiles(); // Refresh the file list after deletion
    } catch (error) {
        console.error("Error deleting file/folder: ", error);
        alert("File/folder deletion failed.");
    }
}

// Fetch files on page load
fetchFiles();
