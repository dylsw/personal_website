// ─── Personal info ────────────────────────────────────────────────────────────

export const personal = {
  name: "Dylan",
  title: "A *product manager* passionate about bridging design and data",
  bio: [
    "Outside of work, I **love** to travel.",
    "Here are a few pics from my latest trip to the Alps.",
  ],
  social: {
    github: "https://github.com/dylsw",
    linkedin: "https://linkedin.com/in/dylan-wo-30b97926a/",
  },
};

// ─── Hero photos ──────────────────────────────────────────────────────────────
// Drop your images into /public/photos/ and update the paths below.
// The strip duplicates the array automatically — just list each photo once.

export const heroPhotos = [
  { src: "/hero/zermatt.jpg", alt: "Photo 1" },
  { src: "/hero/grindelwald.jpg", alt: "Photo 2" },
  { src: "/hero/kandersteg.jpg", alt: "Photo 3" },
];

// ─── About ────────────────────────────────────────────────────────────────────

export const about = {
  image: { src: "/about/first.jpg", alt: "Dylan" },
  paragraphs: [
    "Turns out if you spend enough time in _engineering_, _data science_, and _analytics_, someone eventually hands you a product and says 'figure it out'. That someone was me, and I genuinely **love** the part of the job where you get to connect dots others haven't connected yet.",
    "Off the clock, I collect new experiences the same way. Usually by planning my next trip somewhere I've never been, eating something I can't pronounce, or convincing myself a new hobby is totally a good idea.",
    "I thrive on new environments, new people, and the occasional mild discomfort of figuring things out from scratch.",
  ],
};

// ─── Experience ───────────────────────────────────────────────────────────────

export type Experience = {
  company: string;
  role: string;
  period: string;
  description: string;
};

export const experiences: Experience[] = [];

// ─── Projects ─────────────────────────────────────────────────────────────────

export type Project = {
  title: string;
  description: string;
  tags: string[];
  url?: string;
  repo?: string;
};

export const projects: Project[] = [];

// ─── Hobbies ──────────────────────────────────────────────────────────────────

export const hobbies: string[] = [];

// ─── Contact ──────────────────────────────────────────────────────────────────

export const contact = {
  email: "",
};
