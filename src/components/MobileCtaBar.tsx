import React from 'react';
import { Phone, Wrench } from 'lucide-react';
import { businessInfo } from '../config/businessInfo';

interface MobileCtaBarProps {
  onRequestService: () => void;
}

export const MobileCtaBar: React.FC<MobileCtaBarProps> = ({ onRequestService }) => {
  return (
    <aside
      aria-label="Quick contact actions"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 p-2.5 px-4 shadow-2xl"
    >
      <div className="flex items-center gap-2.5 max-w-md mx-auto h-11">
        <a
          href={`tel:${businessInfo.contact.phoneTel}`}
          className="flex-1 flex items-center justify-center gap-2 h-full px-3 text-xs font-bold text-white bg-slate-900 border border-slate-750 active:bg-slate-800 rounded-lg whitespace-nowrap"
        >
          <Phone className="w-3.5 h-3.5 text-orange-400" />
          <span>Call Dispatch</span>
        </a>

        <button
          onClick={onRequestService}
          className="flex-1 flex items-center justify-center gap-2 h-full px-3 text-xs font-bold text-white bg-orange-600 active:bg-orange-500 rounded-lg shadow-md shadow-orange-950/60 whitespace-nowrap"
        >
          <Wrench className="w-3.5 h-3.5" />
          <span>Request Service</span>
        </button>
      </div>
    </aside>
  );
};
