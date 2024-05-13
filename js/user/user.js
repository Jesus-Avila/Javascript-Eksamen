// Check if there is a user object in session storage
// If there is check if it exists in database
// If it does not exist, remove it from session storage and send user to login page
// Get user uuid from session storage

import { getUsers } from '../validation/login.js';

// Check if there is a user object in session storage
const userInSessionStorage = () => {
    const data = sessionStorage.getItem('user');
    const user = JSON.parse(data);
    return user;
};

// Get user uuid from session storage
const getUuid = () => {
    const user = userInSessionStorage();
    return user._uuid;
}

// If there is check if it exists in database
const checkUser = async (username) => {
    const users = await getUsers();
    const user = users.find(user => user.username === username);
    const userExists = user !== undefined;
    return userExists;
}

// If it does not exist, remove it from session storage and send user to login page
const pageState = async () => {
    if (userInSessionStorage()) {
        const user = JSON.parse(userInSessionStorage());
        const userExists = await checkUser(user.username);
        if (!userExists) {
            sessionStorage.clear();
            window.location.href = 'index.html';
        }
    }
}


// Main function to run on page load
export const mainUser = async () => {
    const userUUID = await getUuid();
    return userUUID;
}