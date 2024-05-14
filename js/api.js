// Fetch data from API
export const fetchRandomCocktail = async () => {
    try {
        const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
        const data = await response.json();
        let randomCocktail = data.drinks[0];

          // Remove properties with null values
          randomCocktail = Object.fromEntries(
            Object.entries(randomCocktail).filter(([key, value]) => value !== null)
        );

        return randomCocktail;
    } catch (error) {
        console.log(error);
    }
}

// Function to fetch ten random cocktails and put them inside an array
export const fetchTenRandomCocktails = async () => {
    const cocktails = [];
    for (let i = 0; i < 10; i++) {
        const cocktail = await fetchRandomCocktail();
        cocktails.push(cocktail);
    }
    return cocktails;
}

// Fetch data for a specific cocktail using the ID
export const fetchSpecificCocktail = async (id) => {
    try {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
        const data = await response.json();
        const cocktail = data.drinks[0];
        console.log('Specific cocktail fetched from API', cocktail);
        return cocktail;
    } catch (error) {
        console.log(error);
    }
}
