'use client';

import { X } from 'lucide-react';

// Auth modallarında ortak kullanılan küçük UI parçaları

export function ModalShell({ onClose, children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/70 backdrop-blur-sm pt-32 px-4 overflow-y-auto">
      <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 max-w-md w-full relative shadow-2xl space-y-6 mb-12">
        <button
          type="button"
          onClick={onClose}
          aria-label="Kapat"
          className="absolute right-5 top-5 p-2 rounded-full bg-black/40 text-neutral-400 hover:text-white cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
        {children}
      </div>
    </div>
  );
}

export function ModalHeader({ title, subtitle, icon: Icon }) {
  return (
    <div className="text-center space-y-1">
      {Icon && (
        <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/30 rounded-full flex items-center justify-center mx-auto text-amber-500 mb-2">
          <Icon className="w-6 h-6" />
        </div>
      )}
      <h2 className="text-xl font-serif font-bold text-white">{title}</h2>
      {subtitle && <p className="text-xs text-neutral-400">{subtitle}</p>}
    </div>
  );
}

export function Field({ label, ...inputProps }) {
  return (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
        {label}
      </label>
      <input
        required
        {...inputProps}
        className="w-full px-4 py-3 rounded-xl bg-black/60 border border-neutral-800 text-white placeholder-neutral-600 focus:outline-none focus:border-amber-500 text-sm"
      />
    </div>
  );
}

export function SubmitButton({ loading, loadingText, children }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-60 text-black font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-amber-500/20"
    >
      {loading ? loadingText : children}
    </button>
  );
}

export function FormMessage({ message }) {
  if (!message) return null;
  const isError = message.type === 'error';
  return (
    <p
      role={isError ? 'alert' : 'status'}
      className={`text-xs rounded-xl px-4 py-3 border ${
        isError
          ? 'bg-red-500/10 border-red-500/30 text-red-300'
          : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
      }`}
    >
      {message.text}
    </p>
  );
}

// Supabase Auth hata mesajlarını Türkçeleştirir
export function authErrorText(error) {
  const msg = error?.message || '';
  if (/invalid login credentials/i.test(msg)) return 'E-posta veya şifre hatalı.';
  if (/email not confirmed/i.test(msg)) return 'E-posta adresiniz henüz onaylanmamış. Gelen kutunuzdaki onay bağlantısına tıklayın.';
  if (/already registered|already exists/i.test(msg)) return 'Bu e-posta adresiyle zaten bir hesap var. Giriş yapmayı deneyin.';
  if (/password should be at least/i.test(msg)) return 'Şifre en az 6 karakter olmalı.';
  if (/rate limit|too many/i.test(msg)) return 'Çok fazla deneme yapıldı. Lütfen biraz sonra tekrar deneyin.';
  return msg || 'Beklenmeyen bir hata oluştu.';
}
