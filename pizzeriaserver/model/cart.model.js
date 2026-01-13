import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
    isCustomized: {
        type: Boolean,
        default: false
    },
    basePizza: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pizza",
        required: true
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
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
});


const Cart = mongoose.model("CartItem", cartItemSchema);

export default Cart;
