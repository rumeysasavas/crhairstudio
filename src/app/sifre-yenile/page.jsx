'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { KeyRound } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { ModalHeader, Field, SubmitButton, FormMessage, authErrorText } from '@/app/components/auth/authUi';

// E-postadaki şifre yenileme bağlantısı bu sayfayı açar.
// Supabase istemcisi URL'deki kodu otomatik olarak oturuma çevirir.
export default function ResetPasswordPage() {
  const router = useRouter();
  const [status, setStatus] = useState('checking'); // 'checking' | 'ready' | 'invalid'
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setStatus(data.session ? 'ready' : 'invalid');
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'PASSWORD_RECOVERY' || session) setStatus('ready');
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const { error } = await supabase.auth.updateUser({ password });

    setLoading(false);
    if (error) {
      setMessage({ type: 'error', text: authErrorText(error) });
      return;
    }
    setMessage({ type: 'success', text: 'Şifreniz güncellendi. Ana sayfaya yönlendiriliyorsunuz...' });
    setTimeout(() => router.push('/'), 1500);
  };

  return (
    <main className="bg-black min-h-screen text-white flex items-start justify-center pt-32 px-4">
      <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6">
        <ModalHeader icon={KeyRound} title="Yeni Şifre Belirle" />

        {status === 'checking' && <p className="text-xs text-neutral-400 text-center">Bağlantı doğrulanıyor...</p>}

        {status === 'invalid' && (
          <FormMessage
            message={{
              type: 'error',
              text: 'Bağlantı geçersiz veya süresi dolmuş. Lütfen giriş ekranından yeniden şifre sıfırlama isteyin.',
            }}
          />
        )}

        {status === 'ready' && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Field
              label="Yeni Şifre"
              type="password"
              autoComplete="new-password"
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="En az 6 karakter"
            />
            <FormMessage message={message} />
            <SubmitButton loading={loading} loadingText="Güncelleniyor...">Şifreyi Güncelle</SubmitButton>
          </form>
        )}
      </div>
    </main>
  );
}
