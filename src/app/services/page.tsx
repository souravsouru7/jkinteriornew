"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useScroll, useTransform, type Variants } from "framer-motion";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";

// ─── Data ────────────────────────────────────────────────────────────────────

const SERVICES = [
  {
    id: "01",
    title: "Residential Design",
    tagline: "Homes · Apartments · Villas",
    description:
      "We transform raw space into refined living — each room balanced between beauty and the ease of everyday life.",
    features: ["Living rooms", "Bedrooms", "Bathrooms", "Kids' rooms"],
    image:
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1400&q=90",
  },
  {
    id: "02",
    title: "Commercial Design",
    tagline: "Offices · Retail · Hospitality",
    description:
      "Brand-led spaces that command attention, drive footfall, and communicate your identity through every surface.",
    features: ["Office planning", "Retail layouts", "Hospitality interiors", "Brand-led spaces"],
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=90",
  },
  {
    id: "03",
    title: "Modular Kitchens",
    tagline: "Storage · Surfaces · Appliances",
    description:
      "Where precision engineering meets culinary artistry — kitchens that function with the same effortlessness they inspire.",
    features: ["Custom layouts", "Smart storage", "Premium finishes", "Appliance integration"],
    image:
      "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&w=1400&q=90",
  },
  {
    id: "04",
    title: "Customised Furniture",
    tagline: "Built-ins · Wardrobes · Seating",
    description:
      "Every piece made to measure — built for your exact space, your exact life, and no one else's.",
    features: ["Sofas & seating", "Wardrobes", "Tables & desks", "Built-in storage"],
    image:
      "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1400&q=90",
  },
  {
    id: "05",
    title: "Interior Styling",
    tagline: "Art · Decor · Lighting · Textiles",
    description:
      "The finishing layer — where materials, light, and curated objects converge to complete the story of a space.",
    features: ["Decor selection", "Lighting mood", "Colour coordination", "Furniture placement"],
    image:
      "https://images.unsplash.com/photo-1615874694520-474822394e73?auto=format&fit=crop&w=1400&q=90",
  },
  {
    id: "06",
    title: "Budget-Conscious Design",
    tagline: "Phased · Smart · Efficient",
    description:
      "Premium aesthetics don't require unlimited budgets — they require smarter decisions, better sequencing, and the right eye.",
    features: ["Material alternatives", "Space optimisation", "Phased execution", "Focused styling"],
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=90",
  },
];

const PROCESS = [
  {
    step: "01",
    title: "Discovery",
    desc: "We immerse ourselves in your site, lifestyle, goals, constraints, and timeline before a single line is drawn.",
  },
  {
    step: "02",
    title: "Planning",
    desc: "Layouts, circulation, storage hierarchies, and material logic are resolved into a spatial strategy.",
  },
  {
    step: "03",
    title: "Design",
    desc: "Detailed drawings, curated material palettes, lighting plans, and 3D visualisations bring the vision to life.",
  },
  {
    step: "04",
    title: "Execution",
    desc: "Our project managers oversee every contractor, every surface, and every deadline with relentless precision.",
  },
  {
    step: "05",
    title: "Handover",
    desc: "A thorough walkthrough, documented warranties, and ongoing aftercare — we remain your partner long after keys are handed.",
  },
];

const STATS = [
  { value: "340+", label: "Projects completed" },
  { value: "12", label: "Years in practice" },
  { value: "98%", label: "Client satisfaction" },
  { value: "6", label: "Cities served" },
];

// ─── Animation Variants ──────────────────────────────────────────────────────

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 48 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: "easeOut" },
  },
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13 } },
};

const lineGrow: Variants = {
  hidden: { scaleX: 0 },
  show: {
    scaleX: 1,
    transition: { duration: 1.2, ease: "easeOut" },
  },
};

// ─── Sub-components ──────────────────────────────────────────────────────────

