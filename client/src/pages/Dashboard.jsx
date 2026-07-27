import { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    fetchPizzas();
  }, []);

  const fetchPizzas = async () => {
    try {
      const response = await API.get("/pizzas");
      setPizzas(response.data.pizzas);
    } catch (error) {
      console.log(error);
    }
  };
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-4xl font-bold text-center mb-10">🍕 Pizza Menu</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {pizzas.map((pizza) => (
          <div
            key={pizza._id}
            className="bg-white rounded-xl shadow-md overflow-hidden"
          >
            <img
              src={pizza.image}
              alt={pizza.name}
              className="w-full h-52 object-cover"
            />

            <div className="p-5">
              <h2 className="text-2xl font-bold">{pizza.name}</h2>

              <p className="text-gray-600 mt-2">{pizza.description}</p>

              <p className="text-xl font-semibold text-red-600 mt-4">
                ₹{pizza.price}
              </p>

              <button
                onClick={() => navigate(`/customize/${pizza._id}`)}
                className="mt-5 w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
              >
                Customize
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
