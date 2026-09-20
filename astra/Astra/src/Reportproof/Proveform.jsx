import React, { useState, useRef } from "react";
import {
  Upload,
  X,
  FileText,
  Image,
  Video,
  Calendar,
  MapPin,
  User,
  CheckCircle,
} from "lucide-react";
 import { motion } from "framer-motion";
export default function ProofUploadForm() {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    issueId: "CIV-2024-001",
    title: "Pothole Repair on Main Street",
    description: "Large pothole causing traffic issues",
    location: "Main Street, Downtown",
    resolvedBy: "",
    resolutionDate: "",
    status: "resolved",
    category: "road-maintenance",
    priority: "high",
    cost: "",
    notes: "",
  });
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

// Cloudinary config
const CLOUD_NAME = "dvmqxb8kd";
const UPLOAD_PRESET = "kb9n4w2j";

const handleFileSelect = async (selectedFiles) => {
  if (!selectedFiles) return;

  Array.from(selectedFiles).forEach(async (file) => {
    if (file.type.startsWith("image/") || file.type.startsWith("video/")) {
      const id = Math.random().toString(36).substr(2, 9);
      const localPreview = URL.createObjectURL(file);
      const type = file.type.startsWith("image/") ? "image" : "video";

      // Show temporary local preview while uploading
      setFiles((prev) => [
        ...prev,
        { id, file, preview: localPreview, type, uploading: true },
      ]);

      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", UPLOAD_PRESET);

        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await res.json();

        setFiles((prev) =>
          prev.map((f) =>
            f.id === id
              ? { ...f, preview: data.secure_url, uploading: false }
              : f
          )
        );
      } catch (err) {
        console.error("Upload failed:", err);
        setFiles((prev) => prev.filter((f) => f.id !== id));
      }
    }
  });
};


  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const removeFile = (id) => {
    setFiles((prev) => {
      const fileToRemove = prev.find((f) => f.id === id);
      if (fileToRemove) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return prev.filter((f) => f.id !== id);
    });
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", { formData, files });
    // TODO: submit to backend
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="min-h-screen bg-gray-200 p-6">
          {/* Animated orbs */}
      <motion.div
        className="absolute top-10 right-10 w-48 h-48 rounded-full z-0 animate-pulse"
        style={{
          background: "radial-gradient(circle, #ff4d6d)",
          filter: "blur(80px)",
        }}
        animate={{
          y: [0, -20, 0],
          x: [0, 10, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute bottom-10 left-10 w-56 h-56 rounded-full z-0 animate-pulse"
        style={{
          background: "radial-gradient(circle, #ff85a2)",
          filter: "blur(40px)",
        }}
        animate={{
          y: [0, 15, 0],
          x: [0, -15, 0],
          scale: [1, 0.9, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      <div className="max-w-4xl mx-auto">

        <div className="mb-8">
<div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-black mb-4 drop-shadow-2xl">
              Upload Resolution Proof
            </h1>
            <p className="text-gray-700 text-lg max-w-2xl mx-auto">
              Document the resolution of reported civic issues with images, videos,
              and detailed information.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Issue Information */}
          <div className="bg-white p-6 rounded-xl shadow">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="h-5 w-5 text-red-500" />
              <h2 className="text-xl font-semibold">Issue Information</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Issue ID</label> <span className="text-red-500">*</span>
                <input
                  value={formData.issueId}
                  onChange={(e) => handleInputChange("issueId", e.target.value)}
                  className="mt-1 w-full border rounded-lg px-3 py-2"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => handleInputChange("status", e.target.value)}
                  className="mt-1 w-full border rounded-lg px-3 py-2"
                >
                  <option value="resolved">Resolved</option>
                  <option value="in-progress">In Progress</option>
                  <option value="partially-resolved">Partially Resolved</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="text-sm font-medium">Issue Title</label>
                <input
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className="mt-1 w-full border rounded-lg px-3 py-2"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-sm font-medium">Description</label> <span className="text-red-500">*</span>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  rows={3}
                  className="mt-1 w-full border rounded-lg px-3 py-2"
                   required
                />
              </div>

              <div>
                <label className="text-sm font-medium">Location</label>
                <div className="relative mt-1">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    value={formData.location}
                    onChange={(e) =>
                      handleInputChange("location", e.target.value)
                    }
                    className="pl-10 w-full border rounded-lg px-3 py-2"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange("category", e.target.value)}
                  className="mt-1 w-full border rounded-lg px-3 py-2"
                >
                  <option value="road-maintenance">Road Maintenance</option>
                  <option value="water-supply">Water Supply</option>
                  <option value="waste-management">Waste Management</option>
                  <option value="street-lighting">Street Lighting</option>
                  <option value="public-safety">Public Safety</option>
                </select>
              </div>
            </div>
          </div>

          {/* Resolution Details */}
          <div className="bg-white p-6 rounded-xl shadow">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="h-5 w-5 text-blue-600" />
              <h2 className="text-xl font-semibold">Resolution Details</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Resolved By</label>
                <div className="relative mt-1">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    value={formData.resolvedBy}
                    onChange={(e) =>
                      handleInputChange("resolvedBy", e.target.value)
                    }
                    className="pl-10 w-full border rounded-lg px-3 py-2"
                    placeholder="Enter name or department"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Resolution Date</label>
                <div className="relative mt-1">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    type="date"
                    value={formData.resolutionDate}
                    onChange={(e) =>
                      handleInputChange("resolutionDate", e.target.value)
                    }
                    className="pl-10 w-full border rounded-lg px-3 py-2"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Priority</label>
                <select
                  value={formData.priority}
                  onChange={(e) =>
                    handleInputChange("priority", e.target.value)
                  }
                  className="mt-1 w-full border rounded-lg px-3 py-2"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium">Resolution Cost</label>
                <input
                  value={formData.cost}
                  onChange={(e) => handleInputChange("cost", e.target.value)}
                  className="mt-1 w-full border rounded-lg px-3 py-2"
                  placeholder="Enter cost (optional)"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-sm font-medium">Additional Notes</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  rows={3}
                  placeholder="Any additional information..."
                  className="mt-1 w-full border rounded-lg px-3 py-2"
                />
              </div>
            </div>
          </div>

          {/* File Upload */}
          <div className="bg-white p-6 rounded-xl shadow">
            <div className="flex items-center gap-2 mb-4">
              <Upload className="h-5 w-5 text-red-500" />
              <h2 className="text-xl font-semibold">Upload Proof</h2>
              <span className="ml-2 px-2 py-1 text-xs bg-gray-200 rounded">
                Images & Videos
              </span>
            </div>

            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                isDragging
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-300 hover:border-blue-400"
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">
                Drop files here or click to upload
              </h3>
              <p className="text-gray-500 mb-4">
                Supports JPG, PNG, GIF, MP4, MOV, AVI
              </p>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="cursor-pointer px-4 py-2 border rounded-lg text-sm bg-white hover:bg-gray-100"
              >
                Choose Files
              </button>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={(e) => handleFileSelect(e.target.files)}
                className="hidden"
              />
            </div>

            {/* File Preview */}
            {files.length > 0 && (
              <div className="mt-6">
                <h3 className="font-medium mb-3">
                  Uploaded Files ({files.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {files.map((file) => (
               <div key={file.id} className="relative group">
  <div className="border rounded-lg overflow-hidden bg-gray-100">
    {file.type === "image" ? (
      <img
        src={file.preview}
        alt={file.file.name}
        className="w-full h-32 object-cover"
      />
    ) : (
      <div className="w-full h-32 flex items-center justify-center">
        <Video className="h-8 w-8 text-gray-400" />
      </div>
    )}

    <div className="p-3">
      <p className="text-sm font-medium truncate">{file.file.name}</p>
      {file.uploading ? (
        <p className="text-xs text-pink-500 font-medium">Uploading...</p>
      ) : (
        <p className="text-xs text-gray-500">{formatFileSize(file.file.size)}</p>
      )}
    </div>
  </div>

  {!file.uploading && (
    <button
      type="button"
      onClick={() => removeFile(file.id)}
      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition"
    >
      <X className="h-4 w-4" />
    </button>
  )}

  <span className="absolute top-2 left-2 bg-gray-200 px-2 py-1 text-xs rounded">
    {file.type}
  </span>
</div>

                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              className="px-4 py-2 border rounded-lg text-sm bg-white hover:bg-gray-100"
            >
              Save as Draft
            </button>
            <button
              type="submit"
              className="cursor-pointer px-6 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300"
            >
              Submit Resolution
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
