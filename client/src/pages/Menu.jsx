import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import PizzaCard from "../components/PizzaCard";

function Menu() {
  const [pizzas, setPizzas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPizzas();
  }, []);

  const fetchPizzas = async () => {
  try {
    const [pizzaRes, optionRes] = await Promise.all([
      API.get("/pizzas"),
      API.get("/custom-options"),
    ]);

    setPizzas(
      pizzaRes.data.pizzas.map((pizza) => ({
        ...pizza,
        options: optionRes.data.options,
      }))
    );
  } catch (error) {
    console.log(error);
  }
};

  const handleOrderNow = async (pizza) => {
    try {
      const token = localStorage.getItem("token");

      const response = await API.post(
        "/orders",
        {
          pizza: pizza._id,

          // Default selections
          base: "Classic Hand Tossed",
          sauce: "Tomato Basil",
          cheese: "Mozzarella",
          vegetables: [],

          totalPrice: pizza.price,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate(`/order/${response.data.order._id}`);
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Failed to create order");
    }
  };

  return (
    <>
      <Navbar />

      <div className="bg-gray-100 min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-6">

          <h1 className="text-5xl font-bold text-center mb-12">
            🍕 Our Menu
          </h1>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pizzas.map((pizza) => (
              <PizzaCard
                key={pizza._id}
                pizza={pizza}
                onOrderNow={handleOrderNow}
              />
            ))}
          </div>

        </div>
      </div>
    </>
  );
}

export default Menu;