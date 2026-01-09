import { useState, useEffect } from "react"
import axios from "axios"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import AddToCartButton from "../utils/AddToCartButton"
import "./BuildPizza.css"

const BuildPizza = () => {
    const [ingredients, setIngredients] = useState([])
    const [selectedIngredients, setSelectedIngredients] = useState([])

    useEffect(() => {
        const fetchIngredients = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/ingredients/all")
                setIngredients(response.data)
            } catch (err) {
                console.log(err)
            }
        }

        fetchIngredients()
    }, [])

    const handleIngredientToggle = (ingredient) => {
        setSelectedIngredients((prevSelected) => {
            const found = prevSelected.find(item => item.id === ingredient.id);

            if (found) {
                // Remove the ingredient if it's already selected
                return prevSelected.filter(item => item.id !== ingredient.id);
            } else {
                // Add the ingredient if it's not selected
                return [...prevSelected, ingredient];
            }
        });
    }

    const calculateTotal = () => {
        let total = 0;
        for (const ingredient of selectedIngredients) {
            total += ingredient.price;
        }
        return total;
    }

    const handleClearSelectedIngredients = () => {
        setSelectedIngredients([])
    }

    return (
        <>
            <Navbar />
            <div className="build-pizza-container">
                <div className="build-pizza-header">
                    <h1>Pizzeria now gives you options to build your own pizza.</h1>
                    <p>Customize your pizza by choosing ingredients from the list given below.</p>
                </div>

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

                <div className="total-cost">
                    <span>Total Cost: {calculateTotal()}</span>
                </div>

                <AddToCartButton
                    isCustomPizza={true}
                    data={{
                        ingredients: selectedIngredients.map(ingredient => ingredient.tname),
                        price: calculateTotal(),
                        quantity: 1
                    }}
                    className="build-pizza-btn"
                    onSuccess={handleClearSelectedIngredients}
                />
            </div>
            <Footer />
        </>
    )
}

export default BuildPizza
