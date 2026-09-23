const express = require("express");

const NutritionFood =
    require("../models/NutritionFood");

const router = express.Router();


// ==========================================
// SEARCH FOOD
// GET /api/nutrition/search?q=rice
// ==========================================

router.get("/search", async (req, res) => {

    try {

        const query = req.query.q || "";

        if (!query.trim()) {

            return res.json([]);

        }


        const foods =
            await NutritionFood.find({
                name: {
                    $regex: query,
                    $options: "i"
                }
            })
            .limit(10);


        res.json(foods);


    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


module.exports = router;