import { getUuid } from "./user.js";
import { findCocktail } from "../fetch.js";

const addIngredientButton = document.querySelector('#addIngredient');
const ingredientList = document.querySelector('#ingredientList');
const form = document.querySelector('#cocktailForm');

let ingredientCounter = 1;

document.addEventListener('DOMContentLoaded', async () => {
    addIngredientAndFormEventListeners();

    const query = window.location.search;
    const urlParams = new URLSearchParams(query);
    const recipeId = urlParams.get('id');
    if (recipeId) {
        const recipe = await fetchSpecificUserCreatedCocktail(recipeId);
        if (recipe) {
            populateForm(recipe);
        } else {
            console.log('Recipe not found');
        }
    }
});

// Add event listener to add ingredient and form buttons
const addIngredientAndFormEventListeners = () => {
    if (addIngredientButton && form){
        addEventLstenerToAddIngredientButton();
        addEventLstenerToForm();
    }
    else {
        console.log('addIngredientButton or Form not found in the DOM');
    }
}

// Add ingredient to ul list
// Add event listener to add ingredient button
const addEventLstenerToAddIngredientButton = () => {
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

}

// Submit form to create a new cocktail
// Add event listener to form
const addEventLstenerToForm = () => {
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

        // Give the cocktail a default image
        cocktailData.strDrinkThumb = 'https://via.placeholder.com/300';


        // Empty all input fields and reset ingredient list, and counter
        form.reset();
        ingredientList.innerHTML = '';
        ingredientCounter = 1;

        // Post the cocktail data to the database
        await postRequestRecipe(cocktailData);
        
        // Send user to mypage
        window.location.href = "mypage.html";
    });
}


const key = 'pPu6m4uZxwOEhzuZVof3qzlBMBPq6n4tmUGH2hw07F9ampygeQ';

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



// Get request to retrieve all user-created cocktails from the database
export const fetchAllUserCreatedCocktails = async (uuid) => {
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

// Get request to retreive specific user created cocktail
export const fetchSpecificUserCreatedCocktail = async (idDrink) => {
    console.log('hello world');
    const userUUID = await getUuid();
    const drinkUUId = await fetchUUID(idDrink, userUUID);
    console.log('userUUID', userUUID, 'drinkUUId', drinkUUId);
    const link = `https://crudapi.co.uk/api/v1/user-${userUUID}-recipes/${drinkUUId}`;
    try {
        const response = await fetch(link, {
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
        console.log("fetchUserCreatedCocktail", responseData);
        return responseData;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}


// Fetch uuid of the user created cocktail
const fetchUUID = async (idDrink, uuid) => {
    const cocktialsList = await fetchAllUserCreatedCocktails(uuid);
    console.log('user created cocktails and idDrink', cocktialsList, idDrink);
    const cocktial = await findCocktail(cocktialsList, idDrink);
    if (!cocktial) {
        console.log(`Cocktail with id ${idDrink} not found in database`);
        return;
    }
    console.log('uuid of the user created cocktail', cocktial._uuid);
    return cocktial._uuid;
}



