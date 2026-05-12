import { Hero } from '@/components/hero';
import { About } from '@/components/about';

export default function Home() {
  return (
    <main>
      <Hero />

      <About />

      <section
        id="experience"
        className="flex min-h-screen items-center justify-center"
      >
        <h2 className="text-4xl font-semibold text-zinc-900">
          Experience
        </h2>
      </section>

      <section
        id="projects"
        className="flex min-h-screen items-center justify-center"
      >
        <h2 className="text-4xl font-semibold text-zinc-900">
          Projects
        </h2>
      </section>

      <section
        id="hobbies"
        className="flex min-h-screen items-center justify-center"
      >
        <h2 className="text-4xl font-semibold text-zinc-900">
          Hobbies
        </h2>
      </section>

      <section
        id="contact"
        className="flex min-h-screen items-center justify-center"
      >
        <h2 className="text-4xl font-semibold text-zinc-900">
          Contact Me
        </h2>
      </section>
    </main>
  );
}
