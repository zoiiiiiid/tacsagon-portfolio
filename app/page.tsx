"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring } from "framer-motion";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import {
  ArrowUpRight,
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  Code2,
  Download,
  GraduationCap,
  Mail,
  Palette,
  Sparkles,
  MapPin,
  Filter,
  ExternalLink,
  Menu,
  X,
  Layers3,
  PenTool,
  Home as HomeIcon,
  UserRound,
  Phone,
  Globe,
  Star,
  CheckCircle2,
  Clock3,
  Target,
  Eye,
  FileText,
  Laptop,
  ShieldCheck,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const navItems = [
  { label: "Work", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "Certificates", href: "#certificates" },
  { label: "Experience", href: "#experience" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];
const CV_HREF = "/lance-jiro-tacsagon-cv.pdf";
const filters = ["All", "Technology", "Design", "Real Estate"];

const workItems = [
  {
    title: "Graphic Artwork 01",
    category: "Design",
    role: "Graphic Artist",
    tools: "Photoshop",
    description:
      "A selected graphic design output focused on clean composition, visual balance, and clear presentation.",
    year: "2021",
    status: "Graphic Artwork",
    image: "/work/artwork-01.png",
  },
  {
    title: "Graphic Artwork 02",
    category: "Design",
    role: "Graphic Artist",
    tools: "Photoshop",
    description:
      "A visual design sample created with attention to spacing, readability, and professional creative direction.",
    year: "2026",
    status: "Graphic Artwork",
    image: "/work/artwork-02.png",
  },
  {
    title: "Graphic Artwork 03",
    category: "Design",
    role: "Graphic Artist",
    tools: "Photoshop",
    description:
      "A design piece that shows consistency in color, typography, and overall brand-like presentation.",
    year: "2025",
    status: "Graphic Artwork",
    image: "/work/artwork-03.png",
  },
  {
    title: "Graphic Artwork 04",
    category: "Design",
    role: "Graphic Artist",
    tools: "Photoshop",
    description:
      "A social media-ready creative designed to communicate information clearly while keeping the layout visually engaging.",
    year: "2024",
    status: "Graphic Artwork",
    image: "/work/artwork-04.png",
  },
  {
    title: "Graphic Artwork 05",
    category: "Design",
    role: "Graphic Artist",
    tools: "Photoshop",
    description:
      "A selected creative output that reflects my focus on detail, balance, visual clarity, and professional polish.",
    year: "2026",
    status: "Graphic Artwork",
    image: "/work/artwork-05.png",
  },
  {
    title: "Personal Portfolio Website",
    category: "Technology",
    role: "Front-End Developer",
    tools: "React, Tailwind CSS, Vercel",
    description:
      "A personal portfolio website built to present my work, certificates, background, and contact details in one clean space.",
    year: "2026",
    status: "Web Project",
    image: "/work/portfolio-website.png",
  },
  {
  title: "ICTC Talisay Website",
  category: "Technology",
  role: "Web Developer / Front-End and Back-End Developer",
  tools: "HTML 5, PHP, SQL",
  description:
    "A website project created for ICTC Talisay, focused on presenting information in a clean, organized, and easy-to-browse layout.",
  year: "2026",
  status: "Web Commission",
  image: "/work/portfolio-website-02.png",
  },
  {
    title: "Real Estate Presentation Sample",
    category: "Real Estate",
    role: "Real Estate Marketing Agent / Designer",
    tools: "Canva, Photoshop",
    description:
      "A real estate marketing sample focused on making property information easier to understand and present to clients.",
    year: "2026",
    status: "Real Estate",
    image: "/work/real-estate-sample.png",
  },
];

const certificates = [
  {
    title: "Seniors’ Exit Seminar",
    issuer: "Career Development Centre",
    year: "2026",
    note: "Added to my interest in cybersecurity, digital safety, and the role of IT in protecting organizations.",
    image: "/certificates/certificate-01.jpg",
  },
  {
    title: "Internship Completion Certificate",
    issuer: "Vallacar Transit Inc.",
    year: "2025",
    note: "Applied all my learnings and knowledge for this 600 hours on-the-job training for Vallacar Transit in their MSIT office.",
    image: "/certificates/certificate-02.jpg",
  },
  {
    title: "CCNA: Switching, Routing, and Wireless Essentials",
    issuer: "Cisco Networking Academy",
    year: "2025",
    note: "Supports my background in networking, routing, switching, wireless basics, and IT infrastructure concepts.",
    image: "/certificates/certificate-03.jpg",
  },
];

const lenses = [
  {
    icon: Code2,
    title: "Technology",
    description:
      "I’m still growing in web development, but I like building simple pages that look organized and feel easy to use.",
  },
  {
    icon: Palette,
    title: "Design",
    description:
      "This is the main part of my portfolio. I like layouts that feel clean, readable, and not overcrowded.",
  },
  {
    icon: Building2,
    title: "Real Estate",
    description:
      "Real estate helped me become more careful with details, presentation, and how information is shown to clients.",
  },
];

const profileTabs = [
  {
    id: "it",
    label: "IT Support",
    icon: Laptop,
    title: "I like solving practical tech problems.",
    description:
      "My IT side comes from web development, mobile development, hardware support, user support, and working with branch data during internship.",
    points: ["Hardware and user support", "Web and mobile development", "PHP systems and custom APIs"],
  },
  {
    id: "design",
    label: "Graphic Design",
    icon: PenTool,
    title: "I enjoy making visuals feel clean and organized.",
    description:
      "My design work focuses on social media graphics, promotional materials, branding assets, and layouts that are easy to read.",
    points: ["Social media graphics", "Promotional content", "Branding and layout work"],
  },
  {
    id: "realestate",
    label: "Real Estate Marketing",
    icon: Building2,
    title: "I use design to make listings easier to trust.",
    description:
      "My real estate work pushed me to present property information clearly, follow up properly, and communicate with clients professionally.",
    points: ["Property listing content", "Client communication", "Clear listing presentation"],
  },
];

const skills = [
  {
    icon: Laptop,
    title: "IT & Development",
    items: ["Web Development", "Mobile Development", "JavaScript/TypeScript", "PHP APIs", "Research Computing", "Business Analysis"],
  },
  {
    icon: ShieldCheck,
    title: "Support & Cybersecurity",
    items: ["IT Support", "User Support", "Network Protocols", "Endpoint Security", "Cybersecurity", "Hardware Support"],
  },
  {
    icon: PenTool,
    title: "Creative & Marketing",
    items: ["Graphic Design", "Video Editing", "Social Media Graphics", "Branding Assets", "Property Marketing", "Project Management"],
  },
];

const services = [
  {
    icon: Layers3,
    title: "Website and Mobile Development",
    description:
      "Clean, modern web and mobile pages that present information, data, and details clearly and professionally.",
  },
  {
    icon: Palette,
    title: "Graphic Design Assets",
    description:
      "Social media creatives, listing visuals, posters, layouts, and simple brand materials.",
  },
  {
    icon: HomeIcon,
    title: "Real Estate Presentation",
    description:
      "Property listing visuals and client-facing materials built around clarity and trust.",
  },
];

const experience = [
  {
    period: "Jan 2026 - Apr 2026",
    type: "Internship",
    title: "IT Intern",
    place: "Vallacar Transit Inc.",
    description:
      "Provided IT and hardware support across different offices while coordinating with programmers on branch data.",
    highlights: ["IT support", "Hardware support", "Branch data coordination"],
  },
  {
    period: "Jul 2025 - Jan 2026",
    type: "Creative Role",
    title: "Lead Graphic Artist",
    place: "Lokal Folks Collective",
    description:
      "Designed social media graphics, promotional content, branding assets, and other visual materials for different teams and projects.",
    highlights: ["Social media graphics", "Branding assets", "Promotional content"],
  },
  {
    period: "Jan 2026 - Present",
    type: "Real Estate",
    title: "Real Estate Marketing Agent",
    place: "Filipino Homes",
    description:
      "Created digital marketing content for real estate listings and helped present property information in a clearer, more client-friendly way.",
    highlights: ["Property marketing", "Client communication", "Listing presentation"],
  },
  {
    period: "Jul 2022 - Apr 2026",
    type: "Education",
    title: "BS Information Technology",
    place: "University of St. La Salle - Bacolod",
    description:
      "Studied web development and mobile development, with capstone work involving PHP-based systems and custom APIs.",
    highlights: ["Web development", "Mobile development", "PHP APIs"],
  },
];

const principles = [
  {
    icon: Eye,
    title: "Clarity first",
    description: "When someone opens the page, I want them to understand what I do without overthinking it.",
  },
  {
    icon: Target,
    title: "Purposeful details",
    description: "Spacing, labels, and layout matter because they make the work feel more finished.",
  },
  {
    icon: Clock3,
    title: "Simple but polished",
    description: "I do not want the site to feel overloaded. I want it to feel direct and easy to browse.",
  },
];

type SectionLabelProps = {
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
};

function SectionLabel({ icon: Icon, children }: SectionLabelProps) {
  return (
    <p className="mb-3 flex items-center gap-2 text-sm font-medium uppercase tracking-[0.22em] text-amber-300">
      <Icon className="h-4 w-4" />
      {children}
    </p>
  );
}

export default function LanceJiroTacsagonPortfolioWebsite() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProfile, setActiveProfile] = useState("it");
  const [selectedWork, setSelectedWork] = useState<(typeof workItems)[number] | null>(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  const selectedProfile =
    profileTabs.find((profile) => profile.id === activeProfile) ?? profileTabs[0];

  const filteredWork = useMemo(() => {
    if (activeFilter === "All") return workItems;
    return workItems.filter((item) => item.category === activeFilter);
  }, [activeFilter]);

  return (
    <main className="min-h-screen scroll-smooth bg-neutral-950 font-sans text-neutral-100 antialiased selection:bg-amber-300 selection:text-neutral-950">
      <motion.div
        style={{ scaleX }}
        className="fixed left-0 top-0 z-[70] h-1 w-full origin-left bg-amber-300"
      />
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[-20rem] h-[38rem] w-[38rem] -translate-x-1/2 rounded-full bg-amber-300/10 blur-3xl" />
        <div className="absolute bottom-[-16rem] right-[-10rem] h-[32rem] w-[32rem] rounded-full bg-white/5 blur-3xl" />
      </div>

      <header className="sticky top-0 z-50 border-b border-white/10 bg-neutral-950/75 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <a href="#top" className="group flex items-center gap-2" onClick={() => setMenuOpen(false)}>
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl border border-white/15 bg-white/5 shadow-sm">
              <Sparkles className="h-4 w-4 text-amber-300" />
            </div>
            <span className="text-sm font-semibold tracking-wide text-white">Lance Jiro Tacsagon</span>
          </a>

          <div className="hidden items-center gap-7 text-sm text-neutral-400 lg:flex">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="transition hover:text-white">
                {item.label}
              </a>
            ))}
          </div>

          <a
            href={CV_HREF}
            download
            className="inline-flex h-12 items-center justify-center rounded-full bg-white px-7 text-sm font-medium text-neutral-950 transition hover:bg-amber-200">
            Download CV
            <Download className="ml-2 h-4 w-4" />
          </a>

          <button
            onClick={() => setMenuOpen((value) => !value)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 lg:hidden"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>

        {menuOpen && (
        <div className="border-t border-white/10 bg-neutral-950/95 px-6 py-4 lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-2xl px-4 py-3 text-sm text-neutral-300 transition hover:bg-white/5 hover:text-white"
              >
                {item.label}
              </a>
            ))}

            <a
              href={CV_HREF}
              download
              className="mt-2 inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-medium text-neutral-950 transition hover:bg-amber-200"
            >
              Download CV
              <Download className="ml-2 h-4 w-4" />
            </a>
          </div>
        </div>
      )}
      </header>

      <section id="top" className="relative mx-auto max-w-7xl px-6 pb-20 pt-24 lg:px-8 lg:pb-28 lg:pt-32">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center"
        >
          <div>
            <motion.div variants={fadeUp} className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-neutral-300">
              <MapPin className="h-4 w-4 text-amber-300" />
              Bacolod City, Philippines
            </motion.div>

            <motion.h1 variants={fadeUp} className="max-w-4xl text-5xl font-semibold tracking-tight text-white md:text-7xl">
              Design-minded IT graduate, blending technology and creative tools for making impactful technology and digital solutions.
            </motion.h1>

            <motion.p variants={fadeUp} className="mt-7 max-w-2xl text-lg leading-8 text-neutral-300">
              I’m Lance Jiro Tacsagon, a fresh IT graduate from University of St. La Salle - Bacolod. I work across graphic design, web projects, and real estate, so this site brings those sides together in one place.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild className="h-12 rounded-full bg-amber-300 px-7 text-neutral-950 hover:bg-amber-200">
                <a href="#work">
                  View my work
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button asChild variant="outline" className="h-12 rounded-full border-white/15 bg-white/5 px-7 text-white hover:bg-white/10 hover:text-white">
                <a href="#contact">
                  Contact me
                  <Mail className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-10 grid max-w-xl grid-cols-3 gap-3">
              {[
                ["5", "Graphic works"],
                ["3", "Certificates"],
                ["2", "Web Projects"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-2xl font-semibold text-white">{value}</p>
                  <p className="mt-1 text-xs text-neutral-500">{label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div variants={fadeUp} className="relative">
            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-4 shadow-2xl backdrop-blur">
              <div className="relative h-80 overflow-hidden rounded-[1.5rem] border border-white/10 bg-neutral-900">
                <Image
                  src="/profile/lance.jpg"
                  alt="Lance Jiro Tacsagon"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                  style={{ objectPosition: "center 10%" }}
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/10 to-transparent" />

                <div className="absolute bottom-5 left-5 right-5">
                  <p className="text-sm text-amber-300">BSIT Graduate</p>
                  <h2 className="mt-1 text-2xl font-medium text-white">
                    Lance Jiro Tacsagon
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-neutral-300">
                    IT support, Graphic Designer,Web & Mobile Dev, and Real Estate Agent.
                  </p>
                </div>
              </div>

              <div className="mt-4 rounded-[1.5rem] border border-white/10 bg-neutral-900 p-5">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <p className="text-sm text-neutral-400">What this site shows</p>
                    <p className="font-medium text-white">
                      Design, web projects, and real estate work
                    </p>
                  </div>

                  <div className="rounded-full bg-amber-300/15 p-3">
                    <BadgeCheck className="h-5 w-5 text-amber-300" />
                  </div>
                </div>

                <div className="mt-5 space-y-3">
                  {[
                    "Graphic artwork samples",
                    "Certificates and school background",
                    "Real estate presentation work",
                    "Web projects I built",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4"
                    >
                      <span className="text-sm text-neutral-200">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <section className="relative mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="grid gap-4 md:grid-cols-3"
        >
          {lenses.map((lens) => {
            const Icon = lens.icon;
            return (
              <motion.div key={lens.title} variants={fadeUp}>
                <Card className="h-full rounded-[1.75rem] border-white/10 bg-white/[0.04] text-white shadow-none transition hover:-translate-y-1 hover:bg-white/[0.06]">
                  <CardContent className="p-6">
                    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                      <Icon className="h-5 w-5 text-amber-300" />
                    </div>
                    <h3 className="text-xl font-semibold">{lens.title}</h3>
                    <p className="mt-3 leading-7 text-neutral-400">{lens.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      <section className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="mb-8 max-w-3xl">
          <SectionLabel icon={UserRound}>Choose a side of my work</SectionLabel>
          <h2 className="text-4xl font-medium tracking-tight text-white md:text-5xl">
            This portfolio is not just one thing. It connects the work I actually do.
          </h2>
        </div>

        <div className="grid gap-5 lg:grid-cols-[0.35fr_0.65fr]">
          <div className="grid gap-3">
            {profileTabs.map((profile) => {
              const Icon = profile.icon;
              const active = activeProfile === profile.id;
              return (
                <button
                  key={profile.id}
                  type="button"
                  onClick={() => setActiveProfile(profile.id)}
                  className={`flex items-center gap-4 rounded-[1.5rem] border p-5 text-left transition ${
                    active
                      ? "border-amber-300/40 bg-amber-300 text-neutral-950"
                      : "border-white/10 bg-white/[0.04] text-neutral-300 hover:bg-white/[0.07]"
                  }`}
                >
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-2xl ${
                      active ? "bg-neutral-950/10" : "bg-white/5"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="font-medium">{profile.label}</span>
                </button>
              );
            })}
          </div>

          <motion.div
            key={selectedProfile.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-7 md:p-9"
          >
            <p className="text-sm uppercase tracking-[0.22em] text-amber-300">
              {selectedProfile.label}
            </p>
            <h3 className="mt-4 text-3xl font-medium tracking-tight text-white md:text-4xl">
              {selectedProfile.title}
            </h3>
            <p className="mt-5 max-w-2xl leading-8 text-neutral-400">
              {selectedProfile.description}
            </p>
            <div className="mt-7 grid gap-3 md:grid-cols-3">
              {selectedProfile.points.map((point) => (
                <div
                  key={point}
                  className="rounded-2xl border border-white/10 bg-neutral-950/40 px-4 py-4 text-sm text-neutral-300"
                >
                  {point}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section id="work" className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <SectionLabel icon={BriefcaseBusiness}>Selected Work</SectionLabel>
            <h2 className="max-w-2xl text-4xl font-semibold tracking-tight text-white md:text-5xl">
              A quick look at my graphic works, web project, and real estate-related presentation sample.
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] p-2">
            <Filter className="ml-2 h-4 w-4 text-neutral-500" />
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  activeFilter === filter
                    ? "bg-white text-neutral-950"
                    : "text-neutral-400 hover:bg-white/10 hover:text-white"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          key={activeFilter}
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="grid gap-5 md:grid-cols-2"
        >
          {filteredWork.map((item) => (
            <motion.article key={item.title} variants={fadeUp}>
              <Card className="group h-full overflow-hidden rounded-[2rem] border-white/10 bg-white/[0.04] text-white shadow-none">
                <CardContent className="p-0">
                  <div className="relative flex min-h-72 items-end overflow-hidden border-b border-white/10 bg-neutral-900 p-6">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover opacity-80 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/35 to-transparent" />
                    <div className="relative z-10">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full border border-white/10 bg-neutral-950/50 px-3 py-1 text-xs text-neutral-300">
                          {item.category}
                        </span>
                        <span className="rounded-full border border-amber-300/20 bg-amber-300/10 px-3 py-1 text-xs text-amber-200">
                          {item.status}
                        </span>
                      </div>
                      <h3 className="mt-4 text-2xl font-semibold tracking-tight text-white">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="leading-7 text-neutral-400">{item.description}</p>
                    <div className="mt-6 grid gap-4 text-sm sm:grid-cols-3">
                      <div>
                        <p className="text-neutral-500">Role</p>
                        <p className="mt-1 text-neutral-200">{item.role}</p>
                      </div>
                      <div>
                        <p className="text-neutral-500">Tools</p>
                        <p className="mt-1 text-neutral-200">{item.tools}</p>
                      </div>
                      <div>
                        <p className="text-neutral-500">Year</p>
                        <p className="mt-1 text-neutral-200">{item.year}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedWork(item)}
                      className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-amber-300 transition group-hover:gap-3"
                    >
                      View Photo
                      <ArrowUpRight className="h-4 w-4" />
                    </button>
                  </div>
                </CardContent>
              </Card>
            </motion.article>
          ))}
        </motion.div>
      </section>

      <section id="skills" className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <SectionLabel icon={Star}>Skills & Tools</SectionLabel>
          <h2 className="text-4xl font-semibold tracking-tight text-white md:text-5xl">
            The tools and skills I use when working on visuals, websites, and client-facing materials.
          </h2>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {skills.map((skill) => {
            const Icon = skill.icon;
            return (
              <Card key={skill.title} className="rounded-[1.75rem] border-white/10 bg-white/[0.04] text-white shadow-none">
                <CardContent className="p-6">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-300/15">
                    <Icon className="h-5 w-5 text-amber-300" />
                  </div>
                  <h3 className="text-xl font-semibold">{skill.title}</h3>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {skill.items.map((item) => (
                      <span key={item} className="rounded-full border border-white/10 bg-neutral-950/50 px-3 py-2 text-sm text-neutral-300">
                        {item}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <SectionLabel icon={CheckCircle2}>What I Can Help With</SectionLabel>
            <h2 className="text-4xl font-semibold tracking-tight text-white md:text-5xl">
              What I can help with right now.
            </h2>
            <p className="mt-5 leading-8 text-neutral-400">
              These are the kinds of work I can confidently show or offer while I continue building my experience.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-1">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Card key={service.title} className="rounded-[1.75rem] border-white/10 bg-white/[0.04] text-white shadow-none">
                  <CardContent className="flex gap-5 p-6">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                      <Icon className="h-5 w-5 text-amber-300" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{service.title}</h3>
                      <p className="mt-2 leading-7 text-neutral-400">{service.description}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section id="certificates" className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <SectionLabel icon={GraduationCap}>Proof of Growth</SectionLabel>
          <h2 className="text-4xl font-semibold tracking-tight text-white md:text-5xl">
            Certificates that support my background and growth.
          </h2>
          <p className="mt-5 leading-8 text-neutral-400">
            I only included a few certificates here so the section stays clean and does not feel like filler.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {certificates.map((cert) => (
            <Card key={cert.title} className="rounded-[1.75rem] border-white/10 bg-white/[0.04] text-white shadow-none">
              <CardContent className="p-6">
                <div className="relative mb-6 h-40 overflow-hidden rounded-2xl border border-white/10 bg-neutral-950">
                  <Image
                    src={cert.image}
                    alt={cert.title}
                    fill
                    className="object-cover transition duration-500 hover:scale-105"
                  />
                </div>
                <p className="text-xs uppercase tracking-[0.18em] text-neutral-500">{cert.year}</p>
                <h3 className="mt-3 text-xl font-semibold">{cert.title}</h3>
                <p className="mt-2 text-sm text-neutral-500">{cert.issuer}</p>
                <p className="mt-5 leading-7 text-neutral-400">{cert.note}</p>
                <button className="mt-6 inline-flex items-center gap-2 text-sm text-neutral-300 transition hover:text-white">
                  View certificate
                  <ExternalLink className="h-4 w-4" />
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id="experience" className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <SectionLabel icon={FileText}>Experience</SectionLabel>
          <h2 className="text-4xl font-semibold tracking-tight text-white md:text-5xl">
            Building Experience Through Technology, Design, and Real Estate.
          </h2>
        </div>

        <div className="space-y-4">
          {experience.map((item, index) => (
            <Card
              key={item.title}
              className="group rounded-[1.75rem] border-white/10 bg-white/[0.04] text-white shadow-none transition hover:bg-white/[0.06]"
            >
              <CardContent className="grid gap-5 p-6 md:grid-cols-[4rem_1fr] md:items-start">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-neutral-950/50 text-sm font-medium text-amber-300">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div>
                  <div className="mb-4 flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-amber-300/20 bg-amber-300/10 px-3 py-1 text-xs font-medium text-amber-200">
                      {item.type}
                    </span>

                    <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-neutral-400">
                      {item.period}
                    </span>
                  </div>

                  <h3 className="text-2xl font-medium text-white">{item.title}</h3>

                  <p className="mt-1 text-sm text-neutral-500">{item.place}</p>

                  <p className="mt-4 max-w-3xl leading-8 text-neutral-400">
                    {item.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {item.highlights.map((highlight) => (
                      <span
                        key={highlight}
                        className="rounded-full border border-white/10 bg-neutral-950/40 px-3 py-2 text-xs text-neutral-300"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="rounded-[2.5rem] border border-white/10 bg-white/[0.04] p-8 md:p-12">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.22em] text-amber-300">Details Matter</p>
              <h2 className="text-4xl font-semibold tracking-tight text-white md:text-5xl">
                I try to keep my work simple, readable, and properly arranged.
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {principles.map((principle) => {
                const Icon = principle.icon;
                return (
                  <div key={principle.title} className="rounded-[1.5rem] border border-white/10 bg-neutral-950/40 p-5">
                    <Icon className="h-5 w-5 text-amber-300" />
                    <h3 className="mt-5 text-lg font-semibold text-white">{principle.title}</h3>
                    <p className="mt-3 leading-7 text-neutral-400">{principle.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.22em] text-amber-300">About Me</p>
            <h2 className="text-4xl font-semibold tracking-tight text-white md:text-5xl">
              Fresh IT graduate with a creative and real estate background.
            </h2>
          </div>
          <div className="space-y-6 text-lg leading-9 text-neutral-300">
            <p>
              I am a fresh IT graduate from University of St. La Salle with a growing interest in combining technology, design, and digital presentation. What started as a passion for creating organized and visually clear layouts eventually evolved into working with websites, branding materials, and digital content for real estate.
            </p>
            <p>
              With a background in IT, I approach design with both creativity and structure in mind. I focus on clean layouts, user-friendly visuals, readability, and modern presentation across digital platforms. At the same time, my experience in real estate taught me how important strong visual communication is when helping people compare properties and make decisions online.
            </p>
            <p>
              This portfolio reflects both the technical and creative side of my work — blending design, technology, and presentation into simple but effective digital experiences.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                "Based in Bacolod City",
                "Open to opportunities",
                "Interested in web and design work",
                "Focused on clean professional output",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 text-base text-neutral-300">
                  <CheckCircle2 className="h-4 w-4 text-amber-300" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="rounded-[2.5rem] border border-white/10 bg-amber-300 p-8 text-neutral-950 md:p-12">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
                Need a visual, website, or real estate presentation?
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-neutral-800">
                I’m open to opportunities, design work, simple web projects, and real estate-related inquiries.
              </p>
            </div>
            <div className="flex flex-col gap-3 lg:items-end">
              <a
                href="mailto:re.lancejirotacsagon@gmail.com?subject=Portfolio%20Inquiry"
                className="inline-flex h-12 w-full items-center justify-center rounded-full bg-neutral-950 px-7 text-sm font-medium text-white transition hover:bg-neutral-800 sm:w-auto"
              >
                Email me
                <Mail className="ml-2 h-4 w-4" />
              </a>
              <a
                href={CV_HREF}
                download
                className="inline-flex h-12 items-center justify-center rounded-full bg-white px-7 text-sm font-medium text-neutral-950 transition hover:bg-amber-200">
                Download CV
                <Download className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            { icon: Mail, label: "Email", value: "re.lancejirotacsagon@gmail.com" },
            { icon: Phone, label: "Phone", value: "+63 995 647 1232" },
            { icon: MapPin, label: "Location", value: "Bacolod City, Philippines" },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.label} className="rounded-[1.5rem] border-white/10 bg-white/[0.04] text-white shadow-none">
                <CardContent className="flex items-center gap-4 p-5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/5">
                    <Icon className="h-5 w-5 text-amber-300" />
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500">{item.label}</p>
                    <p className="text-neutral-200">{item.value}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <footer className="relative border-t border-white/10 px-6 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-5 text-center text-sm text-neutral-500">
          <div className="flex items-center justify-center gap-3">
            <a
              href="https://www.instagram.com/lncjro"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] transition hover:bg-white/10 hover:text-white"
              aria-label="Instagram"
            >
              <FaInstagram className="h-4 w-4" />
            </a>

            <a
              href="https://www.facebook.com/l.jiroooooo"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] transition hover:bg-white/10 hover:text-white"
              aria-label="Facebook"
            >
              <FaFacebookF className="h-4 w-4" />
            </a>

            <a
              href="mailto:re.lancejirotacsagon@gmail.com"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] transition hover:bg-white/10 hover:text-white"
              aria-label="Email"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
          <p>© 2026 Lance Jiro Tacsagon. Built in Bacolod City.</p>
        </div>
      </footer>

      {selectedWork && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-neutral-950/80 px-6 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="w-full max-w-2xl rounded-[2rem] border border-white/10 bg-neutral-900 p-6 shadow-2xl"
          >
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="text-sm uppercase tracking-[0.22em] text-amber-300">
                  {selectedWork.category}
                </p>
                <h3 className="mt-3 text-3xl font-medium tracking-tight text-white">
                  {selectedWork.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedWork(null)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-neutral-300 transition hover:bg-white/10 hover:text-white"
                aria-label="Close preview"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="relative mt-6 min-h-80 overflow-hidden rounded-[1.5rem] border border-white/10 bg-neutral-950">
              <Image
                src={selectedWork.image}
                alt={selectedWork.title}
                fill
                className="object-contain"
              />
            </div>

            <p className="mt-6 leading-8 text-neutral-300">{selectedWork.description}</p>

            <div className="mt-6 grid gap-4 text-sm md:grid-cols-3">
              <div>
                <p className="text-neutral-500">Role</p>
                <p className="mt-1 text-neutral-200">{selectedWork.role}</p>
              </div>
              <div>
                <p className="text-neutral-500">Tools</p>
                <p className="mt-1 text-neutral-200">{selectedWork.tools}</p>
              </div>
              <div>
                <p className="text-neutral-500">Year</p>
                <p className="mt-1 text-neutral-200">{selectedWork.year}</p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </main>
  );
}
