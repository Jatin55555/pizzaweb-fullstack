import { NavLink, useNavigate } from "react-router-dom";

function AdminSidebar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <div className="w-64 h-screen bg-gray-900 text-white flex flex-col">

      {/* Logo */}
      <div className="p-6">
        <h1 className="text-3xl font-bold text-red-500">
          🍕 Pizza Admin
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 flex flex-col gap-2">

        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            `p-3 rounded-lg transition ${
              isActive
                ? "bg-red-600"
                : "hover:bg-gray-800"
            }`
          }
        >
          📊 Dashboard
        </NavLink>

        <NavLink
          to="/admin/orders"
          className={({ isActive }) =>
            `p-3 rounded-lg transition ${
              isActive
                ? "bg-red-600"
                : "hover:bg-gray-800"
            }`
          }
        >
          📦 Orders
        </NavLink>

        <NavLink
          to="/admin/pizzas"
          className={({ isActive }) =>
            `p-3 rounded-lg transition ${
              isActive
                ? "bg-red-600"
                : "hover:bg-gray-800"
            }`
          }
        >
          🍕 Pizzas
        </NavLink>

        <NavLink
          to="/admin/options"
          className={({ isActive }) =>
            `p-3 rounded-lg transition ${
              isActive
                ? "bg-red-600"
                : "hover:bg-gray-800"
            }`
          }
        >
          ⚙️ Custom Options
        </NavLink>

        <NavLink
          to="/admin/inventory"
          className={({ isActive }) =>
            `p-3 rounded-lg transition ${
              isActive
                ? "bg-red-600"
                : "hover:bg-gray-800"
            }`
          }
        >
          📦 Inventory
        </NavLink>

      </nav>

     {/* Bottom Section */}
<div className="p-4 border-t border-gray-700">

  {/* Admin Profile */}

  <div className="mb-4 bg-gray-800 rounded-lg p-3">

    <p className="font-semibold text-white">
      👤 {user?.name}
    </p>

    <p className="text-sm text-gray-400 break-all">
      {user?.email}
    </p>

   <span className="inline-block mt-2 text-xs bg-red-600 px-2 py-1 rounded">
  {user?.role?.toUpperCase()}
</span>

  </div>

  <button
    onClick={() => navigate("/home")}
    className="w-full mb-3 bg-gray-800 hover:bg-gray-700 transition rounded-lg p-3"
  >
    🏠 Visit Website
  </button>

  <button
    onClick={handleLogout}
    className="w-full bg-red-600 hover:bg-red-700 transition rounded-lg p-3"
  >
    🚪 Logout
  </button>

</div>

    </div>
  );
}

export default AdminSidebar;