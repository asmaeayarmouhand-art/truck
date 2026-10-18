import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { WhyChooseUs } from './components/WhyChooseUs';
import { HowItWorks } from './components/HowItWorks';
import { AboutUs } from './components/AboutUs';
import { FAQ } from './components/FAQ';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { MobileCtaBar } from './components/MobileCtaBar';
import { LegalModal } from './components/LegalModals';
import { AuthModal } from './components/AuthModal';

function AppContent() {
  const [selectedService, setSelectedService] = useState<string | undefined>(undefined);
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | null>(null);

  const scrollToContact = (serviceTitle?: string) => {
    if (serviceTitle) {
      setSelectedService(serviceTitle);
    }
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-orange-600 selection:text-white">
      {/* 1. Header Navigation with Account feature at top right */}
      <Navbar onRequestService={() => scrollToContact()} />

      <main className="flex-1">
        {/* 2. Hero Section */}
        <Hero onRequestService={() => scrollToContact()} />

        {/* 3. Services Section (All 9 cards) */}
        <Services onSelectService={(serviceTitle) => scrollToContact(serviceTitle)} />

        {/* 4. Why Choose Us */}
        <WhyChooseUs />

        {/* 5. How It Works */}
        <HowItWorks />

        {/* 6. About Us */}
        <AboutUs />

        {/* 7. FAQ Section */}
        <FAQ />

        {/* 8. Contact Section */}
        <Contact preselectedService={selectedService} />
      </main>

      {/* Footer */}
      <Footer
        onOpenLegal={(type) => setLegalModalType(type)}
        onSelectService={(serviceTitle) => scrollToContact(serviceTitle)}
      />

      {/* Sticky Mobile CTA Bar */}
      <MobileCtaBar onRequestService={() => scrollToContact()} />

      {/* Accessible Legal Modals (Privacy Policy / Terms of Service) */}
      <LegalModal
        isOpen={legalModalType !== null}
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />

      {/* Customer Account / Sign Up Modal */}
      <AuthModal />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
