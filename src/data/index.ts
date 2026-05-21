// ─── Personal info ────────────────────────────────────────────────────────────

export const personal = {
  name: "Dylan",
  loading: "Hello !",
  greeting: "I'm Dylan",
  title: "A product manager passionate about bridging design and data",
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
  { src: "/hero/brienz.jpg", alt: "Photo 5" },
  { src: "/hero/kandersteg.jpg", alt: "Photo 1" },
  { src: "/hero/grindelwald.jpg", alt: "Photo 2" },
  { src: "/hero/oschinensee.jpg", alt: "Photo 3" },
  { src: "/hero/zermatt.jpg", alt: "Photo 4" },
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
  role: string;
  company: string;
  period: string;
  logo: string;
  flavour: string;
  description: string;
  bullets: string[];
  tags: string[];
};

export const experiences: Experience[] = [
  {
    role: "Product Manager",
    company: "Shopee",
    period: "Aug 2025 – Present",
    logo: "/logos/logo_shopee.jpg",
    flavour:
      "Owning cart & checkout for millions of daily active users across 10+ markets.",
    description:
      "Product Manager for Marketplace Order Conversion, Cart and Checkout.",
    bullets: [
      "Spearheaded Cart and Checkout strategy across 10+ markets, directly contributing to a **10% uplift** in checkout conversion rate through targeted UX and flow optimizations.",
      "Led **5+ major regional product launches** end-to-end, partnering with engineering, design and marketing to deliver on-time, scalable feature rollouts.",
      "Notable key projects listed in projects section below.",
    ],
    tags: ["Product Thinking", "SDLC", "Stakeholder Management"],
  },
  {
    role: "Data Product Manager",
    company: "Shopee",
    period: "Jan 2025 – Aug 2025",
    logo: "/logos/logo_shopee.jpg",
    flavour:
      "Managing data pipelines that power Shopee's product & analytics teams.",
    description: "Data Product Manager for Marketplace, Data Products Team.",
    bullets: [
      "Owned **4 fundamental Data Marts** (User, Notification, Voucher, Promotion) serving 20+ downstream analytics teams, enabling structured, reliable data pipelines consumed by 50+ local BI teams.",
      "Conducted 10+ impact assessments, collaborating with engineers to reduce data mart query latency by **~20%**, saving an estimated 200 compute-hours per month.",
      "Produced and maintained comprehensive documentation and user guides, cutting stakeholder onboarding time by over **40%** and reducing repeated support queries by more than half.",
    ],
    tags: ["Data Warehousing", "Data Analysis", "Stakeholder Management"],
  },
  {
    role: "Business Analyst",
    company: "GovTech",
    period: "May 2024 – Nov 2024",
    logo: "/logos/logo_govtech.png",
    flavour:
      "Running analytics and AI models for the government's speech-to-text platform.",
    description:
      "Business Analyst for Transcribe, a speech-to-text productivity platform for government officers.",
    bullets: [
      "Built ETL pipelines, processing **500K+ metadata records monthly** into KPI dashboards using Python and Streamlit, enabling real-time visibility for ~10 senior stakeholders.",
      "Developed Prophet and Random Forest forecasting models, achieving **~88% accuracy** on 6-week user trend forecasts, directly informing infrastructure scaling decisions and reducing peak-load incidents by 36%.",
      "Created Isolation Forest anomaly detection models, identifying log irregularities across 1M+ daily events, flagging **3 critical security vulnerabilities** within the first 2 months of deployment.",
      "Represented Transcribe at 2 major government events (Digital Government Exchange 24 & Enterprise SG Innofest), conducting live product showcases to 200+ attendees and generating 10+ qualified leads.",
    ],
    tags: ["Python", "Performance Dashboards", "Machine Learning"],
  },
  {
    role: "Software Engineer",
    company: "Oneberry",
    period: "Jan 2024 – May 20243",
    logo: "/logos/logo_oneberry.jpg",
    flavour: "Developing client apps and chatbots for robot security systems.",
    description:
      "Full-Stack software developer for client web applications running on robot security systems.",
    bullets: [
      "Led frontend development for **3+ client-facing web applications** using React and Next.js, improving UI responsiveness and load times by ~25% through component optimisation.",
      "Managed backend systems in Node.js and Python integrated with AWS and Google Cloud, supporting scalable deployments serving hundreds of concurrent users.",
      "Containerised applications using Docker, reducing environment inconsistency issues across dev and production.",
      "Built **RAG-powered chatbots** using HuggingFace open-source models and OpenAI Whisper for speech-to-text, cutting average user query resolution time by ~40% compared to manual document search.",
    ],
    tags: ["React/Next", "Python", "AWS", "Docker"],
  },
  {
    role: "Final Year Project",
    company: "IMDA",
    period: "Jan 2024 – May 2024",
    logo: "/logos/logo_imda.png",
    flavour:
      "Building a RAG chatbot installed within Slack workspaces from scratch.",
    description:
      "Semester-long RAG chatbot project as part of the college's FYP (Final Year Project).",
    bullets: [
      "Architected and deployed a **RAG chatbot on Slack** for IMDA, processing and categorising 500+ topic-level news articles per week via automated web scraping pipelines.",
      "Implemented a hybrid Neo4j graph database + vector store retrieval system, improving context relevance by **~30%** over baseline embedding-only retrieval.",
      "Evaluated and iterated on model performance using RAGAS metrics, achieving a faithfulness score of **~0.85** and answer relevancy of ~0.88 across benchmark queries.",
      "Delivered the project to a panel of IMDA stakeholders, with the chatbot adopted for internal knowledge management use post-project.",
    ],
    tags: ["Slack API", "RAG", "AI Evaluation"],
  },
  {
    role: "Business Analyst",
    company: "Sony",
    period: "May 2022 – Nov 2022",
    logo: "/logos/logo_sony.png",
    flavour:
      "Analyzing retail data and generating SEA market reports for sales planning.",
    description:
      "Business Analyst intern for SEA Retail and Sales Planning teams.",
    bullets: [
      "Automated retail data monitoring across SEA markets using Excel, Power BI dashboards, and VBA scripts, reducing manual reporting effort by **~60%** and cutting weekly turnaround from 2 days to under 4 hours.",
      "Produced and presented marketing performance reports for the SEA Retail and Sales Planning teams, surfacing insights that directly informed quarterly promotional strategy across 6 markets.",
      "Developed a Telegram Bot using Flask, Google Cloud Console, and Firebase to automate inventory update notifications, eliminating **~5 hours** of manual weekly updates.",
    ],
    tags: ["Excel VBA", "Python", "Reporting & Analysis"],
  },
];

