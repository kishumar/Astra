// src/AstraChatRoom.jsx
import React, { useEffect, useState } from "react";

import {
  Chat,
  Channel,
  ChannelHeader,
  MessageList,
  MessageInput,
  Thread,
  Window,
} from "stream-chat-react";
import { chatClient } from "./streamClient";
import "stream-chat-react/dist/css/v2/index.css";
import toast from "react-hot-toast";
import { Trash2 } from "lucide-react";

function AstraChatRoom() {
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showNamePopup, setShowNamePopup] = useState(true);
  const [tempName, setTempName] = useState("");
  const [userId, setUserId] = useState("");
const trustedUserId = "user-136"; // example

  // Generate a unique userId for each session
  useEffect(() => {
    const uniqueId = `user-${Math.floor(Math.random() * 10000)}`;
    setUserId(uniqueId);
  }, []);

  const handleJoinChat = async () => {
    if (!tempName.trim()) return;

    setShowNamePopup(false);

    try {
      // Fetch token from your server
      const res = await fetch(`https://astra-server-7je7.onrender.com/token/${userId}?name=${encodeURIComponent(tempName.trim())}`);

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      const token = data.token;

      // Connect user with the token
      await chatClient.connectUser(
        {
          id: userId,
          name: tempName.trim(),
          image: `https://getstream.io/random_png/?id=${userId}`,
        },
        token
      );

      // Create or watch the channel
      const ch = chatClient.channel("messaging", "astra-support", {
        name: "Astra Support",
      });
      await ch.watch();

      setChannel(ch);
      setLoading(false);
    } catch (err) {
      console.error("Chat init error:", err);
      setLoading(false);
      // Show error to user
      alert(`Failed to connect to chat: ${err.message}`);
    }
  };

  const handleAnonymous = () => {
    const anonymousName = `Anonymous_${Math.random().toString(36).substr(2, 4)}`;
    setTempName(anonymousName);
  };



