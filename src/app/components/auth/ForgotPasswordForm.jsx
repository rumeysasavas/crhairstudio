'use client';

import { useState } from 'react';
import { KeyRound } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { ModalHeader, Field, SubmitButton, FormMessage, authErrorText } from './authUi';

export default function ForgotPasswordForm({ onSwitch }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    // Kullanıcıya şifre yenileme bağlantısı gönderilir; bağlantı /sifre-yenile sayfasını açar
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/sifre-yenile`,
    });

    setLoading(false);
    if (error) {
      setMessage({ type: 'error', text: authErrorText(error) });
      return;
    }
    setMessage({
      type: 'success',
      text: 'Bu adrese kayıtlı bir hesap varsa şifre yenileme bağlantısı gönderildi. Gelen kutunuzu kontrol edin.',
    });
  };

  return (
    <>
      <ModalHeader
        icon={KeyRound}
        title="Şifre Sıfırlama"
        subtitle="E-posta adresinize şifre yenileme bağlantısı gönderelim."
      />

      <form onSubmit={handleSubmit} className="space-y-4">
        <Field
          label="E-Posta Adresiniz"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ornek@gmail.com"
        />

        <FormMessage message={message} />

        <SubmitButton loading={loading} loadingText="Gönderiliyor...">Bağlantı Gönder</SubmitButton>
      </form>

      <div className="border-t border-neutral-800 pt-4 text-center">
        <button
          type="button"
          onClick={() => onSwitch('login')}
          className="text-xs text-neutral-400 hover:text-amber-400 underline cursor-pointer"
        >
          Giriş ekranına dön
        </button>
      </div>
    </>
  );
}
