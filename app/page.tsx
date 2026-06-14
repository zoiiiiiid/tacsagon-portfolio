"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Building2,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronRight,
  Code2,
  Download,
  GraduationCap,
  Home as HomeIcon,
  Image as ImageIcon,
  Languages,
  Laptop,
  Mail,
  MapPin,
  Menu,
  Palette,
  PenTool,
  Phone,
  ShieldCheck,
  Sparkles,
  Target,
  UserRound,
  X,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type IconType = React.ComponentType<{ className?: string }>;
type WorkTypeId = "graphic" | "realestate" | "developer";

const CV_HREF = "/lance-jiro-tacsagon-cv.pdf";

const fadeIn = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
    },
  },
};

const navItems = [
  { label: "Portfolio View", href: "#portfolio-view" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];

const workTypes: Array<{
  id: WorkTypeId;
  label: string;
  shortLabel: string;
  icon: IconType;
  eyebrow: string;
  headline: string;
  description: string;
  focus: string[];
  reviewOrder: string[];
  stats: [string, string][];
  tone: string;
  bestFor: string;
  accent: string;
  accentSoft: string;
  activeText: string;
  surface: string;
  darkSurface: string;
}> = [
  {
    id: "graphic",
    label: "Graphic Design",
    shortLabel: "Design",
    icon: Palette,
    eyebrow: "Visual identity, layouts, and campaign materials",
    headline: "Creative work built for readable, client-ready visual communication.",
    description:
      "A focused view of posters, social media graphics, marketing materials, branding assets, and freelance design experience from 2018 to present.",
    focus: ["Poster design", "Social media graphics", "Marketing materials", "Branding assets"],
    reviewOrder: ["Featured graphics", "Freelance design background", "Design and editing background"],
    stats: [
      ["8+ years", "freelance design practice"],
      ["100+", "pubmats created"],
      ["Print + digital", "visual output range"],
    ],
    tone: "Visual, campaign-ready, detail-oriented",
    bestFor: "Creative teams, content roles, brand work, and freelance design clients",
    accent: "bg-violet-600",
    accentSoft: "bg-violet-50 text-violet-700 ring-violet-100",
    activeText: "text-violet-700",
    surface: "bg-violet-50/70",
    darkSurface: "from-violet-950 via-slate-950 to-slate-950",
  },
  {
    id: "realestate",
    label: "Real Estate Marketing",
    shortLabel: "Property",
    icon: Building2,
    eyebrow: "Property marketing, client trust, and listing presentation",
    headline: "Real estate materials that make property information easier to trust and scan.",
    description:
      "A practical view of listing content, property presentations, client follow-up, and marketing visuals for real estate work.",
    focus: ["Listing content", "Property presentations", "Client follow-up", "Digital marketing"],
    reviewOrder: ["Real estate samples", "Filipino Homes role", "Communication and marketing background"],
    stats: [
      ["2026–Present", "real estate marketing"],
      ["4", "property sample entries"],
      ["Client-first", "presentation approach"],
    ],
    tone: "Trust-building, organized, presentation-focused",
    bestFor: "Brokerage teams, property clients, listing support, and marketing assistance",
    accent: "bg-emerald-600",
    accentSoft: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    activeText: "text-emerald-700",
    surface: "bg-emerald-50/70",
    darkSurface: "from-emerald-950 via-slate-950 to-slate-950",
  },
  {
    id: "developer",
    label: "Web / Mobile Development",
    shortLabel: "Development",
    icon: Code2,
    eyebrow: "Responsive builds, APIs, IT support, and systems thinking",
    headline: "A recruiter-friendly technical view with projects, systems work, and credentials.",
    description:
      "A structured view of web/mobile development, PHP and custom APIs, IT support, cybersecurity exposure, and technical project work.",
    focus: ["Web development", "Mobile development", "PHP and APIs", "IT support"],
    reviewOrder: ["Web projects", "Internship and freelance work", "Certifications and technical background"],
    stats: [
      ["2026", "BSIT completion"],
      ["3 Projects", "Personal Portfolio, ICTC Website, AI-Driven Website"],
      ["CCNA", "networking foundation"],
    ],
    tone: "Structured, technical, hiring-team friendly",
    bestFor: "Developer roles, IT support roles, internships, junior tech positions, and project-based builds",
    accent: "bg-blue-700",
    accentSoft: "bg-blue-50 text-blue-700 ring-blue-100",
    activeText: "text-blue-700",
    surface: "bg-blue-50/70",
    darkSurface: "from-blue-950 via-slate-950 to-slate-950",
  },
];

const workItems: Array<{
  title: string;
  category: string;
  workTypes: WorkTypeId[];
  role: string;
  tools: string;
  description: string;
  year: string;
  status: string;
  image: string;
}> = [
  {
    title: "Graphic Artwork 01",
    category: "Design",
    workTypes: ["graphic"],
    role: "Freelance Graphic Designer",
    tools: "Photoshop",
    description: "A selected design output focused on clean composition, visual balance, and clear information hierarchy.",
    year: "2021",
    status: "Graphic Artwork",
    image: "/work/artwork-01.png",
  },
  {
    title: "Graphic Artwork 02",
    category: "Design",
    workTypes: ["graphic"],
    role: "Freelance Graphic Designer",
    tools: "Photoshop",
    description: "A visual sample built around spacing, readability, and a polished creative direction.",
    year: "2026",
    status: "Graphic Artwork",
    image: "/work/artwork-02.png",
  },
  {
    title: "Graphic Artwork 03",
    category: "Design",
    workTypes: ["graphic"],
    role: "Freelance Graphic Designer",
    tools: "Photoshop",
    description: "A design piece showing consistency in color, typography, and brand-like presentation.",
    year: "2025",
    status: "Graphic Artwork",
    image: "/work/artwork-03.png",
  },
  {
    title: "Graphic Artwork 04",
    category: "Design",
    workTypes: ["graphic"],
    role: "Freelance Graphic Designer",
    tools: "Photoshop",
    description: "A social media-ready creative designed to stay readable while keeping the layout engaging.",
    year: "2024",
    status: "Graphic Artwork",
    image: "/work/artwork-04.png",
  },
  {
    title: "Graphic Artwork 05",
    category: "Design",
    workTypes: ["graphic"],
    role: "Freelance Graphic Designer",
    tools: "Photoshop",
    description: "A selected creative output with emphasis on detail, balance, clarity, and professional polish.",
    year: "2026",
    status: "Graphic Artwork",
    image: "/work/artwork-05.png",
  },
  {
    title: "Graphic Poster 06",
    category: "Design",
    workTypes: ["graphic"],
    role: "Freelance Graphic Designer",
    tools: "Photoshop / Canva",
    description: "A campaign, event, brand, or social media layout prepared as an additional featured poster.",
    year: "2021",
    status: "Poster Design",
    image: "/work/artwork-06.png",
  },
  {
    title: "Graphic Poster 07",
    category: "Design",
    workTypes: ["graphic"],
    role: "Freelance Graphic Designer",
    tools: "Photoshop / Canva",
    description: "A poster sample focused on layout range, visual direction, and stronger creative variety.",
    year: "2026",
    status: "Poster Design",
    image: "/work/artwork-07.png",
  },
  {
    title: "Graphic Poster 08",
    category: "Design",
    workTypes: ["graphic"],
    role: "Freelance Graphic Designer",
    tools: "Photoshop / Canva",
    description: "A promotional or brand-focused poster sample designed for clear social media communication.",
    year: "2026",
    status: "Poster Design",
    image: "/work/artwork-08.png",
  },
  {
    title: "Graphic Poster 09",
    category: "Design",
    workTypes: ["graphic"],
    role: "Freelance Graphic Designer",
    tools: "Photoshop / Canva",
    description: "A polished visual sample focused on readability, spacing, and clear design hierarchy.",
    year: "2026",
    status: "Poster Design",
    image: "/work/artwork-09.png",
  },
  {
    title: "Graphic Poster 10",
    category: "Design",
    workTypes: ["graphic"],
    role: "Freelance Graphic Designer",
    tools: "Photoshop / Canva",
    description: "A final featured graphic or campaign piece for a stronger design gallery.",
    year: "2026",
    status: "Poster Design",
    image: "/work/artwork-10.png",
  },
  {
    title: "Personal Portfolio Website",
    category: "Technology",
    workTypes: ["developer"],
    role: "Front-End Developer",
    tools: "React, Tailwind CSS, Vercel",
    description: "A responsive portfolio website built to present work, certificates, background, and contact details in one digital space.",
    year: "2026",
    status: "Web Project",
    image: "/work/portfolio-website.png",
  },
  {
    title: "ICTC Talisay Website",
    category: "Technology",
    workTypes: ["developer"],
    role: "Web Developer / Front-End and Back-End Developer",
    tools: "HTML5, PHP, SQL",
    description: "A website project created for ICTC Talisay, focused on organized information, clean structure, and easier browsing.",
    year: "2026",
    status: "Web Commission",
    image: "/work/portfolio-website-02.png",
  },
  {
    title: "ThinkFast AI",
    category: "Technology",
    workTypes: ["developer"],
    role: "Web Developer / Front-End and Back-End Developer",
    tools: "TypeScript, React, AI-Gemini, Supabase",
    description: "ThinkFast is a privacy-centered AI productivity platform that helps users create faster outputs while making sure their own ideas guide the result first.",
    year: "2026",
    status: "Web Project",
    image: "/work/portfolio-website-03.png",
  },
  {
    title: "Real Estate Presentation 01",
    category: "Real Estate",
    workTypes: ["realestate"],
    role: "Real Estate Marketing Agent / Designer",
    tools: "Canva, Photoshop",
    description: "A real estate marketing sample focused on making property information easier to understand and present to clients.",
    year: "2026",
    status: "Property Sample",
    image: "/work/real-estate-sample.png",
  },
  {
    title: "Real Estate Presentation 02",
    category: "Real Estate",
    workTypes: ["realestate"],
    role: "Real Estate Marketing Agent / Designer",
    tools: "Canva, Photoshop",
    description: "A listing layout, sales post, or presentation material for real estate marketing.",
    year: "2026",
    status: "Property Material",
    image: "/work/real-estate-sample-02.png",
  },
  {
    title: "Real Estate Presentation 03",
    category: "Real Estate",
    workTypes: ["realestate"],
    role: "Real Estate Marketing Agent / Designer",
    tools: "Canva, Photoshop",
    description: "A property marketing sample showing variety in listing visuals and client-facing content.",
    year: "2026",
    status: "Property Material",
    image: "/work/real-estate-sample-03.png",
  },
  {
    title: "Real Estate Presentation 04",
    category: "Real Estate",
    workTypes: ["realestate"],
    role: "Real Estate Marketing Agent / Designer",
    tools: "Canva, Photoshop",
    description: "A sales-oriented real estate layout designed to make property information easier to present.",
    year: "2026",
    status: "Property Material",
    image: "/work/real-estate-sample-04.png",
  },
];

const certificates: Array<{
  title: string;
  issuer: string;
  year: string;
  note: string;
  image?: string;
  workTypes: WorkTypeId[];
}> = [
  {
    title: "Seniors’ Exit Seminar",
    issuer: "Career Development Centre",
    year: "2026",
    note: "Career preparation and transition seminar for graduating students.",
    image: "/certificates/certificate-01.jpg",
    workTypes: ["graphic", "realestate", "developer"],
  },
  {
    title: "Internship Completion Certificate",
    issuer: "Vallacar Transit Inc.",
    year: "2026",
    note: "IT internship work involving support, hardware concerns, and branch data coordination.",
    image: "/certificates/certificate-02.jpg",
    workTypes: ["graphic", "realestate", "developer"],
  },
  {
    title: "CCNA: Switching, Routing, and Wireless Essentials",
    issuer: "Cisco Networking Academy",
    year: "2025",
    note: "Networking foundation in routing, switching, wireless basics, and IT infrastructure.",
    image: "/certificates/certificate-03.jpg",
    workTypes: ["graphic", "realestate", "developer"],
  },
 ];

const seminarsAttended: Array<{
  title: string;
  organizer: string;
  year: string;
  note: string;
}> = [
  {
    title: "Cybersecurity for National Security",
    organizer: "Cybersecurity Seminar",
    year: "2025",
    note: "Attended as part of continued exposure to cybersecurity awareness, national security, and digital responsibility.",
  },
  {
    title: "Endpoint Security",
    organizer: "Cybersecurity Seminar",
    year: "2025",
    note: "Attended to strengthen awareness of endpoint protection, device security, and basic cyber hygiene practices.",
  },
  {
    title: "The Human Firewall: Cybersecurity Awareness Bacolod",
    organizer: "Cybersecurity Awareness Seminar",
    year: "2025",
    note: "Attended a seminar focused on safer online behavior, user awareness, and the human side of cybersecurity.",
  },
];

const experience: Array<{
  period: string;
  type: string;
  title: string;
  place: string;
  description: string;
  highlights: string[];
  workTypes: WorkTypeId[];
}> = [
  {
    period: "Jan 2026 - Present",
    type: "Real Estate",
    title: "Real Estate Marketing Agent",
    place: "Filipino Homes",
    description: "Develops digital marketing content for real estate listings, improves property presentations, and supports client relationships through communication and follow-up.",
    highlights: ["Listing content", "Property presentation", "Client follow-up"],
    workTypes: ["realestate", "graphic"],
  },
  {
    period: "Nov 2025 - Present",
    type: "Freelance",
    title: "Freelance Website Developer",
    place: "Independent Projects",
    description: "Designs, develops, and deploys responsive web applications while improving online presence, performance, and integrations through APIs and third-party services.",
    highlights: ["Responsive web apps", "Performance optimization", "RESTful APIs"],
    workTypes: ["developer"],
  },
  {
    period: "Jan 2026 - Apr 2026",
    type: "Internship",
    title: "IT Intern",
    place: "Vallacar Transit Inc.",
    description: "Provided IT and hardware support across different offices, coordinated with programmers on branch data, and contributed to fewer system issues.",
    highlights: ["Hardware support", "Branch data coordination", "System troubleshooting"],
    workTypes: ["developer"],
  },
  {
    period: "Jan 2018 - Present",
    type: "Freelance",
    title: "Freelance Graphic Designer",
    place: "Independent Clients",
    description: "Created social media graphics, marketing materials, branding assets, creative layouts, and visual concepts tailored to client needs and brand identity while managing multiple projects and deadlines.",
    highlights: ["Social media graphics", "Marketing materials", "Branding assets", "Client-ready layouts"],
    workTypes: ["graphic", "realestate"],
  },
  {
    period: "2024 - 2025",
    type: "Editorial Design",
    title: "The La Salle Yearbook Layout Artist",
    place: "The La Salle Yearbook",
    description: "Created layout work for yearbook pages with attention to clean composition, photo placement, typography, and organized editorial presentation.",
    highlights: ["Yearbook layout", "Editorial composition", "Photo placement", "Typography"],
    workTypes: ["graphic"],
  },
  {
    period: "2023 - 2024",
    type: "Publication Leadership",
    title: "The Howl Editor-In-Chief",
    place: "The Howl",
    description: "Led publication work as Editor-In-Chief, supporting editorial direction, visual consistency, content organization, and team output.",
    highlights: ["Editorial leadership", "Content direction", "Publication design", "Team coordination"],
    workTypes: ["graphic"],
  },
  {
    period: "2022 - 2023",
    type: "Layout Design",
    title: "Rektikano Layout Artist",
    place: "Rektikano",
    description: "Produced layout artist work for publication materials, focusing on structure, readability, spacing, and page presentation.",
    highlights: ["Layout design", "Publication materials", "Readability", "Visual structure"],
    workTypes: ["graphic"],
  },
  {
    period: "Jul 2022 - Apr 2026",
    type: "Education",
    title: "BS Information Technology",
    place: "University of St. La Salle - Bacolod",
    description: "Completed BS Information Technology with relevant coursework in web development and mobile development, plus capstone work involving PHP-based systems and custom APIs.",
    highlights: ["Web development", "Mobile development", "PHP custom APIs"],
    workTypes: ["developer"],
  },
];

const skillGroups: Array<{
  title: string;
  icon: IconType;
  workTypes: WorkTypeId[];
  summary: string;
  evidence: string;
  items: string[];
}> = [
  {
    title: "Development & Systems",
    icon: Laptop,
    workTypes: ["developer"],
    summary: "Builds responsive interfaces, connects front-end work with APIs, and organizes technical projects around practical user flows.",
    evidence: "Relevant to freelance website development, BSIT coursework, mobile/web development, and capstone API work.",
    items: ["Web Development", "Mobile Development", "TypeScript Stack", "PHP APIs", "RESTful APIs", "Business Analysis", "Responsive UI", "Deployment"],
  },
  {
    title: "IT Support & Security",
    icon: ShieldCheck,
    workTypes: ["developer"],
    summary: "Supports users, devices, and office systems while applying networking and cybersecurity fundamentals.",
    evidence: "Grounded in Vallacar Transit Inc. internship work, CCNA training, endpoint security exposure, and cybersecurity awareness activities.",
    items: ["IT Support", "User Support", "Hardware Support", "Network Protocols", "Endpoint Security", "Cybersecurity", "Troubleshooting", "Branch Data Coordination"],
  },
  {
    title: "Graphic Design & Editing",
    icon: PenTool,
    workTypes: ["graphic", "realestate"],
    summary: "Creates social media graphics, promotional materials, layout systems, branding assets, and client-ready visual concepts.",
    evidence: "Supported by freelance design work from Jan 2018–Present, publication layout roles, yearbook work, and selected poster samples.",
    items: ["Graphic Design", "Video Editing", "Social Media Graphics", "Promotional Layouts", "Branding Assets", "Editorial Layout", "Visual Hierarchy", "Project Management"],
  },
  {
    title: "Real Estate Marketing",
    icon: HomeIcon,
    workTypes: ["realestate", "graphic"],
    summary: "Turns property information into clearer listing content, digital marketing materials, and client-facing presentations.",
    evidence: "Connected to Filipino Homes work involving listing promotion, property presentation, and client follow-up support.",
    items: ["Listing Content", "Property Presentation", "Client Communication", "Digital Marketing", "Follow-up Support", "Visual Selling Materials", "Client Organization", "Marketing Copy"],
  },
];

const landingStats = [
  {
    value: "8+ years",
    label: "Freelance design practice",
    note: "Jan 2018–Present creating social graphics, marketing materials, and branding assets.",
  },
  {
    value: "3 Tracks",
    label: "Real Estate, Full Stack Dev, Graphics Designer",
    note: "Creative and technical disciplines developed through real client and project experience.",
  },
  {
    value: "5",
    label: "Languages for communication",
    note: "English, Tagalog, Bisaya, Hiligaynon, and Japanese.",
  },
  {
    value: "2026",
    label: "BSIT completion year",
    note: "Web/mobile coursework with capstone work using PHP-based systems and custom APIs.",
  },
];

const proofItems = [
  {
    icon: GraduationCap,
    label: "Dean’s Lister",
    value: "2021 - 2023",
    note: "Academic achievement recognition.",
  },
  {
    icon: Target,
    label: "Capstone Project Lead",
    value: "2025 - 2026",
    note: "Led capstone work involving PHP-based systems and custom APIs.",
  },
  {
    icon: Languages,
    label: "Languages",
    value: "English, Tagalog, Bisaya, Hiligaynon, Japanese",
    note: "Useful for local clients, team communication, and wider collaboration.",
  },
];

function SmartImage({
  src,
  alt,
  sizes,
  className,
  priority = false,
  fallbackLabel,
}: {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
  fallbackLabel?: string;
}) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_top_left,#eff6ff,transparent_42%),linear-gradient(135deg,#f8fafc,#ffffff)] px-6 text-center">
        <div>
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-700 text-white shadow-lg shadow-blue-700/20">
            <ImageIcon className="h-5 w-5" />
          </div>
          <p className="text-sm font-semibold text-slate-800">{fallbackLabel ?? alt}</p>
          <p className="mt-1 text-xs text-slate-400">Image preview coming soon</p>
        </div>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      className={className}
      priority={priority}
      onError={() => setHasError(true)}
    />
  );
}

