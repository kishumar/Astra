// IncidentType.jsx
import React from "react";

export const IncidentTypeSelect = ({ value, onChange }) => {
  return (
    <div className="w-full text-white">
      <div className="border border-gray-700 rounded-lg p-6">
        <h1 className="text-lg font-semibold text-white mb-4">
          Choose Incident Type <span className="text-red-400 text-xl">*</span>
        </h1>

        <select
          value={value}
          onChange={(e) => onChange(e.target.value)} // ✅ this calls back to parent
          className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">-- Select an Incident --</option>
          <option value="theft">Theft</option>
          <option value="harassment">Harassment</option>
          <option value="accident">Accident</option>
          <option value="violence">Violence</option>
          <option value="bullying">Bullying</option>
          <option value="garbage">Garbage</option>
          <option value="fire outbreak">Fire Outbreak</option>
          <option value="water_leakage">Water Leakage</option>
          <option value="other">Other</option>
        </select>
      </div>
    </div>
  );
};

export default IncidentTypeSelect;
