function AboutStats() {
  const stats = [
    {
      number: "50K+",
      title: "Happy Customers",
    },
    {
      number: "120K+",
      title: "Pizzas Served",
    },
    {
      number: "10+",
      title: "Years of Experience",
    },
    {
      number: "25",
      title: "Expert Chefs",
    },
  ];

  return (
    <section className="py-20 bg-red-600 text-white">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-14">
          Our Journey in Numbers
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">

          {stats.map((stat) => (
            <div
              key={stat.title}
              className="text-center"
            >
              <h1 className="text-5xl font-bold">
                {stat.number}
              </h1>

              <p className="mt-3 text-lg text-red-100">
                {stat.title}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default AboutStats;