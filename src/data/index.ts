// ─── Personal info ────────────────────────────────────────────────────────────

export const personal = {
  name: "Dylan",
  loading: "Hello",
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
    period: "Jan 2024 – May 2024",
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
};

export const projects: Record<ProjectCategory, Project[]> = {
  work: [
    {
      name: "Teleconsultation",
      image: "/projects/tele.jpg",
      front: [
        "Regulatory non-compliance in Indonesia forced an overnight delisting of all medications on Shopee.",
        "Teleconsultation flow allowed buyers to connect with third-party teleconsultation providers, establishing a compliant doctor-to-prescription-to-fulfilment flow within the platform.",
      ],
      back: {
        description: "Key features shipped:",
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
        "Item Card",
        "Checkout",
        "Order Success",
        "Fulfilment & Logistics",
      ],
    },
    {
      name: "Adjacent Market Expansion",
      image: "/projects/adj.jpg",
      front: [
        "Four new SEA markets (Cambodia, Laos, Myanmar & Brunei), with each their own platform, required us to build localized buyer experiences from the ground up. Each market with its own regulatory, logistics, and payment requirements.",
      ],
      back: {
        description: "Key features shipped:",
        bullets: [
          "**Special Brunei address flow**: Brunei shares Shopee's Malaysia app, requiring a specialized address flow layered on top of the existing Malaysia add/edit address experience. Supported Brunei-specific address formats and postal requirements without disrupting Malaysian users",
          "**Localized cart/checkout**: Each market required a fully customised cart/checkout configuration, covering applicable local taxes, coin rules, and logistic/payment pre-selection options based on availability",
          "**Logistics routing**: Coordinated with logistics partners to define fulfilment plans and carrier options specific to each market, accounting for cross-border and last-mile constraints",
          "**Feature localization**: Configured market-specific features (such as promotions and upsell) based on region requirements and availability, ensuring buyers in each country only saw relevant features at checkout",
        ],
      },
      tagLabel: "Scopes Managed",
      tags: ["Buyer Address", "Cart", "Checkout", "Order Success"],
    },
    {
      name: "New Buyer Initiatives",
      image: "/projects/new.jpg",
      front: [
        "Acquiring new buyers is expensive, and losing them to friction before they complete their first purchase is worse.",
        "Initiatives aim to tackle two key drop-off points in the new buyer funnel, improving guest (non-logged in) cart and no-address checkout.",
      ],
      back: {
        description: "Key features shipped:",
        bullets: [
          "**Guest cart**: Enabled guest cart flow for buyers arriving via livestream, video, and external ad traffic (accessible across app, mobile browser, and PC browser) ensuring paid traffic from Google and Meta campaigns could convert without requiring login upfront",
          "**No-Address checkout**: Buyers can now enter checkout without a saved address. The platform applies a default address based on the user's app region to power logistics and payment preselection, as well as voucher and promotion eligibility, so checkout experience remains fully functional from the start",
          "**Integrated address flow**: When a buyer adds or updates their address within the checkout session, all logistics options, payment methods, vouchers, and promotions are dynamically recalculated in real time to reflect the confirmed delivery location",
        ],
      },
      tagLabel: "Scopes Managed",
      tags: ["Buyer Address", "Cart", "Checkout"],
    },
    {
      name: "Buy One More & Smart Voucher Cancel Checkout Popup",
      image: "/projects/bom.jpg",
      front: [
        "Two separate but complementary features aimed at reducing checkout abandonment and increasing order value.",
        "Both Buy One More and Cancel Checkout Popup required careful implementation to handle the nuances of each market.",
      ],
      back: {
        description: "Key features shipped:",
        bullets: [
          "**Buy One More UI optimization**: Revamped promotion display layout based on A/B testing results, improving visibility and engagement with add-on recommendations at checkout",
          "**Regional fee filtering**: For markets like Indonesia where items may carry additional transaction or miscellaneous shipping fees, implemented special filtering logic to exclude these items from Buy One More recommendations",
          "**Smart voucher cancel popup**: Introduced a popup triggered when a buyer attempts to back out of checkout, surfacing relevant vouchers to incentivise them to complete the purchase",
          "**Trigger rules**: Popup behaviour is governed by per-region rules covering display frequency limits and cooldown periods, preventing over-exposure and ensuring the nudge feels timely rather than spammy",
        ],
      },
      tagLabel: "Scopes Managed",
      tags: ["Cart", "Checkout", "Marketplace Data", "Voucher Promotion"],
    },
    {
      name: "Pix Final Price",
      image: "/projects/pix.jpg",
      front: [
        "Shopee's partnership with Pix in Brazil introduced a market-specific payment discount that needed to be surfaced clearly and consistently across cart and checkout.",
      ],
      back: {
        description: "Key features shipped:",
        bullets: [
          "**Pix final price display**: Integrated Pix discount into the final price display component alongside existing promotions, requiring careful decisions on tax base handling to ensure the discounted price is calculated and shown correctly",
          "**Payment method toggle**: Since buyers can switch between payment methods at checkout, implemented logic to handle the non-Pix selected state, by surfacing the more favourable Pix price as a nudge to encourage buyers to switch, without misrepresenting the actual payable amount",
          "**Cart Pix pricing**: Applied the same Pix price display logic on the cart page for eligible items, giving buyers visibility of the potential discount earlier in the funnel",
        ],
      },
      tagLabel: "Scopes Managed",
      tags: ["Cart", "Checkout", "Discount Promotion"],
    },
    {
      name: "Order Success Page Revamp",
      image: "/projects/osp.jpg",
      front: [
        "The order success page was the most consistently seen pages on the platform, yet it hadn't been meaningfully updated.",
        "The revamp turned a barebones confirmation screen into a useful post-purchase touchpoint, surfacing order information, VIP awareness, and keeping buyers engaged post-checkout.",
      ],
      back: {
        description: "Key features shipped:",
        bullets: [
          "**Order summary**: Surfaced key order details directly on the confirmation page (including item images, estimated delivery date, and total price paid) giving buyers immediate confidence in their order",
          "**VIP savings**: For existing Shopee VIP members, a personalized banner highlights the savings earned on their current order, reinforcing the value of their subscription at a moment of high satisfaction",
          "**VIP acquisition**: For non-VIP buyers, the page surfaces a contextual prompt showing the Shopee VIP subscription price, catching them at a high-intent moment right after a completed purchase",
          "**Games improvements**: Improved the post-purchase games experience to dispatch smart vouchers on completion to drive repeat purchase",
        ],
      },
      tagLabel: "Scopes Managed",
      tags: ["Checkout", "Order Success", "Shopee VIP", "Games"],
    },
  ],
  personal: [
    {
      name: "SeepDeek for StrAIght Up! Hackathon (First Place)",
      image: "/projects/seepdeek.jpg",
      front: [
        "Noise in high-impact engineering environments was the problem statement.",
        "SeepDeek is an AI-powered platform that aggregates communication channels and acts on them, not just reads them.",
      ],
      back: {
        description: "Key features shipped:",
        bullets: [
          "**Unified communication hub**: Aggregated Slack messages, Gmail threads, and Linear tickets into a single interface, giving engineers one place to triage instead of context-switching across tools",
          "**Event-driven resolver** : Actions taken across the three platforms generate raw events that are passed as input to an LLM resolver, which interprets context and determines the appropriate response",
          "**Agentic action**: The resolver is equipped with a set of tools, such as closing Linear tickets, drafting replies, or flagging messages, allowing it to take autonomous actions based on message content and user intent",
          "**Noise reduction by design**: Rather than adding another dashboard to monitor, SeepDeek reduces the cognitive load on engineers by resolving low-complexity actions automatically, surfacing only what genuinely needs human attention",
        ],
      },
      href: "https://github.com",
      tagLabel: "Tech Stack",
      tags: ["Next.js", "Python"],
    },
    {
      name: "Slack RAG Chatbot (Final Year Project)",
      image: "/projects/fyp.jpg",
      front: [
        "A 6-month final year project building an AI chatbot for IMDA Singapore's internal staff to query and navigate tech industry news.",
        "The chatbot was subsequently picked up and further developed by IMDA's internal engineering team after handoff.",
      ],
      back: {
        description: "Key features shipped:",
        bullets: [
          "**Slack-native interface**: Deployed the chatbot directly within Slack, meeting internal staff where they already worked rather than introducing a new tool to adopt",
          "**Automated news ingestion**: Built web scraping pipelines and API integrations to continuously pull and categorise tech industry news by topic, keeping the chatbot's knowledge base current without manual input",
          "**Hybrid retrieval engine**: Implemented a Neo4j graph database combined with a vector store for context-aware query responses. The graph layer captured topic relationships that pure vector similarity retrieval would have missed",
          "**RAGAS evaluation**: Benchmarked the chatbot against RAGAS metrics throughout development, achieving a score of 0.8+. A strong result for a RAG implementation at the time",
        ],
      },
      href: "https://github.com",
      tagLabel: "Tech Stack",
      tags: ["JS", "Python"],
    },
  ],
};

