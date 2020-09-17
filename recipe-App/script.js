const recipesElement = document.getElementById("recipes");
const favContainer = document.getElementById("fav-recipes");
const searchWord = document.getElementById("search-word");
const searchButton = document.getElementById("search");
const recipePopup = document.getElementById("recipe-popup");
const recipeInfo = document.getElementById("recipe-info");
const closePopupButton = document.getElementById("close-popup");

getRandomRecipe();
getFavRecipes();

async function getRandomRecipe(){
   const recipeLink = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
   const recipeData = await recipeLink.json();
   const randomRecipe = recipeData.meals[0];

   console.log(randomRecipe);

   addRecipe(randomRecipe, true);
}

async function getRecipeById(id){
    const recipeLink = await fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i="+id);
    const recipeData = await recipeLink.json();
    const recipe = recipeData.meals[0];

    return recipe; 

}

async function getRecipeBySearch(search){
   const searchedRecipe = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s="+search);
   const recipeData = await searchedRecipe.json();
   const recipes = recipeData.meals;

   return recipes;
}

// shows a recipe
function addRecipe(recipeData, random = false){
    const recipe = document.createElement('div');
    recipe.classList.add("recipe");
    
    recipe.innerHTML = `<div class="recipe">
    <div class="recipe-header">
        ${random ? `<span class="random">
        Random Recipe
    </span>` : ""}
        <img src="${recipeData.strMealThumb}" alt="${recipeData.strMeal}"/>
    </div>
    <div class="recipe-body">
        <h4>${recipeData.strMeal}</h4>
        <button class="favorite-btn">
            <i class="fas fa-heart"></i>
        </button>
    </div>`;

    const favButton = recipe.querySelector('.recipe-body .favorite-btn');

    favButton.addEventListener('click',
    () => {
        if(favButton.classList.contains("active")){
            deleteRecipe(recipeData.idMeal);
            favButton.classList.remove("active");
        } else {
            saveRecipe(recipeData.idMeal);
            favButton.classList.add("active");
        }
        
        getFavRecipes();
    });

    recipes.appendChild(recipe);

    recipe.addEventListener('click', () => {
        getRecipeInfo(recipeData);
    });

}


function saveRecipe(recipeId) {
    const recipeIds = loadSavedRecipe();

    localStorage.setItem("recipeIds", JSON.stringify([...recipeIds, recipeId]));

}


function deleteRecipe(recipeId){
    const recipeIds = loadSavedRecipe();

    localStorage.setItem("recipeIds", JSON.stringify(recipeIds.filter(id => id !== recipeId )));

}

function loadSavedRecipe(){
    
    const recipeIds = JSON.parse(localStorage.getItem("recipeIds"));

    return recipeIds === null ? [] : recipeIds;
}

async function getFavRecipes(){
    favContainer.innerHTML = "";
    const recipeIds = loadSavedRecipe();
    for(let i=0; i<recipeIds.length; i++){
        const recipeId = recipeIds[i];

        recipe = await getRecipeById(recipeId);

        addRecipeToFav(recipe);
    }
}

function addRecipeToFav(recipeData){
    const favRecipe = document.createElement('li');

    favRecipe.innerHTML = `<li>
    <img src="${recipeData.strMealThumb}" alt="${recipeData.strMeal}">
    <span>${recipeData.strMeal}</span>
    </li>
    <button class="clear"><i class="fas fa-times-circle"></i></button>
    `;

    const button = favRecipe.querySelector(".clear");
    button.addEventListener('click', () => {
        deleteRecipe(recipeData.idMeal);
        getFavRecipes();

    });

    favRecipe.addEventListener('click', () => {
        getRecipeInfo(recipeData);
    });

    favContainer.appendChild(favRecipe);
}

function getRecipeInfo(recipeData){
    // clear
    recipeInfo.innerHTML="";
    // update
    const recipeElement = document.createElement('div');

    // list of ingredients

    const ingredients = [];
    for (let i=1; i<=20; i++){
        if(recipeData['strIngredient'+i]){
            ingredients.push(`${recipeData['strIngredient'+i]} - ${recipeData['strMeasure'+i]}`)
        } else{
            break;
        }
    }

    recipeElement.innerHTML = `
        <h1>${recipeData.strMeal}</h1>
        <img src="${recipeData.strMealThumb}" alt=""/>
        <p>${recipeData.strInstructions}</p>
        <h3>Ingredients</h3>
        <ul>
            ${ingredients.map((ing) => `<li>${ing}</li>`).join("")}
        </ul>
    `;
    recipeInfo.appendChild(recipeElement);

    recipePopup.classList.remove('hidden');

}



searchButton.addEventListener('click', async () => {
    recipesElement.innerHTML = ""; // clears the search
    const search = searchWord.value;

    const recipes = await getRecipeBySearch(search);

    if (recipes){
        recipes.forEach((recipe) => {
            addRecipe(recipe);
        });
    }
});

closePopupButton.addEventListener('click', () =>{
    recipePopup.classList.add("hidden");
});














