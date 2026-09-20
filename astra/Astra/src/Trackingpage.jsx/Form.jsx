import React, { useState } from "react";
import { Loader2, Search, ArrowLeft, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { api } from "/convex/_generated/api.js";
import { useQuery } from "convex/react";
import { motion, AnimatePresence } from "framer-motion";

function TrackReportForm() {
  const [formData, setFormData] = useState({ reportId: "" });
  const [submittedId, setSubmittedId] = useState(null);
  const navigate = useNavigate();

  const report = useQuery(
    api.getReportById.getReportById,
    submittedId ? { id: submittedId.trim() } : "skip"
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.reportId) return;
    setSubmittedId(formData.reportId);
  };

  const closeModal = () => setSubmittedId(null);

  return (
    <div className="w-full max-w-xl mx-auto mt-6 px-4 sm:px-6 lg:px-8">
      {/* Form */}
      <div className="bg-gray-800 backdrop-blur-md p-5 rounded-2xl shadow-xl border border-none">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-300 font-medium mb-2">
              Report ID
            </label>
            <input
              type="text"
              name="reportId"
              value={formData.reportId}
              onChange={handleChange}
              placeholder="Enter your report ID"
              className="w-full p-3 rounded-lg border border-gray-600 bg-gray-900 text-white focus:ring-2 focus:ring-sky-400 outline-none text-base sm:text-lg"
              required
            />
          </div>

          <div className="flex flex-col  gap-3">
            <button
              type="submit"
              className="cursor-pointer flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-semibold text-base sm:text-lg text-white bg-gradient-to-r from-sky-500 to-indigo-500 hover:opacity-90 transition"
            >
              <Search className="w-5 h-5 sm:w-6 sm:h-6" />
              <span>Track Report</span>
            </button>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="cursor-pointer flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-semibold text-base sm:text-lg border border-gray-500 text-gray-300 hover:bg-gray-700 transition"
            >
              <ArrowLeft className="w-5 h-5" />
              Go Back
            </button>
          </div>
        </form>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {submittedId && report && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gray-900 text-white rounded-3xl shadow-2xl w-full max-w-lg p-6 relative max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              layout
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="cursor-pointer absolute top-4 right-4 p-2 rounded-full hover:bg-gray-700 transition"
              >
                <X size={20} />
              </button>

              {/* Title */}
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center tracking-wide">
                Report Details
              </h2>

              {/* Fields with Framer Motion stagger */}
              <motion.ul
                className="space-y-4"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.1 } },
                }}
              >
                {[
                  { label: "Report ID", value: submittedId },
                  { label: "Title", value: report.title },
                  { label: "Incident Type", value: report.incidentType },
                  { label: "Location", value: report.location },
                  {
                    label: "Status",
                    value: report.status,
                    badgeClass:
                      report.status === "Pending"
                        ? "bg-yellow-300 text-yellow-900"
                        : "bg-green-300 text-green-900",
                  },
                  {
                    label: "Description",
                    value: report.description,
                    isDescription: true,
                  },
                  {
                    label: "Submitted At",
                    value: new Date(report._creationTime).toLocaleString(
                      "en-IN",
                      { timeZone: "Asia/Kolkata" }
                    ),
                  },
                ].map((field, idx) => (
                  <motion.li
                    key={idx}
                    className="border border-gray-700 rounded-xl p-3 flex flex-col sm:flex-row justify-between items-start sm:items-center hover:bg-gray-800 transition cursor-default"
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      visible: { opacity: 1, y: 0 },
                    }}
                  >
                    <span className="font-semibold text-gray-300 mb-1 sm:mb-0">
                      {field.label}:
                    </span>
                    {field.label === "Status" ? (
                      <span
                        className={`px-2 py-1 rounded-full font-semibold ${field.badgeClass}`}
                      >
                        {field.value || "-"}
                      </span>
                    ) : field.isDescription ? (
                      <div className="font-medium bg-gray-800 px-2 py-1 rounded max-h-40 overflow-y-auto whitespace-pre-wrap break-words w-full sm:w-auto">
                        {field.value || "-"}
                      </div>
                    ) : (
                      <span className="font-medium">{field.value || "-"}</span>
                    )}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </motion.div>
        )}

        {/* Loading */}
        {submittedId && report === undefined && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="p-6 bg-gray-900 text-white rounded-2xl shadow-xl flex items-center gap-3"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <Loader2 className="animate-spin w-5 h-5" />
              Fetching report...
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default TrackReportForm;
