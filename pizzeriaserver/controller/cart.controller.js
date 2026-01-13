import Cart from "../model/cart.model.js";
import Pizza from "../model/pizza.model.js";

export const addToCart = async (req, res) => {
    try {
        const { isCustomized, basePizza, ingredients, addedIngredients, quantity, price } = req.body;

        const pizzaData = await Pizza.findById(basePizza);
        if (!pizzaData) {
            return res.status(404).json({ message: "Pizza not found" });
        }

        // If its a BASE pizza, check if it already exists in cart
        if (!isCustomized) {
            const existingBasePizzaItem = await Cart.findOne({
                basePizza: pizzaData._id,
                isCustomized: false
            });

            if (existingBasePizzaItem) {
                existingBasePizzaItem.quantity += 1;
                await existingBasePizzaItem.save();

                const populatedItem = await Cart.findById(existingBasePizzaItem._id)
                    .populate("basePizza");

                return res.status(200).json({
                    updatedItem: populatedItem,
                    message: "Base pizza quantity increased"
                });
            }
        }

        // Otherwise create a new cart item
        const cartData = {
            isCustomized: isCustomized || false,
            basePizza: pizzaData._id,
            quantity: quantity || 1,
            imageUrl: pizzaData.image,
            name: pizzaData.name
        };

        if (isCustomized) {
            cartData.ingredients = ingredients; // base + added
            cartData.addedIngredients = addedIngredients || [];
            cartData.price = price; // recalculated price
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

        const existingItem = await Cart.findById(id);

        if (!existingItem) {
            return res.status(404).json({ message: "Cart item not found" });
        }

        // quantity updates are allowed only for non-customized pizzas
        if (existingItem.isCustomized) {
            return res.status(400).json({
                message: "Quantity cannot be updated for customized pizzas"
            });
        }

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

