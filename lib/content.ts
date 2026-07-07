// Central content for the portfolio. Edit copy here; components stay presentational.

export type NavItem = { id: string; label: string };

export const NAV_ITEMS: NavItem[] = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

export const HERO = {
  name: "Rizvialdi Ihsan",
  role: "Frontend Developer",
  tagline:
    "Building high-performance web & mobile experiences with the React ecosystem.",
  // Replace with your real CV file dropped into /public.
  cvHref: "/rizvialdi-ihsan-cv.pdf",
};

export const BIO =
  "Result-oriented Frontend Developer with 8 years of professional experience building and scaling high-performance web and mobile applications. Specialized in the React ecosystem (React.js, Next.js, React Native), with growing backend proficiency in Node.js and SQL. Proven track record developing custom CMS platforms, integrating complex analytics tooling, and delivering user-centric digital solutions at scale.";

export type Stat = {
  value: number;
  suffix: string;
  label: string;
};

export const STATS: Stat[] = [
  { value: 8, suffix: "+", label: "Years experience" },
  { value: 47, suffix: "+", label: "APIs standardized" },
  { value: 410, suffix: "+", label: "Test files maintained" },
  { value: 220, suffix: "+", label: "Typed modules shipped" },
];

export type Job = {
  role: string;
  company: string;
  period: string;
  current?: boolean;
  points: string[];
};

export const EXPERIENCE: Job[] = [
  {
    role: "Frontend Developer",
    company: "Populix",
    period: "Oct 2021 – Jul 2026",
    current: true,
    points: [
      "Architected a unified multi-backend data layer using Redux Toolkit Query over a custom axiosBaseQuery, routing requests across 6 microservices with shared auth-token interceptors, standardizing caching and error handling across 47+ API services.",
      "Spearheaded a zero-runtime CSS and design-system migration from Material-UI v4 JSS to vanilla-extract and an in-house component library, delivering 220+ typed modules across a 1,700+ module codebase.",
      "Engineered a reusable debounced auto-save hook for a SurveyJS-based survey builder, combining optimistic Redux dispatch with debounced backend persistence to prevent data loss.",
      "Scaled a Jest + React Testing Library suite to 410 test files with MSW API mocking, and integrated Lingui compile-time i18n via an SWC plugin for dual-market localization.",
      "Built and deployed cross-platform mobile applications using React Native, integrating Firebase Remote Config for feature flagging and PostHog for user behavior analytics.",
    ],
  },
  {
    role: "Frontend Developer",
    company: "PT Nyala Inovasi Properti",
    period: "Jun 2021 – Aug 2021",
    points: [
      "Architected and implemented external CMS platforms using React.js and Next.js for enhanced content management.",
      "Developed secure internal CMS dashboards using React.js on the frontend and Node.js for backend services.",
    ],
  },
  {
    role: "Frontend Developer",
    company: "Maximize IT",
    period: "Nov 2019 – Jun 2021",
    points: [
      "Designed and built user-friendly Content Management Systems (CMS) using React.js to streamline internal workflows.",
    ],
  },
  {
    role: "UI/UX Designer",
    company: "Tekno Media Network",
    period: "2018 – 2019",
    points: [
      "Designed UI/UX for mobile apps and CMS platforms, and collaborated with engineering to translate designs into clean, semantic HTML/CSS.",
    ],
  },
];

// Icon keys map to react-icons in components/Skills.tsx.
export type Skill = { name: string; icon: string };
export type SkillGroup = { title: string; note: string; skills: Skill[] };

export const SKILL_GROUPS: SkillGroup[] = [
  {
    title: "Frontend",
    note: "core.stack",
    skills: [
      { name: "React.js", icon: "react" },
      { name: "Next.js", icon: "next" },
      { name: "TypeScript", icon: "ts" },
      { name: "HTML5", icon: "html" },
      { name: "CSS3", icon: "css" },
    ],
  },
  {
    title: "Backend",
    note: "growing.proficiency",
    skills: [
      { name: "Node.js", icon: "node" },
      { name: "RESTful API", icon: "rest" },
      { name: "PostgreSQL", icon: "postgres" },
      { name: "MySQL", icon: "mysql" },
    ],
  },
  {
    title: "Mobile & Tools",
    note: "ship.and.measure",
    skills: [
      { name: "React Native", icon: "reactnative" },
      { name: "PostHog", icon: "posthog" },
      { name: "Firebase", icon: "firebase" },
      { name: "SurveyJS", icon: "surveyjs" },
      { name: "Jest", icon: "jest" },
      { name: "MSW", icon: "msw" },
    ],
  },
];

export type Education = {
  institution: string;
  field: string;
  year: string;
};

// Placeholder — replace with real education details.
export const EDUCATION: Education[] = [
  {
    institution: "Universitas Islam Negeri Syarif Hidayatullah Jakarta",
    field: "Ilmu Ekonomi Studi Pembangunan",
    year: "2017",
  },
];

// NOTE: personal contact details intentionally left as placeholders.
// Replace the values below with the real email / phone before deploying.
export const CONTACT = {
  email: "rizvialdiihsan@gmail.com",
  phone: "+62 878-7195-0789",
  location: "Tangerang Selatan, Indonesia",
  socials: [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/rizvialdi-ihsan",
      icon: "linkedin",
    },
    { label: "GitHub", href: "https://github.com/acuyaldi", icon: "github" },
  ],
};
