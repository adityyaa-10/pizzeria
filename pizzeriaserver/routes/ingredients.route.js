import express from "express";
import { getAllIngredients } from "../controller/ingredients.controller.js";

const router = express.Router();

// GET /api/ingredients - get all ingredients

router.get("/all", getAllIngredients);

export default router;
