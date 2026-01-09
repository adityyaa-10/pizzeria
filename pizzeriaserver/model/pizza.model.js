import mongoose from "mongoose";

const pizzaSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            required: true,
            unique: true
        },
        type: {
            type: String,
            required: true,
            enum: ["veg", "nonveg"]
        },
        price: {
            type: Number,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        ingredients: [
            {
                type: String,
                required: true
            }
        ],
        topping: [
            {
                type: String,
            }
        ],
    }
);

const Pizza = mongoose.model("Pizza", pizzaSchema);

export default Pizza;