function SectionHeader({
  eyebrow,
  title,
  description,
  index,
  align = "split",
  inverted = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  index: string;
  align?: "split" | "center";
  inverted?: boolean;
}) {
  return (
    <div className={`mx-auto mb-10 max-w-7xl ${align === "center" ? "text-center" : "grid gap-6 lg:grid-cols-[0.78fr_1fr] lg:items-end"}`}>
      <div>
        <div className={`mb-4 inline-flex items-center gap-3 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] ${inverted ? "border-white/10 bg-white/[0.06] text-sky-200" : "border-blue-100 bg-blue-50 text-blue-700"}`}>
          <span>{index}</span>
          <span className={`h-1 w-1 rounded-full ${inverted ? "bg-sky-200" : "bg-blue-700"}`} />
          <span>{eyebrow}</span>
        </div>
        <h2 className={`text-balance text-3xl font-semibold tracking-[-0.035em] md:text-5xl ${inverted ? "text-white" : "text-slate-950"}`}>{title}</h2>
      </div>
      {description && (
        <p className={`max-w-2xl text-base leading-8 ${align === "center" ? "mx-auto mt-5" : "lg:ml-auto"} ${inverted ? "text-white/65" : "text-slate-600"}`}>
          {description}
        </p>
      )}
    </div>
  );
}

