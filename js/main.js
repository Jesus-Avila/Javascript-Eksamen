import { cocktailCard } from "./card.js";
import { fetchTenRandomCocktails, fetchRandomCocktail } from "./api.js";

let cocktailsArray = [];
let selectedFilter = null;

// Fetch 10 more random cocktails
// Append the new cocktails cocktail-list in the DOM
const fetchMoreCocktails = async () => {
  let newArray = [];
  console.log("Selected filter", selectedFilter);
  if (!selectedFilter) {
    newArray = await fetchTenRandomCocktails();
  } else {
    const category = selectedFilter;
    newArray = await fetchTenCocktailsByCategory(category);
  }

  const existingCocktails = JSON.parse(sessionStorage.getItem("cocktails")) || [];
  const updateCocktails = existingCocktails.concat(newArray);
  // Save array in sessionStorage in addition to the current array
  sessionStorage.setItem("cocktails", JSON.stringify(updateCocktails));
  newArray.forEach((cocktail) => {
    cocktailCard(cocktail);
  });
};

// Fetch 10 random cocktails and return them until the array has 10 cocktails in it and they are of specific category
const fetchTenCocktailsByCategory = async (category) => {
  const cocktails = [];
  let requestCounter = 0;
  const maxRequests = 60;
  while (cocktails.length < 10  && requestCounter < maxRequests) {
    const cocktail = await fetchRandomCocktail();
    if (cocktail.strCategory === category) {
      // Save cocktail in cocktails array
      cocktails.push(cocktail);
    }
    requestCounter++;
  }
  console.log('Cocktails found by category', cocktails);
  return (cocktails);
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

// "All" filter button
const allButton = document.querySelector("#all-cocktails-filter");
allButton.addEventListener("click", async () => {
  console.log("All cocktails button clicked");
  const array = JSON.parse(sessionStorage.getItem("cocktails"));
  console.log("All cocktails array", array);
  updateCocktailList(array);
});

// Filter buttons
const filterButtons = document.querySelectorAll(".filter-button");
filterButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    const filter = button.textContent;
    console.log("Filter button clicked", filter);

    selectedFilter = filter;
    filterButtons.forEach((btn) => btn.classList.remove("selected"));
    button.classList.add("selected");
    console.log("Selected filter", selectedFilter);

    let filteredCocktails = [];
    let array = JSON.parse(sessionStorage.getItem("cocktails"));

    if (selectedFilter === "All") {
      selectedFilter = null;
      updateCocktailList(cocktails);
    } else {
      filteredCocktails = array.filter((cocktail) => cocktail.strCategory === filter);
      console.log("array of arrays", filteredCocktails);
      updateCocktailList(filteredCocktails);
    }
  });
});

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
