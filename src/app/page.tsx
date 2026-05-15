import { Hero } from '@/components/hero';
import { About } from '@/components/about';
import { Experience } from '@/components/experience';
import { Projects } from '@/components/projects';
import { Hobbies } from '@/components/hobbies';

export default function Home() {
  return (
    <main>
      <Hero />

      <About />

      <Experience />

      <Projects />

      <Hobbies />

      <section
        id="contact"
        className="flex min-h-screen items-center justify-center"
      >
        <h2 className="text-4xl font-semibold text-zinc-100">
          Contact Me
        </h2>
      </section>
    </main>
  );
}
