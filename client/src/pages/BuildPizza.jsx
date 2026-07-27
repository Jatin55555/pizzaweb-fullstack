import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api/axios";
import OrderSummary from "../components/OrderSummary";
import OptionCard from "../components/OptionCard";
import { useCart } from "../context/CartContext";
function BuildPizza() {
  const navigate = useNavigate();

  const [pizza, setPizza] = useState(null);
  const [options, setOptions] = useState([]);

  const [selectedBase, setSelectedBase] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedSauce, setSelectedSauce] = useState("");
  const [selectedCheese, setSelectedCheese] = useState("");
  const [selectedVegetables, setSelectedVegetables] = useState([]);

  const { addToCart } = useCart();
 useEffect(() => {
  fetchOptions();
  fetchBuildPizza();
}, []);

  const fetchBuildPizza = async () => {
  try {
    const response = await API.get("/pizzas");

    const buildPizza = response.data.pizzas.find(
      (pizza) => pizza.name === "Build Your Own Pizza"
    );

    

    setPizza(buildPizza);
  } catch (error) {
    console.log(error);
  }
};

  const fetchOptions = async () => {
    try {
      const response = await API.get("/options");
     
      const availableOptions = response.data.options.filter(
        (option) => option.isAvailable,
      );

      setOptions(availableOptions);
    } catch (error) {
      console.log(error);
    }
  };

  const bases = options.filter(
    (option) => option.type === "Base" && option.isAvailable,
  );

  const sizes = options.filter(
    (option) => option.type === "Size" && option.isAvailable,
  );

  const sauces = options.filter(
    (option) => option.type === "Sauce" && option.isAvailable,
  );

  const cheeses = options.filter(
    (option) => option.type === "Cheese" && option.isAvailable,
  );

  const vegetables = options.filter(
    (option) => option.type === "Vegetable" && option.isAvailable,
  );

  const basePrice =
    bases.find((item) => item.name === selectedBase)?.price || 0;

  const sizePrice =
    sizes.find((item) => item.name === selectedSize)?.price || 0;

  const saucePrice =
    sauces.find((item) => item.name === selectedSauce)?.price || 0;

  const cheesePrice =
    cheeses.find((item) => item.name === selectedCheese)?.price || 0;

  const vegetablesPrice = vegetables
    .filter((item) => selectedVegetables.includes(item.name))
    .reduce((total, item) => total + item.price, 0);

  const totalPrice =
    (pizza?.price || 0) +
    sizePrice +
    basePrice +
    saucePrice +
    cheesePrice +
    vegetablesPrice;

  const handleAddToCart = () => {
    if (!selectedSize || !selectedBase || !selectedSauce || !selectedCheese) {
      alert("Please complete all required selections.");
      return;
    }
    

    addToCart({
      id: crypto.randomUUID(),

     pizza,

      base: selectedBase,

      size: selectedSize,

      sauce: selectedSauce,

      cheese: selectedCheese,

      vegetables: selectedVegetables,

      totalPrice,

      isCustomized: true,
    });

    alert("Customized pizza added to cart!");

    navigate("/cart");
  };

  if (!pizza) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-4xl font-bold text-red-600">Loading Pizza...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">
        {/* LEFT COLUMN */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-8">
          <div className="text-center">
            <span className="bg-red-100 text-red-600 px-4 py-1 rounded-full text-sm font-semibold">
              Custom Pizza Builder
            </span>
            <h1 className="text-5xl font-extrabold mt-4">
              🍕 Build Your Own Pizza
            </h1>

            <p className="text-gray-500 mt-3 text-lg">
              Create your own masterpiece exactly the way you like it.
            </p>
          </div>

          <img
            src={pizza.image}
            className="w-full h-96 object-cover rounded-3xl shadow-xl mt-8"
          />

          <p className="text-gray-500 mt-3 text-lg">{pizza.description}</p>

          <div className="mt-8 flex items-center justify-between">
            <div>
              <p className="text-gray-500">Starting From</p>

              <h2 className="text-5xl font-extrabold text-red-600">
                ₹{pizza.price}
              </h2>
            </div>
          </div>

          <hr className="my-8" />

          {/* STEP 1 - SIZE */}
          <div className="flex items-center gap-3 mb-5">
            <span className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center font-bold">
              1
            </span>

            <h2 className="text-3xl font-bold">Choose Pizza Size</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {sizes.map((size) => (
              <OptionCard
                key={size._id}
                option={size}
                selected={selectedSize === size.name}
                onClick={() => setSelectedSize(size.name)}
              />
            ))}
          </div>

          <hr className="my-8" />

          {/* STEP 2 - BASE */}
          <div className="flex items-center gap-3 mb-5">
            <span className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center font-bold">
              2
            </span>

            <h2 className="text-3xl font-bold">Choose Your Base</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {bases.map((base) => (
              <OptionCard
                key={base._id}
                option={base}
                selected={selectedBase === base.name}
                onClick={() => setSelectedBase(base.name)}
              />
            ))}
          </div>

          <hr className="my-8" />

          {/* STEP 3 - SAUCE */}
          <div className="flex items-center gap-3 mb-5">
            <span className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center font-bold">
              3
            </span>

            <h2 className="text-3xl font-bold">Choose Your Sauce</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {sauces.map((sauce) => (
              <OptionCard
                key={sauce._id}
                option={sauce}
                selected={selectedSauce === sauce.name}
                onClick={() => setSelectedSauce(sauce.name)}
              />
            ))}
          </div>

          <hr className="my-8" />

          {/* STEP 4 - CHEESE */}
          <div className="flex items-center gap-3 mb-5">
            <span className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center font-bold">
              4
            </span>

            <h2 className="text-3xl font-bold">Choose Cheese</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {cheeses.map((cheese) => (
              <OptionCard
                key={cheese._id}
                option={cheese}
                selected={selectedCheese === cheese.name}
                onClick={() => setSelectedCheese(cheese.name)}
              />
            ))}
          </div>

          <hr className="my-8" />

          {/* STEP 5 - VEGETABLES */}
          <div className="flex items-center gap-3 mb-5">
            <span className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center font-bold">
              5
            </span>

            <h2 className="text-3xl font-bold">Choose Vegetables</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {vegetables.map((veg) => (
              <OptionCard
                key={veg._id}
                option={veg}
                type="checkbox"
                selected={selectedVegetables.includes(veg.name)}
                onClick={() => {
                  if (selectedVegetables.includes(veg.name)) {
                    setSelectedVegetables(
                      selectedVegetables.filter((v) => v !== veg.name),
                    );
                  } else {
                    setSelectedVegetables([...selectedVegetables, veg.name]);
                  }
                }}
              />
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div>
          <OrderSummary
            pizza={pizza}
            selectedSize={selectedSize}
            selectedBase={selectedBase}
            selectedSauce={selectedSauce}
            selectedCheese={selectedCheese}
            selectedVegetables={selectedVegetables}
            sizePrice={sizePrice}
            basePrice={basePrice}
            saucePrice={saucePrice}
            cheesePrice={cheesePrice}
            vegetables={vegetables}
            totalPrice={totalPrice}
            handleAddToCart={handleAddToCart}
          />
        </div>
      </div>
    </div>
  );
}

export default BuildPizza;
