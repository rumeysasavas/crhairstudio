'use client';

import { useState } from 'react';
import { Phone, User, LogIn, Scissors } from 'lucide-react';
import AuthModal from '@/app/components/auth/AuthModal';
import ProfileDrawer from '@/app/components/auth/ProfileDrawer';
import { useAuthUser } from '@/app/components/auth/useAuthUser';

export default function Navbar({ userAppointments = [], onCancelAppointment }) {
  const [activeModal, setActiveModal] = useState(null); // 'login' | 'register' | 'forgot' | 'profile' | null
  const [isPhoneOpen, setIsPhoneOpen] = useState(false);
  const { user, ready } = useAuthUser();

  const closeModal = () => setActiveModal(null);
  const isAuthView = activeModal === 'login' || activeModal === 'register' || activeModal === 'forgot';

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-black/60 backdrop-blur-md border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-500">
              <Scissors className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-sm font-serif font-bold tracking-widest text-amber-500 uppercase">
                C & R STUDIO
              </h1>
              <p className="text-[10px] text-neutral-400 tracking-wider uppercase">
                HAIR & BEAUTY STUDIO
              </p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold tracking-widest uppercase text-neutral-300">
            <a href="#anasayfa" className="hover:text-amber-500 transition-colors">Anasayfa</a>
            <a href="#hizmetler" className="hover:text-amber-500 transition-colors">Hizmetler</a>
            <a href="#dukkanimiz" className="hover:text-amber-500 transition-colors">Dükkanımız</a>
            <a href="#randevu" className="hover:text-amber-500 transition-colors">Randevu Al</a>
          </nav>

          <div className="flex items-center gap-3">
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsPhoneOpen(!isPhoneOpen)}
                className="p-2.5 rounded-full bg-neutral-900 border border-neutral-800 text-amber-400 hover:bg-neutral-800 transition-all cursor-pointer flex items-center gap-2 px-4 text-xs font-medium"
              >
                <Phone className="w-4 h-4" />
                <span className="hidden sm:inline">İletişim</span>
              </button>

              {isPhoneOpen && (
                <div className="absolute right-0 mt-3 w-64 bg-neutral-900 border border-neutral-800 rounded-2xl p-4 shadow-2xl text-xs space-y-2 z-50">
                  <p className="text-amber-500 font-bold border-b border-neutral-800 pb-1">C & R STUDIO</p>
                  <p className="text-neutral-300"><strong className="text-white">Yetkili:</strong> Rümeysa Savaş</p>
                  <p className="text-neutral-300"><strong className="text-white">Telefon:</strong> 0551 056 13 12</p>
                  <a 
                    href="tel:05510561312" 
                    className="block w-full mt-2 py-2 text-center bg-amber-500 text-black font-bold rounded-xl hover:bg-amber-400 transition-colors"
                  >
                    Hemen Ara
                  </a>
                </div>
              )}
            </div>

            {ready && (
              user ? (
                <button
                  type="button"
                  onClick={() => setActiveModal('profile')}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-amber-500 text-black font-bold text-xs uppercase tracking-wider hover:bg-amber-400 transition-all cursor-pointer shadow-lg"
                >
                  <User className="w-4 h-4" />
                  <span>{user.name}</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setActiveModal('login')}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-200 text-xs font-semibold uppercase tracking-wider hover:border-amber-500 hover:text-amber-500 transition-all cursor-pointer"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Giriş Yap</span>
                </button>
              )
            )}
          </div>

        </div>
      </header>

      {isAuthView && !user && (
        <AuthModal view={activeModal} onViewChange={setActiveModal} onClose={closeModal} />
      )}

      {activeModal === 'profile' && user && (
        <ProfileDrawer
          user={user}
          userAppointments={userAppointments}
          onCancelAppointment={onCancelAppointment}
          onClose={closeModal}
        />
      )}
    </>
  );
}
