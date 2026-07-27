import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";

function AdminLayout() {
  return (
    <div className="flex">

      <AdminSidebar />

      <div className="flex-1 bg-gray-100 min-h-screen p-8">
        <Outlet />
      </div>

    </div>
  );
}

export default AdminLayout;