import { getUuid } from "./user.js";

const addIngredientButton = document.querySelector('#addIngredient');
const ingredientList = document.querySelector('#ingredientList');
const form = document.querySelector('#cocktailForm');

let ingredientCounter = 1;

// Add ingredient to ul list
addIngredientButton.addEventListener('click', () => {
    const ingredientInput = document.querySelector('#ingredientInput');
    const ingredientText = ingredientInput.value;

    if (ingredientText) {
        const li = document.createElement('li');
        li.textContent = ingredientText;
        ingredientList.appendChild(li);
        ingredientInput.value = '';
    }
});

// Submit form to create a new cocktail
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get inputs from the form
    const formData = new FormData(form);
    const cocktailData = {};

    // Get values from form data
    formData.forEach((value, key) => {
        cocktailData[key] = value;
    });

    // Get ingredients from ul list
    const ingredients = [];
    const ingredientItems = ingredientList.querySelectorAll('li');
    ingredientItems.forEach((item) => {
        const ingredientName = item.textContent;
        const ingredientKey  = `strIngredient${ingredientCounter++}`;
        cocktailData[ingredientKey] = ingredientName;
        ingredients.push(ingredientName);
    });
    cocktailData.ingredients = ingredients;

    // Give the cocktail a unique id using the current date and time
    const date = new Date();
    const id = date.getTime();
    cocktailData.idDrink = id;


    // Empty all input fields and reset ingredient list, and counter
    form.reset();
    ingredientList.innerHTML = '';
    ingredientCounter = 1;

    // Post the cocktail data to the database
    postRequestRecipe(cocktailData);

    console.log('NewCocktail data', cocktailData);
});


// Post request to database to save user-create cocktail in database
// Creating a new endpoint for "user-created-cocktails" at user-${userUUID}-recipes
const postRequestRecipe = async (data) => {
    // i need user uuid to create the endpoint
    const userUUID = await getUuid();
    console.log("userUUID", userUUID);
    console.log("log from the postRequestRecipe", data);
    const url = `https://crudapi.co.uk/api/v1/user-${userUUID}-recipes`;
    const key = "pPu6m4uZxwOEhzuZVof3qzlBMBPq6n4tmUGH2hw07F9ampygeQ";
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + key,
            },
            body: JSON.stringify([data]),
        });
        if (response.ok) {
            const responseData = await response.json();
            console.log("Cocktail recipe added successfully:", responseData);
            return responseData;
        } else {
            throw new Error("Failed to add data");
        }
    } catch (error) {
        console.error("Error adding data:", error);
    }
}