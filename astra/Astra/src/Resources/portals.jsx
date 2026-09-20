import React from "react";
import { Shield, Phone, Globe } from "lucide-react";

const contacts = [
  { name: "Police Emergency", number: "100", type: "phone" },
  { name: "Fire Emergency", number: "101", type: "phone" },
  { name: "Ambulance", number: "102 / 108", type: "phone" },
  { name: "Women Helpline", number: "181", type: "phone" },
  { name: "Childline", number: "1098", type: "phone" },
  { name: "Cyber Crime Reporting", url: "https://cybercrime.gov.in/", type: "web" },
  { name: "NCW (Women Commission)", url: "https://www.ncw.gov.in/", type: "web" },
  { name: "Anti-Ragging Helpline", number: "1800-180-5522", type: "phone" },
  { name: "Municipalities contact", url:"https://igod.gov.in/leg/L008/organizations", type: "web" },
];

function Portals() {
  return (
    <div className="p-6 bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white min-h-screen">
      <h1 className="text-3xl font-bold text-rose-500 mb-6">🚨 Important Contacts</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {contacts.map((c, idx) => (
          <div
            key={idx}
            className="bg-gray-800 p-4 rounded-2xl shadow-md hover:shadow-rose-500/30 transition"
          >
            <div className="flex items-center space-x-3">
              {c.type === "phone" ? (
                <Phone className="text-rose-400" />
              ) : (
                <Globe className="text-rose-400" />
              )}
              <h2 className="text-lg font-semibold">{c.name}</h2>
            </div>
            {c.type === "phone" ? (
              <p className="mt-2 text-gray-300"> {c.number}</p>
            ) : (
              <a
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-rose-400 hover:underline"
              >
                Visit Website
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Portals;
