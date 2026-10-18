import React, { useState } from 'react';
import { Shield, Wrench, Headphones, HardHat, Check } from 'lucide-react';
import { businessInfo } from '../config/businessInfo';
import { truckImages } from '../assets/images';

export const AboutUs: React.FC = () => {
  const [imageError, setImageError] = useState(false);

  const pillars = [
    {
      icon: Shield,
      title: 'Safety Standards',
      desc: 'Commercial rigs haul up to 80,000 lbs. We repair every steering, brake, and chassis component in strict alignment with DOT and FMCSA commercial vehicle safety regulations.',
    },
    {
      icon: HardHat,
      title: 'Precision Workmanship',
      desc: 'Our mechanical team applies disciplined procedures, proper torque specifications, and factory diagnostic protocols to ensure repairs are done right the first time.',
    },
    {
      icon: Wrench,
      title: 'Operational Reliability',
      desc: 'We source high-grade commercial OEM and heavy-duty aftermarket components, verifying systems under load before releasing vehicles back onto high-speed freight corridors.',
    },
    {
      icon: Headphones,
      title: 'Direct Customer Service',
      desc: 'Whether you manage a 50-truck corporate fleet or drive an owner-operator rig, you receive honest status updates, transparent pricing, and responsive dispatch support.',
    },
  ];

  return (
    <section id="about-us" className="py-16 sm:py-24 bg-slate-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Company Introduction & Values */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-orange-500 uppercase mb-3">
              <span>About Our Company</span>
              <span aria-hidden="true">·</span>
              <span>Commercial Mechanical Service</span>
            </div>

            <h2
              className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-6"
              style={{ textWrap: 'balance' }}
            >
              Dedicated to Heavy-Duty Reliability and Commercial Road Safety
            </h2>

            <p className="text-base text-slate-300 leading-relaxed mb-6">
              {businessInfo.companyName} provides professional heavy truck repair, diesel engine services, and
              preventive fleet maintenance for commercial transport operators across the United States. We serve
              independent owner-operators, freight transport fleets, and commercial businesses whose livelihood depends
              on dependable equipment.
            </p>

            <p className="text-sm text-slate-300 leading-relaxed mb-8">
              Our business is built on a straightforward standard: give commercial vehicle operators accurate
              diagnostics, honest estimates, and dependable mechanical repairs without unnecessary delay or surprise
              costs.
            </p>

            {/* 4 Core Commitments */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {pillars.map((pillar, idx) => {
                const IconComp = pillar.icon;
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-slate-900/60 border border-slate-850 hover:border-slate-800 transition-colors"
                  >
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-orange-950/60 border border-orange-900/50 flex items-center justify-center text-orange-400 shrink-0">
                        <IconComp className="w-4 h-4" />
                      </div>
                      <h3 className="font-bold text-white text-sm">
                        {pillar.title}
                      </h3>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Fleet Yard Photography */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-xl group">
              {!imageError ? (
                <img
                  src={truckImages.fleetYard}
                  alt="Modern commercial semi-trucks and freight haulers staged at service facility"
                  referrerPolicy="no-referrer"
                  onError={() => setImageError(true)}
                  className="w-full h-full object-cover min-h-[380px] group-hover:scale-102 transition-transform duration-500"
                />
              ) : (
                <div className="w-full min-h-[380px] bg-slate-900 flex items-center justify-center p-8 text-center text-slate-400">
                  <p>Commercial Logistics Support &amp; Fleet Care</p>
                </div>
              )}
              {/* Overlay banner */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-xs text-slate-300">
                <span className="font-bold text-white block">Commercial Haulers &amp; Fleet Operations</span>
                <span className="text-slate-400">Scheduled PMs, rapid bay triage &amp; roadside support</span>
              </div>
            </div>

            <div className="mt-4 p-4 rounded-xl bg-slate-900/50 border border-slate-850 flex items-center gap-3 text-xs text-slate-300">
              <Check className="w-4 h-4 text-orange-400 shrink-0" />
              <span>Strict compliance with Federal Motor Carrier Safety Administration (FMCSA) mechanical standards</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
