import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import axios from "axios";
import { generateAIFields } from "/Configs/Airesponse.jsx";

export default function CloudinaryImageUpload({ onChange, onAIFields }) {
  const [uploadedImages, setUploadedImages] = useState([]);
  const [aiFields, setAIFields] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const MAX_FILES = 2;
  const MAX_FILE_SIZE_MB = 5;
  const SUPPORTED_FORMATS = ["JPEG", "PNG", "GIF", "WebP"];

  useEffect(() => {
    if (aiFields && onAIFields) onAIFields(aiFields);
  }, [aiFields, onAIFields]);

  useEffect(() => {
    if (onChange) onChange(uploadedImages);
  }, [uploadedImages, onChange]);

  const uploadFileToCloudinary = async (file) => {
    if (!file) return;
    if (uploadedImages.length >= MAX_FILES) return alert(`Max ${MAX_FILES} images.`);
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) return alert(`Max file size: ${MAX_FILE_SIZE_MB}MB`);

  setLoading(true);
  setLoadingMessage("Analyzing image...<br />Fields will be automatically filled by Astra's smart AI,<br />You can edit them as you want");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "astra_unsigned");
      formData.append("folder", "Astra_uploads");

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dw14navak/image/upload",
        formData
      );

      const url = response.data.secure_url;
      setUploadedImages((prev) => [...prev, url]);

      const fields = await generateAIFields(url);
      setAIFields(fields);
    } catch (error) {
      console.error("Upload/AI error:", error);
      alert("Upload or AI generation failed!");
    } finally {
      setLoading(false);
      setLoadingMessage("");
    }
  };

  const handleImageUpload = (event) => {
    const files = event.target.files;
    if (files?.length > 0) uploadFileToCloudinary(files[0]);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragOver(false);
    const files = event.dataTransfer.files;
    if (files?.length > 0) uploadFileToCloudinary(files[0]);
  };

  const removeImage = (index) => setUploadedImages((prev) => prev.filter((_, i) => i !== index));
  const openFileDialog = () => fileInputRef.current?.click();

  return (
    <div className="w-full space-y-4 relative">
      {/* Upload Box */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <div
          className={`relative border-2 border-dashed rounded-lg cursor-pointer transition-all duration-200
          ${isDragOver ? "border-blue-500 bg-blue-900/30" : "border-gray-700 hover:border-blue-500 bg-black"}`}
          onClick={openFileDialog}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={handleDrop}
        >
          <motion.div className="p-8 text-center">
            <motion.div
              animate={{ scale: loading ? 1.1 : 1, rotate: loading ? 10 : 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="mx-auto mb-4 w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center"
            >
              <Upload className="w-8 h-8 text-white" />
            </motion.div>

            <h3 className="text-lg font-semibold text-white mb-2">
              {loading ? loadingMessage : isDragOver ? "Drop your image here" : "Drag & drop your image or click below"}
            </h3>

            <p className="text-gray-400 mb-4">{uploadedImages.length}/{MAX_FILES} uploaded</p>

            <div className="text-sm text-gray-400 space-y-1 mb-4">
              <p>Supported formats: {SUPPORTED_FORMATS.join(", ")}</p>
              <p>Maximum file size: {MAX_FILE_SIZE_MB}MB</p>
              <p>Maximum files: {MAX_FILES}</p>
            </div>

            {!isDragOver && (
              <button
                type="button"
                className="mt-2 px-4 py-2 border border-gray-600 rounded flex items-center justify-center hover:bg-gray-800 text-white"
              >
                <ImageIcon className="w-4 h-4 mr-2" />
                Choose Image
              </button>
            )}
          </motion.div>
        </div>
      </motion.div>

      {/* Hidden File Input */}
      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />

      {/* Preview Grid */}
      <AnimatePresence>
        {uploadedImages.length > 0 && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }} className="space-y-3">
            <h4 className="text-sm font-medium text-white">
              Uploaded Images ({uploadedImages.length}/{MAX_FILES})
            </h4>

            <div className="grid grid-cols-2 gap-3">
              {uploadedImages.map((url, index) => (
                <motion.div key={index} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.2 }} className="relative group">
                  <div className="overflow-hidden rounded-lg border border-gray-700 bg-gray-900">
                    <div className="aspect-square relative">
                      <img src={url} alt={`Uploaded ${index + 1}`} className="w-full h-full object-cover" />
                      <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Glassmorphic Analyzing Overlay */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 flex flex-col items-center justify-center space-y-4 text-center text-white max-w-xs w-full"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                className="w-12 h-12 border-4 border-t-red-500 border-gray-400 rounded-full"
              />
              <p className="text-lg font-semibold" dangerouslySetInnerHTML={{ __html: loadingMessage }} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
