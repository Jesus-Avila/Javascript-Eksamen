import { postRequest, deleteRequest, checkIfCocktailIsInDatabase } from "./fetch.js";
import { mainUser } from "./user/user.js";

// Change button text to remove from favorites
const changeButtonText = async (button, cocktail, uuid) => {
    const isInDatabase = await checkIfCocktailIsInDatabase(cocktail, uuid);
    const result = isInDatabase ? (button.textContent = "- REMOVE") : (button.textContent = "+ ADD");
    return result;
};

// // Get user from the session storage
// const getUser = () => {
//     const data = sessionStorage.getItem("user");
//     const user = JSON.parse(data);
//     return user;
// };

// Create and Append Add to favorites button to Text Div

export const createAddDeleteButton = async (cocktail) => {
  const uuid = await mainUser();
  // Create button
  const favoriteButton = document.createElement("button");
  changeButtonText(favoriteButton, cocktail, uuid);
  favoriteButton.style.cssText = `
  background-color: #e3cb90;
  color: #013b45;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  width: 70%;
  align-self: center;
  margin-top: 20px;
  max-width: 300px;`;
  
  favoriteButton.classList.add("favorite-button");
  favoriteButton.addEventListener("mouseover", () => {
    favoriteButton.style.backgroundColor = "#f2a154";
  });
  favoriteButton.addEventListener("mouseout", () => {
    favoriteButton.style.backgroundColor = "#e3cb90";
  });
  
  // Add to favorites button functionality
  favoriteButton.addEventListener("click", async (event) => {
    event.preventDefault();
    event.stopPropagation();
    let check = await checkIfCocktailIsInDatabase(cocktail, uuid);
    if (!check) {
      favoriteButton.textContent = "- REMOVE";
      await postRequest(cocktail, uuid);
    } else {
      favoriteButton.textContent = "+ ADD";
      await deleteRequest(cocktail.idDrink, uuid);
    }
  });

  return favoriteButton;
};
