let token =
    localStorage.getItem("token");

let currentUser =
    JSON.parse(
        localStorage.getItem("user")
    );

let selectedNutritionFood = null;

let editingFoodId = null;


/* =====================================================
   PAGE LOAD
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        if (token) {

            showDashboard();

        } else {

            showLogin();

        }

    }
);


/* =====================================================
   AUTH UI
===================================================== */

function showLogin() {

    document
        .getElementById("authSection")
        .classList.remove("hidden");

    document
        .getElementById("dashboard")
        .classList.add("hidden");

    document
        .getElementById("loginBox")
        .classList.remove("hidden");

    document
        .getElementById("registerBox")
        .classList.add("hidden");
}


function showRegister() {

    document
        .getElementById("loginBox")
        .classList.add("hidden");

    document
        .getElementById("registerBox")
        .classList.remove("hidden");

}


function showDashboard() {

    document
        .getElementById("authSection")
        .classList.add("hidden");

    document
        .getElementById("dashboard")
        .classList.remove("hidden");

    if (currentUser) {

        document
            .getElementById("welcomeText")
            .textContent =
            `Welcome, ${currentUser.name}`;

    }

    loadSummary();

    loadFoods();
}


/* =====================================================
   REGISTER
===================================================== */

async function register() {

    const name =
        document
            .getElementById("registerName")
            .value
            .trim();

    const email =
        document
            .getElementById("registerEmail")
            .value
            .trim();

    const password =
        document
            .getElementById("registerPassword")
            .value;

    const message =
        document
            .getElementById("registerMessage");


    if (!name || !email || !password) {

        message.textContent =
            "Please fill all fields.";

        return;
    }


    try {

        const response =
            await fetch(
                "/api/auth/register",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        name,
                        email,
                        password
                    })
                }
            );


        const data =
            await response.json();


        if (!response.ok) {

            message.textContent =
                data.message;

            return;
        }


        message.textContent =
            "Registration successful! Please login.";

        document
            .getElementById("registerName")
            .value = "";

        document
            .getElementById("registerEmail")
            .value = "";

        document
            .getElementById("registerPassword")
            .value = "";


        setTimeout(
            showLogin,
            1000
        );


    } catch (error) {

        message.textContent =
            "Server error. Please try again.";

    }
}


/* =====================================================
   LOGIN
===================================================== */

async function login() {

    const email =
        document
            .getElementById("loginEmail")
            .value
            .trim();

    const password =
        document
            .getElementById("loginPassword")
            .value;

    const message =
        document
            .getElementById("loginMessage");


    if (!email || !password) {

        message.textContent =
            "Please enter email and password.";

        return;
    }


    try {

        const response =
            await fetch(
                "/api/auth/login",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        email,
                        password
                    })
                }
            );


        const data =
            await response.json();


        if (!response.ok) {

            message.textContent =
                data.message;

            return;
        }


        token = data.token;

        currentUser = data.user;


        localStorage.setItem(
            "token",
            token
        );

        localStorage.setItem(
            "user",
            JSON.stringify(currentUser)
        );


        showDashboard();


    } catch (error) {

        message.textContent =
            "Server error. Please try again.";

    }
}


/* =====================================================
   LOGOUT
===================================================== */

function logout() {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    token = null;

    currentUser = null;

    showLogin();
}


/* =====================================================
   SEARCH FOOD
===================================================== */

let searchTimeout;


function searchFood() {

    const query =
        document
            .getElementById("foodSearch")
            .value
            .trim();

    const suggestions =
        document
            .getElementById("suggestions");


    clearTimeout(searchTimeout);


    if (query.length < 2) {

        suggestions.innerHTML = "";

        return;
    }


    searchTimeout =
        setTimeout(
            () => fetchFoodSuggestions(query),
            300
        );
}


async function fetchFoodSuggestions(query) {

    const suggestions =
        document
            .getElementById("suggestions");


    try {

        const response =
            await fetch(
                `/api/nutrition/search?q=${encodeURIComponent(query)}`
            );


        const foods =
            await response.json();


        suggestions.innerHTML = "";


        if (foods.length === 0) {

            suggestions.innerHTML =
                `<div class="suggestion">
                    No food found
                </div>`;

            return;
        }


        foods.forEach(
            food => {

                const div =
                    document.createElement(
                        "div"
                    );

                div.className =
                    "suggestion";


                div.innerHTML = `
                    <strong>${food.name}</strong>
                    <br>
                    <small>
                        ${food.serving}
                        •
                        ${food.calories} kcal
                    </small>
                `;


                div.onclick =
                    () => selectFood(food);


                suggestions.appendChild(div);

            }
        );


    } catch (error) {

        console.error(
            "Food search error:",
            error
        );

    }
}


/* =====================================================
   SELECT FOOD
===================================================== */

function selectFood(food) {

    selectedNutritionFood =
        food;


    document
        .getElementById("foodSearch")
        .value =
        food.name;


    document
        .getElementById("selectedFood")
        .value =
        `${food.name} (${food.serving})`;


    document
        .getElementById("suggestions")
        .innerHTML = "";


    document
        .getElementById("quantity")
        .value = 1;


    calculateNutrition();
}


/* =====================================================
   CALCULATE NUTRITION
===================================================== */

function calculateNutrition() {

    if (!selectedNutritionFood) {

        return;
    }


    const quantity =
        Number(
            document
                .getElementById("quantity")
                .value
        ) || 1;


    const calories =
        selectedNutritionFood.calories *
        quantity;

    const protein =
        selectedNutritionFood.protein *
        quantity;

    const carbs =
        selectedNutritionFood.carbs *
        quantity;

    const fat =
        selectedNutritionFood.fat *
        quantity;


    document
        .getElementById("previewCalories")
        .textContent =
        `${Math.round(calories)} kcal`;


    document
        .getElementById("previewProtein")
        .textContent =
        `${protein.toFixed(1)} g`;


    document
        .getElementById("previewCarbs")
        .textContent =
        `${carbs.toFixed(1)} g`;


    document
        .getElementById("previewFat")
        .textContent =
        `${fat.toFixed(1)} g`;
}


