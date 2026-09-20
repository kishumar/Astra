import React, { useEffect } from "react";
import Navbar from "../Mainpage/Navbar";
import SubmitHero from "../Mainpage/Hero";
import toast from "react-hot-toast";

function Submitreport() {
  useEffect(() => {
    // Right-click prevention
    // const handleContextMenu = (e) => {
    //   e.preventDefault();
    //   toast.error("Right-click is disabled!");
    // };

    // Keyboard shortcuts prevention
    const handleKeyDown = (e) => {
      // Prevent Ctrl+C, Ctrl+X, Ctrl+S, Ctrl+Shift+I, Ctrl+Shift+J, PrintScreen
      if (
        (e.ctrlKey && ["c", "x", "s"].includes(e.key.toLowerCase())) ||
        (e.ctrlKey && e.shiftKey && ["i", "j"].includes(e.key.toLowerCase())) ||
        e.key === "PrintScreen"
      ) {
        e.preventDefault();
        toast.error("This action is disabled on this page!");
      }
    };

    // Disable PrintScreen using clipboard overwrite
    const handleCopy = (e) => {
      e.preventDefault();
      toast.error("Copying content is disabled!");
    };

    // document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("copy", handleCopy);

    return () => {
      // document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("copy", handleCopy);
    };
  }, []);

  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      <SubmitHero />
      
    </div>
  );
}

export default Submitreport;
