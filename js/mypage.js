import { cocktailCard } from './card.js';
import { fetchAllCocktails } from './fetch.js';
import { mainUser } from './user/user.js';
// import { fetchAllUserCreatedCocktails } from './user/user-recipes.js';


let cocktailsArray;
const cocktailList = document.querySelector('.cocktail-list');

document.addEventListener('DOMContentLoaded', async () => {
    myFavorites();
});

// Fetch myFavorite cocktails
const myFavorites = async () => {
    const uuid = await mainUser();
    fetchAllCocktails(uuid).then(cocktails => {
        cocktailsArray = cocktails;
        cocktailsArray.forEach(cocktail => {
            cocktailCard(cocktail);
        });
    });
}

// Fetch myRecipe cocktails
const myRecipes = async () => {
    const uuid = await mainUser();
    fetchAllUserCreatedCocktails(uuid).then(cocktails => {
        cocktailsArray = cocktails;
        cocktailsArray.forEach(cocktail => {
            cocktailCard(cocktail);
        });
    });
}


// Buttons to change the filter
const showFavorites = document.querySelector('#my-favorites');
const showRecipes = document.querySelector('#my-recipes');

showFavorites.addEventListener('click', async () => {
    cocktailList.innerHTML = '';
    myFavorites();
});

showRecipes.addEventListener('click', async () => {
    cocktailList.innerHTML = '';
    myRecipes();
});


const fetchAllUserCreatedCocktails = async (uuid) => {
    const userEndpoint = 'https://crudapi.co.uk/api/v1/user-';
    const key = 'pPu6m4uZxwOEhzuZVof3qzlBMBPq6n4tmUGH2hw07F9ampygeQ';
    try {
        const response = await fetch(`${userEndpoint}${uuid}-recipes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + key,
            },
        });
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const responseData = await response.json();
        console.log("fetchAllUserCreatedCocktails", responseData.items);
        return responseData.items;
    } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
    }
}


