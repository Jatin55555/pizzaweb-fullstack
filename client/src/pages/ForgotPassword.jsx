import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post("/auth/forgot-password", {
        email,
      });

      alert(response.data.message);
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Something went wrong."
      );
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md"
      >

        <h1 className="text-3xl font-bold mb-8 text-center">
          Forgot Password
        </h1>

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full border rounded-lg p-3 mb-6"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700"
        >
          Send Reset Link
        </button>

        <div className="text-center mt-6">
          <Link
            to="/login"
            className="text-red-600 hover:underline"
          >
            Back to Login
          </Link>
        </div>

      </form>

    </div>
  );
}

export default ForgotPassword;