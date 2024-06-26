import { postRequest, deleteRequest, checkIfCocktailIsInDatabase } from "./fetch.js";
import { mainUser } from "./user/user.js";
import { deleteRequestRecipe, postRequestRecipe } from "./user/user-recipes.js";

// Change button text to remove from favorites
const changeButtonText = async (button, cocktail, uuid) => {
  const isInDatabase = await checkIfCocktailIsInDatabase(cocktail, uuid);
  const result = isInDatabase ? (button.textContent = "- REMOVE") : (button.textContent = "+ ADD");
  return result;
};

// COCKTAIL CARD BUTTON
// Create and Append Add to favorites button to Text Div
export const createAddDeleteButton = async (cocktail) => {
  const uuid = await mainUser();

  //Is cocktail user created?
  const isUserCreated = (cocktail) => {
    const cocktailIdString = cocktail.idDrink.toString();
    return cocktailIdString.length > 8;
  };

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
      if (isUserCreated(cocktail)) {
        favoriteButton.textContent = "- REMOVE";
        await postRequestRecipe(cocktail);
      } else {
        favoriteButton.textContent = "- REMOVE";
        await postRequest(cocktail, uuid);
      }
    } else {
      if (isUserCreated(cocktail)) {
        favoriteButton.textContent = "+ ADD";
        await deleteRequestRecipe(cocktail.idDrink);
        // return
      } else {
        favoriteButton.textContent = "+ ADD";
        await deleteRequest(cocktail.idDrink, uuid);
      }
    }
  });

  return favoriteButton;
};
