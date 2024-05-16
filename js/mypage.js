import { cocktailCard } from "./card.js";
import { fetchAllCocktails } from "./fetch.js";
import { mainUser } from "./user/user.js";
import { fetchAllUserCreatedCocktails } from "./user/user-recipes.js";

let cocktailsArray;
const cocktailList = document.querySelector(".cocktail-list");

document.addEventListener("DOMContentLoaded", async () => {
  myFavorites();
});

// Fetch myFavorite cocktails
const myFavorites = async () => {
  const uuid = await mainUser();
  fetchAllCocktails(uuid).then((cocktails) => {
    cocktailsArray = cocktails;
    cocktailsArray.forEach((cocktail) => {
      cocktailCard(cocktail);
    });
  });
};

// Fetch myRecipe cocktails
const myRecipes = async () => {
  const uuid = await mainUser();
  fetchAllUserCreatedCocktails(uuid).then((cocktails) => {
    cocktailsArray = cocktails;
    cocktailsArray.forEach((cocktail) => {
      cocktailCard(cocktail);
    });
  });
};

// Buttons to change the filter
const showFavorites = document.querySelector("#my-favorites");
const showRecipes = document.querySelector("#my-recipes");

showFavorites.addEventListener("click", async () => {
  cocktailList.innerHTML = "";
  myFavorites();
});

showRecipes.addEventListener("click", async () => {
  cocktailList.innerHTML = "";
  myRecipes();
});