const handleClearChat = async () => {
  // Show confirmation toast and wait for user action
  const confirmClear = await new Promise((resolve) => {
    toast(
      (t) => (
        <div className="flex flex-col space-y-2">
          <p>Are you sure you want to clear all messages? This action cannot be undone.</p>
          <div className="flex justify-end space-x-2 mt-2">
            <button
              className="px-3 py-1 bg-red-500 text-white rounded"
              onClick={() => { toast.dismiss(t.id); resolve(false); }}
            >
              Cancel
            </button>
            <button
              className="px-3 py-1 bg-green-500 text-white rounded"
              onClick={() => { toast.dismiss(t.id); resolve(true); }}
            >
              Confirm
            </button>
          </div>
        </div>
      ),
      { duration: Infinity }
    );
  });

  if (!confirmClear) return;

  try {
    const res = await fetch("https://astra-server-7je7.onrender.com/truncate-channel", { method: "POST" });
    if (!res.ok) throw new Error("Failed to clear chat");
    toast.success("Chat cleared successfully!");
  } catch (err) {
    console.error(err);
    toast.error("Failed to clear chat. Please try again.");
  }
};


  useEffect(() => {
    // Cleanup on unmount
    return () => {
      if (chatClient.user) {
        chatClient.disconnectUser().catch(console.error);
      }
    };
  }, []);

  if (loading && !showNamePopup) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-200 via-pink-100 to-rose-300">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600 mx-auto mb-4"></div>
          <div className="text-rose-700">Loading chat...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-200 via-pink-100 to-rose-300 flex items-center justify-center p-4 relative">
      {/* Main Chat Interface */}
      <div className={`w-[90vw] h-[80vh] flex bg-gray-500 rounded-lg shadow-xl border border-rose-200 overflow-hidden ${showNamePopup ? "blur-sm" : ""}`}>
        {/* Left Chat Area */}
        <div className="w-[70%] flex flex-col">
          {!showNamePopup && channel ? (
            <Chat client={chatClient} theme="messaging light">
              <Channel channel={channel}>
                <Window>
                  {/* Header */}
               <div className="flex items-center justify-between p-4 bg-gradient-to-r from-rose-600 to-pink-500 border-b border-rose-200">
  <div className="flex items-center space-x-3">
    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
      {/* user icon */}
    </div>
    <div>
      <h1 className="text-lg font-semibold text-white">Astra Support</h1>
      <p className="text-xs text-rose-100">Civic Reporting & Support</p>
    </div>
  </div>
  <div className="flex items-center space-x-2">
    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
    <span className="text-xs text-rose-100">Online</span>
    <button
      onClick={handleClearChat}
      className="cursor-pointer ml-2 bg-rose-100 text-rose-700 px-2 py-1 rounded hover:bg-rose-200 text-xs flex items-center justify-center gap-2.5"
    >
      Clear Chat <span ><Trash2 className="text-black"/></span> 
    </button>
  </div>
</div>


                  {/* Notice */}
                  <div className="p-3 bg-rose-50 border-b border-rose-200">
                    <div className="flex items-start space-x-2">
                      <svg className="w-5 h-5 text-rose-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <div>
                        <p className="text-sm font-medium text-rose-800">Professional Communication Notice</p>
                        <p className="text-xs text-rose-700 mt-1">
                          This chat may be shared with civic authorities and executives. Please maintain professional decorum.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 px-4 py-3 overflow-hidden bg-rose-50/30">
                    <MessageList />
                  </div>

                  {/* Input */}
                  <div className="p-4 border-t border-rose-200 bg-white">
                    <MessageInput
                      focus
                      placeholder="Type your message here... Be professional and concise."
                    />
                  </div>
                </Window>

                <Thread />
              </Channel>
            </Chat>
          ) : (
            <div className="flex items-center justify-center h-full bg-rose-50/30">
              <div className="text-center text-rose-600">
                <h2 className="text-xl font-semibold mb-2">Welcome to Astra Support</h2>
                <p className="text-sm">Please enter your name to continue</p>
              </div>
            </div>
          )}
        </div>

        {/* Right Image Area */}
        <div className="w-[30%] flex flex-col items-center justify-center bg-gradient-to-br from-rose-50 to-pink-100 border-l border-rose-200 p-6">
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold text-rose-800 mb-2">Need faster results?</h3>
            <p className="text-sm text-rose-600">Connect with our civic reporting team</p>
          </div>
          <img
            src="/images/chat.gif"
            alt="Chat Illustration"
            className="rounded-lg max-w-[300px] h-[300px] shadow-lg object-cover"
          />
          <div className="mt-4 text-center">
            <div className="flex items-center justify-center space-x-2 text-xs text-rose-500">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Available 24/7</span>
            </div>
          </div>
        </div>
      </div>

      {/* Name Entry Popup */}
      {showNamePopup && (
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full mx-4 border border-rose-200">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-rose-800 mb-2">Join Astra Support</h2>
              <p className="text-sm text-rose-600">Enter your name to start chatting with our support team</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-rose-700 mb-2">Your Name</label>
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  placeholder="Enter your name or nickname"
                  className="w-full px-4 py-3 border border-rose-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  onKeyPress={(e) => e.key === "Enter" && handleJoinChat()}
                />
              </div>

              <div className="flex flex-col space-y-3">
                <button
                  onClick={handleJoinChat}
                  disabled={!tempName.trim()}
                  className="w-full bg-gradient-to-r from-rose-600 to-pink-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-rose-700 hover:to-pink-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Join Chat
                </button>

                <button
                  onClick={handleAnonymous}
                  className="w-full bg-rose-100 text-rose-700 py-3 px-6 rounded-lg font-semibold hover:bg-rose-200 transition-all duration-200 border border-rose-300"
                >
                  Join as Anonymous
                </button>
              </div>

              <div className="text-center">
                <p className="text-xs text-rose-500 mt-4">Your privacy is protected. You can use any name you prefer.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AstraChatRoom;