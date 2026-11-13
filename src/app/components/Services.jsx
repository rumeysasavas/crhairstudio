'use client';

import { Sparkles, Scissors, Sparkle, CheckCircle2 } from 'lucide-react';

const SERVICES_DATA = [
  {
    id: '1',
    category: 'Protez Tırnak',
    icon: Sparkles,
    items: [
      { name: 'Protez Tırnak + Kalıcı Oje', duration: '90 dk', price: '₺850', desc: 'Medikal manikür ve dilediğiniz kalıcı oje rengi.' },
      { name: 'Nail Art / Özel Tasarım', duration: '45 dk', price: '₺400', desc: 'Kişiye özel modern illüstrasyon desen uygulamaları.' },
      { name: 'Kalıcı Oje Çıkarma & Bakım', duration: '30 dk', price: '₺250', desc: 'Güvenli çıkarma ve besleyici yağ bakımı.' },
    ],
  },
  {
    id: '2',
    category: 'Saç Tasarım & Bakım',
    icon: Scissors,
    items: [
      { name: 'Kesim & Stil Fön', duration: '60 dk', price: '₺650', desc: 'Yüz tipinize uygun modern kesim ve fön uygulaması.' },
      { name: 'Ombre / Sombre / Balyaj', duration: '180 dk', price: '₺2.500', desc: 'Doğal renk geçişleri ve özel renklendirme.' },
      { name: 'Keratin Bakım', duration: '120 dk', price: '₺1.500', desc: 'Saç yapısını onaran yoğun bakım.' },
    ],
  },
  {
    id: '3',
    category: 'Profesyonel Makyaj',
    icon: Sparkle,
    items: [
      { name: 'Gece & Özel Gün Makyajı', duration: '60 dk', price: '₺1.200', desc: 'Kalıcı ve suya dayanıklı premium ürünler.' },
      { name: 'Gelin Makyajı (Provalı)', duration: '120 dk', price: '₺3.500', desc: 'Düğün öncesi prova dahil özel gelin stili.' },
      { name: 'Günlük Makyaj', duration: '45 dk', price: '₺800', desc: 'Taze ve hafif ışıltılı doğal görünüm.' },
    ],
  },
];

export default function Services() {
  return (
    <section id="hizmetler" className="py-24 bg-black text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold tracking-widest uppercase mb-4">
            <Sparkle className="w-3.5 h-3.5" />
            <span>Özel Hizmetlerimiz</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
            Güzellik & Bakım <span className="text-amber-500">Kataloğumuz</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {SERVICES_DATA.map((serviceGroup) => {
            const IconComponent = serviceGroup.icon;
            return (
              <div
                key={serviceGroup.id}
                className="bg-neutral-900/60 border border-neutral-800 hover:border-amber-500/40 rounded-3xl p-8 backdrop-blur-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-4 mb-8 pb-6 border-b border-neutral-800">
                    <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-500">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-serif font-bold text-white">
                      {serviceGroup.category}
                    </h3>
                  </div>

                  <div className="space-y-6">
                    {serviceGroup.items.map((item, index) => (
                      <div key={index} className="group">
                        <div className="flex items-baseline justify-between gap-2">
                          <h4 className="text-sm font-semibold text-white group-hover:text-amber-400 transition-colors">
                            {item.name}
                          </h4>
                          <span className="text-xs text-neutral-500 font-mono">{item.duration}</span>
                        </div>
                        <div className="flex items-center justify-between mt-1">
                          <p className="text-xs text-neutral-400 font-light pr-4">{item.desc}</p>
                          <span className="text-sm font-bold text-amber-500">{item.price}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-neutral-800/80">
                  <a
                    href="#randevu"
                    className="w-full py-3 rounded-xl bg-neutral-800 hover:bg-amber-500 hover:text-black text-amber-400 font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4" /> Randevu Al
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}