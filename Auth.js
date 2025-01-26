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
const dropboxAccessToken = "sl.u.AFhAXivloflWCEnI0f5BE_0ZBjilx8uqZCK5eGrX5eIr_4ura3m8hGMJus81n3nKp8vYcku7BwznverFPtlih5UnLGEEKUdn1UuV7RntxBlLjzQ8Tcww_yAzapYLe3WWbL66P5jDFWSBphQP9cNk_joQqyeS7rYgotCmnqBUcdssVTnW5cPqJ-aqq3D7A-eM_FfkDNA4djEZuK0zWi6AwUBcIeMksSuSd_qGRCVSos3wQbIPiG99g7O-bFlu4phtICKG6GHUjMdm1BfGNWLIs7915qYcroL3xtqT1cTaAyUI1k_uWR_fBJfR_nvTwfGJrEYSvcykCWRAgbyNDfeCNsAV2nG19xnqfV7tfcd6Siv1wa4YYgElG3ZTRZMzivHZho6vftB50m-o7CPuWIpLSuSl0r0tuHk1Q7d5aHaYGXCyTxUAFhPhae8GG1VFNAKBmSS5kHG_j0GeyEZZnuZ64SvRj3vG9MCwrpr64D80MdE8omPAEdmpUBYihM4u7AGglVkFEvtlMqA4kRxP4EnwI-Szb4OP4EWC0UCBdDrrgi76KIx9x9-9TefCz5JPVaBcubh_WzX6shHiZ6XfW5Y5oq-mV9SOAvFVpYBNQg42zwpxJik-oTHBKIhyVSfU6R7ylrvd2cArjoh2HiYuqfi_1H99n_lr-SM60YdXHTp8oslFY99vXZOZA1e1mCuO3d7JNbMvZ9znmq1ajqif-F7WXdKxfAmLAfE8OFmluPqIo7U_OfUsPZcOzZDb6EYH4StUE50ttfMDqZxvfMR1nTJ54B02AB3dun4aG0sO7gto-OED-9uXx2UbhwV7lz1YOv3IIbdwrCNTSppi6MuBOVEmHNAQW6hQmIgPTD69CxFEjrxAiuYT5ot5an7oeuRmVsKPZBM3dpYPqadyEa1--U1McQ5nrOh380Ne_cXfT-s1VLEnCdR7otWnDu7E-UwzjoBMcC1wTBR1yz6ogKxurA-ly8w024qB9d6cHv43kFH-S_zbQyD5FdYg8_6O_d7eGkE1Ofyqbi289aVW1leuI5e7fX5WBGOQQhXQ0sLJ7BqbScNuATbHC-E7eRvRxVqIStu92q3Z_5Bp33RRiuunvqzJiOJ_1_RWkX_kd0J8s2q0DcDcv8g8HVpEmL4_OFjIUcI9BUB8KX7gR46LS1dwmGvPoVBsQqG9o5qBZ5-rSgcvpQQp-mBMzu6P7cvTD9Fz8-r4rnBneWYcJTBNUDv_1h-OpA5f43HZEplLZKtRWOPkNxA3HRSjUceOKicVKGShPr07asChxl2GNKMLd5NJrnfrpAiLQcwcMaKl34YAdEfabTP8VSVRSWuXWMcVqzy2MtZ3XWk1ADDax-Gd0aLcI0lvHa-g7slThh3neNMbrKk980XdoalvXx2ck2BDqP9igPuQiHsYE3JU6CubPLcvfvi2LcGR0UBYxs0eX40dHSLmPJQWAQ";

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
