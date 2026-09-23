const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        name: {
            type: String,
            required: true,
            trim: true
        },

        quantity: {
            type: Number,
            default: 1,
            min: 0.1
        },

        calories: {
            type: Number,
            required: true,
            min: 0
        },

        protein: {
            type: Number,
            default: 0,
            min: 0
        },

        carbs: {
            type: Number,
            default: 0,
            min: 0
        },

        fat: {
            type: Number,
            default: 0,
            min: 0
        },

        mealType: {
            type: String,
            enum: [
                "Breakfast",
                "Lunch",
                "Dinner",
                "Snack"
            ],
            required: true
        },

        date: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Food", foodSchema);