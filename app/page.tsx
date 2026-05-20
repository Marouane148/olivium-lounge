import Loader from '@/components/lounge/Loader';
import Navbar from '@/components/lounge/Navbar';
import Hero from '@/components/lounge/Hero';
import About from '@/components/lounge/About';
import Services from '@/components/lounge/Services';
import Gallery from '@/components/lounge/Gallery';
import Menu from '@/components/lounge/Menu';
import Reviews from '@/components/lounge/Reviews';
import Reservation from '@/components/lounge/Reservation';
import Contact from '@/components/lounge/Contact';
import Footer from '@/components/lounge/Footer';

export default function Home() {
  return (
    <main className="bg-[#0B0B0B] text-[#F5F5F5] min-h-screen">
      <Loader />
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Gallery />
      <Menu />
      <Reviews />
      <Reservation />
      <Contact />
      <Footer />
    </main>
  );
}
