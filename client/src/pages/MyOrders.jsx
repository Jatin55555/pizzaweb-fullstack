import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";
import Navbar from "../components/Navbar";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await API.get("/orders/my-orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(response.data.orders || []);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 py-10">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-5xl font-bold mb-10">📦 My Orders</h1>

          {loading ? (
            <div className="bg-white rounded-xl shadow p-8 text-center">
              <h2 className="text-2xl font-bold">Loading...</h2>
            </div>
          ) : orders.length === 0 ? (
            <div className="bg-white rounded-xl shadow p-8 text-center">
              <h2 className="text-2xl font-bold">No orders yet.</h2>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="bg-white rounded-xl shadow-lg p-6"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-xl font-bold">
                        Order #{order._id?.slice(-6)}
                      </h2>

                      <p className="text-gray-500">
                        {new Date(order.createdAt).toLocaleString()}
                      </p>

                      <p className="mt-2">
                        Items: {order.items?.length || 0}
                      </p>

                      <div className="mt-3">
                        {order.items?.map((item, index) => (
                          <div key={index} className="text-gray-600 text-sm">
                            🍕 {item.pizza?.name || "Pizza"} × {item.quantity}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="text-right">
                      <h2 className="text-3xl font-bold text-red-600">
                        ₹{order.totalAmount}
                      </h2>

                      <p className="text-orange-600 font-semibold">
                        {order.status}
                      </p>

                      <p className="text-green-600">
                        {order.paymentStatus}
                      </p>
                    </div>
                  </div>

                  <Link
                    to={`/order/${order._id}`}
                    className="inline-block mt-5 bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700"
                  >
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default MyOrders;