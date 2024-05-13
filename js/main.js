import { cocktailCard } from './card.js';
import { fetchTenRandomCocktails } from './fetch.js';

let cocktailsArray = [];

const fetchCocktailsByFilter = async (filter) => {
    try {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?${filter}`);
        const data = await response.json();
        return data.drinks;
    } catch (error) {
        console.error(error);
    }
}

// Fetch 10 more random cocktails
// Append the new cocktails cocktail-list in the DOM
const fetchMoreCocktails = async () => {
    let newArray;
    fetchTenRandomCocktails().then(cocktails => {
        newArray = cocktails;
        newArray.forEach(cocktail => {
            cocktailCard(cocktail);
        });
    });
}


document.addEventListener('DOMContentLoaded', async () => {
   
    fetchTenRandomCocktails().then(cocktails => {
        cocktailsArray = cocktails;
        console.log('Cocktails array', cocktailsArray);
        // Save cocktailsArrya to session storage
        // sessionStorage.setItem('cocktails', JSON.stringify(cocktailsArray));
        cocktailsArray.forEach(cocktail => {
            cocktailCard(cocktail);
        });
    });
});



// Load more button
const loadMoreButton = document.querySelector('#load-more');
loadMoreButton.addEventListener('click', async () => {
    console.log('Load more button clicked');
    fetchMoreCocktails();
});


