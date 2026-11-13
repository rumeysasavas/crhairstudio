'use client';

import { Calendar, Clock, MapPin, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section id="anasayfa" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* ARKA PLAN FOTOĞRAFI & OVERLAY EFEKTİ */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=1920"
          alt="Luxe Salon İç Mekan"
          className="w-full h-full object-cover object-center scale-105 animate-pulse-slow"
        />
        {/* Lüks Koyu Derecelendirme (Gradient Overlay) */}
        <div className="absolute inset-0 bg-linear-to-t from-neutral-950 via-neutral-950/80 to-neutral-950/60" />
        <div className="absolute inset-0 bg-radial-vignette opacity-70" />
      </div>

      {/* İÇERİK ALANI */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-12 pb-20">
        
        {/* Üst Rozet (Badge) */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-medium tracking-widest uppercase mb-8 backdrop-blur-sm animate-fade-in">
          <Sparkles className="w-4 h-4" />
          <span>Premium Güzellik & Bakım Deneyimi</span>
        </div>

        {/* Ana Başlık */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-bold text-white tracking-tight leading-tight">
          Güzelliğinizi <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-200 via-orange-400 to-orange-600">
            Sanata Dönüştürüyoruz
          </span>
        </h1>

        {/* Alt Açıklama */}
        <p className="mt-6 text-lg sm:text-xl text-neutral-300 max-w-2xl mx-auto font-light leading-relaxed">
          Protez tırnak, profesyonel saç tasarımı ve kişiye özel makyaj hizmetlerimizle
          hayalinizdeki şıklığı uzman kadromuzla keşfedin.
        </p>

        {/* EYLEM BUTONLARI */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#randevu"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-orange-400 hover:bg-orange-300 text-black font-bold text-sm tracking-wider uppercase transition-all shadow-lg shadow-orange-500/20 flex items-center justify-center gap-3 group"
          >
            <Calendar className="w-5 h-5 group-hover:scale-110 transition-transform" />
            Hemen Randevu Al
          </a>

          <a
            href="#hizmetler"
            className="w-full sm:w-auto px-8 py-4 rounded-full border border-neutral-700 hover:border-orange-500/50 bg-neutral-900/50 backdrop-blur-sm text-neutral-200 hover:text-white font-medium text-sm tracking-wider uppercase transition-all flex items-center justify-center"
          >
            Hizmetlerimizi İnceleyin
          </a>
        </div>

        {/* HIZLI BİLGİ KARTLARI (Çalışma Saatleri & Konum) */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto border-t border-neutral-800/80 pt-8">
          <div className="flex items-center justify-center gap-3 text-neutral-400 text-sm">
            <Clock className="w-5 h-5 text-orange-400 shrink-0" />
            <span>Pazartesi - Cumartesi: 09:00 - 20:00</span>
          </div>
          <div className="flex items-center justify-center gap-3 text-neutral-400 text-sm">
            <MapPin className="w-5 h-5 text-orange-400 shrink-0" />
            <span>Merkez / Kütahya</span>
          </div>
        </div>

      </div>
    </section>
  );
}