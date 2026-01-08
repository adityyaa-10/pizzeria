import Ingredient from "../model/ingredients.model.js";

// Controller to get all ingredients
export const getAllIngredients = async (req, res) => {
    try {
        const ingredients = await Ingredient.find();
        res.status(200).json(ingredients);
    } catch (error) {
        res.status(500).json({ message: "Error fetching ingredients", error: error.message });
    }
};