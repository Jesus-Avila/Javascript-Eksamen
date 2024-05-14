import { cocktailCard } from "./card.js";
import { fetchTenRandomCocktails } from "./api.js";

let cocktailsArray = [];


// Fetch 10 more random cocktails
// Append the new cocktails cocktail-list in the DOM
const fetchMoreCocktails = async () => {
  let newArray = [];
  fetchTenRandomCocktails().then((cocktails) => {
    newArray = cocktails;
    const existingCocktails = JSON.parse(sessionStorage.getItem("cocktails")) || [];
    const updateCocktails = existingCocktails.concat(newArray);
    // Save array in sessionStorage in addition to the current array
    sessionStorage.setItem("cocktails", JSON.stringify(updateCocktails));
    newArray.forEach((cocktail) => {
      cocktailCard(cocktail);
    });
  });
};

document.addEventListener("DOMContentLoaded", async () => {
  fetchTenRandomCocktails().then((cocktails) => {
    cocktailsArray = cocktails;
    // Save array in sessionStorage
    sessionStorage.setItem("cocktails", JSON.stringify(cocktailsArray));
    console.log("Cocktails array", cocktailsArray);
    cocktailsArray.forEach((cocktail) => {
      cocktailCard(cocktail);
    });
  });
});

// Filter buttons
const filterButtons = document.querySelectorAll(".filter-button");
filterButtons.forEach((button) => {
    button.addEventListener("click", async () => {

        const filter = button.textContent;
        let filteredCocktails = [];
        console.log("Filter button clicked", filter);
        let array = JSON.parse(sessionStorage.getItem("cocktails"));
        // Filter cocktails from sessionStorage and update the cocktail list
        filteredCocktails = array.filter((cocktail) => cocktail.strCategory === filter);
        console.log('array of arrays', filteredCocktails);
        // filteredCocktails = await fetchTenCocktailsByCategory(filter);
        updateCocktailList(filteredCocktails);
    });
})

// Update cocktail list in the DOM
const updateCocktailList = (cocktails) => {
    const cocktailList = document.querySelector(".cocktail-list");
    // Clear current cocktail list
    cocktailList.innerHTML = "";
    // Append new cocktails
    cocktails.forEach((cocktail) => {
      cocktailCard(cocktail);
    });
  };

// Load more button
const loadMoreButton = document.querySelector("#load-more");
loadMoreButton.addEventListener("click", async () => {
  console.log("Load more button clicked");
  fetchMoreCocktails();
});
