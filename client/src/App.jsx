import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Dashboard from "./pages/Dashboard";
import PizzaCustomizer from "./pages/PizzaCustomizer";
import BuildPizza from "./pages/BuildPizza";
import MyOrders from "./pages/MyOrders";
import About from "./pages/About";
import PizzaDetails from "./pages/PizzaDetails";
import Cart from "./pages/Cart";
import OrderPage from "./pages/OrderPage";
import VerifyEmail from "./pages/VerifyEmail";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/AdminDashboard";
import AdminOrders from "./pages/AdminOrders";
import AdminPizzas from "./pages/AdminPizzas";
import AdminInventory from "./pages/AdminInventory";
import AdminOptions from "./pages/AdminOptions";
import AdminRoute from "./components/AdminRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/menu"
          element={
            <ProtectedRoute>
              <Menu />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customize/:pizzaId"
          element={
            <ProtectedRoute>
              <PizzaCustomizer />
            </ProtectedRoute>
          }
        />

        <Route
          path="/build-your-own"
          element={
            <ProtectedRoute>
              <BuildPizza />
            </ProtectedRoute>
          }
        />
        <Route
          path="/about"
          element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pizza/:id"
          element={
            <ProtectedRoute>
              <PizzaDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order/:orderId"
          element={
            <ProtectedRoute>
              <OrderPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-orders"
          element={
            <ProtectedRoute>
              <MyOrders />
            </ProtectedRoute>
          }
        />

        <Route path="/reset-password/:token" element={<ResetPassword />} />

        <Route path="/verify-email/:token" element={<VerifyEmail />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />
        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />

          <Route path="orders" element={<AdminOrders />} />

          <Route path="pizzas" element={<AdminPizzas />} />

          <Route path="options" element={<AdminOptions />} />

          <Route path="inventory" element={<AdminInventory />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
