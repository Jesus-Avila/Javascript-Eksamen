import { cocktailCard } from './card.js';
import { fetchTenRandomCocktails } from './fetch.js';

let cocktailsArray;

document.addEventListener('DOMContentLoaded', async () => {
    fetchTenRandomCocktails().then(cocktails => {
        cocktailsArray = cocktails;
        cocktailsArray.forEach(cocktail => {
            cocktailCard(cocktail);
        });
    });
}); 