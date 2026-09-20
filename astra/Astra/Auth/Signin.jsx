import React, { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { useNavigate } from "react-router-dom";
import { LogInIcon } from "lucide-react";
import toast from "react-hot-toast";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = useMutation(api.auth.login);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await login({ email, password });

      if (res.token) {
        // Save session token & adminId
        localStorage.setItem("sessionToken", res.token);
      

        toast.success("Welcome back");
        navigate("/admin-dashboard");
      } else {
        toast.error("Invalid email or password");
      }
    } catch (err) {
      toast.error("Login failed, wrong credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen 
      bg-gradient-to-br from-black via-gray-900 to-gray-800 
      bg-[url('/images/adminbg.jpeg')] bg-cover bg-center">
      <div className="flex flex-col md:flex-row items-center bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-gray-800">
        
        {/* Left Side (Illustration) */}
        <div className="hidden md:flex w-[40vw] items-center justify-center p-8">
          <img
            src="/images/adminlogin.gif"
            alt="Admin Illustration"
            className="rounded-xl shadow-lg"
          />
        </div>

        {/* Right Side (Form) */}
        <div className="w-full md:w-[28rem] p-8 flex flex-col">
          <form onSubmit={handleSubmit} className="text-white flex flex-col">
            {/* Logo + Title */}
            <div className="flex flex-col items-center justify-center gap-2 mb-6">
              <img
                src="/images/admin.png"
                alt="Admin Logo"
                className="w-36 h-36 rounded-full shadow-md border border-gray-700 object-contain"
              />
              <h2 className="text-2xl font-bold bg-gradient-to-r from-rose-500 via-red-500 to-pink-600 bg-clip-text text-transparent">
                Admin Login
              </h2>
            </div>

            {/* Inputs */}
            <input
              type="email"
              placeholder="Email Address"
              className="w-full p-3 mb-4 rounded-lg bg-gray-800 border border-gray-700 focus:border-rose-500 focus:ring-2 focus:ring-rose-500 outline-none transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 mb-6 rounded-lg bg-gray-800 border border-gray-700 focus:border-rose-500 focus:ring-2 focus:ring-rose-500 outline-none transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 flex items-center justify-center gap-2 rounded-lg font-semibold text-white 
                bg-gradient-to-r from-rose-500 via-red-500 to-pink-600 
                hover:from-pink-600 hover:to-purple-700 
                shadow-lg shadow-pink-500/30 transition-all
                ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              <LogInIcon className="w-5 h-5" />
              {loading ? "Signing In..." : "Log In to My Account"}
            </button>
          </form>

          {/* Help Text */}
          <p className="mt-6 text-center text-sm text-gray-400">
            Facing issues logging in?{" "}
            <a
              href="mailto:support@yourapp.com"
              className="text-rose-400 hover:text-rose-500 underline transition"
            >
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
