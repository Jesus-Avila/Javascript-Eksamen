
// Fetch users from the database
// Get username from input field
// Get password from input field
// Make an object that user is logged in session storage
// Check if user is in database
// Check if password matches user
// Send user to main page if login is successful
// Show error message if login is unsuccessful
// 
// Fetch user from the database
// Fetch user's favorite cocktail from database
// 

// crudapi key for cocktails pPu6m4uZxwOEhzuZVof3qzlBMBPq6n4tmUGH2hw07F9ampygeQ
const url = 'https://crudapi.co.uk/api/v1/users';
const key = 'pPu6m4uZxwOEhzuZVof3qzlBMBPq6n4tmUGH2hw07F9ampygeQ';


// Fetch users from the database
export const getUsers = async () => {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + key,
            },
        })
        const data = await response.json();
        let users = data.items;

        console.log('List of users', users);
        return users;
    } catch (error) {
        console.log(error);
    }
};


// User input validation
export const getUserInput = () => {
    const username = document.querySelector('#loginUsername').value;
    const password = document.querySelector('#loginPassword').value;

    let data = {
        username: username,
        password: password,
    }
    return data;
}

// const button = document.querySelector('#login-button');
// button.addEventListener('click', async (e) => {
//     e.preventDefault();
//     console.log('Button clicked');
// })

// // Event listener for login button
export const loginButton = () => {
    const button = document.querySelector('#login-button');
    button.addEventListener('click', async (e) => {
        e.preventDefault();
        console.log('Button clicked');
        const data = getUserInput();
        const user = await checkUser(data.username);
        console.log(data);
        if (user) {
            const password = checkPassword(user, data.password);
            if (password) {
                setSession(user);
                sendToMain();
            } else {
                alert('Wrong password');
            }
        } else {
            alert('User not found');
        }
    })
}

// Make object with username and password from user
export const getUser = (username, password) => {
    const user = {
        username: username,
        password: password,
    }
    return user;
}

// Check if user is in database
export const checkUser = async (username) => {
    const users = await getUsers();
    const user = users.find(user => user.username === username);
    return user;
}

// If user is in database, check if password matches user
export const checkPassword = (user, password) => {
    if (user.password === password) {
        return true;
    } else {
        return false;
    }
}

// Make an object that user is logged in session storage
export const setSession = (user) => {
    sessionStorage.setItem('user', JSON.stringify(user));
}

// Send user to main page if login is successful
export const sendToMain = () => {
    window.location.href = 'main.html';
}

// Empty session storage
export const clearSessionStorage = () => {
    sessionStorage.clear();
}

document.addEventListener('DOMContentLoaded', () => {
    pageState();
    loginButton();
    clearSessionStorage();
})

// Function to toggle between login and registration sections
const pageState = () => {
    const loginSection = document.querySelector('.login-section');
    const registrationSection = document.querySelector('.registration-section');
    const registerLink = document.querySelector('#register-link');
    const loginLink = document.querySelector('#login-link');

    // Hide the registration section initially
    registrationSection.style.display = 'none';
    loginLink.parentElement.style.display = 'none';

   // Event listener for the "Register" link
   registerLink.addEventListener('click', (event) => {
    event.preventDefault();
    // Toggle the visibility of the login and registration sections
    loginSection.style.display = 'none';
    registrationSection.style.display = 'block';
    // Hide the login link and show the registration link
    registerLink.parentElement.style.display = 'none';
    loginLink.parentElement.style.display = 'block';
});

// Event listener for the "Login" link
loginLink.addEventListener('click', (event) => {
    event.preventDefault();
    // Toggle the visibility of the login and registration sections
    registrationSection.style.display = 'none';
    loginSection.style.display = 'block';
    // Hide the registration link and show the login link
    registerLink.parentElement.style.display = 'block';
    loginLink.parentElement.style.display = 'none';
});
};
