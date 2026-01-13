import React from "react"
import addToCart from "./addToCart"

const AddToCartButton = ({ isCustomized, data, className, onSuccess }) => {

    const handleClick = async () => {
        try {
            const cartData = {
                isCustomized: isCustomized || false,
                basePizza: data.basePizza,
                ingredients: data.ingredients,
                addedIngredients: data.addedIngredients || [],
                price: data.price,
                quantity: data.quantity
            }

            await addToCart(cartData)

            const customizationMsg = isCustomized ? " (customized)" : ""
            alert(`Pizza${customizationMsg} added to cart!`)

            if (onSuccess) {
                onSuccess()
            }

        } catch (error) {
            console.error("Error adding to cart:", error)
            alert("Failed to add item to cart. Please try again.")
        }
    }

    return (
        <button
            className={className || "add-to-cart-btn"}
            onClick={handleClick}
        >
            Add to Cart
        </button>
    )
}

export default AddToCartButton
