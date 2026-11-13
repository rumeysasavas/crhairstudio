'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Scissors, Sparkles, Eye, ArrowRight } from 'lucide-react';

export default function ShopGallery() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('all');

  // Güncellenmiş, daha estetik ve profesyonel görseller
  const galleryItems = [
    {
      id: 'hair',
      category: 'hair',
      title: 'Saç Bakım & Renklendirme',
      subtitle: 'Ombre, Sombre, Keratin Bakım ve Lüks Dönüşüm Stüdyosu',
      image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800&auto=format&fit=crop&q=80',
      badge: 'Saç Stüdyosu (Eski / Yeni)'
    },
    {
      id: 'nail',
      category: 'nail',
      title: 'Protez Tırnak & Nail Art',
      subtitle: 'Minimalist Badem Tırnak, Kalıcı Oje ve Özel Tasarımlar',
      image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&auto=format&fit=crop&q=80',
      badge: 'Nail Art Stüdyosu'
    },
    {
      id: 'makeup',
      category: 'makeup',
      title: 'Profesyonel Makyaj',
      subtitle: 'Göz Makyajı, Pürüzsüz Ten ve Özel Gün Tasarımları',
      image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800&auto=format&fit=crop&q=80',
      badge: 'Makyaj Stüdyosu'
    }
  ];

  const filteredItems = activeTab === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeTab);

  return (
    <section id="dukkanimiz" className="py-24 bg-neutral-900 text-white relative border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center space-y-3 mb-12">
          <span className="text-amber-500 font-semibold tracking-widest uppercase text-xs">C & R STUDIO</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold">Dükkanımız & Çalışmalarımız</h2>
          <p className="text-neutral-400 text-xs sm:text-sm max-w-xl mx-auto">
            Hizmet detaylarını incelemek ve örnek çalışmaları görmek için kategorilere tıklayın.
          </p>
        </div>

        {/* Kategori Filtreleme Butonları */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'all' ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20' : 'bg-black/60 border border-neutral-800 text-neutral-300 hover:border-amber-500/50'
            }`}
          >
            Tümü
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('hair')}
            className={`px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'hair' ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20' : 'bg-black/60 border border-neutral-800 text-neutral-300 hover:border-amber-500/50'
            }`}
          >
            <Scissors className="w-3.5 h-3.5" /> Saç Bakım
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('nail')}
            className={`px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'nail' ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20' : 'bg-black/60 border border-neutral-800 text-neutral-300 hover:border-amber-500/50'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" /> Protez Tırnak
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('makeup')}
            className={`px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'makeup' ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20' : 'bg-black/60 border border-neutral-800 text-neutral-300 hover:border-amber-500/50'
            }`}
          >
            <Eye className="w-3.5 h-3.5" /> Makyaj
          </button>
        </div>

        {/* Kartlar (Tıklayınca Detay Sayfasına Gider) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div 
              key={item.id}
              onClick={() => router.push(`/gallery/${item.category}`)}
              className="group bg-black/40 border border-neutral-800 rounded-3xl overflow-hidden shadow-xl transition-all duration-300 hover:border-amber-500 hover:-translate-y-1 cursor-pointer"
            >
              <div className="relative h-72 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md border border-neutral-700 px-3 py-1 rounded-full text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                  {item.badge}
                </div>
              </div>

              <div className="p-6 flex justify-between items-center">
                <div className="space-y-1">
                  <h3 className="text-lg font-serif font-bold text-white group-hover:text-amber-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-neutral-400">
                    {item.subtitle}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-amber-500/10 text-amber-500 group-hover:bg-amber-500 group-hover:text-black transition-all">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}