import React from 'react';
import { Phone, Mail, MapPin, Shield } from 'lucide-react';
import { businessInfo } from '../config/businessInfo';

interface FooterProps {
  onOpenLegal: (type: 'privacy' | 'terms') => void;
  onSelectService: (serviceTitle: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLegal, onSelectService }) => {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'Why Choose Us', href: '#why-choose-us' },
    { label: 'About Us', href: '#about-us' },
    { label: 'Contact Dispatch', href: '#contact' },
  ];

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-900 pt-16 pb-24 md:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-slate-900">
          {/* Brand & Purpose (Col 1-4) */}
          <div className="lg:col-span-4 space-y-4">
            <a href="#home" className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-lg bg-orange-600 flex items-center justify-center text-white shadow-md">
                <Shield className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div className="flex flex-col">
                <span className="font-condensed text-xl font-bold tracking-wider text-white uppercase leading-none">
                  {businessInfo.brandMark}
                </span>
                <span className="text-[10px] font-medium tracking-wide text-orange-400 uppercase leading-tight">
                  Heavy Truck &amp; Fleet Repair
                </span>
              </div>
            </a>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Commercial heavy-duty truck repair, diesel engine rebuilds, computer diagnostics, and preventative fleet
              maintenance for independent owner-operators and commercial freight haulers.
            </p>

            <div className="pt-2 text-xs text-slate-400 space-y-1">
              <div>
                <span className="text-slate-300 font-semibold">Specialization:</span> Commercial Heavy Trucks &amp; Trailers
              </div>
              <div>
                <span className="text-slate-300 font-semibold">Standard:</span> Commercial Safety &amp; Quality Compliance
              </div>
            </div>
          </div>

          {/* Navigation Links (Col 5-6) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:text-white hover:underline underline-offset-4 decoration-orange-500 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links (Col 7-9) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Repair Capabilities
            </h4>
            <ul className="space-y-2 text-xs">
              {businessInfo.services.map((service) => (
                <li key={service.id}>
                  <button
                    onClick={() => onSelectService(service.title)}
                    className="text-left text-slate-400 hover:text-white hover:underline decoration-orange-500 transition-colors"
                  >
                    {service.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information (Col 10-12) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Contact &amp; Dispatch
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <Phone className="w-3.5 h-3.5 text-orange-400 shrink-0 mt-0.5" />
                <div>
                  <a
                    href={`tel:${businessInfo.contact.phoneTel}`}
                    className="text-white hover:text-orange-400 font-semibold transition-colors block"
                  >
                    {businessInfo.contact.phoneDisplay}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Mail className="w-3.5 h-3.5 text-orange-400 shrink-0 mt-0.5" />
                <div>
                  <a
                    href={`mailto:${businessInfo.contact.emailMailto}`}
                    className="hover:text-white transition-colors block break-all"
                  >
                    {businessInfo.contact.emailDisplay}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-orange-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-slate-300 leading-tight">{businessInfo.contact.addressDisplay}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quiet Sub-Footer with Legal & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            &copy; {currentYear} {businessInfo.companyName}. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <button
              onClick={() => onOpenLegal('privacy')}
              className="hover:text-white hover:underline transition-colors"
            >
              Privacy Policy
            </button>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <button
              onClick={() => onOpenLegal('terms')}
              className="hover:text-white hover:underline transition-colors"
            >
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