function MetaPill({ children, active = false }: { children: React.ReactNode; active?: boolean }) {
  return (
    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${active ? "border-blue-200 bg-blue-50 text-blue-700" : "border-slate-200 bg-white text-slate-600"}`}>
      {children}
    </span>
  );
}

function ProjectCard({ item, featured = false, onPreview }: { item: (typeof workItems)[number]; featured?: boolean; onPreview: () => void }) {
  return (
    <motion.article layout variants={fadeIn} className="h-full">
      <Card className={`group h-full overflow-hidden border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-2xl hover:shadow-slate-950/[0.08] ${featured ? "rounded-[2rem]" : "rounded-[1.5rem]"}`}>
        <CardContent className="h-full p-0">
          <div className={featured ? "grid h-full lg:grid-cols-[1.1fr_0.9fr]" : "flex h-full flex-col"}>
            <button type="button" onClick={onPreview} className={`relative overflow-hidden bg-slate-100 text-left ${featured ? "min-h-[30rem] lg:min-h-full" : "h-64"}`}>
              <SmartImage
                src={item.image}
                alt={item.title}
                sizes={featured ? "(max-width: 1024px) 100vw, 55vw" : "(max-width: 768px) 100vw, 33vw"}
                className="object-cover transition duration-700 group-hover:scale-[1.035]"
                fallbackLabel={item.title}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/10 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3">
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full border border-white/20 bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">{item.category}</span>
                  <span className="rounded-full border border-white/20 bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">{item.year}</span>
                </div>
                <span className="hidden rounded-full border border-white/20 bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md sm:inline-flex">
                  Preview
                </span>
              </div>
            </button>

            <div className={`flex flex-1 flex-col ${featured ? "p-7 md:p-9" : "p-6"}`}>
              <div className="mb-5 flex flex-wrap gap-2">
                <MetaPill active>{item.status}</MetaPill>
                <MetaPill>{item.tools}</MetaPill>
              </div>
              <h3 className={`font-semibold tracking-[-0.025em] text-slate-950 ${featured ? "text-3xl md:text-4xl" : "text-xl"}`}>{item.title}</h3>
              <p className="mt-4 leading-7 text-slate-600">{item.description}</p>

              <div className={`mt-6 grid gap-3 border-t border-slate-100 pt-5 text-sm ${featured ? "sm:grid-cols-3" : ""}`}>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Role</p>
                  <p className="mt-1 font-semibold text-slate-800">{item.role}</p>
                </div>
                {featured && (
                  <>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Tools</p>
                      <p className="mt-1 font-semibold text-slate-800">{item.tools}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Year</p>
                      <p className="mt-1 font-semibold text-slate-800">{item.year}</p>
                    </div>
                  </>
                )}
              </div>

              <button type="button" onClick={onPreview} className="mt-auto inline-flex items-center gap-2 pt-7 text-sm font-semibold text-blue-700 transition group-hover:gap-3">
                View sample
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.article>
  );
}

export default function LanceJiroTacsagonPortfolioWebsite() {
  const [activeWorkType, setActiveWorkType] = useState<WorkTypeId>("developer");
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedWork, setSelectedWork] = useState<(typeof workItems)[number] | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  const active = workTypes.find((type) => type.id === activeWorkType) ?? workTypes[0];
  const ActiveIcon = active.icon;
  const activeWork = useMemo(() => workItems.filter((item) => item.workTypes.includes(activeWorkType)), [activeWorkType]);
  const activeExperience = useMemo(() => experience.filter((item) => item.workTypes.includes(activeWorkType)), [activeWorkType]);
  const featuredWork = activeWork[0];
  const secondaryWork = activeWork.slice(1);

  const motionProps = prefersReducedMotion
    ? {}
    : {
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: { once: true, margin: "-80px" },
        variants: stagger,
      };

  return (
    <main className="min-h-screen scroll-smooth bg-[#f7f9fc] font-sans text-slate-950 antialiased selection:bg-blue-700 selection:text-white">
      <motion.div style={{ scaleX }} className="fixed left-0 top-0 z-[80] h-1 w-full origin-left bg-blue-700" />

      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8" aria-label="Main navigation">
          <a href="#top" onClick={() => setMenuOpen(false)} className="group flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-950 text-white shadow-sm transition duration-300 group-hover:scale-105">
              <BriefcaseBusiness className="h-4 w-4" />
            </span>
            <span>
              <span className="block text-sm font-bold tracking-tight text-slate-950">Lance Jiro Tacsagon</span>
              <span className="block text-xs text-slate-500">Multidisciplinary portfolio</span>
            </span>
          </a>

          <div className="hidden items-center gap-1 rounded-full border border-slate-200 bg-slate-50 p-1 lg:flex">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-white hover:text-blue-700 hover:shadow-sm">
                {item.label}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <a href="mailto:re.lancejirotacsagon@gmail.com" className="text-sm font-semibold text-slate-600 transition hover:text-blue-700">
              Email
            </a>
            <a
              href={CV_HREF}
              download
              className="inline-flex h-10 items-center justify-center rounded-full bg-blue-700 px-5 text-sm font-semibold text-white shadow-sm shadow-blue-700/20 transition hover:bg-blue-600"
            >
              Download CV
              <Download className="ml-2 h-4 w-4" />
            </a>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-slate-200 bg-white lg:hidden"
            >
              <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-4">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="rounded-2xl px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-blue-50 hover:text-blue-700"
                  >
                    {item.label}
                  </a>
                ))}
                <a
                  href={CV_HREF}
                  download
                  className="mt-2 inline-flex items-center justify-center rounded-full bg-blue-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-600"
                >
                  Download CV
                  <Download className="ml-2 h-4 w-4" />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <section id="top" className="relative isolate overflow-hidden border-b border-slate-200 bg-white px-5 py-14 lg:px-8 lg:py-20">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />
          <div className="absolute left-1/2 top-[-14rem] h-[38rem] w-[38rem] -translate-x-1/2 rounded-full bg-blue-50 blur-3xl" />
          <div className="absolute bottom-[-10rem] right-[-8rem] h-[22rem] w-[22rem] rounded-full bg-sky-100/70 blur-3xl" />
        </div>

        <motion.div initial="hidden" animate="visible" variants={stagger} className="mx-auto max-w-6xl text-center">
          <motion.div variants={fadeIn} className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm">
              <MapPin className="h-4 w-4 text-blue-700" />
              Bacolod City, Philippines
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm">
              <BadgeCheck className="h-4 w-4" />
              Open to opportunities
            </span>
          </motion.div>

          <motion.div variants={fadeIn} className="mx-auto mt-8 max-w-5xl">
            <p className="mb-5 text-sm font-bold uppercase tracking-[0.28em] text-blue-700">Built around design, technology, and real-world execution.</p>
            <h1 className="text-balance text-5xl font-semibold tracking-[-0.065em] text-slate-950 md:text-6xl lg:text-7xl">
              Design clarity. Real estate presentation. Technical execution.
            </h1>
            <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-slate-600">
              A focused portfolio for Lance Jiro Tacsagon, connecting freelance graphic design, property marketing, web/mobile development, and IT support in one organized review experience.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild className="h-12 rounded-full bg-blue-700 px-7 text-white shadow-lg shadow-blue-700/20 hover:bg-blue-600">
                <a href="#portfolio-view">
                  Choose portfolio view
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button asChild variant="outline" className="h-12 rounded-full border-slate-200 bg-white px-7 text-slate-800 hover:bg-slate-50 hover:text-blue-700">
                <a href={CV_HREF} download>
                  Download CV
                  <Download className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </motion.div>

          <motion.div variants={stagger} className="mx-auto mt-12 grid max-w-5xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {landingStats.map((stat) => (
              <motion.div key={stat.label} variants={fadeIn} className="rounded-2xl border border-slate-200 bg-white/85 p-4 text-left shadow-sm backdrop-blur">
                <p className="text-2xl font-semibold tracking-tight text-slate-950">{stat.value}</p>
                <p className="mt-1 text-sm font-semibold text-slate-700">{stat.label}</p>
                <p className="mt-2 text-xs leading-5 text-slate-500">{stat.note}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      <section id="portfolio-view" className={`border-b border-slate-200 px-5 py-10 lg:px-8 ${active.surface}`} aria-label="Portfolio view selector">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 grid gap-5 lg:grid-cols-[0.42fr_1fr] lg:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-700">Portfolio view</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.035em] text-slate-950 md:text-4xl">Choose the review path first.</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">Select a focus area to view work, experience, and highlights in that direction.</p>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              {workTypes.map((type) => {
                const Icon = type.icon;
                const selected = activeWorkType === type.id;
                return (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setActiveWorkType(type.id)}
                    className={`group relative overflow-hidden rounded-[1.35rem] border p-4 text-left transition duration-300 ${selected ? `border-transparent ${type.accentSoft} shadow-xl shadow-slate-950/[0.08] ring-2 ring-offset-2 ring-current` : "border-slate-200 bg-white/75 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white hover:shadow-lg hover:shadow-slate-950/[0.05]"}`}
                    aria-pressed={selected}
                  >
                    {selected && <span className={`absolute left-0 top-0 h-full w-1.5 ${type.accent}`} />}
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${selected ? `${type.accent} text-white shadow-lg shadow-slate-950/10` : "bg-slate-100 text-slate-600"}`}>
                          <Icon className="h-5 w-5" />
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-slate-950">{type.label}</p>
                          <p className="text-xs text-slate-500">{type.shortLabel}</p>
                        </div>
                      </div>
                      <ChevronRight className={`h-4 w-4 transition ${selected ? "translate-x-1" : "text-slate-400 group-hover:translate-x-1"}`} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeWorkType}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.26, ease: "easeOut" }}
              className="grid overflow-hidden rounded-[2rem] border border-white/70 bg-white shadow-2xl shadow-slate-950/[0.07] lg:grid-cols-[0.9fr_1.1fr]"
            >
              <div className={`bg-gradient-to-br ${active.darkSurface} p-6 text-white md:p-8`}>
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/10">
                  <ActiveIcon className="h-6 w-6" />
                </div>
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-sky-200">{active.eyebrow}</p>
                <h3 className="mt-4 text-3xl font-semibold tracking-[-0.035em] md:text-4xl">{active.headline}</h3>
                <p className="mt-5 max-w-2xl leading-8 text-white/65">{active.description}</p>
              </div>

              <div className="grid gap-5 p-6 md:p-8">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-400">Track Direction</p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {active.focus.map((item) => (
                      <div key={item} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                        <span className={`h-2.5 w-2.5 rounded-full ${active.accent}`} />
                        <span className="text-sm font-semibold text-slate-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-3 md:grid-cols-3">
                  {active.stats.map(([value, label]) => (
                    <div key={label} className="rounded-[1.25rem] border border-slate-200 bg-white p-4 shadow-sm">
                      <p className="text-2xl font-semibold tracking-tight text-slate-950">{value}</p>
                      <p className="mt-1 text-sm leading-5 text-slate-500">{label}</p>
                    </div>
                  ))}
                </div>

                <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-400">Key Points</p>
                  <div className="mt-4 grid gap-2">
                    {active.reviewOrder.map((item, index) => (
                      <div key={item} className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-sm">
                        <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${active.accent}`}>{index + 1}</span>
                        <span className="text-sm font-medium text-slate-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <section id="about" className="px-5 py-20 lg:px-8">
        <motion.div {...motionProps} className="mx-auto max-w-7xl">
          <SectionHeader
            index="01"
            eyebrow="About"
            title="Multidisciplinary, but organized around practical output."
            description="A multidisciplinary body of work shaped by design, technology, marketing, and practical execution."
          />

          <motion.div variants={fadeIn} className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <Card className="rounded-[2rem] border-slate-200 bg-white shadow-sm">
              <CardContent className="p-7 md:p-8">
                <p className="text-lg leading-9 text-slate-600">
                  I am a BS Information Technology graduate from the University of St. La Salle - Bacolod with a background that connects development, creative design, IT support, and real estate marketing.
                </p>
                <p className="mt-5 text-lg leading-9 text-slate-600">
                  My work combines technical execution with visual presentation, helping me build, support, and present digital materials with clearer purpose and better structure.
                </p>
              </CardContent>
            </Card>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "Based in Bacolod City",
                "Open to opportunities",
                "Web, mobile, and IT support background",
                "Graphic design and real estate marketing experience",
              ].map((item) => (
                <motion.div key={item} variants={fadeIn} className="flex min-h-28 items-center gap-4 rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                    <CheckCircle2 className="h-5 w-5" />
                  </span>
                  <span className="font-semibold leading-6 text-slate-700">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      <section id="experience" className="px-5 py-20 lg:px-8">
        <motion.div {...motionProps}>
          <SectionHeader
            index="02"
            eyebrow="Experience"
            title="Experience shaped through creative, technical, and client-facing roles."
            description="Experience organized for quick review, with each role showing timeline, responsibilities, and key contributions clearly."
          />

          <div className="mx-auto max-w-7xl">
            <AnimatePresence mode="wait">
              <motion.div key={activeWorkType} initial="hidden" animate="visible" exit={{ opacity: 0, y: -12 }} variants={stagger} className="grid gap-4">
                {activeExperience.map((item, index) => (
                  <motion.article key={`${item.title}-${item.period}`} variants={fadeIn} layout className="group relative rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300 hover:shadow-xl hover:shadow-slate-950/[0.05] md:p-6">
                    <div className="grid gap-5 lg:grid-cols-[0.28fr_1fr_0.42fr] lg:items-start">
                      <div>
                        <p className="text-sm font-semibold text-blue-700">{item.period}</p>
                        <p className="mt-2 inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-500">{item.type}</p>
                      </div>
                      <div>
                        <div className="flex items-start gap-4">
                          <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-950 text-sm font-semibold text-white">{index + 1}</span>
                          <div>
                            <h3 className="text-2xl font-semibold tracking-tight text-slate-950">{item.title}</h3>
                            <p className="mt-1 font-medium text-slate-500">{item.place}</p>
                            <p className="mt-4 max-w-3xl leading-8 text-slate-600">{item.description}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 lg:justify-end">
                        {item.highlights.map((highlight) => (
                          <span key={highlight} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-600">
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </section>

      <section id="projects" className="border-y border-slate-200 bg-white px-5 py-20 lg:px-8">
        <motion.div {...motionProps}>
          <SectionHeader
            index="03"
            eyebrow="Projects"
            title={`${active.label} projects focused on clarity, execution, and real-world outcomes.`}
            description="Selected projects are presented with clear context, visible outcomes, and supporting details that make each work easy to understand at a glance."
          />

          <div className="mx-auto max-w-7xl">
            <AnimatePresence mode="wait">
              <motion.div key={activeWorkType} initial="hidden" animate="visible" exit={{ opacity: 0, y: -12 }} variants={stagger}>
                <motion.div variants={fadeIn} className={`mb-6 overflow-hidden rounded-[2rem] bg-gradient-to-br ${active.darkSurface} p-6 text-white shadow-2xl shadow-slate-950/15 md:p-8`}>
                  <div className="grid gap-6 lg:grid-cols-[1fr_0.7fr] lg:items-end">
                    <div>
                      <p className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-sky-200">
                        <ActiveIcon className="h-4 w-4" />
                        {active.eyebrow}
                      </p>
                      <h3 className="max-w-4xl text-3xl font-semibold tracking-[-0.035em] md:text-5xl">{active.headline}</h3>
                      <p className="mt-5 max-w-2xl leading-8 text-white/65">{active.description}</p>
                    </div>

                    <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.06] p-5 backdrop-blur">
                      <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/45">Key points</p>
                      <div className="mt-4 grid gap-2">
                        {active.reviewOrder.map((item, index) => (
                          <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3">
                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-xs font-bold text-slate-950">{index + 1}</span>
                            <span className="text-sm font-medium text-white/85">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-3 md:grid-cols-3">
                    {active.stats.map(([value, label]) => (
                      <div key={label} className="rounded-[1.25rem] border border-white/10 bg-white/[0.06] p-4 backdrop-blur">
                        <p className="text-2xl font-semibold tracking-tight text-white">{value}</p>
                        <p className="mt-1 text-sm text-white/55">{label}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {featuredWork && (
                  <div className="mb-6">
                    <ProjectCard item={featuredWork} featured onPreview={() => setSelectedWork(featuredWork)} />
                  </div>
                )}

                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {secondaryWork.map((item) => (
                    <ProjectCard key={item.title} item={item} onPreview={() => setSelectedWork(item)} />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </section>

      <section id="achievements" className="bg-slate-950 px-5 py-20 text-white lg:px-8">
        <motion.div {...motionProps}>
          <SectionHeader
            index="04"
            eyebrow="Achievements"
            title="Certificates, seminars, awards, and proof of growth."
            description="Recognitions and learning experiences that show growth across academic, technical, and professional work."
            inverted
          />

          <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 lg:grid-cols-3">
            {certificates.map((cert) => (
              <motion.article key={`${cert.title}-${cert.image}`} variants={fadeIn}>
                <Card className="h-full rounded-[1.75rem] border-white/10 bg-white/[0.04] text-white shadow-none transition hover:-translate-y-1 hover:bg-white/[0.07]">
                  <CardContent className="p-5">
                    <a
                      href={cert.image}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mb-5 block overflow-hidden rounded-2xl border border-white/10 bg-white p-2 shadow-lg shadow-black/10"
                      aria-label={`Open ${cert.title} certificate preview`}
                    >
                      <img
                        src={cert.image}
                        alt={cert.title}
                        loading="lazy"
                        decoding="async"
                        className="h-64 w-full rounded-xl object-contain"
                      />
                    </a>
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-sky-200">Certificate</span>
                      <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs font-semibold text-white/60">{cert.year}</span>
                    </div>
                    <h3 className="text-xl font-semibold leading-snug">{cert.title}</h3>
                    <p className="mt-2 text-sm text-white/45">{cert.issuer}</p>
                    <p className="mt-5 leading-7 text-white/65">{cert.note}</p>
                  </CardContent>
                </Card>
              </motion.article>
            ))}
          </div>

          <div className="mx-auto mt-12 max-w-7xl">
            <div className="mb-5 flex flex-col justify-between gap-3 border-t border-white/10 pt-8 md:flex-row md:items-end">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-200">Seminars attended</p>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">Professional Development</h3>
              </div>
              <p className="max-w-xl text-sm leading-6 text-white/55">Ongoing learning that supports professional growth, workplace readiness, and practical skill development.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {seminarsAttended.map((seminar) => (
                <motion.article key={seminar.title} variants={fadeIn} className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-6">
                  <ShieldCheck className="h-5 w-5 text-sky-200" />
                  <div className="mt-5 flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-sky-200">Seminar</span>
                    <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs font-semibold text-white/60">{seminar.year}</span>
                  </div>
                  <h4 className="mt-4 text-xl font-semibold leading-snug text-white">{seminar.title}</h4>
                  <p className="mt-2 text-sm text-white/45">{seminar.organizer}</p>
                  <p className="mt-5 leading-7 text-white/65">{seminar.note}</p>
                </motion.article>
              ))}
            </div>
          </div>

          <div className="mx-auto mt-6 grid max-w-7xl gap-4 md:grid-cols-3">
            {proofItems.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div key={item.label} variants={fadeIn} className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-6">
                  <Icon className="h-5 w-5 text-sky-200" />
                  <p className="mt-5 text-sm font-semibold uppercase tracking-[0.18em] text-white/45">{item.label}</p>
                  <h3 className="mt-2 text-xl font-semibold text-white">{item.value}</h3>
                  <p className="mt-3 leading-7 text-white/60">{item.note}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      <section id="contact" className="px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-blue-200 bg-blue-700 text-white shadow-2xl shadow-blue-900/20">
          <div className="grid gap-8 p-8 md:p-12 lg:grid-cols-[1.12fr_0.88fr] lg:items-center">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-sky-200">Contact</p>
              <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
                Let’s connect for design, property marketing, or development work.
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-blue-50/80">
                Open to opportunities, design work, simple web projects, IT support-related work, and real estate inquiries.
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-white/15 bg-white/[0.08] p-5 backdrop-blur md:p-6">
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-5 h-28 w-28 overflow-hidden rounded-3xl border border-white/20 bg-white/10 shadow-2xl shadow-blue-950/20">
                  <SmartImage
                    src="/profile/lance.jpg"
                    alt="Lance Jiro Tacsagon"
                    sizes="112px"
                    className="object-cover object-[center_10%]"
                    fallbackLabel="Profile photo"
                  />
                </div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-sky-200">Let’s connect</p>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">Lance Jiro Tacsagon</h3>
                <p className="mt-2 max-w-sm text-sm leading-6 text-blue-50/70">
                  Reach out for portfolio inquiries, project work, collaboration, or hiring opportunities.
                </p>
              </div>

              <div className="mt-6 grid gap-3">
                <a
                  href="mailto:re.lancejirotacsagon@gmail.com?subject=Portfolio%20Inquiry"
                  className="inline-flex h-12 w-full items-center justify-center rounded-full bg-white px-7 text-sm font-semibold text-blue-700 transition hover:bg-sky-50"
                >
                  Email me
                  <Mail className="ml-2 h-4 w-4" />
                </a>
                <a
                  href={CV_HREF}
                  download
                  className="inline-flex h-12 w-full items-center justify-center rounded-full border border-white/20 px-7 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Download CV
                  <Download className="ml-2 h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-5 grid max-w-7xl gap-4 md:grid-cols-3">
          {[
            { icon: Mail, label: "Email", value: "re.lancejirotacsagon@gmail.com" },
            { icon: Phone, label: "Phone", value: "+63 995 647 1232" },
            { icon: MapPin, label: "Location", value: "Bacolod City, Philippines" },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.label} className="rounded-[1.5rem] border-slate-200 bg-white text-slate-950 shadow-sm">
                <CardContent className="flex items-center gap-4 p-5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">{item.label}</p>
                    <p className="break-all font-medium text-slate-700">{item.value}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white px-5 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 text-center text-sm text-slate-500 md:flex-row md:text-left">
          <p>© 2026 Lance Jiro Tacsagon. Portfolio built with Next.js and TypeScript.</p>
          <div className="flex items-center justify-center gap-3">
            <a
              href="https://www.instagram.com/lncjro"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:bg-blue-50 hover:text-blue-700"
              aria-label="Instagram"
            >
              <FaInstagram className="h-4 w-4" />
            </a>
            <a
              href="https://www.facebook.com/l.jiroooooo"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:bg-blue-50 hover:text-blue-700"
              aria-label="Facebook"
            >
              <FaFacebookF className="h-4 w-4" />
            </a>
            <a
              href="mailto:re.lancejirotacsagon@gmail.com"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:bg-blue-50 hover:text-blue-700"
              aria-label="Email"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {selectedWork && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-slate-950/80 px-5 py-8 backdrop-blur-md"
            onClick={() => setSelectedWork(null)}
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              className="max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-[2rem] border border-white/10 bg-white p-5 text-slate-950 shadow-2xl md:p-6"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-700">{selectedWork.category}</p>
                  <h3 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">{selectedWork.title}</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedWork(null)}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50 hover:text-slate-950"
                  aria-label="Close preview"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="relative mt-6 min-h-[28rem] overflow-hidden rounded-[1.5rem] border border-slate-200 bg-slate-50">
                <SmartImage
                  src={selectedWork.image}
                  alt={selectedWork.title}
                  sizes="(max-width: 768px) 100vw, 1024px"
                  className="object-contain"
                  fallbackLabel={selectedWork.title}
                />
              </div>

              <p className="mt-6 leading-8 text-slate-600">{selectedWork.description}</p>

              <div className="mt-6 grid gap-4 rounded-[1.25rem] bg-slate-50 p-4 text-sm md:grid-cols-4">
                <div>
                  <p className="text-slate-400">Role</p>
                  <p className="mt-1 font-semibold text-slate-800">{selectedWork.role}</p>
                </div>
                <div>
                  <p className="text-slate-400">Tools</p>
                  <p className="mt-1 font-semibold text-slate-800">{selectedWork.tools}</p>
                </div>
                <div>
                  <p className="text-slate-400">Year</p>
                  <p className="mt-1 font-semibold text-slate-800">{selectedWork.year}</p>
                </div>
                <div>
                  <p className="text-slate-400">Status</p>
                  <p className="mt-1 font-semibold text-slate-800">{selectedWork.status}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
