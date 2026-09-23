const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config();

const authRoutes =
    require("./routes/authRoutes");

const foodRoutes =
    require("./routes/foodRoutes");

const nutritionRoutes =
    require("./routes/nutritionRoutes");


const app = express();


// ==========================================
// MIDDLEWARE
// ==========================================

app.use(express.json());

app.use(express.static("public"));


// ==========================================
// REST API ROUTES
// ==========================================

app.use(
    "/api/auth",
    authRoutes
);

app.use(
    "/api/food",
    foodRoutes
);

app.use(
    "/api/nutrition",
    nutritionRoutes
);


// ==========================================
// HOME
// ==========================================

app.get("/", (req, res) => {

    res.sendFile(
        __dirname +
        "/public/index.html"
    );

});


// ==========================================
// DATABASE + SERVER
// ==========================================

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {

        console.log(
            "MongoDB connected"
        );

        app.listen(
            process.env.PORT,
            () => {

                console.log(
                    `Server running on port ${process.env.PORT}`
                );

            }
        );

    })
    .catch(error => {

        console.log(
            "Database connection failed:",
            error.message
        );

    });