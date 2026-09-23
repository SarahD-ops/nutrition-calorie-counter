const mongoose = require("mongoose");
require("dotenv").config();

const NutritionFood =
    require("./models/NutritionFood");


const foods = [

    {
        name: "Rice",
        serving: "1 cup cooked",
        calories: 206,
        protein: 4.3,
        carbs: 44.5,
        fat: 0.4
    },

    {
        name: "Brown Rice",
        serving: "1 cup cooked",
        calories: 216,
        protein: 5,
        carbs: 45,
        fat: 1.8
    },

    {
        name: "Roti",
        serving: "1 roti",
        calories: 120,
        protein: 3.5,
        carbs: 18,
        fat: 3
    },

    {
        name: "Chapati",
        serving: "1 chapati",
        calories: 120,
        protein: 3.5,
        carbs: 18,
        fat: 3
    },

    {
        name: "Upma",
        serving: "1 cup",
        calories: 190,
        protein: 5,
        carbs: 30,
        fat: 6
    },

    {
        name: "Poha",
        serving: "1 cup",
        calories: 180,
        protein: 4,
        carbs: 30,
        fat: 5
    },

    {
        name: "Dal",
        serving: "1 cup",
        calories: 180,
        protein: 9,
        carbs: 27,
        fat: 4
    },

    {
        name: "Paneer",
        serving: "100 g",
        calories: 265,
        protein: 18,
        carbs: 6,
        fat: 20
    },

    {
        name: "Egg",
        serving: "1 egg",
        calories: 78,
        protein: 6.3,
        carbs: 0.6,
        fat: 5.3
    },

    {
        name: "Boiled Egg",
        serving: "1 egg",
        calories: 78,
        protein: 6.3,
        carbs: 0.6,
        fat: 5.3
    },

    {
        name: "Banana",
        serving: "1 medium banana",
        calories: 105,
        protein: 1.3,
        carbs: 27,
        fat: 0.4
    },

    {
        name: "Apple",
        serving: "1 medium apple",
        calories: 95,
        protein: 0.5,
        carbs: 25,
        fat: 0.3
    },

    {
        name: "Milk",
        serving: "1 cup",
        calories: 120,
        protein: 6,
        carbs: 9,
        fat: 6
    },

    {
        name: "Curd",
        serving: "1 cup",
        calories: 100,
        protein: 5,
        carbs: 7,
        fat: 5
    },

    {
        name: "Chicken",
        serving: "100 g",
        calories: 239,
        protein: 27,
        carbs: 0,
        fat: 14
    },

    {
        name: "Dosa",
        serving: "1 dosa",
        calories: 168,
        protein: 3.9,
        carbs: 29,
        fat: 4
    },

    {
        name: "Idli",
        serving: "1 idli",
        calories: 58,
        protein: 2,
        carbs: 12,
        fat: 0.4
    },

    {
        name: "Samosa",
        serving: "1 piece",
        calories: 260,
        protein: 5,
        carbs: 32,
        fat: 13
    },

    {
        name: "Paratha",
        serving: "1 paratha",
        calories: 260,
        protein: 6,
        carbs: 35,
        fat: 11
    },

    {
        name: "Vegetable Biryani",
        serving: "1 cup",
        calories: 250,
        protein: 5,
        carbs: 40,
        fat: 8
    },

    {
        name: "Chicken Biryani",
        serving: "1 cup",
        calories: 350,
        protein: 20,
        carbs: 45,
        fat: 11
    },

    {
        name: "Jeera Rice",
        serving: "1 cup",
        calories: 220,
        protein: 4,
        carbs: 42,
        fat: 5
    },

    {
        name: "Rajma",
        serving: "1 cup",
        calories: 210,
        protein: 13,
        carbs: 37,
        fat: 1
    },

    {
        name: "Chole",
        serving: "1 cup",
        calories: 270,
        protein: 14,
        carbs: 45,
        fat: 5
    },

    {
        name: "Maggi",
        serving: "1 packet",
        calories: 310,
        protein: 7,
        carbs: 43,
        fat: 13
    }

];


async function seedDatabase() {

    try {

        await mongoose.connect(
            process.env.MONGO_URI
        );

        console.log(
            "MongoDB connected"
        );


        for (const food of foods) {

            await NutritionFood.findOneAndUpdate(

                {
                    name: food.name
                },

                food,

                {
                    upsert: true,
                    new: true
                }

            );

        }


        console.log(
            "Nutrition database seeded successfully"
        );


        await mongoose.disconnect();


    } catch (error) {

        console.log(
            "Seeding error:",
            error.message
        );

    }

}


seedDatabase();