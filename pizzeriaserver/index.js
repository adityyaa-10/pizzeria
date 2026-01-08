import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import seed from "./seed.js";
import pizzaRoutes from "./routes/pizza.route.js";
import ingredientsRoutes from "./routes/ingredients.route.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); // allows us to send json data in the request body

app.use("/api/pizzas", pizzaRoutes);
app.use("/api/ingredients", ingredientsRoutes);


const PORT = process.env.PORT || 8000;
async function startServer() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
        await seed();
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });

    } catch (error) {
        console.error("Error starting server:", error);
        process.exit(1);
    }
}

startServer();