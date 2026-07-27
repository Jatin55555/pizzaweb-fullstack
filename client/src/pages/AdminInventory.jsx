import { useEffect, useState } from "react";
import API from "../api/axios";

function AdminInventory() {
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    unit: "kg",
    lowStockLimit: "",
  });

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await API.get("/inventory", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setItems(response.data.items);
    } catch (error) {
      console.log(error);
    }
  };

  const addIngredient = async () => {
    try {
      const token = localStorage.getItem("token");

      if (editingId) {
        await API.put(`/inventory/${editingId}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        await API.post("/inventory", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      fetchInventory();

      setShowModal(false);

      setEditingId(null);

      setFormData({
        name: "",
        quantity: "",
        unit: "kg",
        lowStockLimit: "",
      });
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Operation failed");
    }
  };

  const deleteIngredient = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this ingredient?"
  );

  if (!confirmDelete) return;

  try {
    const token = localStorage.getItem("token");

    await API.delete(`/inventory/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchInventory();

    alert("Ingredient deleted successfully!");
  } catch (error) {
    console.log(error);

    alert(error.response?.data?.message || "Failed to delete ingredient");
  }
};

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Inventory Management</h1>

        <button
          onClick={() => setShowModal(true)}
          className="bg-red-600 text-white px-5 py-3 rounded-lg hover:bg-red-700"
        >
          + Add Ingredient
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-red-600 text-white">
            <tr>
              <th className="text-left p-4">Ingredient</th>
              <th className="text-left p-4">Quantity</th>
              <th className="text-left p-4">Unit</th>
              <th className="text-left p-4">Low Stock</th>
              <th className="text-left p-4">Status</th>
              <th className="text-left p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item) => (
              <tr key={item._id} className="border-b hover:bg-gray-50">
                <td className="p-4 font-semibold">{item.name}</td>

                <td className="p-4">{item.quantity}</td>

                <td className="p-4">{item.unit}</td>

                <td className="p-4">{item.lowStockLimit}</td>

                <td className="p-4">
                  {item.quantity <= item.lowStockLimit ? (
                    <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
                      Low Stock
                    </span>
                  ) : (
                    <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-semibold">
                      In Stock
                    </span>
                  )}
                </td>

                <td className="p-4 flex gap-3">
                  <button
                    onClick={() => {
                      setEditingId(item._id);

                      setFormData({
                        name: item.name,
                        quantity: item.quantity,
                        unit: item.unit,
                        lowStockLimit: item.lowStockLimit,
                      });

                      setShowModal(true);
                    }}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>

                  <button
  onClick={() => deleteIngredient(item._id)}
  className="text-red-600 hover:underline"
>
  Delete
</button>
                </td>
              </tr>
            ))}

            {items.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-10 text-gray-500">
                  No ingredients found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-8 w-[450px] shadow-xl">
            <h2 className="text-2xl font-bold mb-6">
              {editingId ? "Edit Ingredient" : "Add Ingredient"}
            </h2>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Ingredient Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value,
                  })
                }
                className="w-full border p-3 rounded-lg"
              />

              <input
                type="number"
                placeholder="Quantity"
                value={formData.quantity}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    quantity: e.target.value,
                  })
                }
                className="w-full border p-3 rounded-lg"
              />

              <select
                value={formData.unit}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    unit: e.target.value,
                  })
                }
                className="w-full border p-3 rounded-lg"
              >
                <option value="kg">kg</option>
                <option value="g">g</option>
                <option value="L">L</option>
                <option value="ml">ml</option>
                <option value="pieces">pieces</option>
              </select>

              <input
                type="number"
                placeholder="Low Stock Limit"
                value={formData.lowStockLimit}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    lowStockLimit: e.target.value,
                  })
                }
                className="w-full border p-3 rounded-lg"
              />
            </div>

            <div className="flex justify-end gap-4 mt-8">
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditingId(null);

                  setFormData({
                    name: "",
                    quantity: "",
                    unit: "kg",
                    lowStockLimit: "",
                  });
                }}
                className="px-5 py-2 border rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={addIngredient}
                className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700"
              >
                {editingId ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminInventory;
