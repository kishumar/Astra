import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star } from 'lucide-react'

const faqs = [
  {
    question: "Do I need to sign up to report an issue?",
    answer: "No, Astra allows completely anonymous reporting. You don’t need an account to raise a concern."
  },
  {
  question: "How is my identity protected?",
  answer: "Your identity is fully protected. We use strong encryption and never store personal details. Reports are generated as secure PDFs which you can download, reports are viewable by the admin only using an admin id — neither Astra nor the admin can see your personal information."
},
  {
    question: "How long does it take for a report to reach authorities?",
    answer: "Reports are delivered instantly via secure channels, ensuring timely action."
  },
  {
    question: "Can authorities trace my report back to me?",
    answer: "No, Astra ensures complete anonymity. Even we cannot trace reports back to individuals."
  },
  {
    question: "Can I save my report?",
    answer: "Yes, you can instantly download your report as a PDF and use it whenever required."
  },
  {
    question: "Is Astra free to use?",
    answer: "Absolutely. Astra is completely free for everyone to ensure accessibility and impact."
  },
]

function AstraFAQ() {
  const [openIdx, setOpenIdx] = useState(null)

  const toggle = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx)
  }

  return (
   <div className="w-full bg-[url('/images/bg7.jpeg')] bg-cover bg-center text-gray-400 overflow-x-hidden">

      <div className="max-w-4xl mx-auto py-16 px-6">
        {/* Header */}
        <div className="text-center">
          <div className="inline-block border border-pink-400 rounded-full px-6 py-1 bg-pink-50 text-pink-600 text-xl font-semibold uppercase tracking-wide">
          FAQs
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mt-6 mb-4">
            Got Questions? <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500">We’ve Got Answers</span>
          </h2>
          <p className="text-gray-500 text-lg">
            Everything you need to know about Astra
          </p>
        </div>

        {/* FAQ List */}
        <div className="mt-12 flex flex-col gap-5">
          {faqs.map((faq, idx) => (
            <motion.div
              key={idx}
              layout
              transition={{ layout: { duration: 0.4, type: "spring" } }}
              className={`
                group relative overflow-hidden
                rounded-2xl border border-pink-100
                bg-white/80 backdrop-blur-md
                shadow-sm hover:shadow-md transition-all
                cursor-pointer
                ${openIdx === idx ? "ring-2 ring-pink-300" : ""}
              `}
              onClick={() => toggle(idx)}
            >
              <div className="flex items-center justify-between gap-2 px-6 py-4">
                <h3 className="font-semibold text-lg text-gray-900 group-hover:text-pink-600 transition-colors">
                  {faq.question}
                </h3>
                <motion.div
                  animate={{ rotate: openIdx === idx ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center justify-center rounded-full border border-pink-300 bg-pink-50 w-8 h-8"
                >
                  <svg
                    className="w-5 h-5 text-pink-600"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                </motion.div>
              </div>
              <AnimatePresence initial={false}>
                {openIdx === idx && (
                  <motion.div
                    key="answer"
                    initial={{ opacity: 0, height: 0, y: -10 }}
                    animate={{ opacity: 1, height: "auto", y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 pt-2 text-gray-700 text-base leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AstraFAQ
