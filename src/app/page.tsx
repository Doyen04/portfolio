import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Carousel from '@/components/carousel';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import FloatNav from '@/ui/floatNavBar';

export default function Home() {
  return (
    <main className="relative">
      <FloatNav />
      <Nav />
      <Hero />
      <Carousel />
      <Projects />
      <Skills />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}