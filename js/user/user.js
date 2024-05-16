// Check if there is a user object in session storage
const userInSessionStorage = () => {
  const data = sessionStorage.getItem("user");
  const user = JSON.parse(data);
  return user;
};

// Get user uuid from session storage
export const getUuid = () => {
  const user = userInSessionStorage();
  return user._uuid;
};

// Main function to run on page load
export const mainUser = async () => {
  const userUUID = await getUuid();
  return userUUID;
};
