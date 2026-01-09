import express from "express";
import {
    addToCart,
    getAllCartItems,
    updateCartItemQuantity,
    deleteCartItem,
    clearCart,
} from "../controller/cart.controller.js";

const router = express.Router();


router.post("/add", addToCart);
router.get("/all", getAllCartItems);
router.patch("/:id", updateCartItemQuantity);
router.delete("/:id", deleteCartItem);
router.delete("/clear/all", clearCart);

export default router;

