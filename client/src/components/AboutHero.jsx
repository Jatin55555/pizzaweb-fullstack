import { Link } from "react-router-dom";

function AboutHero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center">

      {/* Background Image */}

      <img
        src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1600"
        alt="Pizza"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark Overlay */}

      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}

      <div className="relative z-10 text-center text-white px-6 max-w-4xl">

        <p className="uppercase tracking-[8px] text-red-400 font-semibold mb-4">
          Welcome to PizzaWeb
        </p>

        <h1 className="text-6xl md:text-7xl font-extrabold leading-tight">
          Fresh Ingredients.
          <br />
          Perfect Crust.
          <br />
          Delivered With Love.
        </h1>

        <p className="mt-8 text-xl text-gray-200 leading-8">
          Every pizza is handcrafted using premium ingredients,
          authentic recipes, and baked fresh to deliver the
          perfect slice every single time.
        </p>

        <Link
          to="/menu"
          className="inline-block mt-10 bg-red-600 hover:bg-red-700 px-8 py-4 rounded-xl text-lg font-semibold transition duration-300"
        >
          🍕 Browse Our Menu
        </Link>

      </div>
    </section>
  );
}

export default AboutHero;