// ─── Projects ─────────────────────────────────────────────────────────────────

export type ProjectCategory = "work" | "personal";

export type Project = {
  name: string;
  front: string[]; // one or more summary paragraphs
  back: {
    description?: string;
    bullets?: string[];
  };
  tagLabel?: string; // label shown above tags on back face, e.g. "Scopes Managed" or "Tech Stack"
  tags: string[];
  image?: string;
  href?: string;
  repo?: string;
};

export const projects: Record<ProjectCategory, Project[]> = {
  work: [
    {
      name: "Teleconsultation",
      front: [
        "Regulatory non-compliance in Indonesia forced an overnight delisting of all medications on Shopee.",
        "Teleconsultation flow allowed buyers to connect with third-party teleconsultation providers, establishing a compliant doctor-to-prescription-to-fulfilment flow within the platform.",
      ],
      back: {
        description: "Some of the key features shipped:",
        bullets: [
          "**Teleconsultation**: Buyers can consult a licensed doctor in-app and receive a digital prescription without leaving the platform.",
          "**Prescription matching**: Prescriptions are automatically matched to available SKUs on Shopee via the listing backend, ensuring only compliant and in-stock medications are surfaced.",
          "**Smart selection**: Available medications are ranked and displayed to the buyer based on proximity and price, surfacing the most relevant options first.",
          "**Seamless checkout**: Buyers can review their prescription alongside their selected medication within a single checkout session, with no disruption to the standard purchase flow.",
        ],
      },
      tagLabel: "Scopes Managed",
      tags: [
        "Pharma Microsite",
        "Search & Rec",
        "Seller Listing",
        "Checkout",
        "Fulfilment & Logistics",
      ],
    },
    {
      name: "Adjacent Market Expansion",
      front: ["A short summary shown on the front of the card."],
      back: {
        description:
          "A short description of what this project does and the impact it had.",
        bullets: [
          "Bullet point one about this project.",
          "Bullet point two about this project.",
        ],
      },
      tagLabel: "Scopes Managed",
      tags: ["Search & Recommendation", "Homepage", "Listing"],
    },
    {
      name: "Adjacent Market Expansion 2",
      front: ["A short summary shown on the front of the card."],
      back: {
        description:
          "A short description of what this project does and the impact it had.",
        bullets: [
          "Bullet point one about this project.",
          "Bullet point two about this project.",
        ],
      },
      tagLabel: "Scopes Managed",
      tags: ["Cart & Checkout", "Payments"],
    },
  ],
  personal: [
    {
      name: "SeepDeek for StrAIght Up! Hackathon",
      front: ["A short summary shown on the front of the card."],
      back: {
        description:
          "A short description of what this project does and the tech behind it.",
        bullets: [
          "Bullet point one about this project.",
          "Bullet point two about this project.",
        ],
      },
      href: "https://github.com",
      tagLabel: "Tech Stack",
      tags: ["Next.js", "PostgreSQL"],
    },
  ],
};

