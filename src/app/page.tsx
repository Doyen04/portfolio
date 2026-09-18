import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Carousel from '@/components/carousel';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import FloatNav from '@/ui/floatNavBar';
import { getPortfolioContent } from '@/lib/content';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const content = await getPortfolioContent();
  const skillNames = content.skillGroups.flatMap((group) => group.skills.map((skill) => skill.name));

  return (
    <main className="relative">
      <FloatNav />
      <Nav cvUrl={content.settings.cvUrl} />
      <Hero cvUrl={content.settings.cvUrl} />
      <Carousel skills={skillNames} />
      <Projects projects={content.projects} />
      <Skills groups={content.skillGroups} />
      <About about={content.about} />
      <Contact items={content.contact.items} />
      <Footer />
    </main>
  );
}