"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Check, X, LayoutDashboard } from "lucide-react";
import {
  WordsPullUp,
  WordsPullUpMultiStyle,
  ScrollRevealParagraph,
} from "./_components/PrismaComponents";
import PricingSection from "./_components/PricingSection";
import TestimonialsSection from "./_components/TestimonialsSection";
import { useToast } from "@/hooks/use-toast";

const navItems = [
  { name: "Workflow", href: "#how-it-works" },
  { name: "Features", href: "#features" },
  { name: "Benefits", href: "#benefits" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Pricing", href: "#pricing" },
  { name: "Dashboard", href: "/dashboard" }
];

const handleSmoothScroll = (e, href) => {
  if (href.startsWith("#")) {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const elem = document.getElementById(targetId);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  }
};

function Navbar() {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  return (
    <nav className="fixed top-0 left-1/2 -translate-x-1/2 z-50 w-[90%] sm:w-auto">
      <div className="bg-black/90 backdrop-blur-md rounded-b-2xl md:rounded-b-3xl px-4 py-2 md:px-8 flex items-center justify-center gap-3 sm:gap-6 md:gap-12 lg:gap-14 shadow-lg shadow-black/50">
        {navItems.map((item, idx) => (
          <a
            key={idx}
            href={item.href}
            onClick={(e) => handleSmoothScroll(e, item.href)}
            style={{
              color: hoveredIdx === idx ? "#E1E0CC" : "rgba(225, 224, 204, 0.8)",
            }}
            onMouseEnter={() => setHoveredIdx(idx)}
            onMouseLeave={() => setHoveredIdx(null)}
            className="text-[10px] sm:text-xs md:text-sm font-medium transition-colors duration-200 whitespace-nowrap cursor-pointer"
          >
            {item.name}
          </a>
        ))}
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section className="h-screen w-full p-4 md:p-6 bg-black relative">
      <div className="relative w-full h-full rounded-2xl md:rounded-[2rem] overflow-hidden flex flex-col justify-between">
        {/* Background Video */}
        <video
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Noise overlay */}
        <div className="absolute inset-0 noise-overlay opacity-[0.7] mix-blend-overlay pointer-events-none" />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 pointer-events-none" />

        {/* Navbar */}
        <Navbar />

        {/* Space filler for the top */}
        <div />

        {/* Hero Content (bottom-aligned) */}
        <div className="w-full p-6 md:p-12 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-end">
            {/* Left 8 columns for heading */}
            <div className="lg:col-span-8">
              <h1
                className="text-[26vw] sm:text-[24vw] md:text-[22vw] lg:text-[20vw] xl:text-[19vw] 2xl:text-[20vw] font-medium leading-[0.85] tracking-[-0.07em]"
                style={{ color: "#E1E0CC" }}
              >
                <WordsPullUp text="Prisma" showAsterisk={true} />
              </h1>
            </div>

            {/* Right 4 columns for text + button */}
            <div className="lg:col-span-4 flex flex-col gap-6 md:gap-8 items-start">
              {/* Description Paragraph */}
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  delay: 0.5,
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="text-primary/70 text-xs sm:text-sm md:text-base leading-[1.2]"
              >
                Prisma is an intelligent, AI-powered learning workspace that instantly transforms
                complex topics into structured, video-curated courses. We break down the barriers of
                traditional curriculum planning, empowering you to master any subject at your own pace.
              </motion.p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 items-center">
                <Link href="/sign-up" className="inline-block">
                  <motion.button
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      delay: 0.7,
                      duration: 0.8,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="group flex items-center bg-primary rounded-full pl-6 pr-2 py-2 text-black font-medium text-sm sm:text-base transition-all duration-300 gap-2 hover:gap-3 cursor-pointer select-none"
                  >
                    <span>Sign up</span>
                    <span className="bg-black rounded-full w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                      <ArrowRight className="w-5 h-5" style={{ color: "#DEDBC8" }} />
                    </span>
                  </motion.button>
                </Link>

                <Link href="/sign-in" className="inline-block">
                  <motion.button
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      delay: 0.8,
                      duration: 0.8,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="flex items-center border border-primary/50 text-primary rounded-full px-6 py-3 font-medium text-sm sm:text-base transition-all duration-300 hover:bg-primary/10 cursor-pointer select-none"
                  >
                    <span>Sign in</span>
                  </motion.button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BenefitsSection() {
  const segments = [
    { text: "Your personal AI tutor, ", className: "font-normal" },
    { text: "available 24/7. ", className: "italic font-serif" },
    {
      text: "Craft custom learning paths tailored to your level, goals, and schedule.",
      className: "font-normal",
    },
  ];

  return (
    <section id="benefits" className="bg-black py-24 px-4 md:px-8 flex justify-center items-center">
      <div className="bg-[#101010] rounded-3xl p-8 md:p-16 max-w-6xl w-full text-center flex flex-col items-center gap-8 shadow-2xl">
        {/* Label */}
        <span className="text-primary text-[10px] sm:text-xs uppercase tracking-widest font-semibold">
          Personalized Learning
        </span>

        {/* Heading */}
        <div
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl max-w-3xl mx-auto leading-[0.95] sm:leading-[0.9] font-medium tracking-tight"
          style={{ color: "#E1E0CC" }}
        >
          <WordsPullUpMultiStyle segments={segments} />
        </div>

        {/* Paragraph with Scroll-linked reveal */}
        <ScrollRevealParagraph
          text="Prisma harnesses the power of advanced Gemini AI and YouTube APIs to create structured curriculums with contextually-relevant videos in seconds. Enter a topic, choose your category, tune the difficulty level, and start learning immediately without any manual course-planning overhead."
          className="text-[#DEDBC8] text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed mt-4"
        />
      </div>
    </section>
  );
}

function SpotlightCard({ children, className = "", variants }) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      variants={variants}
      onMouseMove={handleMouseMove}
      className={`relative overflow-hidden group transition-all duration-300 border border-neutral-800/80 ${className}`}
    >
      {/* Background radial spotlight glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10"
        style={{
          background: `radial-gradient(350px circle at ${coords.x}px ${coords.y}px, rgba(222, 219, 200, 0.08), transparent 80%)`,
        }}
      />
      {children}
    </motion.div>
  );
}

function FeaturesSection() {
  const headerSegments = [
    { text: "Dynamic features to accelerate your learning. ", className: "font-normal" },
    { text: "Tailored to your needs. Powered by Generative AI.", className: "text-gray-500 font-normal" },
  ];

  const gridRef = useRef(null);
  const isGridInView = useInView(gridRef, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section id="features" className="min-h-screen bg-black py-24 px-4 md:px-8 relative overflow-hidden">
      {/* Background noise filter */}
      <div className="absolute inset-0 bg-noise opacity-[0.15] pointer-events-none" />

      {/* Header */}
      <div className="max-w-6xl mx-auto text-center mb-16 px-4">
        <div
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl max-w-3xl mx-auto leading-snug"
          style={{ color: "#E1E0CC" }}
        >
          <WordsPullUpMultiStyle segments={headerSegments} />
        </div>
      </div>

      {/* 4-column card grid */}
      <motion.div
        ref={gridRef}
        variants={containerVariants}
        initial="hidden"
        animate={isGridInView ? "visible" : "hidden"}
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:h-[480px] gap-3 sm:gap-2 md:gap-1"
      >
        {/* Card 1 - Interactive course dashboard */}
        <SpotlightCard
          variants={cardVariants}
          className="bg-[#212121] rounded-2xl p-6 flex flex-col justify-between h-[350px] lg:h-full group hover:bg-[#252525] transition-all duration-300 border border-neutral-800 hover:border-primary/30"
        >
          <div className="flex flex-col gap-4 relative z-20">
            <div className="flex justify-between items-start">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-neutral-800 rounded flex items-center justify-center text-primary">
                <LayoutDashboard className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <span className="text-gray-500 font-mono text-sm">01</span>
            </div>
            <h3 className="text-lg font-medium text-[#E1E0CC] mt-2">Interactive Dashboard.</h3>

            <ul className="flex flex-col gap-2 mt-2">
              {[
                "Track chapter progress",
                "Interactive lecture viewer",
                "Personalized course library",
                "Seamless lesson navigation",
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-2 text-xs sm:text-sm">
                  <Check className="w-4 h-4 text-primary shrink-0" />
                  <span className="text-gray-400">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <Link
            href="/dashboard"
            className="flex items-center gap-1 text-xs sm:text-sm text-[#E1E0CC] font-medium mt-4 group/link self-start relative z-20"
          >
            <span>Learn more</span>
            <ArrowRight className="w-4 h-4 transform -rotate-45 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
          </Link>
        </SpotlightCard>

        {/* Card 2 - AI Course Builder */}
        <SpotlightCard
          variants={cardVariants}
          className="bg-[#212121] rounded-2xl p-6 flex flex-col justify-between h-[350px] lg:h-full group hover:bg-[#252525] transition-all duration-300 border border-neutral-800 hover:border-primary/30"
        >
          <div className="flex flex-col gap-4 relative z-20">
            <div className="flex justify-between items-start">
              <img
                src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171918_4a5edc79-d78f-4637-ac8b-53c43c220606.png&w=1280&q=85"
                alt="AI Course Builder Icon"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded object-cover"
              />
              <span className="text-gray-500 font-mono text-sm">02</span>
            </div>
            <h3 className="text-lg font-medium text-[#E1E0CC] mt-2">AI Course Builder.</h3>

            <ul className="flex flex-col gap-2 mt-2">
              {[
                "Custom category selection",
                "Difficulty & duration tuning",
                "Gemini outline generator",
                "Structured text lessons",
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-2 text-xs sm:text-sm">
                  <Check className="w-4 h-4 text-primary shrink-0" />
                  <span className="text-gray-400">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <Link
            href="/dashboard"
            className="flex items-center gap-1 text-xs sm:text-sm text-[#E1E0CC] font-medium mt-4 group/link self-start relative z-20"
          >
            <span>Learn more</span>
            <ArrowRight className="w-4 h-4 transform -rotate-45 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
          </Link>
        </SpotlightCard>

        {/* Card 3 - Video Sync */}
        <SpotlightCard
          variants={cardVariants}
          className="bg-[#212121] rounded-2xl p-6 flex flex-col justify-between h-[350px] lg:h-full group hover:bg-[#252525] transition-all duration-300 border border-neutral-800 hover:border-primary/30"
        >
          <div className="flex flex-col gap-4 relative z-20">
            <div className="flex justify-between items-start">
              <img
                src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171741_ed9845ab-f5b2-4018-8ce7-07cc01823522.png&w=1280&q=85"
                alt="Video Sync Icon"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded object-cover"
              />
              <span className="text-gray-500 font-mono text-sm">03</span>
            </div>
            <h3 className="text-lg font-medium text-[#E1E0CC] mt-2">Video Sync.</h3>

            <ul className="flex flex-col gap-2 mt-2">
              {[
                "YouTube API integration",
                "Relevant media lookup",
                "Embedded video player",
                "Multi-modal curriculum",
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-2 text-xs sm:text-sm">
                  <Check className="w-4 h-4 text-primary shrink-0" />
                  <span className="text-gray-400">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <Link
            href="/dashboard"
            className="flex items-center gap-1 text-xs sm:text-sm text-[#E1E0CC] font-medium mt-4 group/link self-start relative z-20"
          >
            <span>Learn more</span>
            <ArrowRight className="w-4 h-4 transform -rotate-45 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
          </Link>
        </SpotlightCard>

        {/* Card 4 - Secure Dashboard */}
        <SpotlightCard
          variants={cardVariants}
          className="bg-[#212121] rounded-2xl p-6 flex flex-col justify-between h-[350px] lg:h-full group hover:bg-[#252525] transition-all duration-300 border border-neutral-800 hover:border-primary/30"
        >
          <div className="flex flex-col gap-4 relative z-20">
            <div className="flex justify-between items-start">
              <img
                src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171809_f56666dc-c099-4778-ad82-9ad4f209567b.png&w=1280&q=85"
                alt="Secure Dashboard Icon"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded object-cover"
              />
              <span className="text-gray-500 font-mono text-sm">04</span>
            </div>
            <h3 className="text-lg font-medium text-[#E1E0CC] mt-2">Manage & Share.</h3>

            <ul className="flex flex-col gap-2 mt-2">
              {[
                "Clerk secured auth",
                "Personal course history",
                "Public/Private visibility",
                "Share learning paths",
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-2 text-xs sm:text-sm">
                  <Check className="w-4 h-4 text-primary shrink-0" />
                  <span className="text-gray-400">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <Link
            href="/dashboard"
            className="flex items-center gap-1 text-xs sm:text-sm text-[#E1E0CC] font-medium mt-4 group/link self-start relative z-20"
          >
            <span>Learn more</span>
            <ArrowRight className="w-4 h-4 transform -rotate-45 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
          </Link>
        </SpotlightCard>
      </motion.div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    {
      step: "01",
      title: "Choose Category",
      desc: "Select a topic area like Tech, Health, Business, or Creative Arts to anchor the course scope.",
    },
    {
      step: "02",
      title: "Configure Options",
      desc: "Specify your exact topic details, choose your difficulty level, and set the duration and chapter counts.",
    },
    {
      step: "03",
      title: "Generate & Study",
      desc: "Our Gemini AI outline engine works with the YouTube API to instantly generate structured text lessons and sync relevant videos.",
    },
  ];

  return (
    <section id="how-it-works" className="bg-[#0c0c0c] py-24 px-4 md:px-8 border-y border-neutral-900">
      <div className="max-w-6xl mx-auto">
        <span className="text-primary text-[10px] sm:text-xs uppercase tracking-widest font-semibold block text-center mb-4">
          Three Simple Steps
        </span>
        <h2 className="text-3xl md:text-5xl font-medium text-center text-[#E1E0CC] mb-16 tracking-tight">
          How it works.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#151515] rounded-2xl p-8 border border-neutral-800 flex flex-col justify-between h-[250px] relative overflow-hidden group hover:border-primary/30 transition-all duration-300"
            >
              <div className="absolute -right-4 -top-8 text-[8rem] font-bold text-neutral-800/10 pointer-events-none select-none">
                {item.step}
              </div>
              <div className="flex flex-col gap-4">
                <span className="text-primary font-mono text-sm font-semibold">{item.step}</span>
                <h3 className="text-xl font-medium text-[#E1E0CC]">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


function FooterSection() {
  const currentYear = new Date().getFullYear();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [modalType, setModalType] = useState(null); // null, 'privacy', 'terms', 'inquiries'

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;

    toast({
      title: "Added",
      description: "You have been successfully added to our newsletter!",
    });
    setEmail("");
  };

  const modalContent = {
    privacy: {
      title: "Privacy Policy",
      content: (
        <>
          <p>Effective Date: June 28, 2026</p>
          <p>
            At Prisma, we take your privacy seriously. This Privacy Policy outlines how we collect, use, disclose, and safeguard your personal information when you use our AI course generator.
          </p>
          <p>
            <strong>Information We Collect:</strong> We collect details such as your name, email address (via secure Clerk authentication), and learning preferences to customize your course generation experience. We do not sell or lease your data to third parties.
          </p>
          <p>
            <strong>Usage & Video Sync:</strong> Course outline queries are processed via Gemini AI to generate custom curriculum paths, and video sync options query public APIs (like YouTube) without sharing your personal account credentials.
          </p>
          <p>
            If you have any questions or concerns about this policy, please contact us at vrindabindal1212@gmail.com.
          </p>
        </>
      ),
    },
    terms: {
      title: "Terms of Use",
      content: (
        <>
          <p>Effective Date: June 28, 2026</p>
          <p>
            Welcome to Prisma. By accessing or using our platform, you agree to comply with and be bound by the following Terms of Use.
          </p>
          <p>
            <strong>Account Responsibility:</strong> You are responsible for keeping your Clerk authentication details secure. You must not use the platform for any illegal actions or automated scraping of generated materials.
          </p>
          <p>
            <strong>AI Outputs:</strong> Course contents and lesson materials are generated dynamically using Generative AI. While we optimize for accuracy, outlines should be used for supplementary educational purposes.
          </p>
          <p>
            <strong>Service Limits:</strong> We reserve the right to limit course generations, modify pricing tiers, or suspend access for users who violate standard rate-limits or system usage guidelines.
          </p>
        </>
      ),
    },
    inquiries: {
      title: "Inquiries",
      content: (
        <>
          <p>
            Thank you for your interest in Prisma. We welcome inquiries from developers, educators, researchers, and creators.
          </p>
          <p>
            <strong>Contact Info:</strong>
            <br />
            For business development, corporate training partnerships, academic collaborations, or feedback, please drop us an email at:
          </p>
          <p className="bg-neutral-900 border border-neutral-800 rounded-lg p-3 text-center text-[#E1E0CC] font-mono select-all">
            vrindabindal1212@gmail.com
          </p>
          <p>
            We typically respond within 24–48 hours. Let's build the future of adaptive education together.
          </p>
        </>
      ),
    },
  };

  return (
    <footer className="bg-black text-[#E1E0CC]/70 py-16 px-4 md:px-8 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 mb-12">
        {/* Left branding col */}
        <div className="md:col-span-4 flex flex-col gap-4">
          <div className="text-2xl font-bold text-[#E1E0CC] tracking-wide flex items-center">
            Prisma<span className="text-primary text-xs ml-0.5 align-super">*</span>
          </div>
          <p className="text-sm max-w-sm leading-relaxed text-[#E1E0CC]/60">
            An intelligent, AI-powered learning workspace designed to instantly transform complex topics into structured, video-curated courses.
          </p>
        </div>

        {/* Links col 1 */}
        <div className="md:col-span-2 flex flex-col gap-3">
          <h4 className="text-xs uppercase tracking-widest font-semibold text-[#E1E0CC] mb-1">Platform</h4>
          <a href="#how-it-works" onClick={(e) => handleSmoothScroll(e, "#how-it-works")} className="text-sm hover:text-[#E1E0CC] transition-colors duration-200">How It Works</a>
          <a href="#features" onClick={(e) => handleSmoothScroll(e, "#features")} className="text-sm hover:text-[#E1E0CC] transition-colors duration-200">Features</a>
          <a href="#benefits" onClick={(e) => handleSmoothScroll(e, "#benefits")} className="text-sm hover:text-[#E1E0CC] transition-colors duration-200">Benefits</a>
          <a href="#testimonials" onClick={(e) => handleSmoothScroll(e, "#testimonials")} className="text-sm hover:text-[#E1E0CC] transition-colors duration-200">Testimonials</a>
          <a href="#pricing" onClick={(e) => handleSmoothScroll(e, "#pricing")} className="text-sm hover:text-[#E1E0CC] transition-colors duration-200">Pricing</a>
          <a href="/dashboard" className="text-sm hover:text-[#E1E0CC] transition-colors duration-200">Dashboard</a>
        </div>

        {/* Links col 3 */}
        <div className="md:col-span-2 flex flex-col gap-3">
          <h4 className="text-xs uppercase tracking-widest font-semibold text-[#E1E0CC] mb-1">Legal</h4>
          <span onClick={() => setModalType("privacy")} className="text-sm cursor-pointer hover:text-[#E1E0CC] transition-colors duration-200">Privacy Policy</span>
          <span onClick={() => setModalType("terms")} className="text-sm cursor-pointer hover:text-[#E1E0CC] transition-colors duration-200">Terms of Use</span>
          <span onClick={() => setModalType("inquiries")} className="text-sm cursor-pointer hover:text-[#E1E0CC] transition-colors duration-200">Inquiries</span>
        </div>

        {/* Newsletter col */}
        <div className="md:col-span-4 flex flex-col gap-3">
          <h4 className="text-xs uppercase tracking-widest font-semibold text-[#E1E0CC] mb-1">Newsletter</h4>
          <p className="text-xs text-[#E1E0CC]/50 leading-relaxed mb-1">
            Subscribe to get the latest updates on AI-curated learning.
          </p>
          <form className="flex gap-2 max-w-[280px]" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Your email address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-neutral-900/60 border border-neutral-800 rounded-lg px-3.5 py-2 text-xs text-[#E1E0CC] placeholder-neutral-600 focus:outline-none focus:border-neutral-700 focus:ring-1 focus:ring-primary/20 w-full transition-all duration-200"
            />
            <button
              type="submit"
              className="bg-primary text-black rounded-lg px-4 py-2 text-xs font-semibold hover:bg-primary/95 transition-all duration-200 shrink-0 active:scale-[0.97]"
            >
              Join
            </button>
          </form>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div>
          &copy; {currentYear} Prisma. All rights reserved. Built for visionary learners.
        </div>
        <div className="flex gap-6">
          <a href="https://github.com/vrindabindal12" target="_blank" rel="noopener noreferrer" className="hover:text-[#E1E0CC] transition-colors duration-200">GitHub</a>
          <a href="mailto:vrindabindal1212@gmail.com" className="hover:text-[#E1E0CC] transition-colors duration-200">Email</a>
          <a href="https://www.linkedin.com/in/vrinda-bindal-55b645349/" target="_blank" rel="noopener noreferrer" className="hover:text-[#E1E0CC] transition-colors duration-200">LinkedIn</a>
        </div>
      </div>

      {/* Modal Dialog */}
      {modalType && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#101010] border border-neutral-800 rounded-2xl max-w-lg w-full p-6 relative shadow-2xl animate-in fade-in zoom-in-95 duration-200 text-[#E1E0CC]">
            <button
              onClick={() => setModalType(null)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-semibold text-[#E1E0CC] mb-4">
              {modalContent[modalType].title}
            </h3>
            <div className="max-h-[50vh] overflow-y-auto pr-2 mt-4 text-xs sm:text-sm text-neutral-400 leading-relaxed space-y-4">
              {modalContent[modalType].content}
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setModalType(null)}
                className="bg-primary text-black rounded-lg px-4 py-2 text-xs font-semibold hover:bg-primary/90 transition-all cursor-pointer active:scale-95"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}

export default function Home() {
  return (
    <div className="bg-black text-[#E1E0CC] min-h-screen">
      <HeroSection />
      <BenefitsSection />
      <HowItWorksSection />
      <FeaturesSection />
      <TestimonialsSection />
      <PricingSection />
      <FooterSection />
    </div>
  );
}
