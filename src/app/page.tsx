import { Hero } from '@/components/hero';
import { About } from '@/components/about';
import { Experience } from '@/components/experience';
import { Projects } from '@/components/projects';
import { Hobbies } from '@/components/hobbies';
import { Contact } from '@/components/contact';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <main>
      <Hero />

      <About />

      <Experience />

      <Projects />

      <Hobbies />

      <Contact />
      <Footer />
    </main>
  );
}
