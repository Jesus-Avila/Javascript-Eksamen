// Get username and password when user clicks register button
// Save username and password into an object key and value pair
// Check if username exists in database
// If user is already in database, alert user that they are already registered
// If user is not in database, alert user that they have been registered
// Post request to database to save user in database
// Toggle from register to login form when user is successfully registered

const url = 'https://crudapi.co.uk/api/v1/users';
const key = 'pPu6m4uZxwOEhzuZVof3qzlBMBPq6n4tmUGH2hw07F9ampygeQ';


// Get username and passqord when user clicks register button
// Save username and password into an object key and value pair
export const getUserInput = () => {
    const username = document.querySelector('#registerUsername').value;
    const password = document.querySelector('#registerPassword').value;

    let data = {
        username: username,
        password: password,
    }
    return data;
}


// Check if username exists in database
export const checkIfUserExist = async (username) => {
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
        let user = users.find(user => user.username === username);
        const userExists = user !== undefined;
        console.log('User exists', userExists);
        return userExists;
    } catch (error) {
        console.log(error);
    }
}

// // If user is already in database, alert user that they are already registered
// export const userExists = (username) => {
//     checkIfUserExist(username).then(user => {
//         if (user) {
//             alert('User already exists');
//         }
//     })
//     alert('User already exists');
// }


// // If user is not in database, alert user that they have been registered
// export const userRegistered = (username) => {
//     checkIfUserExist(username).then(user => {
//         if (!user) {
//             alert('User registered');
//         }
//     })
//     alert('User registered');
// }

// Post request to database to save user in database
export const postRequest = async (data) => {
    console.log('log from the postrequest new user', data);

    fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + key,
            },
            body: JSON.stringify([data]),
        }).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to add data');
            }
        })
    }

// Toggle from register to login form when user is successfully registered
export const toggleForm = () => {
    // const loginForm = document.querySelector('#login-form');
    // const registerForm = document.querySelector('#register-form');
    // loginForm.style.display('hidden');
    // registerForm.style.display('hidden');
    
    // Reload the page
    location.reload();                      ///// BETTER SOLUTION NEEDED
}


// Event listener for register button
const button = document.querySelector('#register-button');
// button.disabled = true;

button.addEventListener('click', async (e) => {

        e.preventDefault();
        console.log('Register Form Button clicked');

        
        // Get user input
        const data = getUserInput();
        // Check if user input is empty
        if (!data.username || !data.password) {
            alert('Please fill in all fields');
            return;
        }
        // Check if user is over 18 from checkbox in the form
        const checkbox = document.querySelector('#ageVerification');
           if (!checkbox.checked) {
             alert('You must be over 18 to register');
             return;
           }
        // Check if user exists
        const user = await checkIfUserExist(data.username);
        console.log(data);
        // If user exists, alert user that they are already registered, else alert user that they have been registered
        if (user) {
            alert('Registration failed');
        } else {
            alert('User registered');
            postRequest(data);
            toggleForm();
        }
});


 