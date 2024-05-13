import { cocktailCard } from './card.js';
import { fetchAllCocktails } from './fetch.js';
import { mainUser } from './user/user.js';


let cocktailsArray;

document.addEventListener('DOMContentLoaded', async () => {
    const uuid = await mainUser();
    fetchAllCocktails(uuid).then(cocktails => {
        cocktailsArray = cocktails;
        cocktailsArray.forEach(cocktail => {
            cocktailCard(cocktail);
        });
    });
});