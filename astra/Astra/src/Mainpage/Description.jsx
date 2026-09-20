import React from "react";

function DescriptionBox({ value, onChange }) {
  return (
    <div className="mb-4">
      <label className="block text-white mb-2 text-sm font-medium">
        Describe the Situation <span className="text-red-400 text-xl">*</span>
      </label>
      <textarea
        className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
        rows="5"
        placeholder="Provide details about the incident..."
        value={value}        // 👈 controlled by parent
        onChange={(e) => onChange(e.target.value)}  // 👈 update parent
      />
    </div>
  );
}

export default DescriptionBox;
