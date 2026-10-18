import React, { useState, useEffect } from 'react';
import { Phone, Wrench, Menu, X, Shield } from 'lucide-react';
import { businessInfo } from '../config/businessInfo';

interface NavbarProps {
  onRequestService: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onRequestService }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'Why Choose Us', href: '#why-choose-us' },
    { label: 'About Us', href: '#about-us' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 border-b ${
        isScrolled
          ? 'bg-slate-950/95 backdrop-blur-md border-slate-800/80 shadow-lg shadow-black/40'
          : 'bg-slate-950 border-slate-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4 lg:gap-8">
          {/* Zone 1: Company Logo and Name */}
          <a
            href="#home"
            className="flex items-center gap-3 group shrink-0 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-orange-500 rounded-lg p-1"
          >
            <div className="w-10 h-10 rounded-lg bg-orange-600 flex items-center justify-center text-white shadow-md shadow-orange-950 group-hover:bg-orange-500 transition-colors">
              <Shield className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div className="flex flex-col">
              <span className="font-condensed text-xl sm:text-2xl font-bold tracking-wider text-white uppercase leading-none">
                {businessInfo.brandMark}
              </span>
              <span className="text-[11px] font-medium tracking-wide text-orange-400 uppercase leading-tight">
                Heavy Truck &amp; Fleet Repair
              </span>
            </div>
          </a>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="whitespace-nowrap hover:text-white hover:underline underline-offset-4 decoration-orange-500 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Action Buttons */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <a
              href={`tel:${businessInfo.contact.phoneTel}`}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-200 bg-slate-900 border border-slate-700/80 rounded-lg hover:bg-slate-800 hover:text-white transition-colors whitespace-nowrap focus:outline-hidden focus-visible:ring-2 focus-visible:ring-orange-500"
              title={`Call ${businessInfo.contact.phoneDisplay}`}
            >
              <Phone className="w-3.5 h-3.5 text-orange-400" />
              <span>Call Now</span>
              <span className="text-slate-400 font-normal">
                {businessInfo.contact.phoneDisplay}
              </span>
            </a>

            <button
              onClick={onRequestService}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-orange-600 rounded-lg hover:bg-orange-500 shadow-sm shadow-orange-900/40 transition-colors whitespace-nowrap focus:outline-hidden focus-visible:ring-2 focus-visible:ring-orange-400"
            >
              <Wrench className="w-3.5 h-3.5" />
              <span>Request Service</span>
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex items-center gap-2 sm:hidden">
            <a
              href={`tel:${businessInfo.contact.phoneTel}`}
              className="p-2 text-orange-400 bg-slate-900 border border-slate-800 rounded-lg hover:bg-slate-800"
              aria-label="Call Now"
            >
              <Phone className="w-4 h-4" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white bg-slate-900 border border-slate-800 rounded-lg focus:outline-hidden focus-visible:ring-2 focus-visible:ring-orange-500"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-800 bg-slate-950 px-4 pt-2 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-150">
          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={handleLinkClick}
                className="px-3 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-900 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800/80 flex flex-col gap-2">
            <a
              href={`tel:${businessInfo.contact.phoneTel}`}
              onClick={handleLinkClick}
              className="flex items-center justify-center gap-2 w-full py-2.5 px-4 text-sm font-semibold text-white bg-slate-900 border border-slate-750 rounded-lg hover:bg-slate-850"
            >
              <Phone className="w-4 h-4 text-orange-400" />
              <span>Call Dispatch: {businessInfo.contact.phoneDisplay}</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onRequestService();
              }}
              className="flex items-center justify-center gap-2 w-full py-2.5 px-4 text-sm font-bold text-white bg-orange-600 rounded-lg hover:bg-orange-500 shadow-md shadow-orange-950"
            >
              <Wrench className="w-4 h-4" />
              <span>Request Truck Repair</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
