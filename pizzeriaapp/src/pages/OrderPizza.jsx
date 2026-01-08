import { useState, useEffect } from "react"
import axios from "axios"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import EachPizzaCard from "../components/OrderPizza/EachPizzaCard"
import "../components/OrderPizza/OrderPizza.css"

const OrderPizza = () => {
    const [pizzas, setPizzas] = useState([])

    useEffect(() => {
        const fetchPizzas = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/pizzas/all")
                setPizzas(response.data)
            } catch (err) {
                console.log(err);
            }
        }

        fetchPizzas()
    }, [])

    return (
        <>
            <Navbar />
            <div className="pizza-list">
                {pizzas.map((pizza) => (
                    <EachPizzaCard key={pizza._id} pizza={pizza} />
                ))}
            </div>
            <Footer />
        </>
    )
}

export default OrderPizza