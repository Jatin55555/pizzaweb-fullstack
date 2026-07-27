function WhyChooseUs() {
  const features = [
    {
      icon: "🍕",
      title: "Fresh Ingredients",
      description:
        "Every pizza is prepared using fresh vegetables, premium cheese, and high-quality ingredients.",
    },
    {
      icon: "⚡",
      title: "Fast Delivery",
      description:
        "Hot and delicious pizzas delivered quickly to your doorstep.",
    },
    {
      icon: "🎨",
      title: "Build Your Own Pizza",
      description:
        "Choose your favorite base, sauce, cheese, and toppings to create your perfect pizza.",
    },
    {
      icon: "💳",
      title: "Secure Payments",
      description:
        "Safe online payments powered by Razorpay with quick checkout.",
    },
    {
      icon: "📦",
      title: "Live Order Tracking",
      description:
        "Track your pizza from Order Received to Delivered in real time.",
    },
    {
      icon: "⭐",
      title: "Quality Service",
      description:
        "Customer satisfaction is our highest priority with every order.",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-4">
          Why Choose PizzaWeb?
        </h2>

        <p className="text-center text-gray-600 mb-14">
          Everything you need for the perfect pizza experience.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-2xl p-8 shadow hover:shadow-xl transition"
            >
              <div className="text-5xl mb-5">
                {feature.icon}
              </div>

              <h3 className="text-2xl font-bold mb-3">
                {feature.title}
              </h3>

              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;