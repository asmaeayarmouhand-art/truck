import React, { useState } from 'react';
import { Phone, ArrowRight, ShieldCheck, Clock, Award, Truck } from 'lucide-react';
import { businessInfo } from '../config/businessInfo';
import { truckImages } from '../assets/images';

interface HeroProps {
  onRequestService: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onRequestService }) => {
  const [imageError, setImageError] = useState(false);

  const trustStats = [
    {
      icon: Truck,
      label: 'Commercial Class 6–8 Rigs',
      subtext: 'Specialized for heavy tractors & trailers',
    },
    {
      icon: ShieldCheck,
      label: 'Experienced Technicians',
      subtext: 'Cummins, Detroit, PACCAR & Cat systems',
    },
    {
      icon: Clock,
      label: 'Rapid Triage & Intake',
      subtext: 'Structured to minimize vehicle downtime',
    },
    {
      icon: Award,
      label: 'Commercial Grade Parts',
      subtext: 'Strict adherence to DOT standards',
    },
  ];

  return (
    <section id="home" className="relative bg-slate-950 text-white overflow-hidden pt-6 pb-12 sm:pt-10 sm:pb-16 lg:pb-20">
      {/* Subtle industrial background grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main 2-Column Split: Hero Proposition + Dominant Heavy Truck Photo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Proposition & CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Quiet, unboxed kicker tag (anti-pill rule) */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-orange-500 uppercase mb-4">
              <span>Heavy-Duty Commercial Repair</span>
              <span aria-hidden="true">·</span>
              <span>Class 7 &amp; 8 Fleet Specialists</span>
            </div>

            <h1
              className="text-4xl sm:text-5xl lg:text-[3.4rem] font-bold tracking-tight text-white leading-[1.08] mb-6"
              style={{ textWrap: 'balance' }}
            >
              Reliable Truck Repair.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-amber-500">
                Built Around Your Business.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mb-8">
              Keep your freight moving with dependable heavy-duty semi-truck repair, precision diesel engine
              troubleshooting, transmission service, and commercial fleet maintenance. Engineered with fast turnaround
              to protect your hauling schedules and minimize driver downtime.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8">
              <button
                onClick={onRequestService}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-bold text-white bg-orange-600 rounded-lg hover:bg-orange-500 shadow-lg shadow-orange-950/60 transition-all hover:translate-y-[-1px] focus:outline-hidden focus-visible:ring-2 focus-visible:ring-orange-400"
              >
                <span>Request Truck Repair</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={`tel:${businessInfo.contact.phoneTel}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-slate-100 bg-slate-900 border border-slate-750 rounded-lg hover:bg-slate-800 hover:border-slate-600 transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-orange-500"
              >
                <Phone className="w-4 h-4 text-orange-400" />
                <span>Call Our Team</span>
                <span className="text-xs text-slate-400 font-normal">
                  ({businessInfo.contact.phoneDisplay})
                </span>
              </a>
            </div>

            {/* Operational summary line */}
            <div className="flex items-center gap-2 text-xs text-slate-400 pt-2 border-t border-slate-900">
              <span className="text-slate-300 font-medium">Service Coverage:</span>
              <span>Diesel Powertrains</span>
              <span aria-hidden="true">·</span>
              <span>Air Brakes</span>
              <span aria-hidden="true">·</span>
              <span>DOT Inspections</span>
              <span aria-hidden="true">·</span>
              <span>Commercial Fleets</span>
            </div>
          </div>

          {/* Right Column: High-Impact Photography of Heavy-Duty Repair Bay */}
          <div className="lg:col-span-5 relative flex">
            <div className="w-full relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl group min-h-[340px] sm:min-h-[420px] lg:min-h-[480px]">
              {!imageError ? (
                <img
                  src={truckImages.heroTruck}
                  alt="Heavy duty commercial semi-truck undergoing repair in professional service bay"
                  referrerPolicy="no-referrer"
                  onError={() => setImageError(true)}
                  className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700 ease-out"
                />
              ) : (
                <div className="w-full h-full min-h-[400px] flex flex-col items-center justify-center p-8 text-center bg-slate-900 text-slate-400">
                  <Truck className="w-16 h-16 text-orange-500 mb-4 stroke-1" />
                  <p className="text-lg font-semibold text-white">Commercial Heavy-Duty Truck Center</p>
                  <p className="text-xs text-slate-400 mt-2">Class 7 &amp; 8 Tractor and Trailer Maintenance</p>
                </div>
              )}

              {/* Ambient gradient scrim at bottom for text legibility & contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent pointer-events-none" />

              {/* Inset context label */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-slate-300 pointer-events-none">
                <span className="font-semibold text-white tracking-wide">
                  Class 8 Service Bay &amp; Powertrain Triage
                </span>
                <span className="text-orange-400 font-medium">Heavy Commercial</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column KPI / Trust Indicators Strip in a full-width row below the hero split */}
        <div className="mt-12 lg:mt-16 pt-8 border-t border-slate-900">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustStats.map((stat, idx) => {
              const IconComp = stat.icon;
              return (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-900/60 border border-slate-850 hover:border-slate-750 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 rounded-lg bg-orange-950/60 border border-orange-900/60 flex items-center justify-center text-orange-400 shrink-0">
                      <IconComp className="w-4 h-4" />
                    </div>
                    <span className="font-semibold text-white text-sm tracking-tight">
                      {stat.label}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-normal pl-12">
                    {stat.subtext}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