/* =====================================================
   ADD FOOD
===================================================== */

async function addFood() {

    const message =
        document
            .getElementById("foodMessage");


    if (!selectedNutritionFood) {

        message.textContent =
            "Please search and select a food.";

        return;
    }


    const quantity =
        Number(
            document
                .getElementById("quantity")
                .value
        ) || 1;


    const mealType =
        document
            .getElementById("mealType")
            .value;


    const foodData = {

        name:
            selectedNutritionFood.name,

        quantity:

            quantity,

        calories:

            selectedNutritionFood.calories *
            quantity,

        protein:

            selectedNutritionFood.protein *
            quantity,

        carbs:

            selectedNutritionFood.carbs *
            quantity,

        fat:

            selectedNutritionFood.fat *
            quantity,

        mealType:

            mealType

    };


    try {

        const response =
            await fetch(
                "/api/food",
                {
                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json",

                        "Authorization":
                            `Bearer ${token}`

                    },

                    body:
                        JSON.stringify(
                            foodData
                        )
                }
            );


        const data =
            await response.json();


        if (!response.ok) {

            message.textContent =
                data.message;

            return;
        }


        message.textContent =
            "Food added successfully!";


        clearFoodForm();


        loadSummary();

        loadFoods();


    } catch (error) {

        console.error(error);

        message.textContent =
            "Unable to add food.";

    }
}


/* =====================================================
   CLEAR FOOD FORM
===================================================== */

function clearFoodForm() {

    document
        .getElementById("foodSearch")
        .value = "";

    document
        .getElementById("selectedFood")
        .value = "";

    document
        .getElementById("quantity")
        .value = 1;

    document
        .getElementById("previewCalories")
        .textContent = "0 kcal";

    document
        .getElementById("previewProtein")
        .textContent = "0 g";

    document
        .getElementById("previewCarbs")
        .textContent = "0 g";

    document
        .getElementById("previewFat")
        .textContent = "0 g";

    selectedNutritionFood = null;
}


/* =====================================================
   LOAD TODAY SUMMARY
===================================================== */

async function loadSummary() {

    try {

        const response =
            await fetch(
                "/api/food/today/summary",
                {
                    headers: {
                        "Authorization":
                            `Bearer ${token}`
                    }
                }
            );


        const data =
            await response.json();


        if (!response.ok) {

            console.error(data);

            return;
        }


        document
            .getElementById("totalCalories")
            .textContent =
            Math.round(
                data.totalCalories
            );


        document
            .getElementById("totalProtein")
            .textContent =
            Number(
                data.totalProtein
            ).toFixed(1);


        document
            .getElementById("totalCarbs")
            .textContent =
            Number(
                data.totalCarbs
            ).toFixed(1);


        document
            .getElementById("totalFat")
            .textContent =
            Number(
                data.totalFat
            ).toFixed(1);


    } catch (error) {

        console.error(
            "Summary error:",
            error
        );

    }
}


/* =====================================================
   LOAD TODAY'S FOOD
===================================================== */

async function loadFoods() {

    const foodList =
        document
            .getElementById("foodList");


    try {

        const response =
            await fetch(
                "/api/food",
                {
                    headers: {
                        "Authorization":
                            `Bearer ${token}`
                    }
                }
            );


        const foods =
            await response.json();


        foodList.innerHTML = "";


        if (
            !Array.isArray(foods) ||
            foods.length === 0
        ) {

            foodList.innerHTML =
                `<p class="empty">
                    No food added today.
                </p>`;

            return;
        }


        foods.forEach(
            food => {

                const div =
                    document.createElement(
                        "div"
                    );

                div.className =
                    "food-item";


                div.innerHTML = `

                    <div class="food-info">

                        <h3>
                            ${food.name}
                        </h3>

                        <p>
                            ${food.mealType}
                            •
                            Quantity:
                            ${food.quantity || 1}
                        </p>

                    </div>


                    <div class="food-numbers">

                        <strong>
                            ${Math.round(
                                food.calories
                            )} kcal
                        </strong>

                        <span>
                            P:
                            ${Number(
                                food.protein
                            ).toFixed(1)}g

                            &nbsp;

                            C:
                            ${Number(
                                food.carbs
                            ).toFixed(1)}g

                            &nbsp;

                            F:
                            ${Number(
                                food.fat
                            ).toFixed(1)}g
                        </span>

                    </div>


                    <div class="food-actions">

                        <button
                            class="delete-btn"
                            onclick="deleteFood('${food._id}')"
                        >
                            Delete
                        </button>

                    </div>

                `;


                foodList.appendChild(div);

            }
        );


    } catch (error) {

        console.error(
            "Food loading error:",
            error
        );

    }
}


/* =====================================================
   DELETE FOOD
===================================================== */

async function deleteFood(id) {

    const confirmDelete =
        confirm(
            "Delete this food entry?"
        );


    if (!confirmDelete) {

        return;
    }


    try {

        const response =
            await fetch(
                `/api/food/${id}`,
                {
                    method: "DELETE",

                    headers: {
                        "Authorization":
                            `Bearer ${token}`
                    }
                }
            );


        const data =
            await response.json();


        if (!response.ok) {

            alert(data.message);

            return;
        }


        loadSummary();

        loadFoods();


    } catch (error) {

        console.error(
            "Delete error:",
            error
        );

    }
}