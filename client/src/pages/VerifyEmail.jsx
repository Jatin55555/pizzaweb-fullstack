import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../api/axios";

function VerifyEmail() {
  const { token } = useParams();

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");

  // Prevent duplicate API calls in React Strict Mode
  const hasVerified = useRef(false);

  useEffect(() => {
    if (hasVerified.current) return;
    hasVerified.current = true;

    const verify = async () => {
      try {
        const res = await API.get(`/auth/verify-email/${token}`);

        setSuccess(true);
        setMessage(res.data.message);
      } catch (err) {
        setSuccess(false);
        setMessage(
          err.response?.data?.message || "Verification failed"
        );
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, [token]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-2xl">
        Verifying...
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-xl shadow-lg text-center">

        <h1 className="text-3xl font-bold mb-5">
          {success ? "✅ Email Verified" : "❌ Verification Failed"}
        </h1>

        <p className="mb-6">{message}</p>

        <Link
          to="/login"
          className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition"
        >
          Go to Login
        </Link>

      </div>
    </div>
  );
}

export default VerifyEmail;