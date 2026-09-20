import React, { useEffect, useState } from "react";
import { Shield, LogOut, LogIn } from "lucide-react";
import { Link as ScrollLink } from "react-scroll";
import { Link as AdminLink, useNavigate } from "react-router-dom";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import toast from "react-hot-toast";

function Navbar() {
  const navItems = ["Features", "How It Works", "Pricing", "Contact"];
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("sessionToken"));

  // Ask server if session is still valid
  const session = useQuery(
    api.validatesession.validateSession,
    token ? { token } : "skip"
  );

  // Keep client storage in sync with server validation
  useEffect(() => {
    if (session && !session.valid) {
      localStorage.removeItem("sessionToken");
      setToken(null);
    }
  }, [session]);

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("sessionToken");
    toast.success("Logged out successfully");
    setToken(null);
    navigate("/");
  };

  return (
  <header className="fixed top-2 left-1/2 -translate-x-1/2 z-50 w-[80vw] max-w-5xl">
  <div className="flex justify-between items-center px-6 py-3 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border border-gray-200 dark:border-gray-800 shadow-lg rounded-full">
    
    {/* Logo */}
    <ScrollLink to="home" smooth duration={600} offset={-80}>
      <div className="flex items-center gap-2 group cursor-pointer">
        <div className="w-9 h-9 bg-gradient-to-r from-rose-500 via-red-500 to-pink-600 rounded-lg flex items-center justify-center shadow-md transform group-hover:rotate-6 group-hover:scale-105 transition-all">
          <img
            src="/images/logo.png"
            alt="Astra Logo"
            className="w-6 h-6 rounded-md border-2 border-white/80"
          />
        </div>
        <h1 className="text-xl font-bold bg-gradient-to-r from-rose-500 via-red-500 to-pink-600 bg-clip-text text-transparent tracking-tight">
          Astra
        </h1>
      </div>
    </ScrollLink>

    {/* Nav Links */}
    <nav className="hidden md:flex gap-8 text-gray-700 dark:text-gray-300 font-medium">
      {navItems.map((item) => (
        <ScrollLink
          key={item}
          to={item.toLowerCase().replace(/\s+/g, "-")}
          smooth
          duration={600}
          offset={-80}
          className="relative group cursor-pointer"
        >
          <span className="transition-colors group-hover:text-rose-500 dark:group-hover:text-rose-400">
            {item}
          </span>
          <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-rose-500 to-pink-500 transition-all group-hover:w-full rounded-full" />
        </ScrollLink>
      ))}
    </nav>

    {/* Right Side CTA */}
    {session?.valid ? (
      <button
        onClick={handleLogout}
        className="cursor-pointer hidden sm:inline-flex items-center gap-2 bg-gradient-to-r from-rose-500 via-red-500 to-pink-600 text-white px-4 py-2 rounded-full shadow-md hover:shadow-xl hover:scale-105 transition-all font-medium"
      >
        <LogOut className="w-4 h-4" />
        Logout
      </button>
    ) : (
      <AdminLink to="/auth">
        <button className="cursor-pointer hidden sm:inline-flex items-center gap-2 bg-gradient-to-r from-rose-500 via-red-500 to-pink-600 text-white px-4 py-2 rounded-full shadow-md hover:shadow-xl hover:scale-105 transition-all font-medium">
          Admin Login
          <LogIn className="w-4 h-4" />
        </button>
      </AdminLink>
    )}
  </div>
</header>

  );
}

export default Navbar;
