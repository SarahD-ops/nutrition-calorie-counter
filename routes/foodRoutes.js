const express = require("express");

const Food = require("../models/Food");

const auth = require("../middleware/auth");

const router = express.Router();


// ==========================================
// ADD FOOD
// POST /api/food
// ==========================================

router.post("/", auth, async (req, res) => {

    try {

        const food = await Food.create({

            ...req.body,

            user: req.userId

        });


        res.status(201).json({

            message: "Food added successfully",

            food

        });


    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// ==========================================
// GET TODAY'S FOOD
// GET /api/food
// ==========================================

router.get("/", auth, async (req, res) => {

    try {

        const startOfDay = new Date();

        startOfDay.setHours(
            0, 0, 0, 0
        );


        const endOfDay = new Date();

        endOfDay.setHours(
            23, 59, 59, 999
        );


        const foods = await Food.find({

            user: req.userId,

            date: {
                $gte: startOfDay,
                $lte: endOfDay
            }

        })
        .sort({
            date: -1
        });


        res.json(foods);


    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// ==========================================
// TODAY'S SUMMARY
// GET /api/food/today/summary
// ==========================================

router.get(
    "/today/summary",
    auth,
    async (req, res) => {

        try {

            const startOfDay = new Date();

            startOfDay.setHours(
                0, 0, 0, 0
            );


            const endOfDay = new Date();

            endOfDay.setHours(
                23, 59, 59, 999
            );


            const foods = await Food.find({

                user: req.userId,

                date: {
                    $gte: startOfDay,
                    $lte: endOfDay
                }

            });


            const totalCalories =
                foods.reduce(
                    (total, food) =>
                        total + food.calories,
                    0
                );


            const totalProtein =
                foods.reduce(
                    (total, food) =>
                        total + food.protein,
                    0
                );


            const totalCarbs =
                foods.reduce(
                    (total, food) =>
                        total + food.carbs,
                    0
                );


            const totalFat =
                foods.reduce(
                    (total, food) =>
                        total + food.fat,
                    0
                );


            res.json({

                date:
                    startOfDay
                        .toISOString()
                        .split("T")[0],

                totalCalories,

                totalProtein:

                    Number(
                        totalProtein.toFixed(1)
                    ),

                totalCarbs:

                    Number(
                        totalCarbs.toFixed(1)
                    ),

                totalFat:

                    Number(
                        totalFat.toFixed(1)
                    ),

                foodCount: foods.length

            });


        } catch (error) {

            res.status(500).json({
                message: error.message
            });

        }

    }
);


// ==========================================
// UPDATE FOOD
// PUT /api/food/:id
// ==========================================

router.put("/:id", auth, async (req, res) => {

    try {

        const food =
            await Food.findOneAndUpdate(

                {
                    _id: req.params.id,

                    user: req.userId
                },

                req.body,

                {
                    new: true,
                    runValidators: true
                }

            );


        if (!food) {

            return res.status(404).json({

                message: "Food not found"

            });

        }


        res.json({

            message: "Food updated successfully",

            food

        });


    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// ==========================================
// DELETE FOOD
// DELETE /api/food/:id
// ==========================================

router.delete(
    "/:id",
    auth,
    async (req, res) => {

        try {

            const food =
                await Food.findOneAndDelete({

                    _id: req.params.id,

                    user: req.userId

                });


            if (!food) {

                return res.status(404).json({

                    message: "Food not found"

                });

            }


            res.json({

                message: "Food deleted successfully"

            });


        } catch (error) {

            res.status(500).json({
                message: error.message
            });

        }

    }
);


module.exports = router;