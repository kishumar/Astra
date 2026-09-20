import React, { useState, useEffect, useRef } from 'react';
import { Bell, X, AlertTriangle, Clock, CheckCircle, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Simple Notification Component
export default function NotificationIcon({ reports = [] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [settings, setSettings] = useState({
    emailNotifications: true,
    criticalAlerts: true,
    dailySummary: true,
    emailAddress: 'admin@company.com'
  });
  const popupRef = useRef(null);

  // Generate notifications based on reports
  useEffect(() => {
    const newNotifications = [];
    
    // Critical reports (fire, assault, emergency keywords)
    const criticalReports = reports.filter(report => {
      const criticalTypes = ['fire outbreak', 'assault'];
      const criticalKeywords = ['urgent', 'emergency', 'help', 'danger'];
      return criticalTypes.includes(report.type?.toLowerCase()) || 
             criticalKeywords.some(word => report.description?.toLowerCase().includes(word));
    });

    // Recent reports (last 24 hours)
    const recentReports = reports.filter(report => {
      const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
      return new Date(report.dateReported) > oneDayAgo;
    });

    // Pending reports
    const pendingReports = reports.filter(report => report.status === 'pending');

    // Create notifications
    criticalReports.forEach(report => {
      newNotifications.push({
        id: `critical-${report.id}`,
        type: 'critical',
        title: 'Critical Report Alert',
        message: `${report.type} reported at ${report.location}`,
        time: new Date(report.dateReported),
        reportId: report.id,
        read: false
      });
    });

    // Daily summary notification if more than 5 reports today
    if (recentReports.length > 5) {
      newNotifications.push({
        id: 'daily-summary',
        type: 'summary',
        title: 'High Activity Alert',
        message: `${recentReports.length} reports received in the last 24 hours`,
        time: new Date(),
        read: false
      });
    }

    // Pending reports notification
    if (pendingReports.length > 3) {
      newNotifications.push({
        id: 'pending-alert',
        type: 'warning',
        title: 'Pending Reports',
        message: `${pendingReports.length} reports need your attention`,
        time: new Date(),
        read: false
      });
    }

    setNotifications(newNotifications);
    setUnreadCount(newNotifications.filter(n => !n.read).length);
  }, [reports]);

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markAsRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    setUnreadCount(0);
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'critical':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'warning':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'summary':
        return <CheckCircle className="w-4 h-4 text-blue-500" />;
      default:
        return <Bell className="w-4 h-4 text-gray-500" />;
    }
  };

  const formatTime = (date) => {
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <div className="relative" ref={popupRef}>
      {/* Notification Bell Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <Bell className={`w-6 h-6 ${unreadCount > 0 ? 'text-red-500' : 'text-gray-600'}`} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Settings Modal */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            className="fixed inset-0 bg-white/20 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4"
              initial={{ scale: 0.95, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 40 }}
              transition={{ type: "spring", stiffness: 220, damping: 22 }}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Notification Settings</h3>
                  <button
                    onClick={() => setShowSettings(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Email Notifications */}
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="font-medium text-gray-700">Email Notifications</label>
                      <p className="text-sm text-gray-500">Receive email alerts for reports</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.emailNotifications}
                      onChange={(e) => setSettings(prev => ({...prev, emailNotifications: e.target.checked}))}
                      className="w-4 h-4 text-red-600 rounded"
                    />
                  </div>

                  {/* Critical Alerts */}
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="font-medium text-gray-700">Critical Alerts</label>
                      <p className="text-sm text-gray-500">Instant alerts for urgent reports</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.criticalAlerts}
                      onChange={(e) => setSettings(prev => ({...prev, criticalAlerts: e.target.checked}))}
                      className="w-4 h-4 text-red-600 rounded"
                    />
                  </div>

                  {/* Daily Summary */}
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="font-medium text-gray-700">Daily Summary</label>
                      <p className="text-sm text-gray-500">End-of-day report summary</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.dailySummary}
                      onChange={(e) => setSettings(prev => ({...prev, dailySummary: e.target.checked}))}
                      className="w-4 h-4 text-green-600 rounded"
                    />
                  </div>

                  {/* Email Address */}
                  {settings.emailNotifications && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={settings.emailAddress}
                        onChange={(e) => setSettings(prev => ({...prev, emailAddress: e.target.value}))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        placeholder="admin@company.com"
                      />
                    </div>
                  )}
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => {
                      // Here you would save settings to backend
                      console.log('Settings saved:', settings);
                      setShowSettings(false);
                    }}
                    className="flex-1 bg-red-600 text-white px-4 py-2 rounded-md hover:red-blue-700 transition-colors"
                  >
                    Save Settings
                  </button>
                  <button
                    onClick={() => setShowSettings(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notification Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 220, damping: 22 }}
            className="fixed inset-0 flex items-start justify-end z-50"
          >
            {/* Blur overlay */}
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
            {/* Notification panel */}
            <div className="relative mt-16 mr-8 w-80 bg-white rounded-lg shadow-xl border max-h-96 overflow-hidden z-10">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b bg-gray-50">
                <h3 className="font-semibold text-gray-800">Notifications</h3>
                <div className="flex items-center gap-2">
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-xs text-blue-600 hover:text-blue-800"
                    >
                      Mark all read
                    </button>
                  )}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
              {/* Notifications List */}
              <div className="max-h-72 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p>No notifications</p>
                    <p className="text-sm">You're all caught up!</p>
                  </div>
                ) : (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${
                        !notification.read ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                      }`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex items-start gap-3">
                        {getNotificationIcon(notification.type)}
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm text-gray-800 truncate">
                            {notification.title}
                          </p>
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {formatTime(notification.time)}
                          </p>
                        </div>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
              {/* Footer */}
              {notifications.length > 0 && (
                <div className="p-3 border-t bg-gray-50">
                  <button
                    className="w-full text-sm text-blue-600 hover:text-blue-800 flex items-center justify-center gap-2"
                    onClick={() => {
                      setIsOpen(false);
                      setShowSettings(true);
                    }}
                  >
                    <Settings className="w-4 h-4" />
                    Notification Settings
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

