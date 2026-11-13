'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { ModalHeader, Field, SubmitButton, FormMessage, authErrorText } from './authUi';

export default function LoginForm({ onSuccess, onSwitch }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    setLoading(false);
    if (error) {
      setMessage({ type: 'error', text: authErrorText(error) });
      return;
    }
    onSuccess();
  };

  return (
    <>
      <ModalHeader title="Hoş Geldiniz" subtitle="Randevularınızı yönetmek için giriş yapın." />

      <form onSubmit={handleSubmit} className="space-y-4">
        <Field
          label="E-Posta Adresi"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ornek@gmail.com"
        />
        <Field
          label="Şifre"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
        />

        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => onSwitch('forgot')}
            className="text-xs text-amber-400 hover:underline cursor-pointer"
          >
            Şifremi Unuttum?
          </button>
        </div>

        <FormMessage message={message} />

        <SubmitButton loading={loading} loadingText="Giriş Yapılıyor...">Giriş Yap</SubmitButton>
      </form>

      <div className="border-t border-neutral-800 pt-4 text-center space-y-2">
        <p className="text-xs text-neutral-400">Hesabınız yok mu?</p>
        <button
          type="button"
          onClick={() => onSwitch('register')}
          className="w-full py-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-amber-400 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer border border-neutral-700"
        >
          Kayıt Ol
        </button>
      </div>
    </>
  );
}
