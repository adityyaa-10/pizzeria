import { useState, useEffect } from "react"
import axios from "axios"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import EachCartItem from "../components/Cart/EachCartItem"
import "./Cart.css"

const CartPage = () => {
    const [cartItems, setCartItems] = useState([])

    const fetchCartItems = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/cart/all")
            setCartItems(response.data)
        } catch (error) {
            console.error("Error fetching cart items:", error)
        }
    }

    useEffect(() => {
        fetchCartItems()
    }, [])

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            return total + (item.price * item.quantity)
        }, 0)
    }

    const handleCheckout = () => {
        alert("Checkout functionality coming soon!")
    }


    return (
        <>
            <Navbar />
            <div className="cart-container">
                <div className="cart-layout">
                    {/* Shopping Cart Section */}
                    <div className="shopping-cart-section">
                        <h2 className="section-title">Shopping Cart</h2>
                        {cartItems.length === 0 ? (
                            <div className="empty-cart">
                                <p>Your cart is empty</p>
                            </div>
                        ) : (
                            <div className="cart-items-list">
                                {cartItems.map((item) => (
                                    <EachCartItem
                                        key={item._id}
                                        item={item}
                                        onQuantityChange={fetchCartItems}
                                        onDelete={fetchCartItems}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Bill Summary Section */}
                    <div className="bill-summary-section">
                        <h2 className="section-title">Bill Summary</h2>
                        {cartItems.length > 0 ? (
                            <>
                                <div className="bill-table">
                                    <div className="bill-header">
                                        <div className="bill-header-cell">Item</div>
                                        <div className="bill-header-cell">Quantity</div>
                                        <div className="bill-header-cell">Price</div>
                                    </div>
                                    {cartItems.map((item) => (
                                        <div key={item._id} className="bill-row">
                                            <div className="bill-cell">{item.name}</div>
                                            <div className="bill-cell">{item.quantity}</div>
                                            <div className="bill-cell">₹{(item.price * item.quantity).toFixed(2)}</div>
                                        </div>
                                    ))}
                                </div>
                                <div className="total-price">
                                    <span className="total-label">Total Price:</span>
                                    <span className="total-value">₹{calculateTotal().toFixed(2)}</span>
                                </div>
                                <button
                                    className="checkout-btn"
                                    onClick={handleCheckout}
                                >
                                    Checkout
                                </button>
                            </>
                        ) : (
                            <div className="empty-bill">
                                <p>No items in cart</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default CartPage