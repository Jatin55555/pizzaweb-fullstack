import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Navbar from "../components/Navbar";
import API from "../api/axios";

function Cart() {
  const navigate = useNavigate();

  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    cartTotal,
  } = useCart();

  
  const handleCheckout = async () => {
    
    try {
      const token = localStorage.getItem("token");

      // Create Razorpay Order
      const orderResponse = await API.post(
        "/payment/create-order",
        {
          amount: cartTotal + 40,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const razorpayOrder = orderResponse.data.order;
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,

        amount: razorpayOrder.amount,

        currency: razorpayOrder.currency,

        name: "PizzaWeb",

        description: "Pizza Order",

        order_id: razorpayOrder.id,

        handler: async function (response) {
          

          try {
            
           const items = cartItems.map((item) => ({
  pizza: item.pizza._id,
  base: item.base,
  sauce: item.sauce,
  cheese: item.cheese,
  vegetables: item.vegetables,
  quantity: item.quantity,
  price: item.totalPrice,
  isCustomized: item.isCustomized,
}));



            const verifyResponse = await API.post(
              "/payment/verify",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,

                items,
                subtotal: cartTotal,
                deliveryFee: 40,
                totalAmount: cartTotal + 40,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              },
            );
    

            clearCart();

            alert("Payment Successful!");

            navigate(`/order/${verifyResponse.data.order._id}`);
          } catch (error) {
  console.error(error);

  alert(
    error.response?.data?.message ||
    "Payment verification failed."
  );
}
        },

        theme: {
          color: "#dc2626",
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.open();
    }catch (error) {
  console.error(error);

  alert(error.response?.data?.message || "Payment Failed");
}
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 py-10">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-5xl font-bold mb-10">🛒 My Cart</h1>

          {cartItems.length === 0 ? (
            <div className="bg-white rounded-2xl shadow p-10 text-center">
              <h2 className="text-2xl font-bold">Your cart is empty</h2>

              <Link
                to="/menu"
                className="inline-block mt-6 bg-red-600 text-white px-6 py-3 rounded-xl"
              >
                Browse Menu
              </Link>
            </div>
          ) : (
            <>
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl shadow-lg p-6 flex gap-6"
                  >
                    {/* Pizza Image */}

                    <img
                      src={item.pizza.image}
                      alt={item.pizza.name}
                      className="w-40 h-40 object-cover rounded-xl"
                    />

                    {/* Pizza Info */}

                    <div className="flex-1">
                      <h2 className="text-2xl font-bold">{item.pizza.name}</h2>

                      <p className="text-gray-500 mt-2">Base: {item.base}</p>

                      <p className="text-gray-500">Sauce: {item.sauce}</p>

                      <p className="text-gray-500">Cheese: {item.cheese}</p>

                      {item.vegetables.length > 0 && (
                        <p className="text-gray-500">
                          Veggies: {item.vegetables.join(", ")}
                        </p>
                      )}

                      <h3 className="text-2xl font-bold text-red-600 mt-4">
                        ₹{item.totalPrice}
                      </h3>
                    </div>

                    {/* Quantity */}

                    <div className="flex flex-col justify-between items-center">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => decreaseQuantity(item.id)}
                          className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300"
                        >
                          -
                        </button>

                        <span className="text-xl font-bold">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() => increaseQuantity(item.id)}
                          className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-600 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary */}

              <div className="bg-white rounded-2xl shadow-lg p-8 mt-10">
                <div className="flex justify-between text-lg mb-4">
                  <span>Subtotal</span>
                  <span>₹{cartTotal}</span>
                </div>

                <div className="flex justify-between text-lg mb-4">
                  <span>Delivery Fee</span>
                  <span>₹40</span>
                </div>

                <hr className="my-5" />

                <div className="flex justify-between text-3xl font-bold">
                  <span>Total</span>
                  <span>₹{cartTotal + 40}</span>
                </div>

                <div className="flex gap-4 mt-8">
                  <Link
                    to="/menu"
                    className="flex-1 border-2 border-red-600 text-red-600 py-3 rounded-xl text-center hover:bg-red-600 hover:text-white"
                  >
                    Continue Shopping
                  </Link>

                  <button
                    onClick={handleCheckout}
                    className="flex-1 bg-red-600 text-white py-3 rounded-xl hover:bg-red-700"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Cart;
