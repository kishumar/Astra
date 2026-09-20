import React from "react";
import { Shield } from "lucide-react";

import { Link } from "react-router-dom";

function Navbar() {
  const navItems = ["Submit Report", "Track Report", "Contact", "Resources" , "Chat"];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md border-b ">
      <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
        
        {/* Logo */}
        <Link to="/">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-9 h-9 bg-gradient-to-r from-rose-500 via-red-500 to-pink-600 rounded-lg flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-rose-500 via-red-500 to-pink-600 bg-clip-text text-transparent tracking-tight">
            Astra
          </h1>
        </div>
        </Link>

        {/* Nav Links */}
        <nav className="hidden md:flex gap-10 text-gray-700 dark:text-gray-300 font-medium ml-2.5">
          {navItems.map((item) => (
  <Link
    key={item}
    to={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
    className="relative group cursor-pointer"
  >
    <span className="transition-colors group-hover:text-rose-500 dark:group-hover:text-rose-400">
      {item}
    </span>
    <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-rose-500 to-pink-500 transition-all group-hover:w-full" />
  </Link>
))}

        </nav>

        {/* CTA */}
       {/* Glassmorphic Secure Environment Button */}
<button
  className="
    hidden sm:inline-flex
    relative
    items-center
    px-6 py-3
    rounded-full
    bg-white/10
    backdrop-blur-md
    border border-red-500/40
    text-red-400
    font-medium
    shadow-[0_4px_30px_rgba(255,0,0,0.2)]
    hover:shadow-[0_6px_40px_rgba(255,0,0,0.4)]
    transition-all
    cursor-default
    pointer-events-none
  "
>
  <span className="h-2 w-2 rounded-full bg-red-500 animate-ping mr-3 inline-block" />
  Secure Environment
</button>

      </div>
    </header>
  );
}

export default Navbar;
