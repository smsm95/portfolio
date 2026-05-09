import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Certifications from '@/components/Certifications';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { SectionDivider } from '@/components/SectionDivider';
import CursorAccent from '@/components/CursorAccent';
import ScrollProgress from '@/components/ScrollProgress';

export default function Page() {
  return (
    <main id="main" tabIndex={-1}>
      <ScrollProgress />
      <Navbar />
      <Hero />
      <SectionDivider />
      <About />
      <SectionDivider />
      <Certifications />
      <SectionDivider />
      <Projects />
      <SectionDivider />
      <Contact />
      <Footer />
      <CursorAccent />
    </main>
  );
}
