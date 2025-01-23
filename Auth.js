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
const dropboxAccessToken = "sl.u.AFfJiRiEZIknqr4a_ShucVdHVL3HZOJG2CPDQkSORb5U3q_1XfrvHkPCqQM2tKOGaXKI2-JYVdzVyokX3U59KuXGHmS635xgGOYo5TK939hOPb9uIowjhxH5S9y8m-jUZGAMNEhgeo5vND-_3NB7DNI9qcdq6xvOH_sf3E1QpLdOQzgErpv3wF1C3vzDo6bJZJuny-tVLRUJgvxQHEy3Jks_5dfDggVJrfmPA0ikC01bRc_YP1K5m3ZMb8g9mud_NIeTbsjPIRw3in9EDMQ3DbcciQ9wx1L1CpZnYFOgZNolYQVu-XJ1JjMU5WhAvuEUkgBIg2keP6jzAgqzPgoP7rIv62M-_cYOeu-CrpHrseHY89f2iu3yRL4dXx-bzCL9LgUi_pUPI4NsfqPZWMy-SNQ30PHoKDami9BS-hJNMwODmfB1snYZEcbmYHpkD9VvO1uJkidyVlsZWJt6RiPL11QJgMkhtdyX2UK7LiYsJAo4Ev62088vSh-6WeMGbqqnOJkSsDCUZovAz5EvrQ1PPZs_78HPOn7u9t6225pBHfkuUHoZEVQjqJJbLQpq280wp-cEv5Gc_zmImH7GNVJpFh_ZQje1QGosEomJWe4AAYu9d1nYvV3VNjuy7_U5DC3YCCW1wu_NOBe9McWFWOjimvgArMTF7xIauyC009c4vvojUkXvgA9BD-oKUhBj0hyJzXXG3nONEVSJ26nuGkcVoJzaLNvF6RNcrdfH9-Ir-adXer-GBUiYafmOqZGFNOnCVoTbU6fw9jNnPKqIOykHW568Un0UiRejrf_a8MU2oWzIU3v6yQXvB4LJaVeBMlTLM04_NFDT1nW_0YQOYmn5htJhhp9ws9M9T8vW21d4bBbcyhAK7O0acUmTWELfrmsE-_KAx2CSKlj4IbC7n3n_OTvgT5qUfTWOimr2L0yTv85x09jEq3M_Ypv1fIDN6Un3__332o71XeliF2Z8wh_8hkTOETNLQvFjXGPbN4y0HHTl8ijiuz3LUbHYQk3gNn747FF-3M9D8z7l3Rd62FhkCSLvAq0cSTcsHt5Qi8LESPUMa_7_iI_ehh-vKeQL2LYyDwjfiqrKZQUMb4koSF4gaHkcW0tkXqf9D6X5bMr0y_Nr8bSq4EngFlH4uNRZiRL3r79sd65__iRh1EKfYNVIT0dbL4TabfhgLPJ09WjdGdMLtDf9XsmlXDPOCLc3woJ3etFlGLCyHldqYmNAjZ8ghkV-B-G2szFno84sthnfK-krP43YCVYwOUgoPRkUclTpHPG4zhhKbGRo2Q9HFAI5lBnxGwkm85TABbaih8mPfyPoW0J3jcZ8KXwRySiKyzCn1vXPmMwBbS8bpWmwLrA9MnOH23WsXvxnZ-q_XbjsqkcvVUeu2zfgGYZbAHpYPptQ9nzCAWowtzIWEzFMHK31x2d0X_j_UW4s01Nl2c39h-EoLA";

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