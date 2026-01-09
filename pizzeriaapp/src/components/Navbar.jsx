import logo from "../assets/logo.png";
import { Link } from "react-router";

const Navbar = () => {
    return (
        <div className="nav-container">
            <nav className="navbar">
                <div className="nav-left">
                    <h3 className="nav-title">Pizzeria</h3>
                    <Link to={'/'}>
                        <img src={logo} alt="Pizzeria" className="nav-logo" />
                    </Link>
                    <ul className="nav-links">
                        <Link className="link" to={'/order'}>Order Pizza</Link>
                        <Link className="link" to={'/build'}>Build Ur Pizza</Link>
                    </ul>
                </div>

                <Link to={'/cart'} className="cart-btn link">Shopping cart</Link>
            </nav>
        </div>
    );
};

export default Navbar;
