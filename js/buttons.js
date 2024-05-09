import { postRequest, deleteRequest, checkIfCocktailIsInDatabase } from "./fetch.js";

// Change button text to remove from favorites
const changeButtonText = (button, cocktail) => {
  return !checkIfCocktailIsInDatabase(cocktail) ? (button.textContent = "- REMOVE") : (button.textContent = "+ ADD");
};

// Create and Append Add to favorites button to Text Div

export const createAddDeleteButton = async (cocktail) => {
  const favoriteButton = document.createElement("button");
  console.log('helo wrold',cocktail);
  changeButtonText(favoriteButton, cocktail);
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
    let check = await checkIfCocktailIsInDatabase(cocktail);
    if (!check) {
      favoriteButton.textContent = "- REMOVE";
      await postRequest(cocktail);
    } else {
      favoriteButton.textContent = "+ ADD";
      await deleteRequest(cocktail.idDrink);
    }
  });

  return favoriteButton;
};
