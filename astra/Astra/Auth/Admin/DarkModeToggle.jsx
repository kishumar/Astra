import React, { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

const DarkModeToggle = ({ darkMode, setDarkMode }) => {
  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 shadow-md hover:scale-105 transition-all duration-200"
      aria-label="Toggle Dark Mode"
    >
      {darkMode ? (
        <Sun className="w-5 h-5 text-yellow-400" />
      ) : (
        <Moon className="w-5 h-5 text-white" />
      )}
    </button>
  );
};

export default DarkModeToggle;
