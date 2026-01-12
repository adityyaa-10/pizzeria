import { useState, useEffect } from "react"
import axios from "axios"
import AddToCartButton from "../../utils/AddToCartButton"
import "./CustomizePizzaModal.css"

const CustomizePizzaModal = ({ pizza, isOpen, onClose, onSuccess }) => {
    const [ingredients, setIngredients] = useState([])
    const [selectedIngredients, setSelectedIngredients] = useState([])

    useEffect(() => {
        if (isOpen) {
            const fetchIngredients = async () => {
                try {
                    const response = await axios.get("http://localhost:8000/api/ingredients/all")
                    setIngredients(response.data)
                } catch (err) {
                    console.log(err)
                }
            }
            fetchIngredients()
            // Reset selected ingredients when modal opens
            setSelectedIngredients([])
        }
    }, [isOpen])

    if (!isOpen || !pizza) return null

    const handleIngredientToggle = (ingredient) => {
        setSelectedIngredients((prevSelected) => {
            const found = prevSelected.find(item => item.id === ingredient.id);
            if (found) {
                return prevSelected.filter(item => item.id !== ingredient.id);
            } else {
                return [...prevSelected, ingredient];
            }
        });
    }

    const calculateTotalPrice = () => {
        let total = pizza.price;
        for (const ingredient of selectedIngredients) {
            total += ingredient.price;
        }
        return total;
    }

    const getFinalIngredients = () => {
        const baseIngredients = [...pizza.ingredients];
        const addedIngredientNames = selectedIngredients.map(ing => ing.tname);
        return [...baseIngredients, ...addedIngredientNames];
    }

    const handleAddToCart = () => {
        if (onSuccess) {
            onSuccess()
        }
        onClose()
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close-btn" onClick={onClose}>×</button>

                <div className="customize-modal-header">
                    <h2>Customize {pizza.name}</h2>
                    <div className="pizza-preview">
                        <img src={pizza.image} alt={pizza.name} className="pizza-preview-image" />
                        <div className="pizza-preview-info">
                            <p className="pizza-preview-name">{pizza.name}</p>
                            <p className="pizza-base-price">Base Price: ₹{pizza.price.toFixed(2)}</p>
                            <div className="base-ingredients">
                                <strong>Base Ingredients:</strong>
                                <p>{pizza.ingredients.join(", ")}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="customize-modal-body">
                    <h3>Add Extra Ingredients</h3>
                    <div className="ingredients-list">
                        {ingredients.map((ingredient) => {
                            const isSelected = selectedIngredients.some(item => item.id === ingredient.id)
                            return (
                                <div key={ingredient.id} className="ingredient-item">
                                    <img
                                        src={ingredient.image || `https://picsum.photos/80/80?random=${ingredient.id}`}
                                        alt={ingredient.tname}
                                        className="ingredient-image"
                                    />
                                    <div className="ingredient-info">
                                        <span className="ingredient-name">{ingredient.tname}</span>
                                        <span className="ingredient-price">₹{ingredient.price.toFixed(2)}</span>
                                    </div>
                                    <div className="ingredient-controls">
                                        <input
                                            type="checkbox"
                                            checked={isSelected}
                                            onChange={() => handleIngredientToggle(ingredient)}
                                            className="ingredient-checkbox"
                                        />
                                        <span className="add-text">Add</span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    {selectedIngredients.length > 0 && (
                        <div className="added-ingredients">
                            <strong>Added Ingredients:</strong>
                            <p>{selectedIngredients.map(ing => ing.tname).join(", ")}</p>
                        </div>
                    )}

                    <div className="final-ingredients">
                        <strong>Final Ingredients:</strong>
                        <p>{getFinalIngredients().join(", ")}</p>
                    </div>
                </div>

                <div className="customize-modal-footer">
                    <div className="total-cost">
                        <span>Total Price: ₹{calculateTotalPrice().toFixed(2)}</span>
                    </div>
                    <AddToCartButton
                        isCustomPizza={false}
                        isCustomized={selectedIngredients.length > 0}
                        data={{
                            pizza: pizza,
                            basePizza: pizza._id,
                            ingredients: getFinalIngredients(),
                            addedIngredients: selectedIngredients.map(ing => ing.tname),
                            price: calculateTotalPrice(),
                            quantity: 1
                        }}
                        className="add-to-cart-customize-btn"
                        onSuccess={handleAddToCart}
                    />
                </div>
            </div>
        </div>
    )
}

export default CustomizePizzaModal
