import React from "react";
import { useParams } from "react-router-dom";
import ReportDetails from "./ReportDetails";

export default function ReportDetailsPage() {
  const { id } = useParams();
  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-6">
      <ReportDetails reportId={id} />
    </div>
  );
}
