import { cocktailCard } from './card.js';
import { fetchAllCocktails } from './fetch.js';


let cocktailsArray;

document.addEventListener('DOMContentLoaded', () => {
    fetchAllCocktails().then(cocktails => {
        cocktailsArray = cocktails;
        console.log(cocktailsArray);
        cocktailsArray.forEach(cocktail => {
            cocktailCard(cocktail);
        });
    });
});