function OptionCard({
  option,
  selected,
  onClick,
  type = "radio",
}) {
  const getIcon = () => {
    switch (option.type) {
      case "base":
        return "🍞";
      case "sauce":
        return "🥫";
      case "cheese":
        return "🧀";
      case "vegetable":
        return "🥬";
      default:
        return "🍕";
    }
  };

  return (
    <div
      onClick={onClick}
      className={`
        cursor-pointer
        rounded-2xl
        border-2
        p-5
        transition-all
        duration-300
        hover:shadow-xl
        hover:-translate-y-2

        ${
          selected
            ? "border-red-500 bg-red-50 shadow-lg scale-[1.02]"
            : "border-gray-200 bg-white"
        }
      `}
    >
      <div className="flex justify-between items-start">

        <div>

          <div className="text-4xl">
            {getIcon()}
          </div>

          <h3 className="mt-3 text-xl font-bold">
            {option.name}
          </h3>

          <p className="text-gray-500 mt-1">
            {type === "checkbox"
              ? "Multiple selection"
              : "Choose one"}
          </p>

        </div>

        <div className="text-right">

          <p className="text-2xl font-bold text-red-600">
            ₹{option.price}
          </p>

          {selected && (
            <span className="inline-block mt-3 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold">
              ✓ Selected
            </span>
          )}

        </div>

      </div>
    </div>
  );
}

export default OptionCard;