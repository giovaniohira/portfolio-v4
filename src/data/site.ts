export const site = {
  name: "Giovani Ohira",
  initials: "GO",
  role: "Engenheiro de Software | UI/UX",
  tagline: "Criando experiências digitais com propósito, performance e acessibilidade.",
  description:
    "Desenvolvo produtos pixel-perfect, acessíveis e escaláveis — do backend à interface — com foco em qualidade, segurança e impacto real no negócio.",
  location: "Curitiba, Brasil",
  email: "giovaniohira@gmail.com",
  available: true,
  social: {
    linkedin: "https://linkedin.com/in/giovaniohira",
    github: "https://github.com/giovaniohira",
    medium: "https://medium.com/@giovaniohira",
  },
} as const;

export const marqueeItems = [
  "Desenvolvimento",
  "UI/UX",
  "Mobile",
  "Testes",
  "Backend",
  "Frontend",
  "DevOps",
  "Automação",
] as const;

export const aboutText =
  "Sou Giovani Ohira, engenheiro de software com mais de dois anos de experiência em desenvolvimento full stack e testes automatizados. Trabalho com marcas e equipes para entregar produtos digitais de alta qualidade — seguros, rápidos e fáceis de manter. Hoje atuo como Engenheiro Pleno na Nexus Labz, liderando decisões de arquitetura, infraestrutura e mentoria técnica.";

export type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  year: string;
  categories: ("development" | "design")[];
  links: { github?: string; live?: string; npm?: string; article?: string };
  featured?: boolean;
};

export const projects: Project[] = [
  {
    id: "vault",
    title: "Vault",
    description:
      "Gerenciador de senhas e TOTP com criptografia AES-GCM no cliente. Segurança end-to-end com Next.js, Node e PostgreSQL.",
    image: "https://i.ibb.co/ZpgScTy4/image-2025-08-27-213005278.png",
    tags: ["Next.js", "TypeScript", "WebCrypto", "PostgreSQL"],
    year: "2025",
    categories: ["development", "design"],
    links: {
      github: "https://github.com/giovaniohira/vault",
      live: "https://vault-demo.vercel.app",
      article:
        "https://medium.com/@giovaniohira/how-i-built-an-end-to-end-encrypted-credentials-manager-and-authenticator-and-what-i-learned-about-74ffb89f0d01",
    },
    featured: true,
  },
  {
    id: "ohira-store",
    title: "Ohira Store",
    description:
      "E-commerce completo com checkout, pagamentos via Mercado Pago, autenticação Supabase e painel administrativo.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
    tags: ["Next.js", "Supabase", "Tailwind CSS", "Mercado Pago"],
    year: "2026",
    categories: ["development", "design"],
    links: { github: "https://github.com/giovaniohira/ohira-store" },
    featured: true,
  },
  {
    id: "maps-wrapper",
    title: "Google Maps Routes Wrapper",
    description:
      "Wrapper Node.js para a API de rotas do Google Maps com DX limpa, parsing consistente e publicado no npm.",
    image: "https://i.cdn.newsbytesapp.com/images/l39020231213160207.jpeg",
    tags: ["Node.js", "npm", "API", "Google Maps"],
    year: "2025",
    categories: ["development"],
    links: {
      github: "https://github.com/giovaniohira/google-maps-routes-api-wrapper",
      npm: "https://www.npmjs.com/package/google-maps-routes-api-wrapper",
    },
    featured: true,
  },
  {
    id: "sudokuarena",
    title: "Sudoku Arena",
    description:
      "Jogo de Sudoku online com interface minimalista, feedback visual imediato e experiência mobile-first.",
    image: "https://images.unsplash.com/photo-1611996575749-79a61a54e633?w=800&q=80",
    tags: ["Next.js", "React", "TypeScript", "Game UI"],
    year: "2026",
    categories: ["development", "design"],
    links: { github: "https://github.com/giovaniohira/sudokuarena" },
    featured: true,
  },
  {
    id: "event-api",
    title: "Event Management API",
    description:
      "API REST para CRUD de eventos com Express, Prisma e PostgreSQL — validação, erros centralizados e arquitetura em camadas.",
    image: "https://blog.accurate.com.br/wp-content/uploads/2023/10/apiwebservicewebstoryslide2-1920x1080-1.jpg",
    tags: ["Node.js", "Express", "Prisma", "PostgreSQL"],
    year: "2024",
    categories: ["development"],
    links: { github: "https://github.com/giovaniohira/event-management-api" },
  },
  {
    id: "dsa-coach",
    title: "DSA Coach",
    description:
      "App desktop Electron para preparação em entrevistas técnicas — editor Monaco, sync LeetCode e coach pessoal.",
    image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&q=80",
    tags: ["Electron", "React", "SQLite", "Monaco Editor"],
    year: "2026",
    categories: ["development", "design"],
    links: { github: "https://github.com/giovaniohira/dsa-coach" },
  },
];

export const expertiseAreas = [
  {
    id: "development",
    label: "Desenvolvimento",
    skills: [
      "TypeScript",
      "JavaScript",
      "React",
      "Next.js",
      "Node.js",
      "Express",
      "React Native",
      "PostgreSQL",
      "Prisma",
      "Playwright",
      "AWS",
      "Docker",
      "Git",
      "CI/CD",
    ],
  },
  {
    id: "design",
    label: "UI/UX Design",
    skills: [
      "Figma",
      "Design Systems",
      "Prototipagem",
      "Wireframes",
      "Tailwind CSS",
      "Framer Motion",
      "Acessibilidade",
      "Mobile First",
      "Microinterações",
      "Tipografia",
      "Hierarquia Visual",
      "Design Tokens",
    ],
  },
  {
    id: "quality",
    label: "Qualidade & Testes",
    skills: [
      "Playwright",
      "Jest",
      "E2E Testing",
      "Test Automation",
      "SDET",
      "CI/CD",
      "Self-healing Tests",
      "MCP",
      "Requirements Analysis",
      "Smoke Tests",
      "Regression",
      "Quality Engineering",
    ],
  },
] as const;

export type Experience = {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  url?: string;
};

export const experiences: Experience[] = [
  {
    id: "nexus",
    company: "Nexus Labz",
    role: "Engenheiro de Software Pleno",
    period: "Fev 2026 — Atual",
    location: "Brasil · Remoto",
    summary:
      "Arquitetura e entrega de apps mobile e web em produção. Infraestrutura VPS, CI/CD, mentoria técnica e integração de pagamentos.",
    url: "https://nexuslabz.co",
  },
  {
    id: "voidr",
    company: "Voidr",
    role: "SDET Júnior",
    period: "Out 2025 — Fev 2026",
    location: "Paraná · Remoto",
    summary:
      "Reduzi tempo de regressão de 6h para 12min (97%). Automação E2E com Playwright, TypeScript e pipelines de CI/CD.",
    url: "https://www.voidr.co/en",
  },
  {
    id: "utfpr",
    company: "UTFPR",
    role: "Desenvolvedor Full Stack",
    period: "Fev 2025 — Ago 2025",
    location: "Cornélio Procópio",
    summary:
      "Plataforma de workshops com 300+ usuários semanais. API REST, check-in em tempo real e certificados automáticos.",
  },
];

export const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "Sobre" },
  { href: "#projects", label: "Projetos" },
  { href: "#expertise", label: "Expertise" },
  { href: "#experience", label: "Experiência" },
  { href: "#contact", label: "Contato" },
] as const;
