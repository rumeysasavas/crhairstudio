'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { ArrowLeft, Scissors, Sparkles, Eye, CheckCircle2 } from 'lucide-react';

export default function GalleryDetail() {
  const params = useParams();
  const router = useRouter();
  const category = params.category; // 'hair' | 'nail' | 'makeup'

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const categoryDetails = {
    hair: {
      title: 'Saç Bakım & Renklendirme Stüdyosu',
      subtitle: 'Renk katalogları, profesyonel boya hazırlığı, ombre ve lüks kesim uygulamalarımız.',
      icon: Scissors
    },
    nail: {
      title: 'Protez Tırnak & Nail Art Koleksiyonu',
      subtitle: 'Ombre French, Mermer Desen, Leopar Art, Manikür ve Spa Pedikür uygulamalarımız.',
      icon: Sparkles
    },
    makeup: {
      title: 'Profesyonel Makyaj Stüdyosu',
      subtitle: 'Kusursuz ten makyajı, göz tasarımı paletleri ve lüks gelin makyajı uygulamaları.',
      icon: Eye
    }
  };

  const currentInfo = categoryDetails[category] || {
    title: 'Stüdyo Koleksiyonu',
    subtitle: 'Özel çalışmalarımız.',
    icon: Scissors
  };

  const IconComponent = currentInfo.icon;

  function getDefaultItems(type) {
    if (type === 'hair') {
      return [
        {
          id: 1,
          title: 'Lüks Kahve & Karamel Ombre',
          subtitle: 'Koyu tabandan sıcak karamel tonlarına kusursuz geçiş uygulaması.',
          image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800&auto=format&fit=crop&q=80',
          badge: 'Karamel Ombre'
        },
        {
          id: 2,
          title: 'Işıltılı Doğal Sarı Tonları',
          subtitle: 'Saç doğal yapısı korunarak uygulanan parlak röfle ve balyaj seansı.',
          image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800&auto=format&fit=crop&q=80',
          badge: 'Işıltılı Sarı'
        },
        {
          id: 3,
          title: 'Modern Perde Kakül & Katlı Kesim',
          subtitle: 'Yüz hatlarını ön plana çıkaran hacimli ve dolgun fön tasarımı.',
          image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80',
          badge: 'Katlı Kesim'
        },
        {
          id: 4,
          title: 'Profesyonel Renk Kataloğu & Danışmanlık',
          subtitle: 'Ten renginize ve tarzınıza en uygun boya tonunun seçilmesi.',
          image: 'https://images.unsplash.com/photo-1584297091959-40f0ef3a0928?w=800&auto=format&fit=crop&q=80',
          badge: 'Renk Kataloğu'
        },
        {
          id: 5,
          title: 'Özel Oksidan & Boya Hazırlığı',
          subtitle: 'Saç sağlığını koruyan profesyonel formüllü karışım seansı.',
          image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=800&auto=format&fit=crop&q=80',
          badge: 'Boya Hazırlığı'
        },
        {
          id: 6,
          title: 'Folyo & Set Ekipman Çalışması',
          subtitle: 'Özenle ayrılmış tutamlar üzerinde titiz boya uygulama hazırlığı.',
          image: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?w=800&auto=format&fit=crop&q=80',
          badge: 'Folyo Teknikleri'
        }
      ];
    } else if (type === 'nail') {
      return [
        {
          id: 1,
          title: 'Soft Ombre French Protez Tırnak',
          subtitle: 'Zarif ve zamansız geçişli doğal tonlarda badem tırnak tasarımı.',
          image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&auto=format&fit=crop&q=80',
          badge: 'Ombre French'
        },
        {
          id: 2,
          title: 'Yeşil Mermer Desen & Altın Detaylar',
          subtitle: 'Doğal taş dokulu özel tasarım kalıcı oje uygulaması.',
          image: 'https://images.unsplash.com/photo-1632345031435-8777f6c9be8c?w=800&auto=format&fit=crop&q=80',
          badge: 'Mermer Nail Art'
        },
        {
          id: 3,
          title: 'Lüks Bordo Ballerina Protez Tırnak',
          subtitle: 'Derin bordo tonlarında pürüzsüz ve parlak yüzey bitişi.',
          image: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=800&auto=format&fit=crop&q=80',
          badge: 'Klasik Şıklık'
        },
        {
          id: 4,
          title: 'Nude Badem Protez & İpek Manikür',
          subtitle: 'Temiz ve doğal görünüm sevenler için özel pudra tonları.',
          image: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=800&auto=format&fit=crop&q=80',
          badge: 'Nude Serisi'
        },
        {
          id: 5,
          title: 'Profesyonel Oje Paleti & Danışmanlık',
          subtitle: 'Geniş renk skalası arasından teninize uygun ton seçimi.',
          image: 'https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=800&auto=format&fit=crop&q=80',
          badge: 'Renk Seçimi'
        },
        {
          id: 6,
          title: 'Medikal Manikür & Tırnak Eti Bakımı',
          subtitle: 'Tırnak yatağını temizleyen ve güçlendiren hassas bakım seansı.',
          image: 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=800&auto=format&fit=crop&q=80',
          badge: 'Tırnak Bakımı'
        },
        {
          id: 7,
          title: 'Kütikül Yağı Nem Terapisi',
          subtitle: 'İçeriğindeki doğal yağlar ile kütikülleri derinlemesine besleyen seans.',
          image: 'https://images.unsplash.com/photo-1629851605335-5231c4b953d5?w=800&auto=format&fit=crop&q=80',
          badge: 'Nem Terapisi'
        },
        {
          id: 8,
          title: 'Lüks Spa Pedikür & French Kalıcı Oje',
          subtitle: 'Ayak sağlığı bakımı, arındırıcı peeling ve estetik French bitişi.',
          image: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=800&auto=format&fit=crop&q=80',
          badge: 'Spa Pedikür'
        },
        {
          id: 9,
          title: 'Kahve Tonları & Leopar Nail Art',
          subtitle: 'Mat ve parlak dokuların buluştuğu özel leopar desenli tasarım.',
          image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&auto=format&fit=crop&q=80',
          badge: 'Leopar Art'
        },
        {
          id: 10,
          title: 'Altın Varaklı Mermer Efektli Tasarım',
          subtitle: 'Çikolata kahve ve nude tonlar üzerinde ışıltılı altın hatlar.',
          image: 'https://images.unsplash.com/photo-1632345031435-8777f6c9be8c?w=800&auto=format&fit=crop&q=80',
          badge: 'Altın Varak Art'
        }
      ];
    } else {
      return [
        {
          id: 1,
          title: 'Kusursuz Gelin Makyajı & Taç Tasarımı',
          subtitle: 'Özel gününüz için pürüzsüz ten bitişi, buğulu gözler ve zarif dudak tonları.',
          image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&auto=format&fit=crop&q=80',
          badge: 'Gelin Makyajı'
        },
        {
          id: 2,
          title: 'Işıltılı Gece Makyajı & Eyeliner',
          subtitle: 'Yüz hatlarını ön plana çıkaran kontür uygulaması ve derin bakışlar.',
          image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800&auto=format&fit=crop&q=80',
          badge: 'Gece Makyajı'
        },
        {
          id: 3,
          title: 'Profesyonel Far Paleti & Renk Uyumu',
          subtitle: 'Ten renginize en uygun tonlarla yapılan profesyonel renk geçişleri.',
          image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80',
          badge: 'Palet & Fırça'
        },
        {
          id: 4,
          title: 'Hassas Ten Bazı & Allık Uygulaması',
          subtitle: 'Doğal ışıltı veren highlighter ve sağlıklı yanak tonları.',
          image: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?w=800&auto=format&fit=crop&q=80',
          badge: 'Ten Uygulaması'
        },
        {
          id: 5,
          title: 'Detaylı Göz Çevresi ve Kaş Tasarımı',
          subtitle: 'Yüzünüze karakter katan titiz kaş şekillendirme ve far detayları.',
          image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=800&auto=format&fit=crop&q=80',
          badge: 'Göz & Kaş'
        },
        {
          id: 6,
          title: 'Saç Aksesuarlı Özel Davet Makyajı',
          subtitle: 'Kutlamalar ve özel davetler için zarafet odaklı tam profesyonel set.',
          image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800&auto=format&fit=crop&q=80',
          badge: 'Davet Makyajı'
        }
      ];
    }
  }

  useEffect(() => {
    async function fetchGalleryData() {
      try {
        const { data, error } = await supabase
          .from('gallery_items')
          .select('*')
          .eq('category', category);

        if (error || !data || data.length === 0) {
          setItems(getDefaultItems(category));
        } else {
          setItems(data);
        }
      } catch {
        setItems(getDefaultItems(category));
      } finally {
        setLoading(false);
      }
    }

    fetchGalleryData();
  }, [category]);

  return (
    <main className="bg-black min-h-screen text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        
        <button
          type="button"
          onClick={() => router.push('/#dukkanimiz')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-amber-400 hover:border-amber-500/50 transition-all cursor-pointer mb-8 text-xs font-semibold uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" /> Dükkanımıza Geri Dön
        </button>

        <div className="border-b border-neutral-800 pb-8 mb-12 flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-500">
            <IconComponent className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white">{currentInfo.title}</h1>
            <p className="text-neutral-400 text-xs sm:text-sm mt-1">{currentInfo.subtitle}</p>
          </div>
        </div>

        {loading ? (
          <p className="text-center text-neutral-500 py-12 text-xs">Yükleniyor...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <div 
                key={item.id}
                className="bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-xl space-y-4 pb-6"
              >
                <div className="relative h-80 overflow-hidden">
                  <img 
                    src={item.image_url || item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md border border-neutral-700 px-3 py-1 rounded-full text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                    {item.badge}
                  </div>
                </div>

                <div className="px-6 space-y-2">
                  <h3 className="text-lg font-serif font-bold text-white flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-500" /> {item.title}
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </main>
  );
}