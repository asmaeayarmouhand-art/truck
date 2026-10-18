import React, { useState } from 'react';
import { Users, MessageSquare, ShieldCheck, Gauge, Hourglass, Check } from 'lucide-react';
import { businessInfo } from '../config/businessInfo';
import { truckImages } from '../assets/images';

const iconList = [Users, MessageSquare, ShieldCheck, Gauge, Hourglass];

export const WhyChooseUs: React.FC = () => {
  const [imageError, setImageError] = useState(false);

  return (
    <section id="why-choose-us" className="py-16 sm:py-24 bg-slate-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Image showcase with diesel engine compartment */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-xl group">
              {!imageError ? (
                <img
                  src={truckImages.dieselEngine}
                  alt="Commercial semi-truck turbo diesel engine undergoing diagnostic maintenance"
                  referrerPolicy="no-referrer"
                  onError={() => setImageError(true)}
                  className="w-full h-full object-cover min-h-[380px] group-hover:scale-102 transition-transform duration-500"
                />
              ) : (
                <div className="w-full min-h-[380px] bg-slate-900 flex items-center justify-center p-8 text-center text-slate-400">
                  <p>Heavy Commercial Powertrain Specialist</p>
                </div>
              )}
              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-xs text-slate-300">
                <span className="font-bold text-white block">Precision Commercial Engine Maintenance</span>
                <span className="text-orange-400">Detroit, Cummins, PACCAR &amp; Cat Powertrains</span>
              </div>
            </div>

            {/* Supporting highlight card */}
            <div className="mt-4 p-4 rounded-xl bg-slate-900/60 border border-slate-850 flex items-center justify-between text-xs text-slate-300">
              <span className="font-semibold text-white">Commercial Focus</span>
              <span className="text-slate-400">Class 6, 7 &amp; 8 Heavy Trucks Only</span>
            </div>
          </div>

          {/* Right Column: The 5 core reasons */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-orange-500 uppercase mb-3">
              <span>Why Choose TRUCK SERVICE SI</span>
              <span aria-hidden="true">·</span>
              <span>Built For Trucking Operators</span>
            </div>

            <h2
              className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-6"
              style={{ textWrap: 'balance' }}
            >
              Truck Repair Built Around The Reality of Commercial Hauling
            </h2>

            <p className="text-base text-slate-300 leading-relaxed mb-8">
              Every day your truck is sidelined means lost revenue, delayed bills of lading, and stranded drivers.
              We focus our operation on rapid triage, transparent communication, and solid mechanical integrity.
            </p>

            <div className="space-y-4">
              {businessInfo.whyChooseUs.map((item, idx) => {
                const IconComp = iconList[idx] || Check;
                return (
                  <div
                    key={idx}
                    className="p-4 sm:p-5 rounded-xl bg-slate-900/70 border border-slate-850 hover:border-slate-750 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-orange-950/50 border border-orange-900/40 flex items-center justify-center text-orange-400 shrink-0 mt-0.5">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-white mb-1">
                          {item.title}
                        </h3>
                        <p className="text-sm text-slate-300 font-medium mb-1">
                          {item.description}
                        </p>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
