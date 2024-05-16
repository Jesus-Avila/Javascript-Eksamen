import { createAddDeleteButton } from "./buttons.js";

const cocktailsList = document.querySelector(".cocktail-list");

// Create index card for each cocktail
export const cocktailCard = async (cocktail) => {
  // let favorite
  const image = cocktail.strDrinkThumb;

  // Create Card div
  const card = document.createElement("div");
  card.classList.add("cocktail-card");
  card.style.cssText = `
    width: 350px;
    background-color: #013b45;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 20px 40px 20px;
    border: 7px solid #e3cb90;`;
  // #f2a154

  // Create Image
  const img = document.createElement("img");
  img.src = image;
  img.style.cssText = `
    width: 100%;
    object-fit: cover;
    margin-bottom: 20px;`;

  // Append Image to Card
  card.appendChild(img);

  // Append Card to List
  cocktailsList.appendChild(card);

  // Create and Append Text Div(Bottom Div)
  const textDiv = document.createElement("div");
  textDiv.style.cssText = `
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    justify-content: space-between;`;
  card.appendChild(textDiv);

  // Create div for only the text(separate from the button)
  const infoDiv = document.createElement("div");

  // Create and Append Name to infoDiv
  const name = document.createElement("h3");
  name.textContent = cocktail.strDrink;
  name.style.cssText = `
    color: #e3cb90;
    margin-bottom: 10px;
    font-size: 2rem;`;
  infoDiv.appendChild(name);

  // Create and Append Category to infDiv
  const category = document.createElement("p");
  category.textContent = cocktail.strCategory;
  category.style.cssText = `
    color: white;
    margin-bottom: 10px;
    font-size: 1.2rem;`;
  infoDiv.appendChild(category);

  // Append infoDiv to Text Div
  textDiv.appendChild(infoDiv);

  // Create and Append Add to favorites button to Text Div
  const button = await createAddDeleteButton(cocktail);
  textDiv.appendChild(button);

  // Add pointer effect to card
  card.style.cursor = "pointer";
  card.addEventListener("mouseover", () => {
    card.style.border = "7px solid #f2a154";
    name.style.color = "#f2a154";
  });
  card.addEventListener("mouseout", () => {
    card.style.border = "7px solid #e3cb90";
    name.style.color = "#e3cb90";
  });

  card.addEventListener("click", () => {
    // Navigate to the info page with the cocktail ID
    window.location.href = `/cocktail.html?id=${cocktail.idDrink}`;
  });
};
