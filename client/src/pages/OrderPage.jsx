import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";

function OrderPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await API.get(`/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrder(response.data.order);
    } catch (error) {
      console.log(error);
    }
  };

  if (!order) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h1 className="text-3xl font-bold">Loading Order...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">

        <h1 className="text-4xl font-bold mb-2">
          🍕 Order Summary
        </h1>

        <p className="text-gray-500 mb-8">
          Order ID: {order._id}
        </p>

        <div className="bg-yellow-100 text-yellow-700 px-4 py-3 rounded-xl mb-8">
          <span className="font-semibold">Status:</span> {order.status}
        </div>

        <div className="space-y-6">

          {order.items.map((item, index) => (
            <div
              key={index}
              className="border rounded-xl p-5"
            >
              <div className="flex justify-between">

                <div>
                  <h2 className="text-2xl font-bold">
                    {item.pizza.name}
                  </h2>

                  <p>Quantity: {item.quantity}</p>
                  <p>Base: {item.base}</p>
                  <p>Sauce: {item.sauce}</p>
                  <p>Cheese: {item.cheese}</p>

                  <p>
                    Vegetables:
                    {item.vegetables.length
                      ? ` ${item.vegetables.join(", ")}`
                      : " None"}
                  </p>

                  <p>
                    Type:
                    {item.isCustomized
                      ? " Customized"
                      : " Regular"}
                  </p>
                </div>

                <h2 className="text-2xl font-bold text-red-600">
                  ₹{item.price}
                </h2>

              </div>
            </div>
          ))}

          <hr />

          <div className="flex justify-between text-lg">
            <span>Subtotal</span>
            <span>₹{order.subtotal}</span>
          </div>

          <div className="flex justify-between text-lg">
            <span>Delivery Fee</span>
            <span>₹{order.deliveryFee}</span>
          </div>

          <div className="flex justify-between text-3xl font-bold text-red-600">
            <span>Total</span>
            <span>₹{order.totalAmount}</span>
          </div>

          <hr />

          <div className="flex justify-between">
            <span>Status</span>
            <span className="font-bold text-orange-600">
              {order.status}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Payment</span>
            <span className="font-bold">
              {order.paymentStatus}
            </span>
          </div>

        </div>

      </div>
    </div>
  );
}

export default OrderPage;