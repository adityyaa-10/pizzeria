import "../../pages/Cart.css"
import axios from "axios"

const EachCartItem = ({ item, onQuantityChange, onDelete }) => {
    const isCustomized = item.isCustomized || false
    const baseIngredients = item.basePizza?.ingredients || []
    const addedIngredients = item.addedIngredients || []
    const allIngredients = item.ingredients || []

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
            alert("Failed to update quantity. Please try again.")
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
        <div className={`cart-item-card ${isCustomized ? "customized-item" : ""}`}>
            <div className="cart-item-left">
                <div className="cart-item-info">
                    <div className="cart-item-header">
                        <h3 className="cart-item-name">{item.name}</h3>
                        {isCustomized && (
                            <span className="customized-badge">Customized</span>
                        )}
                    </div>

                    {isCustomized ? (
                        <div className="customized-ingredients">
                            <div className="base-ingredients-section">
                                <strong>Base:</strong>
                                <span className="ingredients-text">
                                    {Array.isArray(baseIngredients)
                                        ? baseIngredients.join(", ")
                                        : baseIngredients}
                                </span>
                            </div>

                            {addedIngredients.length > 0 && (
                                <div className="added-ingredients-section">
                                    <strong>Added:</strong>
                                    <span className="ingredients-text added">
                                        {Array.isArray(addedIngredients)
                                            ? addedIngredients.join(", ")
                                            : addedIngredients}
                                    </span>
                                </div>
                            )}
                        </div>
                    ) : (
                        <p className="cart-item-ingredients">
                            {Array.isArray(allIngredients)
                                ? allIngredients.join(", ")
                                : allIngredients}
                        </p>
                    )}
                </div>

                {!isCustomized && (
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
                )}
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
