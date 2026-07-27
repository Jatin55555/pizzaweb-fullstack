function AboutTeam() {
  const team = [
    {
      name: "Marco Rossi",
      role: "Head Chef",
      image:
        "https://images.unsplash.com/photo-1607631568010-a87245c0daf8?w=500",
    },
    {
      name: "Sarah Wilson",
      role: "Restaurant Manager",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500",
    },
    {
      name: "James Carter",
      role: "Pizza Specialist",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500",
    },
  ];

  return (
    <section className="py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-3">
          Meet Our Team
        </h2>

        <p className="text-center text-gray-600 mb-14">
          Passionate people behind every delicious pizza.
        </p>

        <div className="grid md:grid-cols-3 gap-10">

          {team.map((member) => (
            <div
              key={member.name}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-80 object-cover"
              />

              <div className="p-6 text-center">
                <h3 className="text-2xl font-bold">
                  {member.name}
                </h3>

                <p className="text-red-600 font-semibold mt-2">
                  {member.role}
                </p>
              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default AboutTeam;