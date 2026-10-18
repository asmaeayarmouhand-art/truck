import React from 'react';
import { X, ShieldCheck, FileText } from 'lucide-react';
import { businessInfo } from '../config/businessInfo';

interface LegalModalProps {
  isOpen: boolean;
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, type, onClose }) => {
  if (!isOpen || !type) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-slate-900 border border-slate-750 rounded-xl p-6 sm:p-8 text-slate-200 shadow-2xl">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            {type === 'privacy' ? (
              <ShieldCheck className="w-6 h-6 text-orange-500" />
            ) : (
              <FileText className="w-6 h-6 text-orange-500" />
            )}
            <h3 id="modal-title" className="text-xl font-bold text-white">
              {type === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-5 space-y-4 text-sm text-slate-300 leading-relaxed">
          {type === 'privacy' ? (
            <>
              <p>
                At <strong>{businessInfo.companyName}</strong>, we respect the privacy of truck drivers, fleet operators,
                and commercial customers. This policy summarizes how we handle contact and vehicle information submitted
                through our online service portal.
              </p>
              <h4 className="text-base font-semibold text-white pt-2">Information We Collect</h4>
              <p>
                When you request a service, we collect contact information (name, phone number, email address) and
                equipment data (truck make, model, service requirements, and current location) strictly to coordinate
                repair estimates and dispatch logistics.
              </p>
              <h4 className="text-base font-semibold text-white pt-2">How We Use Your Information</h4>
              <p>
                Vehicle and contact details are used solely to communicate regarding your service ticket, provide repair
                updates, and coordinate technician arrival. We do not sell or rent driver or company information to third
                parties.
              </p>
              <h4 className="text-base font-semibold text-white pt-2">Contact & Security</h4>
              <p>
                All data submitted through our dispatch portal is handled with commercial care. If you have any questions
                regarding your data, contact our dispatch team directly.
              </p>
            </>
          ) : (
            <>
              <p>
                Welcome to <strong>{businessInfo.companyName}</strong>. By accessing this service portal or scheduling
                repairs with our shop, you agree to standard commercial service terms.
              </p>
              <h4 className="text-base font-semibold text-white pt-2">Estimates & Authorization</h4>
              <p>
                Diagnostic fees and preliminary repair estimates are presented to the vehicle operator or fleet manager
                prior to starting significant mechanical work. Additional discovered defects will be communicated for
                authorization before proceeding.
              </p>
              <h4 className="text-base font-semibold text-white pt-2">Commercial Standards & Safety</h4>
              <p>
                All repairs adhere to applicable DOT and manufacturer safety standards. Customers are responsible for
                verifying pre-trip inspection compliance upon vehicle pickup or release.
              </p>
              <h4 className="text-base font-semibold text-white pt-2">Payment Terms</h4>
              <p>
                Invoices for independent operators are due upon completion of service prior to vehicle release unless
                covered under a pre-approved commercial fleet credit agreement.
              </p>
            </>
          )}
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-sm font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
