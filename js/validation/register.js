import { getUsers, checkUser } from "./login.js";

const url = "https://crudapi.co.uk/api/v1/users";
const key = "pPu6m4uZxwOEhzuZVof3qzlBMBPq6n4tmUGH2hw07F9ampygeQ";

// Get username and passqord when user clicks register button
// Save username and password into an object key and value pair
export const getUserInput = () => {
  const username = document.querySelector("#registerUsername").value;
  const password = document.querySelector("#registerPassword").value;

  let data = {
    username: username,
    password: password,
  };
  return data;
};

// Check if username exists in database
export const checkIfUserExist = async (username) => {
  try {
    const user = await checkUser(username);
    const userExists = user !== undefined;
    return userExists;
  } catch (error) {
    console.log(error);
  }
};

// Post request to database to save user in database
export const postRequest = async (data) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + key,
      },
      body: JSON.stringify([data]),
    });
    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      throw new Error("Failed to add data");
    }
  } catch (error) {
    console.error("Error adding data:", error);
  }
};

// Get UUID from user object using username
export const getUuid = async (username) => {
  const users = await getUsers();
  const user = users.find((user) => user.username === username);
  const userUUID = user._uuid;
  return userUUID;
};

// Toggle from register to login form when user is successfully registered
export const toggleForm = () => {
  location.reload();
};

// Event listener for register button
const button = document.querySelector("#register-button");

button.addEventListener("click", async (e) => {
  e.preventDefault();

  // Get user input
  const data = getUserInput();

  // Check if user input is empty
  if (!data.username || !data.password) {
    alert("Please fill in all fields");
    return;
  }

  // Check if user is over 18 from checkbox in the form
  const checkbox = document.querySelector("#ageVerification");
  if (!checkbox.checked) {
    alert("You must be over 18 to register");
    return;
  }

  // Check if user exists
  const user = await checkIfUserExist(data.username);

  // If user exists, alert user that they are already registered, else alert user that they have been registered
  if (user) {
    alert("Registration failed");
  } else {
    // Make POST request to add user to database
    await postRequest(data);
    alert("User registered");
    // Reload the page to go back to login form
    toggleForm();
  }
});
