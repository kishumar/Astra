import React from "react";

export default function ReportTitle({ value, onChange }) {
  const handleChange = (e) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <div className="mb-6">
      <label className="block text-white text-sm font-medium mb-2">
        Report Title <span className="text-red-400 text-xl">*</span>
      </label>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Enter a short and clear title for your report"
        className="w-full px-4 py-3 bg-black text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none placeholder-gray-400"
      />
    </div>
  );
}
