import React from "react";
import Landingpage from "./components/Landingpage";
import { Routes, Route } from "react-router-dom";
import Submitreport from "./components/Submitreport";
import { Toaster } from "react-hot-toast";
import Trackreport from "./components/Trackreport";
import ReportDetails from "./Detailspage/ReportDetails";
import ReportDetailsPage from "./Detailspage/Reportdetailspage";
import Mainpage from "../Auth/Mainpage";
import Dashboard from "../Auth/Admin/Dashboard";
import ProtectedRoute from "../Auth/ProtectedRoute";
import Portals from "./Resources/portals";
import TermsAndService from "./Resources/Terms";
import PrivacyPopup from "./Resources/Popup";
import ContactPage from "./Resources/Contactus";
import Resources from "./components/Resources";
import AboutUjjwal from "./Landingpage/Developer";
import ActionProofForm from "./Reportproof/Proveform";
import AstraChatRoom from "./Trackingpage.jsx/Chat";

function App() {
  return (
    <>

<Toaster
  position="top-right"
  
  reverseOrder={false}
  toastOptions={{
     duration: 4000, 
    // Default styles
    style: {
      background: "linear-gradient(135deg, #dc2626, #ec4899)", 
      color: "#fff",
      borderRadius: "12px",
      padding: "12px 16px",
      border: "1px solid rgba(255,255,255,0.15)",
      fontSize: "14px"
      
    },
    // Success variant
    success: {
      style: {
        background: "linear-gradient(135deg, #16a34a, #22c55e)",
        color: "#fff",
        border: "none",
      },
      iconTheme: {
        primary: "#fff",
        secondary: "#16a34a",
      },
    },
    // Error variant
    error: {
      style: {
        background: "linear-gradient(135deg, #dc2626, #ef4444)", // red gradient
        color: "#fff",
        border: "none",
      },
      iconTheme: {
        primary: "#fff",
        secondary: "#dc2626",
      },
    },
    // Loading variant
    loading: {
      style: {
         background: "linear-gradient(135deg, #7f1d1d, #be185d)", // deep red-pink
        border: "1px solid #f43f5e",
        color: "#ffe4e6",
      },
    },
  }}
/>
<PrivacyPopup />
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/submit-report" element={<Submitreport />} />
        <Route path="/track-report" element={<Trackreport />} />
      <Route path="/report-details/:id" element={<ReportDetailsPage/>} />
      <Route path="/auth" element={<Mainpage/>}/>
      <Route path="/actionform" element={<ActionProofForm/>}/>
      <Route path="/chat" element={<AstraChatRoom/>}/>

 <Route
        path="/admin-dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

         <Route path="/portals" element={<Portals/>}/>
         <Route path="/terms" element={<TermsAndService/>}/>
         <Route path="/contact" element={<ContactPage/>}/>
         <Route path="/resources" element={<Resources/>}/>
         <Route path="/developer" element={<AboutUjjwal/>}/>
       
      
      </Routes>
    
    </>
  );
}

export default App;
