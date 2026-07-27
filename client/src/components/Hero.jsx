import { Link } from "react-router-dom";
function Hero() {
  return (
    <section className="bg-gradient-to-r from-red-600 to-orange-500 text-white">
      <div className="max-w-7xl mx-auto px-8 py-24 flex items-center justify-between">
        <div className="max-w-xl">
          <h1 className="text-6xl font-extrabold leading-tight">
            Hot & Fresh Pizza
            <br />
            Delivered Fast
          </h1>

          <p className="mt-6 text-xl">
            Order your favourite pizza or build your own masterpiece with fresh
            ingredients.
          </p>

          <Link
            to="/menu"
            className="mt-8 inline-block bg-white text-red-600 px-8 py-4 rounded-xl font-bold hover:scale-105 transition"
          >
            Order Now
          </Link>
        </div>

        <div className="text-[180px]">🍕</div>
      </div>
    </section>
  );
}

export default Hero;
