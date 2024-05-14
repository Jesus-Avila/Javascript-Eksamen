import { cocktailCard } from "./card.js";
import { fetchTenRandomCocktails, fetchRandomCocktail } from "./api.js";

let cocktailsArray = [];

// const fetchCocktailsByFilter = async (filter) => {
//   try {
//     const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?${filter}`);
//     const data = await response.json();
//     return data.drinks;
//   } catch (error) {
//     console.error(error);
//   }
// };

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
        console.log('array of arrays', cocktailsArray);
        // filteredCocktails = await fetchTenCocktailsByCategory(filter);
        // updateCocktailList(filteredCocktails);
    });
})

// Fetch cocktails by category
// const fetchCocktailsByCategory = async (filter) => {
//     const link = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?";
//     try {
//       const response = await fetch(`${link}${filter}`);
//       const data = await response.json();
//       return data.drinks;
//     } catch (error) {
//       console.error(error);
//       return [];
//     }
//   };

  // Fetch cocktails by category making a function that fetches cocktails and looks through its properties if specific category is found and returns the cocktail, else returns nothing
  const fetchByCategory = async (category) => {
    const cocktail = await fetchRandomCocktail();
    if (cocktail.strCategory === category) {
      return cocktail;
    } else {
        return;
    }
  }

  // While the length of the array is less than 10, keep fetching cocktails by category until 10 cocktails are found
    const fetchTenCocktailsByCategory = async (category) => {
        cocktailsArray = [];
        while (cocktailsArray.length < 10) {
            const cocktail = await fetchByCategory(category);
            if (cocktail) {
                cocktailsArray.push(cocktail);
            } else {

            }
                
        }
    }


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
