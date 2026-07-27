import { NavLink, useNavigate } from "react-router-dom";

function AdminSidebarOld() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
   <div className="w-64 h-screen bg-gray-900 text-white p-6 flex flex-col justify-between">

  {/* Top Section */}
  <div>

    <h1 className="text-3xl font-bold text-red-500 mb-10">
      🍕 Pizza Admin
    </h1>

    <nav className="flex flex-col gap-3">

      <NavLink
        to="/admin/dashboard"
        className={({ isActive }) =>
          `p-3 rounded-lg ${
            isActive ? "bg-red-600" : "hover:bg-gray-800"
          }`
        }
      >
        Dashboard
      </NavLink>

      <NavLink
        to="/admin/orders"
        className={({ isActive }) =>
          `p-3 rounded-lg ${
            isActive ? "bg-red-600" : "hover:bg-gray-800"
          }`
        }
      >
        Orders
      </NavLink>

      <NavLink
        to="/admin/pizzas"
        className={({ isActive }) =>
          `p-3 rounded-lg ${
            isActive ? "bg-red-600" : "hover:bg-gray-800"
          }`
        }
      >
        Pizzas
      </NavLink>

      <NavLink
        to="/admin/options"
        className={({ isActive }) =>
          `p-3 rounded-lg ${
            isActive ? "bg-red-600" : "hover:bg-gray-800"
          }`
        }
      >
        Custom Options
      </NavLink>

      <NavLink
        to="/admin/inventory"
        className={({ isActive }) =>
          `p-3 rounded-lg ${
            isActive ? "bg-red-600" : "hover:bg-gray-800"
          }`
        }
      >
        Inventory
      </NavLink>

    </nav>

  </div>

  {/* Bottom Section */}

  <div className="border-t border-gray-700 pt-4">

    <button
      onClick={() => navigate("/home")}
      className="w-full text-left p-3 rounded-lg hover:bg-gray-800"
    >
      🏠 Visit Website
    </button>

    <button
      onClick={handleLogout}
      className="w-full text-left mt-2 p-3 rounded-lg bg-red-600 hover:bg-red-700"
    >
      🚪 Logout
    </button>

  </div>

</div>
  );
}

export default AdminSidebarOld;