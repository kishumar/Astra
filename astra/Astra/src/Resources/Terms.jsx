import React from "react";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-950 text-gray-200 px-6 py-16">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-red-500 to-pink-500 text-center mb-10">
          Astra – Terms of Service
        </h1>
        <p className="text-center text-gray-400 mb-12">
          Last updated: August 2025
        </p>

        {/* Section */}
        <section className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold text-rose-400 mb-3">1. Acceptance of Terms</h2>
            <p className="text-gray-300 leading-relaxed">
              By accessing and using Astra, you agree to be bound by these Terms of Service. 
              If you do not agree, please discontinue use of the platform immediately.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-rose-400 mb-3">2. Purpose of Astra</h2>
            <p className="text-gray-300 leading-relaxed">
              Astra is designed to enable safe, anonymous reporting of incidents 
              such as crimes, civic problems, harassment, or unsafe environments. 
              Our goal is to ensure issues are transparently addressed by the right authorities.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-rose-400 mb-3">3. User Responsibilities</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-300 leading-relaxed">
              <li>Submit accurate and truthful information when reporting incidents.</li>
              <li>Do not misuse the platform for false, malicious, or defamatory reports.</li>
              <li>Respect the privacy and safety of others when sharing content.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-rose-400 mb-3">4. Privacy & Anonymity</h2>
            <p className="text-gray-300 leading-relaxed">
              We do not collect personal details unless voluntarily shared. Reports are 
              anonymized and assigned a unique tracking ID. Data is encrypted and only 
              accessible to authorized authorities for resolution.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-rose-400 mb-3">5. Authority Responsibilities</h2>
            <p className="text-gray-300 leading-relaxed">
              Registered authorities (police, HR, municipality, campus admins) are 
              responsible for handling reports fairly, transparently, and within 
              their jurisdiction.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-rose-400 mb-3">6. Limitations of Liability</h2>
            <p className="text-gray-300 leading-relaxed">
              Astra is a reporting and routing tool. While we strive for accuracy, 
              we are not responsible for delays, actions, or decisions made by 
              authorities in handling reports.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-rose-400 mb-3">7. Changes to Terms</h2>
            <p className="text-gray-300 leading-relaxed">
              We may update these Terms from time to time. Users will be notified 
              of significant changes through the platform.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-rose-400 mb-3">8. Contact</h2>
            <p className="text-gray-300 leading-relaxed">
              For any questions or concerns regarding these Terms, please contact 
              us at <span className="text-pink-400">support@astra.ai</span>.
            </p>
          </div>
        </section>

        {/* Footer */}
        <div className="mt-16 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Astra. All rights reserved.
        </div>
      </div>
    </div>
  );
}
