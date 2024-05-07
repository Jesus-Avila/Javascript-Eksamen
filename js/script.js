// Fecth cocktails data from the API
// Console log the data to check if it is working
// use async function to do so
// use try catch block to catch any errors
// create the card for each cocktail
// display the card on the page
// do it again for the next 5 cocktails
// use the data from the API to display the image, name, and id of the cocktail

import { cocktailCard } from './card.js';
import { fetchTenRandomCocktails, fetchRandomCocktail } from './fetch.js';

let cocktailsArray;

addEventListener('DOMContentLoaded', () => {
    fetchTenRandomCocktails().then(cocktails => {
        cocktailsArray = cocktails;
        cocktailsArray.forEach(cocktail => {
            cocktailCard(cocktail);
        });
    });
});