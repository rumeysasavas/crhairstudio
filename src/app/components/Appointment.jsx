'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase'; // Supabase bağlantısını dahil ediyoruz
import { Calendar, Clock, Scissors, User, CheckCircle2, Phone, FileText } from 'lucide-react';

export default function Appointment({ onAddAppointment }) {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedStylist, setSelectedStylist] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState(null);
  
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [note, setNote] = useState('');
  const [bookedTimes, setBookedTimes] = useState([]);
  const [loading, setLoading] = useState(false);

  const services = [
    { id: 1, name: 'Saç Kesimi & Şekillendirme', price: '750 ₺', duration: '45 dk', category: 'Saç' },
    { id: 2, name: 'Özel Gelin / Nişan Saçı', price: '2500 ₺', duration: '90 dk', category: 'Saç' },
    { id: 3, name: 'Ombre / Sombre & Renklendirme', price: '3000 ₺', duration: '180 dk', category: 'Saç' },
    { id: 4, name: 'Protez Tırnak & Kalıcı Oje', price: '900 ₺', duration: '60 dk', category: 'Nail' },
    { id: 5, name: 'Profesyonel Makyaj', price: '1200 ₺', duration: '60 dk', category: 'Makyaj' },
    { id: 6, name: 'Cilt Bakımı & Yenileme', price: '1500 ₺', duration: '75 dk', category: 'Bakım' },
  ];

  const stylists = [
    { id: 1, name: 'Rümeysa Savaş', role: 'Baş Stilist & Kurucu', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80' },
    { id: 2, name: 'Tuğçe Demir', role: 'Saç & Renklendirme Uzmanı', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80' },
    { id: 3, name: 'Elif Yılmaz', role: 'Nail Art & Makyaj Uzmanı', image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&auto=format&fit=crop&q=80' }
  ];

  const timeSlots = [
    '09:00', '10:30', '12:00', '13:30', '15:00', '16:30', '18:00', '19:30'
  ];

  // Seçilen tarihe göre dolu saatleri Supabase'den çekme
  useEffect(() => {
    async function fetchBookedTimes() {
      if (!selectedDate) return;
      try {
        const { data, error } = await supabase
          .from('appointments')
          .select('time')
          .eq('date', selectedDate);

        if (error) throw error;
        setBookedTimes(data ? data.map(item => item.time) : []);
      } catch (err) {
        console.error('Randevular çekilirken hata oluştu:', err.message);
      }
    }
    fetchBookedTimes();
  }, [selectedDate]);

  // Randevuyu Supabase'e kaydetme
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedService || !selectedStylist || !selectedDate || !selectedTime || !fullName || !phone) {
      alert('Lütfen tüm zorunlu alanları doldurun.');
      return;
    }

    setLoading(true);

    const newAppointment = {
      service: selectedService.name,
      stylist: selectedStylist.name,
      date: selectedDate,
      time: selectedTime,
      fullName,
      phone,
      note: note || ''
    };

    try {
      const { data, error } = await supabase
        .from('appointments')
        .insert([newAppointment])
        .select();

      if (error) throw error;

      // Başarılı olursa ana bileşene de bildir (profil çekmecesinde anında görünsün diye)
      if (data && data[0]) {
        onAddAppointment?.(data[0]);
      }

      setLoading(false);
      setStep(5); // Başarı adımına geçiş
    } catch (err) {
      console.error('Randevu kaydedilemedi:', err.message);
      alert('Randevu oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.');
      setLoading(false);
    }
  };

  return (
    <section id="randevu" className="py-24 bg-neutral-950 text-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center space-y-3 mb-12">
          <span className="text-amber-500 font-semibold tracking-widest uppercase text-xs">C & R STUDIO</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold">Online Randevu Oluştur</h2>
          <p className="text-neutral-400 text-xs sm:text-sm">Hayatınızı güzelleştirecek dokunuş için adım adım ilerleyin.</p>
        </div>

        {/* Adım Göstergesi */}
        {step < 5 && (
          <div className="flex justify-between items-center mb-10 max-w-md mx-auto px-4 text-xs font-semibold uppercase tracking-wider text-neutral-400">
            <span className={step >= 1 ? 'text-amber-500' : ''}>1. Hizmet</span>
            <span>/</span>
            <span className={step >= 2 ? 'text-amber-500' : ''}>2. Uzman</span>
            <span>/</span>
            <span className={step >= 3 ? 'text-amber-500' : ''}>3. Tarih</span>
            <span>/</span>
            <span className={step >= 4 ? 'text-amber-500' : ''}>4. Bilgiler</span>
          </div>
        )}

        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
          
          {/* ADIM 1: HİZMET SEÇİMİ */}
          {step === 1 && (
            <div className="space-y-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-amber-500 flex items-center gap-2">
                <Scissors className="w-4 h-4" /> Hizmet Seçin
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {services.map((srv) => (
                  <div
                    key={srv.id}
                    onClick={() => setSelectedService(srv)}
                    className={`p-5 rounded-2xl border transition-all cursor-pointer flex justify-between items-center ${
                      selectedService?.id === srv.id
                        ? 'bg-amber-500/10 border-amber-500 text-white'
                        : 'bg-black/40 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                    }`}
                  >
                    <div>
                      <p className="font-bold text-sm text-white">{srv.name}</p>
                      <p className="text-xs text-neutral-400 mt-1">{srv.duration} • <span className="text-amber-400 font-semibold">{srv.price}</span></p>
                    </div>
                    {selectedService?.id === srv.id && <CheckCircle2 className="w-5 h-5 text-amber-500" />}
                  </div>
                ))}
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="button"
                  disabled={!selectedService}
                  onClick={() => setStep(2)}
                  className={`px-8 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all ${
                    selectedService ? 'bg-amber-500 text-black hover:bg-amber-400 cursor-pointer shadow-lg shadow-amber-500/20' : 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                  }`}
                >
                  İleri
                </button>
              </div>
            </div>
          )}

          {/* ADIM 2: UZMAN SEÇİMİ */}
          {step === 2 && (
            <div className="space-y-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-amber-500 flex items-center gap-2">
                <User className="w-4 h-4" /> Uzman Seçin
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {stylists.map((st) => (
                  <div
                    key={st.id}
                    onClick={() => setSelectedStylist(st)}
                    className={`p-4 rounded-2xl border text-center transition-all cursor-pointer space-y-3 ${
                      selectedStylist?.id === st.id
                        ? 'bg-amber-500/10 border-amber-500 text-white'
                        : 'bg-black/40 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                    }`}
                  >
                    <img src={st.image} alt={st.name} className="w-20 h-20 rounded-full mx-auto object-cover border border-neutral-700" />
                    <div>
                      <p className="font-bold text-sm text-white">{st.name}</p>
                      <p className="text-[11px] text-neutral-400 mt-0.5">{st.role}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-6 py-3.5 rounded-xl bg-neutral-800 text-neutral-300 font-bold text-xs uppercase tracking-wider hover:bg-neutral-700 cursor-pointer"
                >
                  Geri
                </button>
                <button
                  type="button"
                  disabled={!selectedStylist}
                  onClick={() => setStep(3)}
                  className={`px-8 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all ${
                    selectedStylist ? 'bg-amber-500 text-black hover:bg-amber-400 cursor-pointer shadow-lg shadow-amber-500/20' : 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                  }`}
                >
                  İleri
                </button>
              </div>
            </div>
          )}

          {/* ADIM 3: TARİH VE SAAT SEÇİMİ */}
          {step === 3 && (
            <div className="space-y-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-amber-500 flex items-center gap-2">
                <Calendar className="w-4 h-4" /> Tarih ve Saat Seçin
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">Randevu Tarihi</label>
                  <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={selectedDate}
                    onChange={(e) => {
                      setSelectedDate(e.target.value);
                      setSelectedTime(null);
                    }}
                    className="w-full px-4 py-3 rounded-xl bg-black/60 border border-neutral-800 text-white focus:outline-none focus:border-amber-500 text-sm"
                  />
                </div>

                {selectedDate && (
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">Uygun Saatler</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {timeSlots.map((time) => {
                        const isBooked = bookedTimes.includes(time);
                        return (
                          <button
                            key={time}
                            type="button"
                            disabled={isBooked}
                            onClick={() => setSelectedTime(time)}
                            className={`py-3 rounded-xl font-bold text-xs transition-all border ${
                              isBooked
                                ? 'bg-neutral-900 border-neutral-800 text-neutral-600 line-through cursor-not-allowed'
                                : selectedTime === time
                                ? 'bg-amber-500 border-amber-500 text-black shadow-lg shadow-amber-500/20'
                                : 'bg-black/40 border-neutral-800 text-neutral-300 hover:border-amber-500/50 cursor-pointer'
                            }`}
                          >
                            {time} {isBooked && '(Dolu)'}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-6 py-3.5 rounded-xl bg-neutral-800 text-neutral-300 font-bold text-xs uppercase tracking-wider hover:bg-neutral-700 cursor-pointer"
                >
                  Geri
                </button>
                <button
                  type="button"
                  disabled={!selectedDate || !selectedTime}
                  onClick={() => setStep(4)}
                  className={`px-8 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all ${
                    selectedDate && selectedTime ? 'bg-amber-500 text-black hover:bg-amber-400 cursor-pointer shadow-lg shadow-amber-500/20' : 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                  }`}
                >
                  İleri
                </button>
              </div>
            </div>
          )}

          {/* ADIM 4: KULLANICI BİLGİLERİ VE ONAY */}
          {step === 4 && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-amber-500 flex items-center gap-2">
                <FileText className="w-4 h-4" /> İletişim Bilgileriniz
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">Ad Soyad</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Rümeysa Savaş"
                    className="w-full px-4 py-3 rounded-xl bg-black/60 border border-neutral-800 text-white placeholder-neutral-600 focus:outline-none focus:border-amber-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">Telefon Numarası</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0551 056 13 12"
                    className="w-full px-4 py-3 rounded-xl bg-black/60 border border-neutral-800 text-white placeholder-neutral-600 focus:outline-none focus:border-amber-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">Özel Not (Opsiyonel)</label>
                  <textarea
                    rows="2"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Eklemek istediğiniz özel bir istek..."
                    className="w-full px-4 py-3 rounded-xl bg-black/60 border border-neutral-800 text-white placeholder-neutral-600 focus:outline-none focus:border-amber-500 text-sm resize-none"
                  ></textarea>
                </div>
              </div>

              <div className="bg-black/40 border border-neutral-800 rounded-2xl p-4 space-y-2 text-xs">
                <p className="text-amber-500 font-bold border-b border-neutral-800 pb-1">Randevu Özeti</p>
                <p className="text-neutral-300"><strong>Hizmet:</strong> {selectedService?.name}</p>
                <p className="text-neutral-300"><strong>Uzman:</strong> {selectedStylist?.name}</p>
                <p className="text-neutral-300"><strong>Tarih & Saat:</strong> {selectedDate} - {selectedTime}</p>
              </div>

              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-6 py-3.5 rounded-xl bg-neutral-800 text-neutral-300 font-bold text-xs uppercase tracking-wider hover:bg-neutral-700 cursor-pointer"
                >
                  Geri
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-amber-500/20"
                >
                  {loading ? 'Kaydediliyor...' : 'Randevuyu Onayla'}
                </button>
              </div>
            </form>
          )}

          {/* ADIM 5: BAŞARILI ONAY EKRANI */}
          {step === 5 && (
            <div className="text-center space-y-6 py-8">
              <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/30 rounded-full flex items-center justify-center mx-auto text-amber-500">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-serif font-bold text-white">Randevunuz Başarıyla Oluşturuldu!</h3>
                <p className="text-xs text-neutral-400 max-w-sm mx-auto">
                  Supabase veritabanına kaydedilmiştir. Profilinize giderek randevularınızı görüntüleyebilir veya iptal edebilirsiniz.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setStep(1);
                  setSelectedService(null);
                  setSelectedStylist(null);
                  setSelectedDate('');
                  setSelectedTime(null);
                }}
                className="px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-amber-500/20"
              >
                Yeni Randevu Al
              </button>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}