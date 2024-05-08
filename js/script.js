// check if cocktail is in favorites list
// if it is, change button text to remove from favorites
// if not, change button text to add to favorites


import { cocktailCard } from './card.js';
import { fetchTenRandomCocktails } from './fetch.js';

let cocktailsArray;

addEventListener('DOMContentLoaded', () => {
    fetchTenRandomCocktails().then(cocktails => {
        cocktailsArray = cocktails;
        cocktailsArray.forEach(cocktail => {
            cocktailCard(cocktail);
        });
    });
});