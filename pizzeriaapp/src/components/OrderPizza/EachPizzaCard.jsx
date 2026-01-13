import { useState } from "react"
import "./OrderPizza.css"
import AddToCartButton from "../../utils/AddToCartButton"
import CustomizePizzaModal from "../CustomizePizza/CustomizePizzaModal"

const EachPizzaCard = ({ pizza }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    if (!pizza) return null

    const handleModalClose = () => {
        setIsModalOpen(false)
    }

    return (
        <>
            <div className="pizza-card">
                <div className="pizza-left">
                    <h2 className="pizza-title">
                        {pizza.name}
                        {pizza.type === "veg" && <span className="veg-indicator"></span>}
                        {pizza.type === "nonveg" && <span className="nonveg-indicator"></span>}
                        <div className="price">₹{pizza.price.toFixed(2)}</div>
                    </h2>
                </div>

                <div className="pizza-center">
                    <p className="pizza-desc">{pizza.description}</p>

                    <p>
                        <strong>Ingredients:</strong> {pizza.ingredients.join(", ")}
                    </p>

                    <p>
                        <strong>Toppings:</strong> {pizza.topping.join(", ")}
                    </p>
                </div>

                <div className="pizza-right">
                    <img
                        src={pizza.image}
                        alt={`${pizza.name} Pizza`}
                    />

                    <div className="pizza-buttons">
                        {/* Normal Add To Cart */}
                        <AddToCartButton
                            isCustomized={false}
                            data={{
                                basePizza: pizza._id,
                                ingredients: pizza.ingredients,
                                addedIngredients: [],
                                price: pizza.price,
                                quantity: 1
                            }}
                            className="add-to-cart-btn"
                        />

                        {/* Customize */}
                        <button
                            className="customize-btn"
                            onClick={() => setIsModalOpen(true)}
                        >
                            Customize & Add
                        </button>
                    </div>
                </div>
            </div>

            <CustomizePizzaModal
                pizza={pizza}
                isOpen={isModalOpen}
                onClose={handleModalClose}
            />
        </>
    )
}

export default EachPizzaCard
