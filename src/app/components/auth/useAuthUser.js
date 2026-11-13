'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

// Supabase kullanıcısını arayüzde kullanılan sade profile çevirir
function toProfile(user) {
  if (!user) return null;
  const meta = user.user_metadata || {};
  return {
    id: user.id,
    email: user.email,
    name: meta.name || user.email,
    phone: meta.phone || '',
  };
}

// Oturumu Supabase Auth'tan okur ve giriş/çıkış değişikliklerini dinler
export function useAuthUser() {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let active = true;

    supabase.auth.getUser().then(({ data }) => {
      if (!active) return;
      setUser(toProfile(data.user));
      setReady(true);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!active) return;
      setUser(toProfile(session?.user));
      setReady(true);
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  return { user, ready };
}
