import React, { useState, useRef, useEffect } from 'react';
import { User, LogOut, ChevronDown, Truck, Phone, Mail, Building, Wrench } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface UserAccountMenuProps {
  onRequestService: () => void;
}

export const UserAccountMenu: React.FC<UserAccountMenuProps> = ({ onRequestService }) => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) return null;

  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-slate-200 bg-slate-900 border border-slate-750 rounded-lg hover:bg-slate-800 transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-orange-500"
        aria-expanded={isOpen}
      >
        <div className="w-6 h-6 rounded-md bg-orange-600 text-white font-bold text-[11px] flex items-center justify-center">
          {initials}
        </div>
        <span className="max-w-[120px] truncate text-white">{user.name}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-slate-900 border border-slate-750 rounded-xl shadow-2xl p-4 text-xs z-50 animate-in fade-in duration-150">
          <div className="pb-3 border-b border-slate-800">
            <p className="font-bold text-white text-sm truncate">{user.name}</p>
            {user.companyName && (
              <p className="text-orange-400 font-medium flex items-center gap-1.5 mt-0.5">
                <Building className="w-3 h-3" />
                <span className="truncate">{user.companyName}</span>
              </p>
            )}
            <p className="text-slate-400 text-[11px] truncate mt-0.5 flex items-center gap-1.5">
              <Mail className="w-3 h-3 text-slate-500" />
              <span>{user.email}</span>
            </p>
            <p className="text-slate-400 text-[11px] truncate mt-0.5 flex items-center gap-1.5">
              <Phone className="w-3 h-3 text-slate-500" />
              <span>{user.phone}</span>
            </p>
          </div>

          {user.truckType && (
            <div className="py-2.5 border-b border-slate-800">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1">
                Registered Equipment
              </span>
              <div className="flex items-center gap-1.5 text-slate-200 font-medium bg-slate-950 p-2 rounded-lg border border-slate-800">
                <Truck className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                <span className="truncate">{user.truckType}</span>
              </div>
            </div>
          )}

          <div className="pt-3 space-y-1.5">
            <button
              onClick={() => {
                setIsOpen(false);
                onRequestService();
              }}
              className="w-full flex items-center gap-2 p-2 text-white bg-orange-600 hover:bg-orange-500 rounded-lg font-bold transition-colors"
            >
              <Wrench className="w-3.5 h-3.5" />
              <span>Book Repair for this Fleet</span>
            </button>

            <button
              onClick={() => {
                setIsOpen(false);
                logout();
              }}
              className="w-full flex items-center gap-2 p-2 text-slate-300 hover:text-rose-400 hover:bg-slate-800/80 rounded-lg transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
