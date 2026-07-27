import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Navbar() {
  const navigate = useNavigate();
  const { cartCount } = useCart();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("cart");

    navigate("/login", { replace: true });
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-5">
        {/* Logo */}
        <Link to="/home" className="text-3xl font-extrabold text-red-600">
          🍕 PizzaWorld
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-8 font-semibold">
          <Link to="/home" className="hover:text-red-600">
            Home
          </Link>

          <Link to="/menu" className="hover:text-red-600">
            Menu
          </Link>

          <Link to="/build-your-own" className="hover:text-red-600">
            Build Your Own
          </Link>

          <Link to="/my-orders" className="hover:text-red-600">
            My Orders
          </Link>

          <Link to="/about" className="hover:text-red-600">
            About
          </Link>

          <Link to="/cart" className="hover:text-red-600 font-bold">
            🛒 Cart ({cartCount})
          </Link>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