// ─── Hobbies ──────────────────────────────────────────────────────────────────

export type GameEntry = { title: string; cover?: string };
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
    { title: "Dota 2", cover: "/gaming/dota2.jpg" },
    { title: "Pokemon", cover: "/gaming/pokemon.jpg" },
    { title: "Teamfight Tactics", cover: "/gaming/tft.jpg" },
    { title: "Final Fantasy", cover: "/gaming/ff7.png" },
    { title: "HSR", cover: "/gaming/hsr.png" },
    { title: "God of War", cover: "/gaming/gow.jpg" },
    { title: "Persona", cover: "/gaming/persona.jpg" },
    { title: "Spiderman", cover: "/gaming/spiderman.jpg" },
    { title: "Elden Ring", cover: "/gaming/eldenring.jpg" },
  ],
  travel: [
    {
      location: "Hokkaido",
      image: "/travel/hokkaido.jpg",
      caption: "jun '26",
    },
    {
      location: "Paris",
      image: "/travel/paris.jpg",
      caption: "apr '26",
    },
    {
      location: "Iceland",
      image: "/travel/iceland.jpg",
      caption: "mar '26",
    },
    {
      location: "London",
      image: "/travel/london.jpg",
      caption: "mar '26",
    },
    {
      location: "Tokyo",
      image: "/travel/tokyo.jpg",
      caption: "oct '25",
    },
    {
      location: "Milan",
      image: "/travel/milan.jpg",
      caption: "jul '25",
    },
    {
      location: "Switzerland",
      image: "/travel/swiss.jpg",
      caption: "jul '25",
    },
    {
      location: "Busan",
      image: "/travel/busan.jpg",
      caption: "jun '25",
    },
    {
      location: "Sydney",
      image: "/travel/sydney.jpg",
      caption: "may '25",
    },
  ],
  keyboards: [
    {
      name: "Glacier80",
      switches: "JWK Quartz",
      layout: "TKL",
      image: "/keyboards/glacier.jpg",
    },
    {
      name: "Frog by Geonworks",
      switches: "Cherry-Topped Meteor White",
      layout: "TKL",
      image: "/keyboards/frog.jpg",
    },
    {
      name: "Mode Sonnet",
      switches: "Bolsa Zaku",
      layout: "75%",
      image: "/keyboards/sonnet.jpg",
    },
    {
      name: "QwertyKeys65",
      switches: "Gateron Oil King",
      layout: "65%",
      image: "/keyboards/qk65.webp",
    },
    {
      name: "Rainy75",
      switches: "HMX Violet",
      layout: "65%",
      image: "/keyboards/rainy.jpg",
    },
  ],
};

// ─── Footer ───────────────────────────────────────────────────────────────────

export const footer = {
  credit: "Vibe-coded with my bestie Claude ✦",
};

// ─── Contact ──────────────────────────────────────────────────────────────────

export const contact = {
  heading: "Let's connect.",
  copy: [
    "Open to new roles, collaborations, or just a good conversation.",
    "The fastest way to reach me is on LinkedIn — I'll get back to you.",
  ],
  linkedinCta: "Connect on LinkedIn",
};
