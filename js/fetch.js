

// crudapi key for cocktails pPu6m4uZxwOEhzuZVof3qzlBMBPq6n4tmUGH2hw07F9ampygeQ


// POST request to add a new cocktail to the database
const url = 'https://crudapi.co.uk/api/v1/cocktails';
const key = 'pPu6m4uZxwOEhzuZVof3qzlBMBPq6n4tmUGH2hw07F9ampygeQ';

export const postRequest = async (data, uuid) => {
    const link = 'https://crudapi.co.uk/api/v1/user-';
    try {
        const response = await fetch(`${link}${uuid}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'BEARER ' + key
            },
            body: JSON.stringify([data])
        });
        if (response.ok) {
            const responseData = await response.json();
            console.log('Cocktail added successfully:', responseData);
            return responseData;
        } else {
            throw new Error('Failed to add data');
        }
    } catch (error) {
        console.error('Error adding data:', error);
    }
};

// Delete request to remove a cocktail from the database
export const deleteRequest = async (id, uuid) => {
    const drinkUUID = await fetchUUID(id, uuid);
    const link = `https://crudapi.co.uk/api/v1/user-${uuid}`;
    try {
        const response = await fetch(`${link}/${drinkUUID}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + key,
            },
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        console.log('Cocktail deleted successfully');
    } catch (error) {
            console.error('There was a problem', error);
    }
};



// Get request to retrieve all cocktails from the database
export const fetchAllCocktails = async (uuid) => {
    const userEndpoint = 'https://crudapi.co.uk/api/v1/user-';
    try {
        const response = await fetch(`${userEndpoint}${uuid}`, {
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
        console.log("fetchAllCocktails", responseData.items);
        return responseData.items;
    } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
    }
};

// Find uuid of specific cocktail in the database by its idDrink, RETURNS cocktail object matching the idDrink
const findCocktail = async (cocktailList, idDrink) => {
    const data = cocktailList;
    const cocktail = data.find(item => item.idDrink == idDrink);
    return cocktail;
}

// Fetch uuid of specific cocktail in the database by its idDrink
const fetchUUID = async (id, userUUID) => {
    const cocktailList = await fetchAllCocktails(userUUID);
    console.log('fetchUUID', cocktailList, id);
    const cocktail = await findCocktail(cocktailList, id);
    if (!cocktail) {
        console.log(`Cocktail with id ${id} not found in database`);
        return;
    }
    return cocktail._uuid;
}

// Check if cocktail is in database
export const checkIfCocktailIsInDatabase = async (cocktail, uuid) => {
    const cocktailList = await fetchAllCocktails(uuid);
    return cocktailList.some(item => item.idDrink === cocktail.idDrink);
}

// Get request to retrieve a specific cocktail from the database using its ID 
// const getSpecificRequest = async (id) => {
//     try {
//         const cocktailList = await fetchAllCocktails();
        
//         const response = await fetch(`${url}/${id}`, {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Authorization": "Bearer " + key,
//             },
//         });
//         if (!response.ok) {
//             throw new Error("Network response was not ok");
//         }
        
//         const responseData = await response.json();
//         console.log("GET from Crud API", responseData.items);
//         return responseData;
//     } catch (error) {
//         console.error("There was a problem with the fetch operation:", error);
//     }
// };


