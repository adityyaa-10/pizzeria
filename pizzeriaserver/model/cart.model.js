import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema(
    {
        isCustomPizza: {
            type: Boolean,
            required: true,
            default: false
        },
        isCustomized: {
            type: Boolean,
            default: false
        },
        pizza: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Pizza"
        },
        basePizza: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Pizza"
        },
        ingredients: [
            {
                type: String,
            }
        ],
        addedIngredients: [
            {
                type: String,
            }
        ],
        quantity: {
            type: Number,
            required: true,
            min: 1,
            default: 1
        },
        price: {
            type: Number,
        },
        imageUrl: {
            type: String
        },
        name: {
            type: String
        }
    }
);

const Cart = mongoose.model("CartItem", cartItemSchema);

export default Cart;
