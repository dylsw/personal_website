import { Hero } from '@/components/hero';

export default function Home() {
  return (
    <main>
      <Hero />

      <section
        id="about"
        className="flex min-h-screen items-center justify-center"
      >
        <h2 className="text-4xl font-semibold text-zinc-900">
          About Me
        </h2>
      </section>

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