// ─── Hobbies ──────────────────────────────────────────────────────────────────

export type GameEntry = { title: string; cover?: string; platform?: string };
export type TravelEntry = { location: string; image?: string; caption: string };
export type KeyboardEntry = {
  name: string;
  image?: string;
  switches?: string;
  layout?: string;
};

export const hobbies: {
  gaming: GameEntry[];
  travel: TravelEntry[];
  keyboards: KeyboardEntry[];
} = {
  gaming: [
    { title: "Elden Ring", platform: "PS5" },
    { title: "Baldur's Gate 3", platform: "PC" },
    { title: "Hollow Knight", platform: "PC" },
    { title: "Dark Souls III", platform: "PC" },
    { title: "God of War", platform: "PS5" },
    { title: "Hades", platform: "PC" },
  ],
  travel: [
    { location: "Zermatt", image: "/hero/zermatt.jpg", caption: "july '24" },
    {
      location: "Grindelwald",
      image: "/hero/grindelwald.jpg",
      caption: "july '24",
    },
    {
      location: "Kandersteg",
      image: "/hero/kandersteg.jpg",
      caption: "july '24",
    },
  ],
  keyboards: [
    { name: "Drop CTRL", switches: "Gateron Yellow", layout: "TKL" },
    { name: "KBD75v3", switches: "Holy Pandas", layout: "75%" },
    { name: "Mode Envoy", switches: "Boba U4T", layout: "65%" },
  ],
};

// ─── Footer ───────────────────────────────────────────────────────────────────

export const footer = {
  taglines: [
    "Currently: open to new opportunities",
    "Currently: planning the next adventure",
    "Currently: lost in a dungeon somewhere",
    "Currently: theorising the perfect keyboard build",
  ],
  credit: "Vibe-coded with my bestie Claude ✦",
};

// ─── Contact ──────────────────────────────────────────────────────────────────

export const contact = {
  heading: "Let's connect.",
  copy: "Open to new roles, collaborations, or just a good conversation. Reach out on LinkedIn or drop your details below and I'll get back to you.",
  linkedinCta: "Connect on LinkedIn",
  dividerLabel: "or send me your details",
  toastMessage: "Message sent — I'll be in touch!",
};
