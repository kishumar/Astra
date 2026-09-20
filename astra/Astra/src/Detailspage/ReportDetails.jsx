import React from "react";
import { useQuery } from "convex/react";
import { Copy, Download, HomeIcon, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import jsPDF from "jspdf";
import logo from "/public/images/logo.png";
import { api } from "/convex/_generated/api.js";
import { Link } from "react-router-dom";
import autoTable from "jspdf-autotable";
 
function ReportDetails({ reportId }) {
  const report = useQuery(api.getReportById.getReportById, { id: reportId });

  const copyId = () => {
    navigator.clipboard.writeText(reportId);
    toast.success("Report ID copied!");
  };

  const downloadPDF = async () => {
  if (!report) return;

  const doc = new jsPDF();
 doc.addImage(logo, "PNG", 14, 4, 20, 20);
  // Heading
  doc.setFontSize(20).setFont("helvetica", "bold");
  doc.text("Incident Report (Copy)", 105, 20, { align: "center" });

  doc.setDrawColor(100);
  doc.setLineWidth(0.7);
  doc.line(20, 25, 190, 25); // underline

  // Report ID box
  doc.setFontSize(12).setFont("helvetica", "bold");
  doc.text("Report ID:", 20, 40);
  doc.setFont("helvetica", "normal");
  doc.text(reportId, 55, 40);

  // Info Table
 autoTable(doc, {
  startY: 50,
  head: [["Field", "Details"]],
  body: [
    ["Title", report.title],
    ["Incident Type", report.incidentType],
    ["Location", report.location],
    ["Status", report.status],
    ["Description", report.description],
  
    ],
    styles: { fontSize: 11, cellPadding: 6, lineWidth: 0.1 },
    headStyles: {
      fillColor: [255, 20, 147], 
      textColor: 255,
      fontStyle: "bold",
      halign: "center",
    },
    columnStyles: {
      0: { fontStyle: "bold", cellWidth: 45 },
      1: { cellWidth: "auto" },
    },

     bodyStyles: {
      fillColor: [255, 192, 203], // Light pink body
      textColor: [0, 0, 0], // Black text
    },
    alternateRowStyles: {
      fillColor: [255, 182, 193], // Slightly darker light pink for alternate rows
    },
    theme: "grid",
  });

  // Attach Image if exists
  if (report.image) {
    try {
      const img = await fetch(report.image)
        .then((res) => res.blob())
        .then(
          (blob) =>
            new Promise((resolve) => {
              const reader = new FileReader();
              reader.onload = () => resolve(reader.result);
              reader.readAsDataURL(blob);
            })
        );

      const finalY = doc.lastAutoTable.finalY + 15;
      doc.setFont("helvetica", "bold");
      doc.text("Attached Image:", 20, finalY);
      doc.addImage(img, "JPEG", 20, finalY + 5, 120, 80);
    } catch (err) {
      console.error("Image loading failed:", err);
      doc.text("⚠️ Could not load image", 20, doc.lastAutoTable.finalY + 10);
    }
  }

  // Footer note
  doc.setFontSize(10).setFont("helvetica", "italic");
  doc.text(
    "This is a system-generated copy. Please keep it safe for future reference.",
    105,
    285,
    { align: "center" }
  );

  // Save file
  doc.save(`Report_${reportId}.pdf`);
};


  if (!report) {
    return (
      <div className="flex items-center justify-center p-6 bg-white/90 backdrop-blur-lg rounded-2xl shadow-md text-slate-600 border border-slate-200">
        <Loader2 className="animate-spin mr-2" size={20} />
        Fetching report details...
      </div>
    );
  }

  return (
    <div className="relative max-w-2xl mx-auto p-8">
      {/* Animated Orbs */}
      <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-blue-500 opacity-30 blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-10 -left-10 w-56 h-56 rounded-full bg-red-400 opacity-30 blur-3xl animate-pulse"></div>

      {/* Card */}
      <div className="relative bg-white/90 backdrop-blur-xl border border-slate-200 shadow-xl rounded-2xl p-8 space-y-8 animate-fadeIn">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center gap-4 border-b border-slate-200 pb-4">
          <img
            src="/images/submit.gif"
            alt="submitted"
            className="rounded-full h-[120px] w-[120px] object-cover shadow"
          />
          <h2 className="text-2xl font-bold text-slate-800">Report Submitted</h2>
        </div>

        {/* Report ID */}
        <div className="space-y-2">
          <p className="text-slate-600">
            Keep this <span className="font-semibold">Report ID</span> safe for future tracking:
          </p>
          <div className="flex items-center justify-between bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl font-mono text-sm text-slate-800 shadow-inner">
            {reportId}
            <button
              onClick={copyId}
              className="flex items-center gap-1 px-3 py-1 text-xs font-medium text-slate-600 hover:text-slate-900 border border-slate-300 rounded-lg hover:bg-slate-100 transition"
            >
              <Copy size={14} /> Copy
            </button>
          </div>
        </div>

        {/* Report Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <p className="text-xs uppercase text-slate-500 font-semibold">Title</p>
            <p className="text-slate-800 font-medium">{report.title}</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <p className="text-xs uppercase text-slate-500 font-semibold">Status</p>
            <span
              className={`inline-block mt-1 px-3 py-1 text-xs font-medium rounded-full ${
                report.status === "Pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {report.status}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3.5">
          <div className="flex justify-end gap-3 w-full">
            <button
              onClick={downloadPDF}
              className="w-full cursor-pointer flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-red-500 to-red-600 hover:opacity-90 transition shadow-md"
            >
              <Download size={18} /> Download PDF Copy
            </button>
          </div>
          <div>
            <Link to="/">
              <button
                className="w-full justify-center cursor-pointer flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-sky-500 to-indigo-500 hover:opacity-90 transition shadow-md"
              >
                <HomeIcon size={18} /> Go back to Home
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportDetails;
