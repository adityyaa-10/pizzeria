import logo from "../assets/logo.png";
// import { Link } from "react-router";

const Navbar = () => {
    return (
        <div className="nav-container">
            <nav className="navbar">
                <div className="nav-left">
                    <h3 className="nav-title">Pizzeria</h3>
                    <img src={logo} alt="Pizzeria" className="nav-logo" />
                    <ul className="nav-links">
                        <li>Order Pizza</li>
                        <li>Build Ur Pizza</li>
                    </ul>
                </div>

                <button className="cart-btn">Shopping cart</button>
            </nav>
        </div>
    );
};

export default Navbar;
