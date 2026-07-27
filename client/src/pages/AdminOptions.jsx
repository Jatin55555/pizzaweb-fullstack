import { useEffect, useState } from "react";
import API from "../api/axios";

function AdminOptions() {
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    type: "Base",
    price: "",
    isAvailable: true,
  });

  useEffect(() => {
    fetchOptions();
  }, []);

  const fetchOptions = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await API.get("/options", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setItems(response.data.options);
    } catch (error) {
      console.log(error);
    }
  };
  const saveOption = async () => {
    try {
      const token = localStorage.getItem("token");

      if (editingId) {
        await API.put(`/options/${editingId}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        await API.post("/options", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      fetchOptions();

      setShowModal(false);
      setEditingId(null);

      setFormData({
        name: "",
        type: "Base",
        price: "",
        isAvailable: true,
      });
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Operation failed");
    }
  };

  const deleteOption = async (id) => {
    if (!window.confirm("Delete this option?")) return;

    try {
      const token = localStorage.getItem("token");

      await API.delete(`/options/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchOptions();

      alert("Option deleted successfully!");
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Failed to delete option");
    }
  };

  return (
    <div>
      {/* Header */}

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Custom Options</h1>

        <button
          onClick={() => {
            setEditingId(null);

            setFormData({
              name: "",
              type: "Base",
              price: "",
              isAvailable: true,
            });

            setShowModal(true);
          }}
          className="bg-red-600 text-white px-5 py-3 rounded-lg hover:bg-red-700"
        >
          + Add Option
        </button>
      </div>

      {/* Table */}

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-red-600 text-white">
            <tr>
              <th className="text-left p-4">Name</th>
              <th className="text-left p-4">Type</th>
              <th className="text-left p-4">Price</th>
              <th className="text-left p-4">Available</th>
              <th className="text-left p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item) => (
              <tr key={item._id} className="border-b hover:bg-gray-50">
                <td className="p-4 font-semibold">{item.name}</td>

                <td className="p-4">{item.type}</td>

                <td className="p-4">
                  {item.price > 0 ? `₹${item.price}` : "Free"}
                </td>

                <td className="p-4">
                  {item.isAvailable ? (
                    <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-semibold">
                      Available
                    </span>
                  ) : (
                    <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
                      Unavailable
                    </span>
                  )}
                </td>

                <td className="p-4 flex gap-4">
                  <button
                    onClick={() => {
                      setEditingId(item._id);

                      setFormData({
                        name: item.name,
                        type: item.type,
                        price: item.price,
                        isAvailable: item.isAvailable,
                      });

                      setShowModal(true);
                    }}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteOption(item._id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {items.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-10 text-gray-500">
                  No options found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-8 w-[450px] shadow-xl">
            <h2 className="text-2xl font-bold mb-6">
              {editingId ? "Edit Option" : "Add Option"}
            </h2>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Option Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value,
                  })
                }
                className="w-full border p-3 rounded-lg"
              />

              <select
                value={formData.type}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    type: e.target.value,
                  })
                }
                className="w-full border p-3 rounded-lg"
              >
                <option>Base</option>
                <option>Sauce</option>
                <option>Cheese</option>
                <option>Vegetable</option>
                <option>Size</option>
              </select>

              <input
                type="number"
                placeholder="Extra Price"
                value={formData.price}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    price: e.target.value,
                  })
                }
                className="w-full border p-3 rounded-lg"
              />

              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={formData.isAvailable}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      isAvailable: e.target.checked,
                    })
                  }
                />
                Available
              </label>
            </div>

            <div className="flex justify-end gap-4 mt-8">
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditingId(null);

                  setFormData({
                    name: "",
                    type: "Base",
                    price: "",
                    isAvailable: true,
                  });
                }}
                className="px-5 py-2 border rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={saveOption}
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

export default AdminOptions;
