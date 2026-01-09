import "../../pages/Cart.css"
import axios from "axios"

const EachCartItem = ({ item, onQuantityChange, onDelete }) => {
    const handleDecrease = async () => {
        if (item.quantity > 1) {
            try {
                await axios.patch(`http://localhost:8000/api/cart/${item._id}`, {
                    quantity: item.quantity - 1
                })
                onQuantityChange()
            } catch (error) {
                console.error("Error updating quantity:", error)
            }
        }
    }

    const handleIncrease = async () => {
        try {
            await axios.patch(`http://localhost:8000/api/cart/${item._id}`, {
                quantity: item.quantity + 1
            })
            onQuantityChange()
        } catch (error) {
            console.error("Error updating quantity:", error)
        }
    }

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8000/api/cart/${item._id}`)
            onDelete()
        } catch (error) {
            console.error("Error deleting item:", error)
        }
    }

    return (
        <div className="cart-item-card">
            <div className="cart-item-left">
                <div className="cart-item-info">
                    <h3 className="cart-item-name">{item.name}</h3>
                    <p className="cart-item-ingredients">
                        {Array.isArray(item.ingredients)
                            ? item.ingredients.join(", ")
                            : item.ingredients}
                    </p>
                </div>

                <div className="cart-item-controls">
                    <div className="quantity-controls">
                        <button
                            className="quantity-btn"
                            onClick={handleDecrease}
                            disabled={item.quantity <= 1}
                        >
                            -
                        </button>
                        <span className="quantity-display">{item.quantity}</span>
                        <button
                            className="quantity-btn"
                            onClick={handleIncrease}
                        >
                            +
                        </button>
                    </div>
                </div>
            </div>

            <div className="cart-item-right">
                <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="cart-item-image"
                />
                <button
                    className="delete-item-btn"
                    onClick={handleDelete}
                >
                    Remove
                </button>
            </div>
        </div>
    )
}

export default EachCartItem
