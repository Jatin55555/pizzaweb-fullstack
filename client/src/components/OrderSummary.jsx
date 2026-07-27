function OrderSummary({
  pizza,
  selectedSize,
  selectedBase,
  selectedSauce,
  selectedCheese,
  selectedVegetables,
  sizePrice,
  basePrice,
  saucePrice,
  cheesePrice,
  vegetables,
  totalPrice,
  handleAddToCart,
}) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
      <h2 className="text-2xl font-bold mb-6">🧾 Order Summary</h2>

      <div className="space-y-4">

        {/* Pizza */}
        <div className="flex justify-between">
          <span className="font-semibold">{pizza.name}</span>
          <span>₹{pizza.price}</span>
        </div>

        {/* Size */}
        {selectedSize && (
          <div className="flex justify-between">
            <span>🍕 Size: {selectedSize}</span>
            <span>+₹{sizePrice}</span>
          </div>
        )}

        {/* Base */}
        {selectedBase && (
          <div className="flex justify-between">
            <span>🥖 Base: {selectedBase}</span>
            <span>+₹{basePrice}</span>
          </div>
        )}

        {/* Sauce */}
        {selectedSauce && (
          <div className="flex justify-between">
            <span>🥫 Sauce: {selectedSauce}</span>
            <span>+₹{saucePrice}</span>
          </div>
        )}

        {/* Cheese */}
        {selectedCheese && (
          <div className="flex justify-between">
            <span>🧀 Cheese: {selectedCheese}</span>
            <span>+₹{cheesePrice}</span>
          </div>
        )}

        {/* Vegetables */}
        {vegetables
          .filter((v) => selectedVegetables.includes(v.name))
          .map((veg) => (
            <div key={veg._id} className="flex justify-between">
              <span>🥬 {veg.name}</span>
              <span>+₹{veg.price}</span>
            </div>
          ))}

        <hr />

        <div className="flex justify-between text-2xl font-bold text-red-600">
          <span>Total</span>
          <span>₹{totalPrice}</span>
        </div>

        <button
          onClick={handleAddToCart}
          className="w-full mt-6 bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700 transition"
        >
          🛒 Add Customized Pizza to Cart
        </button>
      </div>
    </div>
  );
}

export default OrderSummary;