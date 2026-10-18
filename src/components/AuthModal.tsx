import React, { useState, useEffect } from 'react';
import { X, UserPlus, LogIn, Eye, EyeOff, Loader2, AlertCircle, Shield, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, authModalMode, setAuthModalMode, login, register } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    companyName: '',
    truckType: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeAuthModal();
      }
    };
    if (isAuthModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAuthModalOpen, closeAuthModal]);

  // Reset form when modal opens or mode changes
  useEffect(() => {
    setGeneralError(null);
    setFieldErrors({});
    setSuccessMsg(null);
    setShowPassword(false);
  }, [isAuthModalOpen, authModalMode]);

  if (!isAuthModalOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError(null);
    setFieldErrors({});
    setLoading(true);

    if (authModalMode === 'login') {
      if (!formData.email.trim() || !formData.password) {
        setGeneralError('Please enter both email and password.');
        setLoading(false);
        return;
      }

      const res = await login(formData.email.trim(), formData.password);
      if (!res.success) {
        setGeneralError(res.message || 'Login failed.');
      } else {
        setSuccessMsg('Signed in successfully!');
      }
    } else {
      // Register
      const errors: Record<string, string> = {};
      if (formData.name.trim().length < 2) {
        errors.name = 'Please provide your full name.';
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        errors.email = 'Please provide a valid email address.';
      }
      const cleanPhone = formData.phone.replace(/[^0-9+]/g, '');
      if (cleanPhone.length < 7) {
        errors.phone = 'Please provide a valid phone number.';
      }
      if (formData.password.length < 6) {
        errors.password = 'Password must be at least 6 characters.';
      }

      if (Object.keys(errors).length > 0) {
        setFieldErrors(errors);
        setLoading(false);
        return;
      }

      const res = await register({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        password: formData.password,
        companyName: formData.companyName.trim() || undefined,
        truckType: formData.truckType.trim() || undefined,
      });

      if (!res.success) {
        setGeneralError(res.message || 'Registration failed.');
        if (res.errors) {
          setFieldErrors(res.errors);
        }
      } else {
        setSuccessMsg('Account created successfully!');
      }
    }

    setLoading(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
      onClick={closeAuthModal}
    >
      <div
        className="relative w-full max-w-md max-h-[90vh] overflow-y-auto bg-slate-900 border border-slate-750 rounded-2xl p-6 sm:p-7 text-slate-200 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with brand and close */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center text-white shadow-md">
              <Shield className="w-4 h-4 stroke-[2.2]" />
            </div>
            <div>
              <span className="font-condensed text-base font-bold text-white tracking-wider uppercase leading-none block">
                TRUCK SERVICE SI
              </span>
              <span className="text-[10px] text-orange-400 font-medium">Customer Fleet Portal</span>
            </div>
          </div>

          <button
            onClick={closeAuthModal}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="mt-4 p-1 bg-slate-950 rounded-xl border border-slate-800 flex items-center">
          <button
            type="button"
            onClick={() => setAuthModalMode('register')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${
              authModalMode === 'register'
                ? 'bg-orange-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Create Account / إنشاء حساب</span>
          </button>
          <button
            type="button"
            onClick={() => setAuthModalMode('login')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${
              authModalMode === 'login'
                ? 'bg-orange-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Sign In / تسجيل الدخول</span>
          </button>
        </div>

        {/* Subtitle / value proposition */}
        <div className="mt-4 text-center">
          <h3 id="auth-modal-title" className="text-lg font-bold text-white">
            {authModalMode === 'register' ? 'Create Customer Fleet Account' : 'Welcome Back'}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            {authModalMode === 'register'
              ? 'Fast-track service dispatch, save fleet vehicles, and track repair tickets.'
              : 'Sign in to access your registered trucks and view service history.'}
          </p>
        </div>

        {/* Messages */}
        {generalError && (
          <div className="mt-4 p-3 rounded-lg bg-rose-950/60 border border-rose-800 text-rose-300 text-xs flex items-start gap-2 animate-in fade-in">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{generalError}</span>
          </div>
        )}

        {successMsg && (
          <div className="mt-4 p-3 rounded-lg bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs flex items-start gap-2 animate-in fade-in">
            <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate className="mt-5 space-y-3.5">
          {authModalMode === 'register' && (
            <>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Full Name / Contact Name *
                </label>
                <input
                  name="name"
                  type="text"
                  placeholder="e.g. Janez Novak / Transport d.o.o."
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-950 border rounded-lg text-white placeholder-slate-500 focus:outline-hidden focus:ring-1 ${
                    fieldErrors.name
                      ? 'border-rose-500 focus:ring-rose-500'
                      : 'border-slate-750 focus:border-orange-500 focus:ring-orange-500'
                  }`}
                />
                {fieldErrors.name && <p className="text-[11px] text-rose-400 mt-1">{fieldErrors.name}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Company / Fleet Name (Optional)
                </label>
                <input
                  name="companyName"
                  type="text"
                  placeholder="e.g. Novak Logistics d.o.o."
                  value={formData.companyName}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-950 border border-slate-750 rounded-lg text-white placeholder-slate-500 focus:outline-hidden focus:border-orange-500 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Primary Truck / Vehicle (Optional)
                </label>
                <input
                  name="truckType"
                  type="text"
                  placeholder="e.g. Scania R500, MAN TGX, Volvo FH16"
                  value={formData.truckType}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-950 border border-slate-750 rounded-lg text-white placeholder-slate-500 focus:outline-hidden focus:border-orange-500 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Phone Number (For Dispatch Callback) *
                </label>
                <input
                  name="phone"
                  type="tel"
                  placeholder="e.g. 070543601 or +386..."
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-950 border rounded-lg text-white placeholder-slate-500 focus:outline-hidden focus:ring-1 ${
                    fieldErrors.phone
                      ? 'border-rose-500 focus:ring-rose-500'
                      : 'border-slate-750 focus:border-orange-500 focus:ring-orange-500'
                  }`}
                />
                {fieldErrors.phone && <p className="text-[11px] text-rose-400 mt-1">{fieldErrors.phone}</p>}
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Email Address *
            </label>
            <input
              name="email"
              type="email"
              placeholder="e.g. fleet@transport.si"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-950 border rounded-lg text-white placeholder-slate-500 focus:outline-hidden focus:ring-1 ${
                fieldErrors.email
                  ? 'border-rose-500 focus:ring-rose-500'
                  : 'border-slate-750 focus:border-orange-500 focus:ring-orange-500'
              }`}
            />
            {fieldErrors.email && <p className="text-[11px] text-rose-400 mt-1">{fieldErrors.email}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Password {authModalMode === 'register' ? '(Min 6 characters) *' : '*'}
            </label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-3.5 py-2.5 pr-10 text-xs sm:text-sm bg-slate-950 border rounded-lg text-white placeholder-slate-500 focus:outline-hidden focus:ring-1 ${
                  fieldErrors.password
                    ? 'border-rose-500 focus:ring-rose-500'
                    : 'border-slate-750 focus:border-orange-500 focus:ring-orange-500'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-white"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {fieldErrors.password && (
              <p className="text-[11px] text-rose-400 mt-1">{fieldErrors.password}</p>
            )}
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs sm:text-sm font-bold text-white bg-orange-600 hover:bg-orange-500 disabled:bg-orange-800 rounded-lg shadow-md transition-all focus:outline-hidden focus-visible:ring-2 focus-visible:ring-orange-400"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : authModalMode === 'register' ? (
                <>
                  <UserPlus className="w-4 h-4" />
                  <span>Create Account / إنشاء حساب</span>
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>Sign In / تسجيل الدخول</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Footer switch prompt */}
        <div className="mt-4 pt-3 border-t border-slate-800 text-center text-xs text-slate-400">
          {authModalMode === 'register' ? (
            <p>
              Already registered?{' '}
              <button
                type="button"
                onClick={() => setAuthModalMode('login')}
                className="text-orange-400 hover:text-orange-300 font-semibold underline underline-offset-2"
              >
                Sign In here
              </button>
            </p>
          ) : (
            <p>
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => setAuthModalMode('register')}
                className="text-orange-400 hover:text-orange-300 font-semibold underline underline-offset-2"
              >
                Create an account
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
