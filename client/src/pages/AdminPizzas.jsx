import { useEffect, useState } from "react";
import API from "../api/axios";

function AdminPizzas() {
  const [pizzas, setPizzas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingPizza, setEditingPizza] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "Veg",
  });

  useEffect(() => {
    fetchPizzas();
  }, []);

  const fetchPizzas = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await API.get("/admin/pizzas", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPizzas(response.data.pizzas);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddPizza = async () => {
    try {
      const token = localStorage.getItem("token");

      if (editingPizza) {
        await API.put(`/admin/pizzas/${editingPizza._id}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        alert("Pizza Updated Successfully!");
      } else {
        await API.post("/admin/pizzas", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        alert("Pizza Added Successfully!");
      }

      fetchPizzas();

      setShowModal(false);

      setEditingPizza(null);

      setFormData({
        name: "",
        description: "",
        price: "",
        image: "",
        category: "Veg",
      });
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  const handleDelete = async (pizzaId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this pizza?",
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      await API.delete(`/admin/pizzas/${pizzaId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Pizza deleted successfully!");

      fetchPizzas();
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Failed to delete pizza");
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">🍕 Pizza Management</h1>

        <button
          onClick={() => setShowModal(true)}
          className="bg-red-600 text-white px-5 py-3 rounded-lg hover:bg-red-700"
        >
          + Add Pizza
        </button>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {pizzas.map((pizza) => (
          <div
            key={pizza._id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            <img
              src={pizza.image}
              alt={pizza.name}
              className="w-full h-56 object-cover"
            />

            <div className="p-5">
              <h2 className="text-2xl font-bold">{pizza.name}</h2>

              <p className="text-gray-500 mt-2">{pizza.description}</p>

              <h3 className="text-3xl text-red-600 font-bold mt-4">
                ₹{pizza.price}
              </h3>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => {
                    setEditingPizza(pizza);

                    setFormData({
                      name: pizza.name,
                      description: pizza.description,
                      price: pizza.price,
                      image: pizza.image,
                      category: pizza.category,
                    });

                    setShowModal(true);
                  }}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(pizza._id)}
                  className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-lg rounded-2xl p-8 shadow-xl">
            <h2 className="text-3xl font-bold mb-6">
              {editingPizza ? "Edit Pizza" : "Add New Pizza"}
            </h2>

            <div className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Pizza Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              />

              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              />

              <input
                type="number"
                name="price"
                placeholder="Price"
                value={formData.price}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              />

              <input
                type="text"
                name="image"
                placeholder="Image URL"
                value={formData.image}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              />

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              >
                <option>Veg</option>
                <option>Non Veg</option>
              </select>
            </div>

            <div className="flex justify-end gap-4 mt-8">
              <button
                onClick={() => {
                  setShowModal(false);

                  setEditingPizza(null);

                  setFormData({
                    name: "",
                    description: "",
                    price: "",
                    image: "",
                    category: "Veg",
                  });
                }}
                className="px-5 py-3 rounded-lg border"
              >
                Cancel
              </button>

              <button
                onClick={handleAddPizza}
                className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700"
              >
                {editingPizza ? "Update Pizza" : "Add Pizza"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminPizzas;
