import Pizza from "../model/pizza.model.js";

// Controller to get all pizzas
export async function getAllPizzas(req, res) {
    try {
        const pizzas = await Pizza.find();
        res.status(200).json(pizzas);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch pizzas", error: error.message });
    }
}
