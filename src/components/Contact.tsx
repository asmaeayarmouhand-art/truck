import React, { useState, useEffect } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
  Copy,
  Check,
  Search,
} from 'lucide-react';
import { businessInfo } from '../config/businessInfo';
import { useAuth } from '../context/AuthContext';

interface ContactProps {
  preselectedService?: string;
}

export const Contact: React.FC<ContactProps> = ({ preselectedService }) => {
  const { user } = useAuth();
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    truckType: '',
    serviceNeeded: '',
    location: '',
    problemDescription: '',
    urgency: 'Immediate Shop Intake',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [successResult, setSuccessResult] = useState<{
    ticketNumber: string;
    receivedAt: string;
    message: string;
  } | null>(null);

  const [copiedTicket, setCopiedTicket] = useState(false);

  // Ticket Lookup State
  const [lookupTicketInput, setLookupTicketInput] = useState('');
  const [lookupLoading, setLookupLoading] = useState(false);
  const [lookupResult, setLookupResult] = useState<{
    found: boolean;
    data?: any;
    error?: string;
  } | null>(null);

  // Update selected service if parent triggers pre-selection
  useEffect(() => {
    if (preselectedService) {
      setFormData((prev) => ({ ...prev, serviceNeeded: preselectedService }));
    }
  }, [preselectedService]);

  // Pre-fill user data if authenticated
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: prev.name || user.name,
        phone: prev.phone || user.phone,
        email: prev.email || user.email,
        truckType: prev.truckType || user.truckType || '',
      }));
    }
  }, [user]);

  const validateField = (field: string, value: string) => {
    let error = '';
    if (field === 'name' && value.trim().length < 2) {
      error = 'Please enter your full name or company contact.';
    }
    if (field === 'phone') {
      const clean = value.replace(/[^0-9+]/g, '');
      if (clean.length < 7) {
        error = 'Please enter a valid phone number for dispatch contact.';
      }
    }
    if (field === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value.trim())) {
        error = 'Please enter a valid email address.';
      }
    }
    if (field === 'truckType' && !value.trim()) {
      error = 'Please select or specify your truck or equipment.';
    }
    if (field === 'serviceNeeded' && !value.trim()) {
      error = 'Please select the service needed.';
    }
    if (field === 'location' && value.trim().length < 2) {
      error = 'Please specify your vehicle location or city.';
    }
    if (field === 'problemDescription' && value.trim().length < 10) {
      error = 'Please describe the problem or symptoms (minimum 10 characters).';
    }
    return error;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    // Validate all fields
    const newErrors: Record<string, string> = {};
    Object.keys(formData).forEach((key) => {
      if (key !== 'urgency') {
        const err = validateField(key, formData[key as keyof typeof formData]);
        if (err) newErrors[key] = err;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      // Connect to real working backend API endpoint
      const response = await fetch('/api/service-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userId: user?.id,
        }),
      });

      let data: any = null;
      try {
        data = await response.json();
      } catch {
        data = null;
      }

      if (!response.ok || !data || !data.success) {
        throw new Error(
          (data && data.message) ||
          `Unable to submit service request (Error ${response.status}). Please try again or call dispatch.`
        );
      }

      setSuccessResult({
        ticketNumber: data.ticketNumber,
        receivedAt: data.receivedAt,
        message: data.message,
      });

      // Clear form
      setFormData({
        name: '',
        phone: '',
        email: '',
        truckType: '',
        serviceNeeded: '',
        location: '',
        problemDescription: '',
        urgency: 'Immediate Shop Intake',
      });
    } catch (err: any) {
      setServerError(err.message || 'Network error communicating with the dispatch backend.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyTicket = (ticketNum: string) => {
    navigator.clipboard.writeText(ticketNum);
    setCopiedTicket(true);
    setTimeout(() => setCopiedTicket(false), 2000);
  };

  const handleLookupTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!lookupTicketInput.trim()) return;

    setLookupLoading(true);
    setLookupResult(null);

    try {
      const res = await fetch(`/api/service-request/${encodeURIComponent(lookupTicketInput.trim())}`);
      let data: any = null;
      try {
        data = await res.json();
      } catch {
        data = null;
      }
      if (!res.ok || !data || !data.success) {
        setLookupResult({
          found: false,
          error: (data && data.message) || `Ticket not found in queue (Status ${res.status}).`,
        });
      } else {
        setLookupResult({
          found: true,
          data: data.request,
        });
      }
    } catch {
      setLookupResult({
        found: false,
        error: 'Unable to reach the dispatch server. Please check your connection.',
      });
    } finally {
      setLookupLoading(false);
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-slate-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-orange-500 uppercase mb-3">
            <span>Direct Dispatch &amp; Intake</span>
            <span aria-hidden="true">·</span>
            <span>24/7 Priority Support</span>
          </div>
          <h2
            className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4"
            style={{ textWrap: 'balance' }}
          >
            Contact Our Dispatch &amp; Request Truck Service
          </h2>
          <p className="text-base text-slate-300 leading-relaxed">
            Need urgent diagnostic support or want to schedule commercial preventive maintenance? Fill out the form
            below to submit an authorized service ticket directly to our shop dispatch desk, or call us directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left Column: Business Contact Information */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-6">
              <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-3">
                Service Facility &amp; Dispatch Information
              </h3>

              {/* Phone */}
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-orange-950/60 border border-orange-900/50 flex items-center justify-center text-orange-400 shrink-0 mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                    Phone Number
                  </span>
                  <a
                    href={`tel:${businessInfo.contact.phoneTel}`}
                    className="text-base font-bold text-white hover:text-orange-400 transition-colors block mt-0.5"
                  >
                    {businessInfo.contact.phoneDisplay}
                  </a>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Click to call our service advisor directly
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-orange-950/60 border border-orange-900/50 flex items-center justify-center text-orange-400 shrink-0 mt-0.5">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                    Email Address
                  </span>
                  <a
                    href={`mailto:${businessInfo.contact.emailMailto}`}
                    className="text-sm font-semibold text-white hover:text-orange-400 transition-colors block mt-0.5 break-all"
                  >
                    {businessInfo.contact.emailDisplay}
                  </a>
                  <p className="text-xs text-slate-400 mt-0.5">
                    For quotes, fleet billing, and mechanical inquiries
                  </p>
                </div>
              </div>

              {/* Business address */}
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-orange-950/60 border border-orange-900/50 flex items-center justify-center text-orange-400 shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                    Facility Address
                  </span>
                  <p className="text-sm text-slate-200 mt-0.5 leading-snug">
                    {businessInfo.contact.addressDisplay}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Dedicated heavy-duty repair bays with pull-through clearance
                  </p>
                </div>
              </div>

              {/* Business hours placeholder */}
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-orange-950/60 border border-orange-900/50 flex items-center justify-center text-orange-400 shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                    Operating Hours
                  </span>
                  <p className="text-sm font-semibold text-slate-200 mt-0.5">
                    {businessInfo.contact.hoursDisplay}
                  </p>
                  <p className="text-xs text-orange-400 font-medium mt-1">
                    {businessInfo.contact.emergencyHours}
                  </p>
                </div>
              </div>
            </div>

            {/* Existing Ticket Verification Tool */}
            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
              <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                <Search className="w-4 h-4 text-orange-400" />
                <span>Verify Existing Service Ticket</span>
              </h4>
              <p className="text-xs text-slate-400 mb-4">
                Already submitted a repair request? Check your ticket status in our live dispatch queue.
              </p>

              <form onSubmit={handleLookupTicket} className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. TSI-12345"
                  value={lookupTicketInput}
                  onChange={(e) => setLookupTicketInput(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-750 rounded-lg text-white focus:outline-hidden focus:border-orange-500 uppercase font-mono"
                />
                <button
                  type="submit"
                  disabled={lookupLoading}
                  className="px-4 py-2 text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors shrink-0 disabled:opacity-50"
                >
                  {lookupLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'Check'}
                </button>
              </form>

              {lookupResult && (
                <div className="mt-3 p-3 rounded-lg text-xs bg-slate-950 border border-slate-800">
                  {lookupResult.found && lookupResult.data ? (
                    <div>
                      <div className="flex items-center justify-between text-emerald-400 font-bold mb-1">
                        <span>Ticket: {lookupResult.data.ticketNumber}</span>
                        <span className="text-[10px] uppercase bg-emerald-950/80 px-2 py-0.5 rounded-sm">
                          {lookupResult.data.status}
                        </span>
                      </div>
                      <p className="text-slate-300">Driver/Contact: {lookupResult.data.name}</p>
                      <p className="text-slate-400">Unit: {lookupResult.data.truckType}</p>
                      <p className="text-slate-400">Service: {lookupResult.data.serviceNeeded}</p>
                    </div>
                  ) : (
                    <p className="text-rose-400">{lookupResult.error}</p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Working Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl relative">
              {successResult ? (
                /* Success Confirmation State */
                <div className="py-8 text-center space-y-5 animate-in zoom-in-95 duration-200">
                  <div className="w-16 h-16 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle className="w-8 h-8" />
                  </div>

                  <div>
                    <span className="text-xs font-mono font-semibold text-emerald-400 uppercase tracking-widest block mb-1">
                      DISPATCH TICKET CONFIRMED
                    </span>
                    <h3 className="text-2xl font-bold text-white">
                      Service Request Received
                    </h3>
                  </div>

                  {/* Ticket Card */}
                  <div className="max-w-md mx-auto p-4 rounded-xl bg-slate-950 border border-slate-800 text-left space-y-2">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-850">
                      <span className="text-xs text-slate-400 font-mono">Reference Ticket ID:</span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-base font-bold text-orange-400">
                          {successResult.ticketNumber}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopyTicket(successResult.ticketNumber)}
                          className="p-1 text-slate-400 hover:text-white rounded-md hover:bg-slate-850 transition-colors"
                          title="Copy ticket number"
                        >
                          {copiedTicket ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="text-xs text-slate-300">
                      <span className="text-slate-400">Logged At: </span>
                      {new Date(successResult.receivedAt).toLocaleString()}
                    </div>
                    <div className="text-xs text-slate-300">
                      <span className="text-slate-400">Status: </span>
                      <span className="text-emerald-400 font-medium">DISPATCH QUEUED</span>
                    </div>
                  </div>

                  <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                    {successResult.message}
                  </p>

                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href={`tel:${businessInfo.contact.phoneTel}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-orange-400" />
                      <span>Call Dispatch Desk</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => setSuccessResult(null)}
                      className="px-5 py-2.5 text-xs font-bold text-orange-400 bg-orange-950/40 border border-orange-900/60 rounded-lg hover:bg-orange-600 hover:text-white transition-colors"
                    >
                      Submit Another Work Order
                    </button>
                  </div>
                </div>
              ) : (
                /* Service Request Form */
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        Request Truck Repair &amp; Maintenance
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Direct transmission to our repair intake terminal
                      </p>
                    </div>
                    <span className="text-[11px] font-mono text-orange-400 font-medium">
                      * All Fields Required
                    </span>
                  </div>

                  {serverError && (
                    <div className="p-3.5 rounded-lg bg-rose-950/60 border border-rose-800 text-rose-300 text-xs flex items-start gap-2.5">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{serverError}</span>
                    </div>
                  )}

                  {/* Name and Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-xs font-semibold text-slate-300 mb-1">
                        Full Name / Fleet Contact *
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="e.g. John Doe / Swift Logistics"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-3.5 py-2.5 text-sm bg-slate-950 border rounded-lg text-white placeholder-slate-500 focus:outline-hidden focus:ring-1 ${
                          errors.name
                            ? 'border-rose-500 focus:ring-rose-500'
                            : 'border-slate-750 focus:border-orange-500 focus:ring-orange-500'
                        }`}
                      />
                      {errors.name && <p className="text-[11px] text-rose-400 mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-xs font-semibold text-slate-300 mb-1">
                        Phone Number (For Callback) *
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="e.g. (555) 234-5678"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full px-3.5 py-2.5 text-sm bg-slate-950 border rounded-lg text-white placeholder-slate-500 focus:outline-hidden focus:ring-1 ${
                          errors.phone
                            ? 'border-rose-500 focus:ring-rose-500'
                            : 'border-slate-750 focus:border-orange-500 focus:ring-orange-500'
                        }`}
                      />
                      {errors.phone && <p className="text-[11px] text-rose-400 mt-1">{errors.phone}</p>}
                    </div>
                  </div>

                  {/* Email & Urgency */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="block text-xs font-semibold text-slate-300 mb-1">
                        Email Address *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="e.g. dispatcher@carrier.com"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-3.5 py-2.5 text-sm bg-slate-950 border rounded-lg text-white placeholder-slate-500 focus:outline-hidden focus:ring-1 ${
                          errors.email
                            ? 'border-rose-500 focus:ring-rose-500'
                            : 'border-slate-750 focus:border-orange-500 focus:ring-orange-500'
                        }`}
                      />
                      {errors.email && <p className="text-[11px] text-rose-400 mt-1">{errors.email}</p>}
                    </div>

                    <div>
                      <label htmlFor="urgency" className="block text-xs font-semibold text-slate-300 mb-1">
                        Urgency Level
                      </label>
                      <select
                        id="urgency"
                        name="urgency"
                        value={formData.urgency}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 text-sm bg-slate-950 border border-slate-750 rounded-lg text-white focus:outline-hidden focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                      >
                        <option value="Emergency Roadside / Sidelined">🚨 Emergency Roadside / Sidelined</option>
                        <option value="Immediate Shop Intake">⚡ Immediate Shop Intake (Today)</option>
                        <option value="Scheduled Maintenance (This Week)">📅 Scheduled Maintenance (This Week)</option>
                        <option value="Fleet Maintenance Inquiry">🏢 Fleet Maintenance Inquiry</option>
                      </select>
                    </div>
                  </div>

                  {/* Truck Type & Service Needed */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="truckType" className="block text-xs font-semibold text-slate-300 mb-1">
                        Truck / Equipment Type *
                      </label>
                      <input
                        id="truckType"
                        name="truckType"
                        type="text"
                        placeholder="e.g. 2022 Freightliner Cascadia DD15"
                        value={formData.truckType}
                        onChange={handleChange}
                        className={`w-full px-3.5 py-2.5 text-sm bg-slate-950 border rounded-lg text-white placeholder-slate-500 focus:outline-hidden focus:ring-1 ${
                          errors.truckType
                            ? 'border-rose-500 focus:ring-rose-500'
                            : 'border-slate-750 focus:border-orange-500 focus:ring-orange-500'
                        }`}
                      />
                      {errors.truckType && <p className="text-[11px] text-rose-400 mt-1">{errors.truckType}</p>}
                    </div>

                    <div>
                      <label htmlFor="serviceNeeded" className="block text-xs font-semibold text-slate-300 mb-1">
                        Service Needed *
                      </label>
                      <select
                        id="serviceNeeded"
                        name="serviceNeeded"
                        value={formData.serviceNeeded}
                        onChange={handleChange}
                        className={`w-full px-3.5 py-2.5 text-sm bg-slate-950 border rounded-lg text-white focus:outline-hidden focus:ring-1 ${
                          errors.serviceNeeded
                            ? 'border-rose-500 focus:ring-rose-500'
                            : 'border-slate-750 focus:border-orange-500 focus:ring-orange-500'
                        }`}
                      >
                        <option value="">Select Service...</option>
                        {businessInfo.services.map((s) => (
                          <option key={s.id} value={s.title}>
                            {s.title}
                          </option>
                        ))}
                        <option value="Check Engine / Diagnostic Scan">Check Engine / Diagnostic Scan</option>
                        <option value="Emergency Road Call">Emergency Road Call</option>
                        <option value="Other Commercial Repair">Other Commercial Repair</option>
                      </select>
                      {errors.serviceNeeded && (
                        <p className="text-[11px] text-rose-400 mt-1">{errors.serviceNeeded}</p>
                      )}
                    </div>
                  </div>

                  {/* Location */}
                  <div>
                    <label htmlFor="location" className="block text-xs font-semibold text-slate-300 mb-1">
                      Current Vehicle Location / City / Mile Marker *
                    </label>
                    <input
                      id="location"
                      name="location"
                      type="text"
                      placeholder="e.g. I-80 Exit 42, Service Plaza, or Yard Address"
                      value={formData.location}
                      onChange={handleChange}
                      className={`w-full px-3.5 py-2.5 text-sm bg-slate-950 border rounded-lg text-white placeholder-slate-500 focus:outline-hidden focus:ring-1 ${
                        errors.location
                          ? 'border-rose-500 focus:ring-rose-500'
                          : 'border-slate-750 focus:border-orange-500 focus:ring-orange-500'
                      }`}
                    />
                    {errors.location && <p className="text-[11px] text-rose-400 mt-1">{errors.location}</p>}
                  </div>

                  {/* Problem Description */}
                  <div>
                    <label htmlFor="problemDescription" className="block text-xs font-semibold text-slate-300 mb-1">
                      Problem Description &amp; Symptoms *
                    </label>
                    <textarea
                      id="problemDescription"
                      name="problemDescription"
                      rows={3}
                      placeholder="Describe what happened: dash fault codes, coolant leaks, air brake hiss, transmission slip, or strange engine knocking..."
                      value={formData.problemDescription}
                      onChange={handleChange}
                      className={`w-full px-3.5 py-2.5 text-sm bg-slate-950 border rounded-lg text-white placeholder-slate-500 focus:outline-hidden focus:ring-1 ${
                        errors.problemDescription
                          ? 'border-rose-500 focus:ring-rose-500'
                          : 'border-slate-750 focus:border-orange-500 focus:ring-orange-500'
                      }`}
                    />
                    {errors.problemDescription && (
                      <p className="text-[11px] text-rose-400 mt-1">{errors.problemDescription}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 py-3.5 px-6 text-sm font-bold text-white bg-orange-600 hover:bg-orange-500 disabled:bg-orange-800 disabled:cursor-not-allowed rounded-lg shadow-lg shadow-orange-950/60 transition-all focus:outline-hidden focus-visible:ring-2 focus-visible:ring-orange-400"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Submitting Request to Dispatch Terminal...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Submit Repair Request &amp; Generate Ticket</span>
                        </>
                      )}
                    </button>
                    <p className="text-[11px] text-slate-400 text-center mt-2">
                      Submissions are transmitted securely to our active dispatch queue. For immediate roadside emergencies,
                      please call <a href={`tel:${businessInfo.contact.phoneTel}`} className="text-orange-400 underline font-semibold">{businessInfo.contact.phoneDisplay}</a>.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