function ServiceCard({
  service,
  index,
}: {
  service: (typeof SERVICES)[0];
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });
  const isEven = index % 2 === 0;

  return (
    <motion.article
      ref={ref}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={stagger}
      className="group grid grid-cols-1 lg:grid-cols-2 border-t border-white/[0.07]"
    >
      {/* ── Image side ── */}
      <motion.div
        variants={fadeIn}
        className={`relative overflow-hidden min-h-[56vw] lg:min-h-[520px] ${
          !isEven ? "lg:order-2" : ""
        }`}
      >
        <Image
          src={service.image}
          alt={service.title}
          fill
          sizes="(min-width:1024px) 50vw, 100vw"
          className="object-cover transition-transform duration-[1.2s] ease-out will-change-transform group-hover:scale-[1.04]"
        />
        {/* Gradient scrim */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/50" />
        {/* Ghost number */}
        <span
          className="absolute bottom-4 right-6 select-none pointer-events-none leading-none text-white/[0.06]"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(6rem, 14vw, 11rem)",
            fontWeight: 600,
          }}
        >
          {service.id}
        </span>
      </motion.div>

      {/* ── Content side ── */}
      <motion.div
        variants={fadeUp}
        className={`flex flex-col justify-center gap-8 px-8 py-14 lg:px-14 xl:px-20 xl:py-20 bg-[#070707] ${
          !isEven ? "lg:order-1" : ""
        }`}
      >
        {/* Meta row */}
        <div
          className="flex items-center gap-3"
          style={{ fontFamily: "var(--font-label)" }}
        >
          <span style={{ color: "var(--gold)", fontSize: "0.7rem", letterSpacing: "0.22em" }}>
            {service.id}
          </span>
          <div
            className="h-px w-10 flex-shrink-0"
            style={{ background: "var(--gold)", opacity: 0.4 }}
          />
          <span
            className="uppercase"
            style={{
              color: "rgba(255,255,255,0.38)",
              fontSize: "0.65rem",
              letterSpacing: "0.16em",
            }}
          >
            {service.tagline}
          </span>
        </div>

        {/* Heading */}
        <h2
          className="font-light leading-[1.05] text-white"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.2rem, 4vw, 3.6rem)",
          }}
        >
          {service.title}
        </h2>

        {/* Gold rule */}
        <motion.div
          variants={lineGrow}
          className="h-px w-16 origin-left"
          style={{ background: "linear-gradient(90deg, var(--gold), transparent)" }}
        />

        {/* Description */}
        <p
          className="leading-relaxed max-w-md"
          style={{ color: "rgba(255,255,255,0.55)", fontSize: "clamp(0.95rem, 1.4vw, 1.08rem)" }}
        >
          {service.description}
        </p>

        {/* Feature list */}
        <motion.ul variants={stagger} className="grid grid-cols-2 gap-y-3 gap-x-4">
          {service.features.map((f) => (
            <motion.li
              key={f}
              variants={fadeUp}
              className="flex items-center gap-2.5 text-sm"
              style={{ color: "rgba(255,255,255,0.65)", fontFamily: "var(--font-label)", letterSpacing: "0.04em" }}
            >
              <span
                className="flex-shrink-0 w-1.5 h-1.5 rounded-full"
                style={{ background: "var(--gold)" }}
              />
              {f}
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </motion.article>
  );
}

function ProcessStep({
  step,
  isLast,
}: {
  step: (typeof PROCESS)[0];
  isLast: boolean;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={stagger}
      className="relative flex gap-6 lg:flex-col lg:gap-5"
    >
      {/* Connector line (desktop horizontal, mobile vertical) */}
      {!isLast && (
        <div
          className="hidden lg:block absolute top-5 left-[calc(1.25rem+1px)] right-0 h-px"
          style={{ background: "rgba(255,255,255,0.08)", zIndex: 0 }}
        />
      )}

      {/* Step circle */}
      <motion.div
        variants={fadeIn}
        className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full border flex items-center justify-center"
        style={{
          borderColor: "rgba(216,189,125,0.4)",
          background: "rgba(216,189,125,0.06)",
        }}
      >
        <span
          style={{
            color: "var(--gold)",
            fontFamily: "var(--font-label)",
            fontSize: "0.65rem",
            letterSpacing: "0.12em",
          }}
        >
          {step.step}
        </span>
      </motion.div>

      {/* Text */}
      <div className="flex flex-col gap-2 pb-8 lg:pb-0">
        <motion.h3
          variants={fadeUp}
          className="text-white font-light"
          style={{ fontFamily: "var(--font-display)", fontSize: "1.35rem" }}
        >
          {step.title}
        </motion.h3>
        <motion.p
          variants={fadeUp}
          className="text-sm leading-relaxed"
          style={{ color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-label)" }}
        >
          {step.desc}
        </motion.p>
      </div>

      {/* Vertical connector for mobile */}
      {!isLast && (
        <div
          className="lg:hidden absolute left-5 top-10 bottom-0 w-px"
          style={{ background: "rgba(255,255,255,0.08)" }}
        />
      )}
    </motion.div>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────

function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative flex items-end overflow-hidden"
      style={{ minHeight: "92vh" }}
    >
      {/* Parallax background */}
      <motion.div className="absolute inset-0 z-0" style={{ y: imageY }}>
        <Image
          src="https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=2000&q=90"
          alt="JK Interiors — luxury interior design"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Multi-layer gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-[#070707]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#070707]/60 to-transparent" />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pb-20 lg:pb-28"
        style={{ y: textY, opacity }}
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-4 mb-8"
        >
          <div
            className="h-px w-12"
            style={{ background: "var(--gold)" }}
          />
          <span
            className="uppercase tracking-[0.22em] text-xs"
            style={{ color: "var(--gold-soft)", fontFamily: "var(--font-label)" }}
          >
            Our Services
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="font-light text-white leading-[1.02]"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(3rem, 7.5vw, 7rem)",
            maxWidth: "14ch",
          }}
        >
          Design that <em style={{ color: "var(--gold-soft)" }}>lives</em> as beautifully as it looks.
        </motion.h1>

        {/* Subtext + CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-start sm:items-end gap-8 mt-10"
        >
          <p
            className="leading-relaxed max-w-sm"
            style={{
              color: "rgba(255,255,255,0.52)",
              fontFamily: "var(--font-label)",
              fontSize: "0.97rem",
            }}
          >
            From first layout to final handover — six distinct disciplines, one unified studio.
          </p>
          <Link href="/contact" className="jk-primary-btn flex-shrink-0">
            Book a consultation
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        style={{ opacity: useTransform(scrollYProgress, [0, 0.15], [1, 0]) }}
      >
        <span
          className="uppercase tracking-[0.2em]"
          style={{
            color: "rgba(255,255,255,0.3)",
            fontFamily: "var(--font-label)",
            fontSize: "0.6rem",
          }}
        >
          Scroll
        </span>
        <motion.div
          className="w-px h-10 origin-top"
          style={{ background: "linear-gradient(to bottom, var(--gold), transparent)" }}
          animate={{ scaleY: [0, 1, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}

// ─── Stats Bar ───────────────────────────────────────────────────────────────

function StatsBar() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={stagger}
      className="border-y"
      style={{ borderColor: "rgba(255,255,255,0.07)" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0"
        style={{ borderColor: "rgba(255,255,255,0.07)" }}
      >
        {STATS.map((stat) => (
          <motion.div
            key={stat.label}
            variants={fadeUp}
            className="flex flex-col items-center justify-center gap-2 py-10 px-6 text-center"
          >
            <span
              className="leading-none"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.4rem, 4vw, 3.2rem)",
                color: "var(--gold-soft)",
                fontWeight: 300,
              }}
            >
              {stat.value}
            </span>
            <span
              className="uppercase tracking-[0.14em]"
              style={{
                fontFamily: "var(--font-label)",
                fontSize: "0.65rem",
                color: "rgba(255,255,255,0.38)",
              }}
            >
              {stat.label}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

// ─── Process Section ─────────────────────────────────────────────────────────

function ProcessSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });

  return (
    <section className="py-24 lg:py-36" style={{ background: "#070707" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          variants={stagger}
          className="flex flex-col gap-5 mb-20 lg:mb-24"
        >
          <motion.div variants={fadeUp} className="flex items-center gap-4">
            <div className="h-px w-12" style={{ background: "var(--gold)" }} />
            <span
              className="uppercase tracking-[0.22em] text-xs"
              style={{ color: "var(--gold-soft)", fontFamily: "var(--font-label)" }}
            >
              How we work
            </span>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-light text-white leading-[1.06]"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.2rem, 4.5vw, 4rem)",
              maxWidth: "18ch",
            }}
          >
            A process built on{" "}
            <em style={{ color: "var(--gold-soft)" }}>clarity</em> and craft.
          </motion.h2>
        </motion.div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 lg:gap-10">
          {PROCESS.map((step, i) => (
            <ProcessStep key={step.step} step={step} isLast={i === PROCESS.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA Section ─────────────────────────────────────────────────────────────

function CtaSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      className="relative overflow-hidden py-28 lg:py-40"
      style={{
        background: "linear-gradient(135deg, #0d0b08 0%, #0f0e0b 50%, #070707 100%)",
        borderTop: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      {/* Decorative gold orb */}
      <div
        className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(216,189,125,0.07) 0%, transparent 70%)",
        }}
      />

      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        variants={stagger}
        className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 text-center flex flex-col items-center gap-8"
      >
        <motion.div variants={fadeUp} className="flex items-center justify-center gap-4">
          <div className="h-px w-12" style={{ background: "var(--gold)" }} />
          <span
            className="uppercase tracking-[0.22em] text-xs"
            style={{ color: "var(--gold-soft)", fontFamily: "var(--font-label)" }}
          >
            Start your project
          </span>
          <div className="h-px w-12" style={{ background: "var(--gold)" }} />
        </motion.div>

        <motion.h2
          variants={fadeUp}
          className="font-light text-white leading-[1.06]"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.5rem, 5.5vw, 5rem)",
          }}
        >
          Every great space begins with{" "}
          <em style={{ color: "var(--gold-soft)" }}>one conversation.</em>
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="max-w-lg leading-relaxed"
          style={{
            color: "rgba(255,255,255,0.48)",
            fontFamily: "var(--font-label)",
            fontSize: "1rem",
          }}
        >
          Tell us about your space. We'll listen first, design second — and deliver something that
          feels entirely yours.
        </motion.p>

        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 pt-2">
          <Link href="/contact" className="jk-primary-btn">
            Schedule a consultation
          </Link>
          <Link href="/gallery" className="jk-secondary-btn">
            View our work
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ServicesPage() {
  return (
    <main style={{ background: "#070707" }}>
      <SiteHeader />
      <HeroSection />
      <StatsBar />

      {/* Section header */}
      <div
        className="max-w-7xl mx-auto px-6 lg:px-12 pt-24 lg:pt-32 pb-2"
      >
        <SectionIntro />
      </div>

      {/* Service cards */}
      <div className="border-b" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
        {SERVICES.map((service, i) => (
          <ServiceCard key={service.id} service={service} index={i} />
        ))}
      </div>

      <ProcessSection />
      <CtaSection />
      <SiteFooter />
    </main>
  );
}

function SectionIntro() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={stagger}
      className="flex flex-col gap-5 pb-14 lg:pb-20"
    >
      <motion.div variants={fadeUp} className="flex items-center gap-4">
        <div className="h-px w-12" style={{ background: "var(--gold)" }} />
        <span
          className="uppercase tracking-[0.22em] text-xs"
          style={{ color: "var(--gold-soft)", fontFamily: "var(--font-label)" }}
        >
          What we offer
        </span>
      </motion.div>
      <motion.h2
        variants={fadeUp}
        className="font-light text-white leading-[1.06]"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(2.2rem, 4.5vw, 4rem)",
          maxWidth: "22ch",
        }}
      >
        Six disciplines. One{" "}
        <em style={{ color: "var(--gold-soft)" }}>unified</em> vision.
      </motion.h2>
      <motion.p
        variants={fadeUp}
        className="max-w-xl leading-relaxed"
        style={{
          color: "rgba(255,255,255,0.48)",
          fontFamily: "var(--font-label)",
          fontSize: "0.97rem",
        }}
      >
        Each service is a distinct discipline — but all share the same commitment to precision,
        restraint, and spaces that feel unmistakably intentional.
      </motion.p>
    </motion.div>
  );
}
