export const site = {
  name: "Giovani Ohira",
  initials: "GO",
  role: "Software Engineer | UI/UX",
  tagline: "Building digital experiences with purpose, performance, and accessibility.",
  heroHeadline: {
    before: "Building ",
    accent: "digital experiences with purpose",
    after: ", performance, and accessibility.",
  } as const,
  description:
    "I build end-to-end digital products, from API to interface, combining backend, frontend, and automated testing with care for user experience.",
  location: "Curitiba, Brazil",
  email: "giovaniohira@gmail.com",
  available: true,
  social: {
    linkedin: "https://linkedin.com/in/giovaniohira",
    github: "https://github.com/giovaniohira",
    medium: "https://medium.com/@giovaniohira",
  },
} as const;

export const marqueeItems = [
  "Development",
  "UI/UX",
  "Mobile",
  "Testing",
  "Backend",
  "Frontend",
  "DevOps",
  "Automation",
] as const;

export const aboutText =
  "I'm Giovani Ohira, a mid-level full stack engineer with 2+ years of experience, focused on performant, well-architected products.";

export const aboutPage = {
  headline: {
    before: "A ",
    accent: "full stack engineer",
    after: " & digital designer",
  },
  description:
    "I build end-to-end digital products — from API to interface — combining solid engineering, automated testing, and UX care. I work with brands and teams that value quality, performance, and consistent delivery.",
  resumeUrl: "/giovani-ohira-software-engineer-2026.pdf",
} as const;

export const aboutSkills = [
  { name: "TypeScript", icon: "/skills/TypeScript.svg" },
  { name: "JavaScript", icon: "/skills/JavaScript.svg" },
  { name: "React", icon: "/skills/React.svg" },
  { name: "Next.js", icon: "/skills/Next.js.svg" },
  { name: "Node.js", icon: "/skills/Node.js.svg" },
  { name: "Express", icon: "/skills/Express.svg" },
  { name: "PostgreSQL", icon: "/skills/PostgreSQL.svg" },
  { name: "Prisma", icon: "/skills/Prisma.svg" },
  { name: "React Native", icon: "/skills/React-Native.svg" },
  { name: "Playwright", icon: "/skills/Playwright.svg" },
  { name: "AWS", icon: "/skills/AWS.svg" },
  { name: "Docker", icon: "/skills/Docker.svg" },
  { name: "Tailwind CSS", icon: "/skills/Tailwind-CSS.svg" },
  { name: "Framer Motion", icon: "/skills/Framer-Motion.svg" },
  { name: "Figma", icon: "/skills/Figma.svg" },
  { name: "Git", icon: "/skills/Git.svg" },
] as const;

export type Project = {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  /** Extra shots shown in the article body (cover stays `image`). */
  screenshots?: string[];
  tags: string[];
  year: string;
  categories: ("backend" | "frontend" | "fullstack")[];
  links: { github?: string; live?: string; npm?: string; article?: string };
  featured?: boolean;
  role?: string;
  features?: string[];
  technologies?: { name: string; description?: string; url?: string }[];
  buildSteps?: { title: string; code?: string }[];
};

export const pageNavLinks = [
  { href: "/", label: "Home", id: "home" },
  { href: "/about", label: "About", id: "about" },
  { href: "/projects", label: "Projects", id: "projects" },
  { href: "/contact", label: "Contact", id: "contact" },
] as const;

export const sectionNavLinks = [
  { label: "Home", sectionId: "home" },
  { label: "About", sectionId: "about" },
  { label: "Projects", sectionId: "projects" },
  { label: "Contact", sectionId: "contact" },
] as const;

export const contactFaqs = [
  {
    question: "What is your current role?",
    answer:
      "I'm a mid-level full stack engineer at Just Travel, on the new business team, building MVPs end-to-end — from backend and API to interface and delivery.",
  },
  {
    question: "What kind of projects do you take on?",
    answer:
      "Product builds, MVPs, e-commerce, internal tools, and quality engineering. I prefer projects where I can own features from API to interface.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "It depends on scope. A focused landing page or feature can ship in 1–2 weeks; a full product MVP usually takes 4–8 weeks with clear requirements.",
  },
  {
    question: "Are you available for full-time or contract work?",
    answer:
      "Yes. I'm open to full-time roles and selective contract work. Reach out with the role or project details and I'll reply within 24 hours.",
  },
] as const;

export const formspreeEndpoint = "https://formspree.io/f/mvgqqkzw";

export function getProjectById(id: string) {
  return projects.find((project) => project.id === id);
}

