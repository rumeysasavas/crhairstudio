'use client';

import { useState } from 'react';
import { User, LogOut, X, Calendar, Trash2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function ProfileDrawer({ user, userAppointments = [], onCancelAppointment, onClose }) {
  const [signingOut, setSigningOut] = useState(false);

  const handleLogout = async () => {
    setSigningOut(true);
    await supabase.auth.signOut();
    setSigningOut(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm transition-opacity">
      <div className="w-full max-w-md bg-neutral-900 border-l border-neutral-800 h-full p-6 flex flex-col justify-between shadow-2xl overflow-y-auto">
        <div>
          <div className="flex justify-between items-center border-b border-neutral-800 pb-4 mb-6">
            <div className="flex items-center gap-2 text-amber-500 font-serif font-bold text-lg">
              <User className="w-5 h-5" /> Kullanıcı Profili
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Kapat"
              className="p-2 rounded-full bg-neutral-800 text-neutral-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="bg-black/40 border border-neutral-800 rounded-2xl p-4 mb-6 space-y-1.5 text-xs">
            <p className="text-amber-500 font-bold text-sm">{user.name}</p>
            <p className="text-neutral-400">{user.email}</p>
            {user.phone && <p className="text-neutral-400">{user.phone}</p>}
          </div>

          <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-3 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-amber-500" /> Randevu Geçmişim ({userAppointments.length})
          </h3>

          <div className="space-y-3">
            {userAppointments.length === 0 ? (
              <p className="text-neutral-500 text-xs text-center py-8">Henüz oluşturulmuş bir randevunuz bulunmuyor.</p>
            ) : (
              userAppointments.map((appt, idx) => (
                <div key={appt.id ?? idx} className="bg-black/60 border border-neutral-800 rounded-xl p-4 space-y-2 text-xs">
                  <div className="flex justify-between items-center border-b border-neutral-800/60 pb-1.5">
                    <span className="text-amber-500 font-bold">{appt.service}</span>
                    <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 text-[10px]">Aktif</span>
                  </div>
                  <p className="text-neutral-300"><strong className="text-neutral-500">Ad Soyad:</strong> {appt.fullName}</p>
                  <p className="text-neutral-300"><strong className="text-neutral-500">Tarih & Saat:</strong> {appt.date} - {appt.time}</p>
                  <p className="text-neutral-300"><strong className="text-neutral-500">Uzman:</strong> {appt.stylist}</p>

                  {onCancelAppointment && (
                    <div className="flex justify-end pt-2">
                      <button
                        type="button"
                        onClick={() => onCancelAppointment(appt.id)}
                        className="px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 transition-all flex items-center gap-1.5 cursor-pointer text-[11px]"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Randevuyu İptal Et
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        <div className="border-t border-neutral-800 pt-4">
          <button
            type="button"
            onClick={handleLogout}
            disabled={signingOut}
            className="w-full py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
          >
            <LogOut className="w-4 h-4" /> {signingOut ? 'Çıkış Yapılıyor...' : 'Çıkış Yap'}
          </button>
        </div>
      </div>
    </div>
  );
}
