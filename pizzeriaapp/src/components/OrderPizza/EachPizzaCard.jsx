import "./OrderPizza.css"

const EachPizzaCard = ({ pizza }) => {
    if (!pizza) {
        return null
    }

    return (
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
                <p className="pizza-desc">
                    {pizza.description}
                </p>

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

                <button className="add-to-cart-btn">Add to Cart</button>
            </div>
        </div>
    );
};
export default EachPizzaCard