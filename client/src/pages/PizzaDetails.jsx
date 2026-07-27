import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext";

function PizzaDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pizza, setPizza] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchPizza();
  }, []);

  const fetchPizza = async () => {
    try {
      const response = await API.get(`/pizzas/${id}`);
      setPizza(response.data.pizza);
    } catch (error) {
      console.log(error);
    }
  };

  if (!pizza) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h1 className="text-3xl font-bold">Loading Pizza...</h1>
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <div className="bg-gray-100 min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden grid lg:grid-cols-2">
            {/* Left Side */}
            <img
              src={pizza.image}
              alt={pizza.name}
              className="w-full h-full object-cover"
            />

            {/* Right Side */}
            <div className="p-10">
              <span className="bg-red-100 text-red-600 px-4 py-1 rounded-full font-semibold">
                Best Seller
              </span>

              <h1 className="text-5xl font-extrabold mt-5">{pizza.name}</h1>

              <p className="text-gray-500 mt-5 text-lg">{pizza.description}</p>

              <h2 className="text-5xl text-red-600 font-extrabold mt-8">
                ₹{pizza.price}
              </h2>

              <div className="mt-10 space-y-4">
                <button
                  onClick={() => {
                    addToCart({
                      id: crypto.randomUUID(),

                      pizza,

                      base: "Regular",

                      sauce: "Tomato",

                      cheese: "Mozzarella",

                      vegetables: [],

                      totalPrice: pizza.price,
                    });

                    alert("Pizza added to cart!");
                  }}
                  className="w-full bg-red-600 text-white py-4 rounded-xl hover:bg-red-700"
                >
                 Add to Cart
                </button>

                <Link
                  to={`/customize/${pizza._id}`}
                  className="block text-center border-2 border-red-600 text-red-600 py-4 rounded-xl hover:bg-red-600 hover:text-white transition"
                >
                  Customize Pizza
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PizzaDetails;
