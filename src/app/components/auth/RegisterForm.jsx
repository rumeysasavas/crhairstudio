'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { ModalHeader, Field, SubmitButton, FormMessage, authErrorText } from './authUi';

export default function RegisterForm({ onSuccess, onSwitch }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    // Ad ve telefon kullanıcının metadata'sında tutulur; şifre Supabase Auth'ta hash'lenir
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name, phone },
        emailRedirectTo: window.location.origin,
      },
    });

    setLoading(false);
    if (error) {
      setMessage({ type: 'error', text: authErrorText(error) });
      return;
    }

    // E-posta onayı açıksa oturum hemen açılmaz
    if (!data.session) {
      setMessage({
        type: 'success',
        text: 'Kaydınız alındı! E-posta adresinize gönderilen bağlantıya tıklayarak hesabınızı onaylayın, ardından giriş yapın.',
      });
      setPassword('');
      return;
    }

    onSuccess();
  };

  return (
    <>
      <ModalHeader title="Hesap Oluştur" subtitle="Ayrıcalıklı dünyamıza katılın." />

      <form onSubmit={handleSubmit} className="space-y-4">
        <Field
          label="Ad Soyad"
          type="text"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Adınız Soyadınız"
        />
        <Field
          label="Telefon Numarası"
          type="tel"
          autoComplete="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="05xx xxx xx xx"
        />
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
          autoComplete="new-password"
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="En az 6 karakter"
        />

        <FormMessage message={message} />

        <SubmitButton loading={loading} loadingText="Kayıt Yapılıyor...">Kayıt Ol</SubmitButton>
      </form>

      <div className="border-t border-neutral-800 pt-4 text-center">
        <button
          type="button"
          onClick={() => onSwitch('login')}
          className="text-xs text-neutral-400 hover:text-amber-400 underline cursor-pointer"
        >
          Zaten hesabınız var mı? Giriş yapın
        </button>
      </div>
    </>
  );
}
