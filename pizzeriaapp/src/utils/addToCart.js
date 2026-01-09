import axios from "axios"

const addToCart = async (data) => {
    try {
        const response = await axios.post("http://localhost:8000/api/cart/add", data)
        return response.data
    } catch (error) {
        console.error("Error adding to cart:", error)
        throw error
    }
}

export default addToCart
