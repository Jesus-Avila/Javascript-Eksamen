import { fetchSpecificCocktail } from './api.js';
import { createAddDeleteButton } from './buttons.js';
import { fetchSpecificUserCreatedCocktail } from './user/user-recipes.js';


// Get the cocktail data from the API using the ID
document.addEventListener('DOMContentLoaded', async () => {
    // Get the cocktail ID from the URL
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const cocktailID = parseInt(urlParams.get('id'));
    const cocktailIDString = cocktailID.toString();
    const cocktailIDLength = cocktailIDString.length;

    // Handle the case where the cocktail is from the user's created recipes
    let cocktail;
    if (cocktailIDLength < 8) {
        console.log('Specific cocktail fetched from API', cocktail);
        cocktail = await fetchSpecificCocktail(cocktailID);
    } else {
        console.log('Specific user created cocktail fetched from API', cocktail);
        cocktail = await fetchSpecificUserCreatedCocktail(cocktailID);
    }
    changeCocktailInfo(cocktail);
})

// Change information on the page based on the cocktail data
const changeCocktailInfo = async (cocktail) => {
    console.log('cocktail', cocktail);
    // Get the elements from the HTML
    const cocktailName = document.querySelector('#cocktail-name');
    const cocktailGlass = document.querySelector('#glass-type');
    const cocktailIngredients = document.querySelector('.cocktail-ingredients-list');
    const cocktailImageDiv = document.querySelector('.cocktail-image-container');
    const cocktailInstructions = document.querySelector('.cocktail-instructions-text');
    const buttonContainer = document.querySelector('.button-container');


    // Change the text content of the elements
    cocktailName.textContent = cocktail.strDrink;
    cocktailGlass.textContent = cocktail.strGlass;


    // Create an array of ingredients and measurements
    const ingredients = [];
    for (let i = 1; i <= 15; i++) {
        const ingredient = cocktail[`strIngredient${i}`];
        const measurement = cocktail[`strMeasure${i}`];
        if (ingredient) {
            const ingredientText = measurement ? `${ingredient}${measurement}` : ingredient;
            ingredients.push(ingredientText);
        }
    }

    // append the ingredients to the list
    ingredients.forEach(ingredient => {
        const li = document.createElement('li');
        li.textContent = ingredient;
        cocktailIngredients.appendChild(li);
    });

    // Change the image of the cocktail if there is no strDrinkThumb in the object
    // if (!cocktail.strDrinkThumb) {
    //     cocktail.strDrinkThumb = 'https://via.placeholder.com/300';
    // }

    const cocktailImage = document.createElement('img');
    cocktailImage.src = cocktail.strDrinkThumb;
    cocktailImage.alt = cocktail.strDrink;
    cocktailImage.style.cssText = `
    width: 100%;`;
    cocktailImageDiv.appendChild(cocktailImage);

    // Change the instructions
    cocktailInstructions.textContent = cocktail.strInstructions;

    // Create the add to favorites button
    const button = await createAddDeleteButton(cocktail);
    buttonContainer.appendChild(button);
}

const backButton = document.querySelector('.chevron-container');
backButton.addEventListener('click', () => {
    window.history.back();
});