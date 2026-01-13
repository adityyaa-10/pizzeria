import Cart from "../model/cart.model.js";
import Pizza from "../model/pizza.model.js";

export const addToCart = async (req, res) => {
    try {
        const { isCustomized, basePizza, ingredients, addedIngredients, quantity, price } = req.body;

        const pizzaData = await Pizza.findById(basePizza);
        if (!pizzaData) {
            return res.status(404).json({ message: "Pizza not found" });
        }

        const cartData = {
            isCustomized: isCustomized || false,
            basePizza: pizzaData._id,
            quantity: quantity || 1,
            imageUrl: pizzaData.image,
            name: pizzaData.name
        };

        if (isCustomized) {
            cartData.ingredients = ingredients;              // base + added
            cartData.addedIngredients = addedIngredients || [];
            cartData.price = price;                          // recalculated price
        } else {
            cartData.ingredients = pizzaData.ingredients;
            cartData.addedIngredients = [];
            cartData.price = pizzaData.price;
        }

        const cartItem = await Cart.create(cartData);
        const populatedItem = await Cart.findById(cartItem._id).populate("basePizza");

        res.status(201).json(populatedItem);
    } catch (error) {
        res.status(500).json({ message: "Failed to add item to cart" });
    }
};


export const getAllCartItems = async (req, res) => {
    try {
        const cartItems = await Cart.find().populate('basePizza');
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

        const existingItem = await Cart.findById(id).populate("basePizza");

        if (!existingItem) {
            return res.status(404).json({ message: "Cart item not found" });
        }

        // If customized pizza & quantity is being increased
        if (existingItem.isCustomized && quantity > existingItem.quantity) {
            const basePizza = existingItem.basePizza;

            if (!basePizza) {
                return res.status(404).json({ message: "Base pizza not found" });
            }

            // Create a new cart item as base pizza
            const newCartItem = await Cart.create({
                isCustomized: false,
                basePizza: basePizza._id,
                ingredients: basePizza.ingredients,
                addedIngredients: [],
                quantity: 1,
                price: basePizza.price,
                imageUrl: basePizza.image,
                name: basePizza.name
            });

            const populatedNewItem = await Cart.findById(newCartItem._id)
                .populate("basePizza");

            return res.status(200).json({
                originalItem: existingItem,
                newItem: populatedNewItem,
                message: "Base pizza added so user can customize again"
            });
        }

        // Normal update for:
        // - base pizzas
        // - customized pizzas when quantity is decreased
        const updatedItem = await Cart.findByIdAndUpdate(
            id,
            { quantity },
            { new: true }
        ).populate("basePizza");

        res.status(200).json(updatedItem);

    } catch (error) {
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

