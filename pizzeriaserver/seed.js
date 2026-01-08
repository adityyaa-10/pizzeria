import Pizza from "./model/pizza.model.js";
import Ingredient from "./model/ingredients.model.js";
import pizzas from "./data/pizza.js";
import ingredients from "./data/ingredients.js";

export default async function seed() {
    const [pizzaExists, ingredientExists] = await Promise.all([
        Pizza.findOne(),
        Ingredient.findOne(),
    ]);

    if (!pizzaExists) {
        await Pizza.insertMany(pizzas);
        console.log("Seeded pizzas");
    }

    if (!ingredientExists) {
        await Ingredient.insertMany(ingredients);
        console.log("Seeded ingredients");
    }
}
