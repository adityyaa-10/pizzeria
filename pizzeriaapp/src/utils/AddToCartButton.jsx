import React from 'react'
import addToCart from './addToCart'

const AddToCartButton = ({ isCustomPizza, data, className, onSuccess }) => {

    const handleClick = async () => {
        try {
            // Prepare the data to send to the server
            let cartData = {}

            if (isCustomPizza === true) {
                // For custom pizza
                cartData = {
                    isCustomPizza: true,
                    ingredients: data.ingredients,
                    price: data.price,
                    quantity: data.quantity
                }
            } else {
                // For regular pizza
                cartData = {
                    isCustomPizza: false,
                    pizza: data.pizza,
                    quantity: data.quantity
                }
            }

            await addToCart(cartData)

            // Show success message
            const itemName = isCustomPizza ? "Custom Pizza" : data.pizza.name
            alert(`${itemName} added to cart!`)

            if (onSuccess) {
                onSuccess()
            }

        } catch (error) {
            // Show error message if something goes wrong
            console.error("Error adding to cart:", error)
            alert("Failed to add item to cart. Please try again.")
        }
    }

    return (
        <button
            className={className || "add-to-cart-btn"}
            onClick={handleClick}
        >
            {"Add to Cart"}
        </button>
    )
}

export default AddToCartButton
