import Navbar from '@/app/components/Navbar';
import Hero from '@/app/components/Hero';
import Services from '@/app/components/Services';
import ShopGallery from '@/app/components/ShopGallery';
import Appointment from '@/app/components/Appointment';

export default function Home() {
  return (
    <main className="bg-black min-h-screen text-white">
      <Navbar />
      <Hero />
      <Services />
      <ShopGallery />
      <Appointment />
    </main>
  );
}