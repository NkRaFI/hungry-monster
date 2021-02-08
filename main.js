// food section start
document.getElementById("search-btn").addEventListener("click", () => {
    document.getElementById("foods").innerHTML = "";
    document.getElementById("details").innerHTML = "";
    const foodInput = document.getElementById("food-input").value;
    if (foodInput == "") {
        alert("please enter a food name");
    }
    else{
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${foodInput}`)
        .then(response => response.json())
        .then(data => getData(data))
        .catch(error => alert("No Result"));
    }
})

const getData = getMeals => {
    const meals = getMeals.meals;
    const mainBody = document.getElementById("foods");
    meals.forEach(items => {
        const mealName = items.strMeal;
        const mealImg = items.strMealThumb;
        const showMeal = `
            <div id="food-card" onclick="showFoodDetails('${mealName}')")">
                <img class="img-fluid" src="${mealImg}">
                <h4>${mealName}</h4>
            </div>
        `

        //getting dom elements and adding template and element to it
        const div = document.createElement("div");
        div.className = "col-md-3"
        div.innerHTML = showMeal;

        mainBody.appendChild(div);
    });
}
// food section end

//details section start
const showFoodDetails = name => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
        .then(response => response.json())
        .then(data => getDetails(data))
};

const getDetails = details => {
    const meal = details.meals;
    meal.forEach(item => {
        const { strIngredient1, strIngredient2, strIngredient3, strIngredient4, strIngredient5 } = item;
        const mealName = item.strMeal;
        const mealImg = item.strMealThumb;
        const listItems = `
            <div class="details-style">
                <img class="img-fluid" src="${mealImg}">
                <h4>${mealName}</h4>
                <li>${strIngredient1}</li>
                <li>${strIngredient2}</li>
                <li>${strIngredient3}</li>
                <li>${strIngredient4}</li>
                <li>${strIngredient5}</li>
            </div>
        `;
        const detailsDiv = document.getElementById("details");
        detailsDiv.innerHTML = listItems;
    });
}
// details section end
