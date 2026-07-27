import { useEffect, useState } from "react";
import API from "../api/axios";

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await API.get("/admin/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(response.data.orders);
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (orderId, status) => {
    try {
      const token = localStorage.getItem("token");

      await API.patch(
        `/admin/orders/${orderId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchOrders();
    } catch (error) {
      console.log(error);
      alert("Failed to update status");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Order Received":
        return "bg-yellow-100 text-yellow-700 border-yellow-300";

      case "Preparing":
        return "bg-blue-100 text-blue-700 border-blue-300";

      case "Baking":
        return "bg-orange-100 text-orange-700 border-orange-300";

      case "Out for Delivery":
        return "bg-purple-100 text-purple-700 border-purple-300";

      case "Delivered":
        return "bg-green-100 text-green-700 border-green-300";

      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-2">🍕 Orders Management</h1>

      <p className="text-gray-500 mb-8">
        Manage all customer orders from one place.
      </p>

      <div className="space-y-8">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between md:items-start gap-6">
              <div>
                <h2 className="text-2xl font-bold">
                  {order.user.name}
                </h2>

                <p className="text-gray-500">
                  {order.user.email}
                </p>

                <p className="text-sm text-gray-400 mt-2 break-all">
                  Order ID:
                  <span className="font-medium">
                    {" "}
                    {order._id}
                  </span>
                </p>
              </div>

              <div className="text-left md:text-right">
                <h2 className="text-3xl font-bold text-red-600">
                  ₹{order.totalAmount}
                </h2>

                <p className="text-gray-500 mt-2 text-sm">
                  {new Date(order.createdAt).toLocaleString()}
                </p>

                <select
                  value={order.status}
                  onChange={(e) =>
                    updateStatus(order._id, e.target.value)
                  }
                  className={`mt-4 px-4 py-2 rounded-lg border font-semibold ${getStatusColor(
                    order.status
                  )}`}
                >
                  <option>Order Received</option>
                  <option>Preparing</option>
                  <option>Baking</option>
                  <option>Out for Delivery</option>
                  <option>Delivered</option>
                </select>
              </div>
            </div>

            <hr className="my-6" />

            {/* Items */}
            <div className="space-y-4">
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-gray-50 rounded-xl p-4"
                >
                  <div>
                    <h3 className="text-lg font-semibold">
                      🍕 {item.pizza.name}
                    </h3>

                    <p className="text-gray-500 text-sm">
                      Quantity: {item.quantity}
                    </p>

                    <p className="text-gray-500 text-sm">
                      Base: {item.base}
                    </p>

                    <p className="text-gray-500 text-sm">
                      Sauce: {item.sauce}
                    </p>

                    <p className="text-gray-500 text-sm">
                      Cheese: {item.cheese}
                    </p>

                    <p className="text-gray-500 text-sm">
                      Vegetables:{" "}
                      {item.vegetables.length > 0
                        ? item.vegetables.join(", ")
                        : "None"}
                    </p>

                    {item.isCustomized && (
                      <span className="inline-block mt-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                        Customized Pizza
                      </span>
                    )}
                  </div>

                  <div className="text-right">
                    <h2 className="text-2xl font-bold text-red-600">
                      ₹{item.price}
                    </h2>
                  </div>
                </div>
              ))}
            </div>

            <hr className="my-6" />

            {/* Bill */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{order.subtotal}</span>
              </div>

              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>₹{order.deliveryFee}</span>
              </div>

              <div className="flex justify-between text-2xl font-bold text-red-600">
                <span>Total</span>
                <span>₹{order.totalAmount}</span>
              </div>

              <div className="flex justify-between mt-4">
                <span>Payment Status</span>

                <span
                  className={`font-semibold ${
                    order.paymentStatus === "Paid"
                      ? "text-green-600"
                      : order.paymentStatus === "Failed"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  {order.paymentStatus}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminOrders;