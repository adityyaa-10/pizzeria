import Cart from "../model/cart.model.js";

export const addToCart = async (req, res) => {
    try {
        const { isCustomPizza, pizza, ingredients, quantity, price } = req.body;

        const cartData = {
            isCustomPizza,
            quantity,
        };

        if (!isCustomPizza) {
            // Existing pizza
            cartData.pizza = pizza._id;
            cartData.ingredients = pizza.ingredients;
            cartData.price = pizza.price;
            cartData.imageUrl = pizza.image;
            cartData.name = pizza.name;
        } else {
            // Custom pizza
            cartData.pizza = null;
            cartData.ingredients = ingredients;
            cartData.price = price;
            cartData.imageUrl = "https://images.pexels.com/photos/280453/pexels-photo-280453.jpeg"
            cartData.name = "Custom Pizza";
        }

        const cartItem = await Cart.create(cartData);
        res.status(201).json(cartItem);
    } catch (error) {
        //console.log(error)
        res.status(500).json({ message: "Failed to add item to cart" });
    }
};

export const getAllCartItems = async (req, res) => {
    try {
        const cartItems = await Cart.find();
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

        const updatedItem = await Cart.findByIdAndUpdate(
            id,
            { quantity },
            { new: true } // to return updated item
        );

        if (!updatedItem) {
            return res.status(404).json({ message: "Cart item not found" });
        }

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

