import React, { useState, useEffect } from "react";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram, 
  Github, 
  CheckCircle 
} from "lucide-react";

// Success screen component
const SuccessMessage = ({ onBack }) => {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    const timeout = setTimeout(() => {
      onBack();
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [onBack]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-red-900 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full mb-6">
          <CheckCircle className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-4">Message Sent Successfully!</h2>
        <p className="text-gray-300 mb-6">
          Thank you for reaching out. We'll get back to you soon.
        </p>
        <p className="text-sm text-gray-400">
          Redirecting in {countdown} seconds...
        </p>
        <button 
          onClick={onBack}
          className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          Back to Contact
        </button>
      </div>
    </div>
  );
};

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      setFormData({ name: "", company: "", email: "", phone: "", message: "" });
    }, 2000);
  };

  const handleBackToContact = () => {
    setShowSuccess(false);
  };

  if (showSuccess) {
    return <SuccessMessage onBack={handleBackToContact} />;
  }

  return (
    <div className="min-h-screen bg-[url('/images/bg5.jpeg')] bg-cover text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-rose-500 via-red-500 to-pink-600 bg-clip-text text-transparent">
            Contact Us
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Facing trouble while exploring <span className="text-red-400 font-medium">Astra</span>, 
            or want to bring Astra to your campus or workplace? We're here to help!
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Side - Info */}
          <div className="space-y-12">
            <div>
              <p className="text-red-400 text-md tracking-wider uppercase mb-3">
                Get in Touch
              </p>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                We'd love to hear from you. Whether you have questions, need support, or want 
                Astra for your institution, let's start a conversation.
              </p>
            </div>

            {/* Contact Info */}
            <div className="grid md:grid-cols-2 gap-6">
              
              {/* Phone */}
              <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 group">
                <Phone className="w-5 h-5 text-red-400 mb-3 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xs font-semibold text-red-400 uppercase mb-3">Phone</h3>
                <p className="text-gray-300 text-sm">+91 7505696519</p>
                <p className="text-gray-300 text-sm">Mon - Fri: 9AM - 6PM IST</p>
              </div>

              {/* Email */}
              <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 group">
                <Mail className="w-5 h-5 text-red-400 mb-3 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xs font-semibold text-red-400 uppercase mb-3">Email Support</h3>
                <p className="text-gray-300 text-sm">uzzwal7505@gmail.com</p>
              </div>

              {/* Headquarters */}
              <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 group md:col-span-2">
                <MapPin className="w-5 h-5 text-red-400 mb-3 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xs font-semibold text-red-400 uppercase mb-3">Headquarters</h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  Hapur, Srinagar, Uttar Pradesh, India
                </p>
                <div className="bg-gray-800/50 rounded-xl border border-white/10 shadow-lg">
                  <iframe
                    title="Astra HQ Map - Hapur"
                    src="https://www.openstreetmap.org/export/embed.html?bbox=77.768%2C28.700%2C77.825%2C28.780&layer=mapnik&marker=28.740%2C77.795"
                    width="100%"
                    height="250"
                    className="rounded-xl border-0"
                    style={{ border: "1px solid #ccc" }}
                  ></iframe>
                  <div className="p-4">
                    <p className="text-xs text-gray-400">
                      <a
                        href="https://www.openstreetmap.org/?mlat=28.740&mlon=77.795#map=14/28.740/77.795"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-400 hover:text-cyan-300 underline"
                      >
                        View Larger Map →
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="text-white font-medium mb-4">Connect With Us</h3>
              <div className="flex space-x-4">
                {[
                  { Icon: Facebook, href: "#facebook" },
                  { Icon: Twitter, href: "#twitter" },
                  { Icon: Linkedin, href: "#linkedin" },
                  { Icon: Instagram, href: "#instagram" },
                  { Icon: Github, href: "#github" }
                ].map(({ Icon, href }, idx) => (
                  <a
                    key={idx}
                    href={href}
                    className="w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-gray-300 hover:text-white hover:bg-red-500 hover:border-red-400 transition-all duration-300 hover:scale-110"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 lg:p-10 shadow-xl">
            <div className="mb-8">
              <h2 className="text-2xl font-light mb-3">Send us a message</h2>
              <p className="text-gray-400">
                Share your thoughts or questions and let's build something meaningful together
              </p>
            </div>

            <div className="space-y-6">
              
              {/* Name & Company */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-400"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Company</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-400"
                    placeholder="Company name"
                  />
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-400"
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-400"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="5"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
                  placeholder="Tell us about your project..."
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-red-500 to-pink-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-red-600 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900 flex items-center justify-center space-x-2 group disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300"
              >
                <span className="tracking-wide uppercase text-sm font-semibold">
                  {isSubmitting ? "Sending..." : "Send Message"}
                </span>
                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;