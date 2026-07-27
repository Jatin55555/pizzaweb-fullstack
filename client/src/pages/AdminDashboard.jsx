import { useEffect, useState } from "react";
import API from "../api/axios";

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalCustomers: 0,
    totalPizzas: 0,
    pendingOrders: 0,
    revenue: 0,
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await API.get("/admin/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStats(response.data.dashboard);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1 className="text-5xl font-bold mb-10">
        🍕 Admin Dashboard
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-gray-500">Orders</h2>

          <p className="text-5xl font-bold mt-3">
            {stats.totalOrders}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-gray-500">Customers</h2>

          <p className="text-5xl font-bold mt-3">
            {stats.totalCustomers}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-gray-500">Pizzas</h2>

          <p className="text-5xl font-bold mt-3">
            {stats.totalPizzas}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-gray-500">
            Pending
          </h2>

          <p className="text-5xl font-bold mt-3 text-orange-600">
            {stats.pendingOrders}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-gray-500">
            Revenue
          </h2>

          <p className="text-5xl font-bold mt-3 text-green-600">
            ₹{stats.revenue}
          </p>
        </div>

      </div>
    </>
  );
}

export default AdminDashboard;