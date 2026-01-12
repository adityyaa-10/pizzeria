import Cart from "../model/cart.model.js";
import Pizza from "../model/pizza.model.js";

export const addToCart = async (req, res) => {
    try {
        const { isCustomPizza, isCustomized, pizza, basePizza, ingredients, addedIngredients, quantity, price } = req.body;

        const cartData = {
            isCustomPizza: isCustomPizza || false,
            isCustomized: isCustomized || false,
            quantity,
        };

        if (isCustomPizza) {
            // Build from scratch pizza
            cartData.pizza = null;
            cartData.basePizza = null;
            cartData.ingredients = ingredients;
            cartData.addedIngredients = [];
            cartData.price = price;
            cartData.imageUrl = "https://images.pexels.com/photos/280453/pexels-photo-280453.jpeg";
            cartData.name = "Custom Pizza";
        } else if (isCustomized) {
            // Customized existing pizza
            cartData.pizza = pizza._id;
            cartData.basePizza = basePizza || pizza._id;
            cartData.ingredients = ingredients; // base + added ingredients
            cartData.addedIngredients = addedIngredients || [];
            cartData.price = price;
            cartData.imageUrl = pizza.image;
            cartData.name = pizza.name;
        } else {
            // Base pizza (no customization)
            cartData.pizza = pizza._id;
            cartData.basePizza = pizza._id;
            cartData.ingredients = pizza.ingredients;
            cartData.addedIngredients = [];
            cartData.price = pizza.price;
            cartData.imageUrl = pizza.image;
            cartData.name = pizza.name;
        }

        const cartItem = await Cart.create(cartData);
        const populatedItem = await Cart.findById(cartItem._id).populate('pizza').populate('basePizza');
        res.status(201).json(populatedItem);
    } catch (error) {
        //console.log(error)
        res.status(500).json({ message: "Failed to add item to cart" });
    }
};

export const getAllCartItems = async (req, res) => {
    try {
        const cartItems = await Cart.find().populate('pizza').populate('basePizza');
        res.status(200).json(cartItems);
    } catch (error) {
        //console.log(error)
        res.status(500).json({ message: "Failed to fetch cart items" });
    }
};

export const updateCartItemQuantity = async (req, res) => {
    try {
        const { id } = req.params;
        const { quantity } = req.body;

        const existingItem = await Cart.findById(id).populate('basePizza');

        if (!existingItem) {
            return res.status(404).json({ message: "Cart item not found" });
        }

        // If it's a customized pizza and quantity is being increased
        if (existingItem.isCustomized && quantity > existingItem.quantity && existingItem.basePizza) {
            // Create a new cart item with base pizza (not customized)
            const basePizza = existingItem.basePizza;
            // Handle both populated and unpopulated cases
            const basePizzaId = typeof basePizza === 'object' && basePizza._id ? basePizza._id : basePizza;
            const basePizzaData = typeof basePizza === 'object' && basePizza.ingredients ? basePizza : null;

            // If basePizza is not populated, we need to fetch it
            let pizzaData = basePizzaData;
            if (!pizzaData) {
                pizzaData = await Pizza.findById(basePizzaId);
            }

            if (!pizzaData) {
                return res.status(404).json({ message: "Base pizza not found" });
            }

            const newCartItem = await Cart.create({
                isCustomPizza: false,
                isCustomized: false,
                pizza: pizzaData._id,
                basePizza: pizzaData._id,
                ingredients: pizzaData.ingredients,
                addedIngredients: [],
                quantity: 1,
                price: pizzaData.price,
                imageUrl: pizzaData.image,
                name: pizzaData.name
            });

            // Populate and return the new item
            const populatedNewItem = await Cart.findById(newCartItem._id).populate('pizza').populate('basePizza');

            // Keep the existing customized pizza with its original quantity
            return res.status(200).json({
                updatedItem: existingItem,
                newItem: populatedNewItem,
                message: "New base pizza added to cart"
            });
        }

        // Normal quantity update for non-customized pizzas or quantity decrease
        const updatedItem = await Cart.findByIdAndUpdate(
            id,
            { quantity },
            { new: true }
        ).populate('pizza').populate('basePizza');

        res.status(200).json(updatedItem);
    } catch (error) {
        //console.log(error)
        res.status(500).json({ message: "Failed to update cart item quantity" });
    }
};

export const deleteCartItem = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedItem = await Cart.findByIdAndDelete(id);

        if (!deletedItem) {
            return res.status(404).json({ message: "Cart item not found" });
        }

        res.status(200).json({ message: "Cart item deleted successfully" });
    } catch (error) {
        //console.log(error)
        res.status(500).json({ message: "Failed to delete cart item" });
    }
};


export const clearCart = async (req, res) => {
    try {
        await Cart.deleteMany({});
        res.status(200).json({ message: "All cart items deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to clear cart" });
    }
};

