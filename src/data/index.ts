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
  summary: "",
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
