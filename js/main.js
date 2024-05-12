import { cocktailCard } from './card.js';
import { fetchTenRandomCocktails } from './fetch.js';
import { mainUser } from './user/user.js';

let cocktailsArray;

document.addEventListener('DOMContentLoaded', () => {
    fetchTenRandomCocktails().then(cocktails => {
        cocktailsArray = cocktails;
        cocktailsArray.forEach(cocktail => {
            cocktailCard(cocktail);
        });
    });
    mainUser();
}); 