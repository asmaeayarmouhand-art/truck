import React, { useState } from 'react';
import {
  Wrench,
  Truck,
  Cpu,
  ShieldAlert,
  Cog,
  ClipboardCheck,
  Zap,
  Boxes,
  Container,
  ArrowRight,
  CheckCircle2,
  X,
  Phone,
} from 'lucide-react';
import { businessInfo, ServiceItem } from '../config/businessInfo';

interface ServicesProps {
  onSelectService: (serviceTitle: string) => void;
}

const iconMap: Record<string, React.ElementType> = {
  Wrench,
  Truck,
  Cpu,
  ShieldAlert,
  Cog,
  ClipboardCheck,
  Zap,
  Boxes,
  Container,
};

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  const [activeModalService, setActiveModalService] = useState<ServiceItem | null>(null);

  const handleBookService = (serviceTitle: string) => {
    setActiveModalService(null);
    onSelectService(serviceTitle);
  };

  return (
    <section id="services" className="py-16 sm:py-24 bg-slate-900/90 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-orange-500 uppercase mb-3">
            <span>Core Mechanical Capabilities</span>
            <span aria-hidden="true">·</span>
            <span>Commercial Vehicle Services</span>
          </div>
          <h2
            className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4"
            style={{ textWrap: 'balance' }}
          >
            Heavy-Duty Truck Repair &amp; Maintenance Services
          </h2>
          <p className="text-base text-slate-300 leading-relaxed">
            From emergency engine diagnostics to comprehensive transmission overhauls and scheduled fleet maintenance,
            our shop is equipped with industrial tooling and software to service Class 6 through Class 8 commercial vehicles.
          </p>
        </div>

        {/* 9 Services Grid (Asymmetric responsive grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {businessInfo.services.map((service, index) => {
            const IconComponent = iconMap[service.icon] || Wrench;
            const indexNumber = String(index + 1).padStart(2, '0');

            return (
              <div
                key={service.id}
                className="group relative flex flex-col justify-between p-6 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 transition-all duration-200 hover:shadow-xl hover:shadow-black/50"
              >
                <div>
                  {/* Top line: Icon and Editorial Index */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-orange-400 group-hover:text-orange-300 group-hover:border-orange-500/40 transition-colors">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-xs font-semibold text-slate-400 tabular-nums">
                      {indexNumber}
                    </span>
                  </div>

                  {/* Title & Short Description */}
                  <h3 className="text-xl font-bold text-white mb-2.5 group-hover:text-orange-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed mb-5">
                    {service.shortDesc}
                  </p>

                  {/* Key Capabilities List */}
                  <ul className="space-y-2 mb-6">
                    {service.features.slice(0, 3).map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-orange-500 mt-0.5 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Action Controls */}
                <div className="pt-4 border-t border-slate-850 flex items-center justify-between gap-3">
                  <button
                    onClick={() => setActiveModalService(service)}
                    className="text-xs font-semibold text-slate-400 hover:text-white hover:underline transition-colors focus:outline-hidden focus-visible:ring-1 focus-visible:ring-orange-500"
                  >
                    View Details
                  </button>

                  <button
                    onClick={() => handleBookService(service.title)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-orange-400 bg-orange-950/40 border border-orange-900/50 rounded-md hover:bg-orange-600 hover:text-white hover:border-orange-600 transition-colors"
                  >
                    <span>Request Service</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom service banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-lg font-bold text-white mb-1">
              Need specialized diagnostic testing or an emergency service call?
            </h4>
            <p className="text-sm text-slate-300">
              Speak directly with our service dispatch team for immediate scheduling and bay availability.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
            <a
              href={`tel:${businessInfo.contact.phoneTel}`}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors w-full sm:w-auto"
            >
              <Phone className="w-4 h-4 text-orange-400" />
              <span>{businessInfo.contact.phoneDisplay}</span>
            </a>
            <button
              onClick={() => onSelectService('General Heavy Truck Diagnostics')}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-orange-600 hover:bg-orange-500 rounded-lg transition-colors w-full sm:w-auto"
            >
              <span>Schedule Service</span>
            </button>
          </div>
        </div>
      </div>

      {/* Service Detail Modal */}
      {activeModalService && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xs animate-in fade-in duration-150"
          role="dialog"
          aria-modal="true"
          aria-labelledby="service-modal-title"
        >
          <div className="relative w-full max-w-xl bg-slate-900 border border-slate-750 rounded-2xl p-6 sm:p-8 text-slate-200 shadow-2xl">
            <div className="flex items-start justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-semibold text-orange-500 uppercase tracking-wider">
                  Service Specification
                </span>
                <h3 id="service-modal-title" className="text-2xl font-bold text-white mt-1">
                  {activeModalService.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveModalService(null)}
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-5 space-y-4">
              <p className="text-sm text-slate-300 leading-relaxed">
                {activeModalService.fullDesc}
              </p>

              <div className="pt-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                  Scope of Work &amp; Procedures
                </h4>
                <div className="grid grid-cols-1 gap-2">
                  {activeModalService.features.map((feat, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2.5 text-xs text-slate-200 p-2 rounded-lg bg-slate-950/60 border border-slate-850"
                    >
                      <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-5 border-t border-slate-800 flex items-center justify-between gap-4">
              <button
                onClick={() => setActiveModalService(null)}
                className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white transition-colors"
              >
                Back to Services
              </button>
              <button
                onClick={() => handleBookService(activeModalService.title)}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-orange-600 rounded-lg hover:bg-orange-500 transition-colors"
              >
                <span>Book This Service Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
