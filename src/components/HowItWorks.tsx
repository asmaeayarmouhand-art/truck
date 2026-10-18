import React from 'react';
import { PhoneCall, FileText, Calculator, Truck } from 'lucide-react';
import { businessInfo } from '../config/businessInfo';

const stepIcons = [PhoneCall, FileText, Calculator, Truck];

export const HowItWorks: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-slate-900/60 text-white relative border-y border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-orange-500 uppercase mb-3">
            <span>Streamlined Workflow</span>
            <span aria-hidden="true">·</span>
            <span>From Breakdown to Dispatch</span>
          </div>
          <h2
            className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4"
            style={{ textWrap: 'balance' }}
          >
            How Our Service Process Works
          </h2>
          <p className="text-base text-slate-300 leading-relaxed">
            We follow a direct, transparent four-step protocol designed to evaluate problems fast, communicate clearly,
            and complete heavy-duty repairs with zero unnecessary downtime.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {businessInfo.howItWorks.map((step, idx) => {
            const IconComp = stepIcons[idx] || Truck;
            return (
              <div
                key={idx}
                className="relative flex flex-col p-6 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-slate-700 transition-colors"
              >
                {/* Step badge and icon */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-orange-400">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <span className="font-mono text-sm font-bold text-slate-400 tabular-nums">
                    STEP {step.stepNumber}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {step.description}
                </p>

                {/* Subtle bottom accent line */}
                <div className="mt-5 pt-3 border-t border-slate-900 text-[11px] text-slate-400">
                  {idx === 0 && 'Instant phone & online access'}
                  {idx === 1 && 'Symptom & diagnostic intake'}
                  {idx === 2 && 'Clear upfront authorization'}
                  {idx === 3 && 'Verified road readiness'}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
