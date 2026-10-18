import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Phone } from 'lucide-react';
import { businessInfo } from '../config/businessInfo';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First open by default

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-slate-900/70 text-white relative border-t border-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-orange-500 uppercase mb-3">
            <span>Got Questions?</span>
            <span aria-hidden="true">·</span>
            <span>Commercial Repair Knowledge</span>
          </div>
          <h2
            className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4"
            style={{ textWrap: 'balance' }}
          >
            Frequently Asked Questions
          </h2>
          <p className="text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Find immediate answers to common questions about our commercial truck repair capabilities, diesel services,
            fleet agreements, and estimate procedures.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {businessInfo.faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-xl bg-slate-950/80 border border-slate-800 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left font-semibold text-white hover:text-orange-400 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-orange-500 transition-colors"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span className="text-base sm:text-lg pr-4">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center shrink-0 text-slate-400 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-orange-400 bg-orange-950/40' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div
                    id={`faq-answer-${index}`}
                    className="px-5 sm:px-6 pb-6 pt-1 text-sm text-slate-300 leading-relaxed border-t border-slate-900/60 animate-in fade-in duration-150"
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions */}
        <div className="mt-12 text-center p-6 rounded-xl bg-slate-950/60 border border-slate-850">
          <p className="text-sm text-slate-300 mb-3">
            Have a question about a specific engine code, trailer issue, or fleet service agreement?
          </p>
          <a
            href={`tel:${businessInfo.contact.phoneTel}`}
            className="inline-flex items-center gap-2 text-sm font-bold text-orange-400 hover:text-orange-300 underline underline-offset-4"
          >
            <Phone className="w-4 h-4" />
            <span>Call Our Service Advisors Directly: {businessInfo.contact.phoneDisplay}</span>
          </a>
        </div>
      </div>
    </section>
  );
};
