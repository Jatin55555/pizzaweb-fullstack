import { Link } from "react-router-dom";

function AboutCTA() {
  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Left */}

          <div>

            <h2 className="text-5xl font-bold mb-6">
              Ready to Taste the Best Pizza?
            </h2>

            <p className="text-gray-300 text-lg leading-8 mb-8">
              Whether you're craving a classic Margherita or want to build
              your own masterpiece, PizzaWeb is ready to deliver fresh,
              delicious pizzas right to your doorstep.
            </p>

            <Link
              to="/menu"
              className="inline-block bg-red-600 hover:bg-red-700 px-8 py-4 rounded-xl font-semibold transition"
            >
              Order Now
            </Link>

          </div>

          {/* Right */}

          <div className="bg-white text-gray-800 rounded-2xl p-8 shadow-xl">

            <h3 className="text-3xl font-bold mb-6">
              Contact Us
            </h3>

            <div className="space-y-5">

              <div>
                <h4 className="font-semibold text-red-600">
                  📍 Address
                </h4>

                <p>
                  123 Pizza Street,
                  <br />
                  Jaipur, Rajasthan
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-red-600">
                  📞 Phone
                </h4>

                <p>+91 98765 43210</p>
              </div>

              <div>
                <h4 className="font-semibold text-red-600">
                  ✉️ Email
                </h4>

                <p>support@pizzaweb.com</p>
              </div>

              <div>
                <h4 className="font-semibold text-red-600">
                  🕒 Opening Hours
                </h4>

                <p>
                  Monday - Sunday
                  <br />
                  10:00 AM – 11:00 PM
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default AboutCTA;