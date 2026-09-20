import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ImageUploadExample from "./upload";
import IncidentTypeExample from "./Incidenttype";
import LocationInput from "./Location";
import DescriptionBox from "./Description";
import ReportTitle from "./Title";
import toast from "react-hot-toast";
import { useMutation } from "convex/react";
import { useNavigate } from "react-router-dom"; 

// Confirmation Modal with Framer Motion
function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  reportData,
  isSubmitting,
}) {
  return (
    
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay with blur */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => !isSubmitting && onClose()}
          />

          {/* Modal Card */}
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
            initial={{ x: "100%", opacity: 0 }}
            animate={{
              x: 0,
              opacity: 1,
              transition: { type: "spring", stiffness: 300, damping: 30 },
            }}
            exit={{
              x: "100%",
              opacity: 0,
              transition: { type: "spring", stiffness: 300, damping: 30 },
            }}
          >
            <div className="bg-gray-900 border border-gray-600 rounded-2xl w-full max-w-4xl flex overflow-hidden shadow-xl">
              {/* Left: Image */}
              {reportData.image && (
                <div className="w-1/3 bg-black flex items-center justify-center p-4 border-r border-gray-600">
                  <img
                    src={reportData.image}
                    alt="Report"
                    className="object-cover w-full h-full rounded-xl"
                  />
                </div>
              )}

              {/* Right: Details */}
              <div className="flex-1 p-6 flex flex-col justify-between space-y-4">
                {/* Header */}
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    Review Report
                  </h2>
                  <p className="text-gray-400 mt-1">
                    Please review your report before submitting
                  </p>
                </div>

                {/* Content */}
                <div className="space-y-3 flex-1 overflow-y-auto">
                  <DetailRow
                    label="Incident Type"
                    value={reportData.incidentType}
                  />
                  <DetailRow label="Location" value={reportData.location} />
                  <DetailRow label="Title" value={reportData.title} />
                  <DetailRow
                    label="Description"
                    value={reportData.description}
                  />
                </div>

                {/* Footer */}
                <div className="cursor-pointer flex justify-end gap-3 mt-4">
                  <button
                    onClick={onClose}
                    disabled={isSubmitting}
                    className="px-6 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={onConfirm}
                    disabled={isSubmitting}
                    className="cursor-pointer px-6 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 flex items-center gap-2"
                  >
                    {isSubmitting && (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    )}
                    {isSubmitting ? "Submitting..." : "Confirm & Submit"}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Helper Component for Rows
function DetailRow({ label, value }) {
  return (
    <div>
      <span className="text-sm text-gray-400">{label}</span>
      <div className="bg-gray-800 border border-gray-600 rounded-lg p-2 mt-1">
        <span className="text-white whitespace-pre-wrap">{value}</span>
      </div>
    </div>
  );
}

export default function Form() {
  const submitReport = useMutation("submitReport:submitReport");

  const [image, setImage] = useState(null);
  const [incidentType, setIncidentType] = useState("");
  const [location, setLocation] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [invalidFields, setInvalidFields] = useState({});
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
const [isSpam, setIsSpam] = useState(false);

  const highlightClass = (field) =>
    invalidFields[field] ? "border-red-500 focus:ring-red-500" : "";

  const handleSubmit = () => {
    const newInvalidFields = {
      image: !image,
      incidentType: !incidentType,
      location: !location,
      title: !title,
      description: !description,
    };
    setInvalidFields(newInvalidFields);
    if (Object.values(newInvalidFields).some((v) => v)) {
      toast.error("Please fill in all fields before submitting.");
      return;
    }
    setShowConfirmation(true);
  };

  const handleConfirmedSubmit = async () => {
    const reportData = { image, incidentType, location, title, description };
    setIsSubmitting(true);
    try {
      const id = await submitReport(reportData); // ✅ get ID
      toast.success("Report submitted successfully!");
      navigate(`/report-details/${id}`); // ✅ redirect with ID
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit report.");
    } finally {
      setIsSubmitting(false);
    }
  };
const navigate = useNavigate(); 
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-black p-4">
        <div className="w-full max-w-4xl border border-gray-600 rounded-lg p-8 space-y-8">
          <div className={highlightClass("image")}>
            <ImageUploadExample
              value={image}
              onChange={(images) => setImage(images[0])}
          onAIFields={(fields) => {
  if (fields) {
    if (!title) setTitle(fields.title || "");

    // 🚨 Spam check
    if (fields.title?.toUpperCase() === "SPAM") {
      setIsSpam(true);
      toast.error("This image looks like spam. Please upload a valid report.");
      return;
    } else {
      setIsSpam(false);
    }

    let normalizedType = (fields.type || "")
      .toLowerCase()
      .replace(/ /g, "_");

    if (["fire outbreak", "fire_outbreak"].includes(normalizedType))
      normalizedType = "fire outbreak";

    if (["water leakage", "water_leakage"].includes(normalizedType))
      normalizedType = "water_leakage";

    if (!incidentType) setIncidentType(normalizedType);
    if (!description) setDescription(fields.description || "");
  }
}}

            />
          </div>
          <div className={highlightClass("incidentType")}>
            <IncidentTypeExample
              value={incidentType}
              onChange={setIncidentType}
            />
          </div>
          <div className={highlightClass("location")}>
            <LocationInput value={location} onChange={setLocation} />
          </div>
          <div className={highlightClass("title")}>
            <ReportTitle value={title} onChange={setTitle} />
          </div>
          <div className={highlightClass("description")}>
            <DescriptionBox value={description} onChange={setDescription} />
          </div>
          <div className="flex items-center justify-center w-full mt-4">
            <button
  onClick={handleSubmit}
  disabled={isSpam}
  className={`cursor-pointer w-full p-3 text-xl font-semibold rounded-xl border-2 border-white shadow-lg transition-all duration-300
    ${isSpam 
      ? "bg-gray-700 text-gray-400 cursor-not-allowed" 
      : "bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700"
    }`}
>
  {isSpam ? "Spam Detected – Cannot Submit" : "Submit Report"}
</button>

          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={showConfirmation}
        onClose={() => !isSubmitting && setShowConfirmation(false)}
        onConfirm={handleConfirmedSubmit}
        reportData={{ image, incidentType, location, title, description }}
        isSubmitting={isSubmitting}
      />
    </>
  );
}
