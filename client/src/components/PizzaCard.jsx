import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";


function PizzaCard({ pizza, onOrderNow }) {
  const navigate = useNavigate();
  // const handleQuickOrder = async () => {
  //   try {
  //     const token = localStorage.getItem("token");

  //     const response = await API.post(
  //       "/orders",
  //       {
  //         pizza: pizza._id,

  //         base: "Regular",

  //         sauce: "Tomato",

  //         cheese: "Mozzarella",

  //         vegetables: [],

  //         totalPrice: pizza.price,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       },
  //     );

  //     navigate(`/order/${response.data.order._id}`);
  //   } catch (error) {
  //     console.log(error);

  //     alert("Unable to place order");
  //   }
  // };
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition">
      <img
        src={pizza.image}
        alt={pizza.name}
        className="h-56 w-full object-cover"
      />

      <div className="p-6">
        <h2 className="text-2xl font-bold">{pizza.name}</h2>

        <p className="text-gray-500 mt-2">{pizza.description}</p>

        <h3 className="text-3xl text-red-600 font-bold mt-4">₹{pizza.price}</h3>

        <div className="flex gap-3 mt-6">
          <Link
            to={`/pizza/${pizza._id}`}
            className="block w-full text-center bg-red-600 text-white py-3 rounded-xl hover:bg-red-700"
          >
            View Pizza
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PizzaCard;
