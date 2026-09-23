const mongoose = require("mongoose");

const nutritionFoodSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        serving: {
            type: String,
            default: "1 serving"
        },

        calories: {
            type: Number,
            required: true
        },

        protein: {
            type: Number,
            default: 0
        },

        carbs: {
            type: Number,
            default: 0
        },

        fat: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "NutritionFood",
    nutritionFoodSchema
);