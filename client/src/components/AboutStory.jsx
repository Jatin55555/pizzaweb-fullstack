function AboutStory() {
  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid md:grid-cols-2 gap-14 items-center">

          {/* Image */}

          <div>

            <img
              src="https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1200"
              alt="Chef making pizza"
              className="rounded-3xl shadow-2xl w-full object-cover h-[550px]"
            />

          </div>

          {/* Content */}

          <div>

            <p className="uppercase tracking-[6px] text-red-600 font-semibold mb-4">
              Our Story
            </p>

            <h2 className="text-5xl font-bold mb-8">
              More Than Pizza.
              <br />
              We Serve Happiness.
            </h2>

            <p className="text-gray-600 leading-8 mb-6">
              PizzaWeb started with one simple idea—
              create delicious handcrafted pizzas made
              from premium ingredients and deliver them
              fresh to every customer.
            </p>

            <p className="text-gray-600 leading-8 mb-6">
              Every pizza is prepared using fresh dough,
              rich tomato sauce, premium cheese, and
              carefully selected vegetables to ensure
              every bite is unforgettable.
            </p>

            <p className="text-gray-600 leading-8">
              Whether you're ordering your favorite classic
              pizza or creating your own masterpiece,
              our goal is to make every meal memorable.
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}

export default AboutStory;