export const site = {
  name: "Giovani Ohira",
  initials: "GO",
  role: "Software Engineer",
  tagline: "Full stack engineer based in Curitiba, Brazil, specializing in backend development and system architecture.",
  heroHeadline: {
    before: "I build ",
    accent: "web apps",
    after: " from the database to the button you click.",
  } as const,
  description:
    "I work across backend and frontend, building APIs and React interfaces backed by automated tests. I use AI to speed up development, and every change is reviewed before it reaches production.",
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
  "I'm Giovani, a full stack engineer with over two years of professional experience, focused on building software that performs well and is easy to maintain.";

export const aboutPage = {
  headline: {
    before: "",
    accent: "Full stack engineer",
    after: " focused on backend and system architecture.",
  },
  description:
    "I work on both backend and frontend for products with short delivery cycles, using automated tests to keep them reliable after launch. I am currently developing MVPs for the new business team at Just Travel.",
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

export const contactFaqs = [
  {
    question: "What is your current role?",
    answer:
      "I am a mid-level full stack engineer at Just Travel, on the new business team, where we develop MVPs on short timelines.",
  },
  {
    question: "What types of projects do you work on?",
    answer:
      "Primarily product development: MVPs, e-commerce platforms, internal tools, and test automation.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "It depends on the scope. A landing page or a single feature typically takes one to two weeks. A complete MVP usually takes four to eight weeks, provided the requirements are well defined.",
  },
  {
    question: "Are you available for full-time or contract work?",
    answer:
      "Yes. I am open to full-time positions and selected contract projects. Please send the details and I will respond within 24 hours.",
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
      "Password manager and TOTP authenticator with client-side encryption. All data is encrypted in the browser before reaching the server. Built with Next.js, Node.js, and PostgreSQL.",
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
      "A password manager and authenticator in which the server never has access to data in plain text. Encryption is performed in the browser using WebCrypto (AES-GCM), and the backend runs on Node.js with PostgreSQL.",
    features: [
      "Data is encrypted with AES-GCM in the browser before transmission.",
      "TOTP code generation with QR code import and one-click copy.",
      "Search and categories for organization, along with secure session handling.",
      "Responsive Next.js frontend with dark mode.",
      "REST API backed by PostgreSQL for authentication and storage.",
    ],
    technologies: [
      {
        name: "Next.js",
        description: "App Router frontend and API routes.",
        url: "https://nextjs.org/",
      },
      {
        name: "TypeScript",
        description: "Types shared across frontend and backend.",
        url: "https://www.typescriptlang.org/",
      },
      {
        name: "WebCrypto API",
        description: "Native browser AES-GCM encryption.",
        url: "https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API",
      },
      {
        name: "Node.js",
        description: "Backend services and authentication.",
        url: "https://nodejs.org/",
      },
      {
        name: "PostgreSQL",
        description: "Storage for encrypted credentials.",
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
      "Node.js wrapper for the Google Maps Routes API that standardizes responses and simplifies integration. Published on npm.",
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
      "Desktop LeetCode client built with Electron and the Monaco editor, offering a faster, more focused alternative to the website with offline access to problems.",
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
      "Member of the new business team, developing a tourism payments MVP for a municipal public bid.",
    highlights: [
      "Delivered a large-scale MVP in three weeks with a team of three developers to compete in a municipal public bid.",
      "Developed dedicated views for tourists, service providers, operators, and city governments.",
      "Contributed across the backend, API, and interface to meet the delivery deadline.",
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
      "Responsible for architecture and infrastructure decisions, delivery of web and mobile projects for clients, and mentoring of junior developers.",
    highlights: [
      "Defined the architecture and infrastructure (VPS, CI/CD) for web and mobile applications in production.",
      "Delivered client features end to end, from backend to deployment.",
      "Mentored junior developers and supported integrations such as payments and authentication.",
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
      "Developed end-to-end test automation for client platforms using Playwright and TypeScript, reducing regression time from 6 hours to 12 minutes.",
    highlights: [
      "Reduced regression time from 6h to 12min (approximately 97%) with stable Playwright test suites.",
      "Designed E2E tests based on real user flows, using TypeScript and an MCP integration.",
      "Implemented CI/CD pipelines with self-healing tests, improving release reliability.",
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
      "University workshop platform serving over 300 users per week, with a REST API and automated certificate issuance.",
    highlights: [
      "Developed the workshop platform, used by more than 300 active users each week.",
      "Built the REST API, including real-time check-in and automated certificate issuance.",
      "Implemented a responsive interface and streamlined registration to handle peak traffic during events.",
    ],
  },
];

export const navLinks = pageNavLinks;
