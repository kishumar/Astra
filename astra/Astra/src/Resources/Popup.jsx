import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { HeartIcon } from "lucide-react";

function Popup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem("astra_terms_dismissed");
    if (!dismissed) setIsOpen(true);
  }, []);

  const handleAccept = () => {
    if (isChecked) {
      setIsOpen(false);
      localStorage.setItem("astra_terms_dismissed", "true");
    } else {
      toast.error("Please accept the terms to continue.");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
               className="relative max-w-lg w-11/12 p-8 rounded-2xl shadow-2xl 
                       bg-white/10 backdrop-blur-xl border border-white/20 
                       text-white"
            initial={{ scale: 0.8, y: 50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.8, y: 50, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {/* Heading */}
            <h2 className="text-3xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-white via-pink-200 to-red-200 drop-shadow-lg">
              Welcome to Astra 🌟
            </h2>

            {/* Scrollable Content */}
            <div className="max-h-64 overflow-y-auto pr-2 mb-4 space-y-3 text-sm leading-relaxed scrollbar-thin scrollbar-thumb-pink-400 scrollbar-track-transparent">
              <p>
                Hi there! 👋 Thanks for joining <span className="font-semibold">Astra</span>.  
                We know that across cities, workplaces, and campuses, people sometimes face tough situations -
                from harassment and bullying to unsafe civic issues. Many of these go unreported because of fear 
                or not knowing where to turn.
              </p>
              <p>
                That’s why we built Astra-a safe, AI-powered platform where you can report issues anonymously. 
                Just capture what happened (with text or photos), and Astra will securely route it to the right authority 
                — whether that’s the police, municipality, HR, or your campus admin.  
                You’ll also get a unique tracking ID so you can follow the status of your report without revealing your identity.
              </p>
              <p>
                <span className="font-semibold">Our Promise:</span> We don’t store your personal details, and your 
                reports are encrypted. Only verified authorities can view them, and only for resolving the issue.  
              </p>
              <p>
                <span className="font-semibold">Your Part:</span> Please use Astra responsibly 🙏. Submitting false 
                or harmful reports can lead to being banned or, in serious cases, legal action. Together, we can keep 
                this platform safe and impactful for everyone.
              </p>
              <p>
                By continuing, you’re letting us know that you’ve read and agree to these terms in a spirit of trust 
                and collaboration.
              </p>
            </div>

            {/* Checkbox */}
            <div className="flex items-center gap-2 mb-6">
              <input
                id="accept"
                type="checkbox"
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-pink-500 focus:ring-pink-400 cursor-pointer"
              />
              <label
                htmlFor="accept"
                className="text-sm select-none cursor-pointer"
              >
                I have read and accept Astra’s Terms of Use 
              </label>
            </div>

            {/* Button */}
            <motion.button
              onClick={handleAccept}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`cursor-pointer w-full py-3 rounded-xl font-semibold shadow-lg transition-all bg-gradient-to-r from-rose-500 via-red-500 to-pink-600 hover:shadow-pink-400/50`}
            >
              Accept & Continue
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Popup;