export const projects: Project[] = [
  {
    id: "vault",
    title: "Vault",
    description:
      "Password and TOTP manager with client-side AES-GCM encryption. End-to-end security with Next.js, Node, and PostgreSQL.",
    image: "/projects/vault-cover-v2.png",
    tags: ["Next.js", "TypeScript", "WebCrypto", "PostgreSQL"],
    year: "2025",
    categories: ["fullstack"],
    links: {
      github: "https://github.com/giovaniohira/vault",
      live: "https://vault-demo.vercel.app",
      article:
        "https://medium.com/@giovaniohira/how-i-built-an-end-to-end-encrypted-credentials-manager-and-authenticator-and-what-i-learned-about-74ffb89f0d01",
    },
    featured: true,
    role: "Full-stack Developer",
    longDescription:
      "End-to-end encrypted password and TOTP manager. Credentials never leave the browser unencrypted — AES-GCM in WebCrypto, with a clean Next.js interface and Node/PostgreSQL backend.",
    features: [
      "Client-side AES-GCM encryption before data reaches the server.",
      "TOTP authenticator with QR import and copy-to-clipboard.",
      "Organized vault with search, categories, and secure session handling.",
      "Next.js frontend with responsive UI and dark mode.",
      "REST API with PostgreSQL and structured auth flows.",
    ],
    technologies: [
      {
        name: "Next.js",
        description: "App Router frontend and API routes.",
        url: "https://nextjs.org/",
      },
      {
        name: "TypeScript",
        description: "End-to-end type safety.",
        url: "https://www.typescriptlang.org/",
      },
      {
        name: "WebCrypto API",
        description: "Browser-native AES-GCM encryption.",
        url: "https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API",
      },
      {
        name: "Node.js",
        description: "Backend services and auth.",
        url: "https://nodejs.org/",
      },
      {
        name: "PostgreSQL",
        description: "Persistent encrypted credential storage.",
        url: "https://www.postgresql.org/",
      },
    ],
    buildSteps: [
      {
        title: "Clone the repository",
        code: "git clone https://github.com/giovaniohira/vault && cd vault",
      },
      {
        title: "Install dependencies",
        code: "npm install",
      },
      {
        title: "Run the development server",
        code: "npm run dev",
      },
    ],
  },
  {
    id: "maps-wrapper",
    title: "Google Maps Routes Wrapper",
    description:
      "Node.js wrapper for the Google Maps Routes API with clean DX, consistent parsing, published on npm.",
    image: "/projects/maps-wrapper-cover.png",
    tags: ["Node.js", "npm", "API", "Google Maps"],
    year: "2025",
    categories: ["backend"],
    links: {
      github: "https://github.com/giovaniohira/google-maps-routes-api-wrapper",
      npm: "https://www.npmjs.com/package/google-maps-routes-api-wrapper",
    },
    featured: true,
  },
  {
    id: "algo-client",
    title: "Algo Client",
    description:
      "Desktop LeetCode client — fast, focused, offline-friendly browsing with Monaco editor and Electron.",
    image: "/projects/algo-client-cover-v2.png",
    tags: ["Electron", "React", "Monaco Editor", "LeetCode"],
    year: "2026",
    categories: ["fullstack"],
    links: { github: "https://github.com/giovaniohira/algo-client" },
  },
];

export type Experience = {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  highlights?: string[];
  logo?: string;
  url?: string;
};

export const experiences: Experience[] = [
  {
    id: "justtravel",
    company: "Just Travel",
    role: "Mid-Level Software Engineer",
    period: "Aug 2026 — Present",
    location: "Brazil · Remote",
    logo: "/companies/justtravel.png",
    summary:
      "Mid-level engineer on the new business team, building a large-scale tourism payments MVP for municipal public bidding.",
    highlights: [
      "Shipped a large MVP in 3 weeks with a 3-developer team to compete in a municipal public bid.",
      "Built multi-role views for tourists, service providers, operators, and city governments.",
      "Own user stories end-to-end, from backend and API to interface and delivery.",
    ],
    url: "https://justtraveltour.com",
  },
  {
    id: "nexus",
    company: "Nexus Labz",
    role: "Mid-Level Software Engineer",
    period: "Feb 2026 — Aug 2026",
    location: "Brazil · Remote",
    logo: "/companies/nexus.png",
    summary:
      "Mid-level engineer responsible for architecture and infrastructure decisions, web and mobile project delivery for clients, and mentoring junior developers.",
    highlights: [
      "Define architecture and infrastructure (VPS, CI/CD) for web and mobile apps in production.",
      "Deliver end-to-end features for clients, from backend to deploy.",
      "Mentor junior developers and support integrations such as payments and authentication.",
    ],
    url: "https://nexuslabz.co",
  },
  {
    id: "voidr",
    company: "Voidr",
    role: "Junior SDET",
    period: "Oct 2025 — Feb 2026",
    location: "Paraná · Remote",
    logo: "/companies/voidr.png",
    summary:
      "E2E automation for client platforms with Playwright and TypeScript, reducing regression from 6h to 12min.",
    highlights: [
      "Reduced regression time from 6h to 12min (~97%) with stable Playwright suites.",
      "Modeled real user flows in E2E tests with TypeScript and MCP integration.",
      "Implemented CI/CD pipelines with self-healing capabilities for more reliable releases.",
    ],
    url: "https://www.voidr.co/en",
  },
  {
    id: "utfpr",
    company: "UTFPR",
    role: "Full Stack Developer",
    period: "Feb 2025 — Aug 2025",
    location: "Cornélio Procópio",
    logo: "/companies/utfpr.png",
    summary:
      "University workshop platform with 300+ weekly users, REST API, and automatic certificates.",
    highlights: [
      "Built workshop platform with 300+ active weekly users.",
      "Built REST API with real-time check-in and automatic certificate issuance.",
      "Delivered responsive interface and optimized registration flows for event use.",
    ],
  },
];

export const navLinks = pageNavLinks;
