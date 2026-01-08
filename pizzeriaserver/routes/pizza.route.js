import express from "express";
import { getAllPizzas } from "../controller/pizza.controller.js";

const router = express.Router();

// GET /api/pizzas - get all pizzas

router.get("/all", getAllPizzas);

export default router;
