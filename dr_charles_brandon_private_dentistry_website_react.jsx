import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  ChevronDown,
  Instagram,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";

/**
 * Single-file, multi-page (hash routed) website for Dr. Charles Brandon.
 * - Responsive layout across breakpoints
 * - Conversion-focused CTAs
 * - Glassmorphism + blurred backgrounds + subtle interactions
 * - Motion/animations (honors reduced-motion)
 * - Blog + Contact + About pages
 *
 * Deploy-ready options:
 * - Vite: paste into App.jsx and ensure Tailwind + framer-motion + lucide-react installed.
 * - Next.js (App Router): move into a client component and adapt routing.
 */

// -----------------------------
// Brand / Content (editable)
// -----------------------------

const BRAND = {
  name: "Dr. Charles Brandon",
  role: "Private Cosmetic Dentist",
  tagline: "Facially aesthetic-driven dentistry—refining natural beauty, never masking it.",
  phone: "07542 164798",
  email: "enquiries@drcharlesbrandon.com",
  hours: "Monday – Friday 8.30am – 5.30pm",
  instagram: "https://www.instagram.com/drcharlesbrandon/",
  // Source-inspired bio highlights (adapt as needed)
  highlights: [
    "King's College London graduate (BDS)",
    "Advanced training across veneers, orthodontics, implantology, and restorative dentistry",
    "Smile design specialist: alignment, whitening, bonding, veneers, and gum aesthetics",
  ],
};

const NAV = [
  { label: "Home", hash: "#/" },
  { label: "About", hash: "#/about" },
  { label: "Blog", hash: "#/blog" },
  { label: "Contact", hash: "#/contact" },
];

const SERVICES = [
  {
    title: "Smile Design",
    desc: "Bespoke smile planning that balances aesthetics, function, and long-term stability.",
    icon: Sparkles,
  },
  {
    title: "Composite Bonding & Veneers",
    desc: "Natural, layered restorations crafted to mimic enamel translucency and texture.",
    icon: CheckCircle2,
  },
  {
    title: "Alignment & Whitening",
    desc: "Straighten and brighten with a conservative pathway that protects tooth structure.",
    icon: ShieldCheck,
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Every detail felt considered—from the plan to the final polish. My smile looks like the best version of itself.",
    name: "Private patient",
    rating: 5,
  },
  {
    quote:
      "Clear communication, calm approach, and results that feel natural. I finally enjoy smiling in photos.",
    name: "Private patient",
    rating: 5,
  },
  {
    quote:
      "The experience was genuinely reassuring—my treatment was thoughtful, not salesy, and the outcome is excellent.",
    name: "Private patient",
    rating: 5,
  },
];

const BLOG_POSTS = [
  {
    slug: "smile-design-first-principles",
    title: "Smile Design: First Principles for Natural Results",
    date: "2025-11-18",
    readTime: "5 min",
    excerpt:
      "How we align facial aesthetics, tooth proportions, and function—so your result looks effortless and lasts.",
    tags: ["Smile Design", "Cosmetic"],
    content: [
      "Great cosmetic dentistry starts with restraint. The goal is not a new smile—it is *your* smile, refined.",
      "A robust plan considers facial midline, lip dynamics, tooth display at rest, and occlusal function. The aesthetic layer is built on a stable foundation.",
      "Photography and digital planning help remove guesswork, enabling you to preview direction and make informed decisions before any irreversible step.",
      "Conservative options are prioritized: alignment + whitening + bonding can often deliver dramatic change while preserving tooth structure.",
    ],
  },
  {
    slug: "composite-bonding-aftercare",
    title: "Composite Bonding Aftercare: Keeping Your Finish Bright",
    date: "2025-10-02",
    readTime: "4 min",
    excerpt:
      "Small habits protect your investment—simple routines that keep bonding smooth, glossy, and stain-resistant.",
    tags: ["Bonding", "Aftercare"],
    content: [
      "Composite bonding is both art and material science. With the right maintenance, the surface can stay glossy for years.",
      "Use a soft brush, avoid abrasive whitening toothpaste, and consider a night guard if you clench or grind.",
      "Regular hygiene appointments reduce staining and keep margins clean, which is critical for long-term aesthetics.",
      "If you notice dullness, chips, or staining, small refinements can often restore the finish without major work.",
    ],
  },
  {
    slug: "alignment-whitening-bonding-pathway",
    title: "A Conservative Makeover: Alignment, Whitening, then Bonding",
    date: "2025-08-26",
    readTime: "6 min",
    excerpt:
      "Why sequencing matters—using orthodontics and whitening to minimize restoration size and maximize longevity.",
    tags: ["Orthodontics", "Whitening", "Planning"],
    content: [
      "Sequencing is a conversion of complexity into clarity. We start with tooth position, then color, then shape.",
      "By aligning first, bonding can be thinner and more durable. Whitening establishes a stable shade, so restorations match and blend.",
      "The result is typically more natural and more conservative than jumping straight to larger restorations.",
      "A well-planned pathway is often faster than a reactive one—because it reduces rework and compromises.",
    ],
  },
];

// -----------------------------
// Utilities
// -----------------------------

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

function useHashRoute() {
  const [hash, setHash] = useState(() => window.location.hash || "#/");

  useEffect(() => {
    const onHash = () => setHash(window.location.hash || "#/");
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  return hash;
}

function scrollToTop() {
  if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
}

// -----------------------------
// Design primitives
// -----------------------------

function GlowBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-24 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-white/20 blur-3xl" />
      <div className="absolute -left-40 top-24 h-[420px] w-[420px] rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -right-40 top-72 h-[520px] w-[520px] rounded-full bg-white/10 blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(80%_40%_at_50%_0%,rgba(255,255,255,0.20),rgba(255,255,255,0)_60%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.06),rgba(255,255,255,0.02),rgba(0,0,0,0))]" />
    </div>
  );
}

function GlassCard({ className, children }) {
  return (
    <div
      className={cx(
        "rounded-2xl border border-white/15 bg-white/10 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.25)]",
        className
      )}
    >
      {children}
    </div>
  );
}

function Pill({ children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-white/80 backdrop-blur">
      {children}
    </span>
  );
}

function PrimaryButton({ as = "a", href, onClick, children, className }) {
  const Comp = as;
  return (
    <Comp
      href={href}
      onClick={onClick}
      className={cx(
        "group inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/15 px-5 py-3 text-sm font-medium text-white shadow-sm backdrop-blur transition-all hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/40",
        className
      )}
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
    </Comp>
  );
}

function SecondaryButton({ as = "a", href, onClick, children, className }) {
  const Comp = as;
  return (
    <Comp
      href={href}
      onClick={onClick}
      className={cx(
        "inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-transparent px-5 py-3 text-sm font-medium text-white/90 backdrop-blur transition-all hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/40",
        className
      )}
    >
      {children}
    </Comp>
  );
}

function SectionHeading({ eyebrow, title, subtitle, align = "left" }) {
  return (
    <div className={cx("space-y-3", align === "center" ? "text-center" : "text-left")}>
      {eyebrow ? (
        <div className={cx("text-xs uppercase tracking-[0.22em] text-white/70")}>{eyebrow}</div>
      ) : null}
      <h2 className="text-2xl font-semibold text-white sm:text-3xl">{title}</h2>
      {subtitle ? <p className="max-w-2xl text-sm leading-relaxed text-white/75">{subtitle}</p> : null}
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
      <div className="text-lg font-semibold text-white">{value}</div>
      <div className="mt-1 text-xs text-white/70">{label}</div>
    </div>
  );
}

function Divider() {
  return <div className="h-px w-full bg-white/10" />;
}

// -----------------------------
// Navbar
// -----------------------------

function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div className="sticky top-0 z-50">
      <div className="border-b border-white/10 bg-black/20 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <a href="#/" className="group flex items-center gap-3" onClick={() => setOpen(false)}>
            <div className="relative grid h-10 w-10 place-items-center rounded-2xl border border-white/15 bg-white/10 shadow-sm">
              <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),rgba(255,255,255,0)_55%)]" />
              <Sparkles className="relative h-5 w-5 text-white/90" />
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold text-white">{BRAND.name}</div>
              <div className="text-[11px] text-white/70">Private Dentistry</div>
            </div>
          </a>

          <div className="hidden items-center gap-1 md:flex">
            {NAV.map((n) => (
              <a
                key={n.hash}
                href={n.hash}
                className="rounded-xl px-3 py-2 text-sm text-white/80 transition hover:bg-white/10 hover:text-white"
              >
                {n.label}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-2 md:flex">
            <SecondaryButton href={`mailto:${BRAND.email}`} className="px-4 py-2">
              <Mail className="h-4 w-4" />
              Email
            </SecondaryButton>
            <PrimaryButton href="#/contact" className="px-4 py-2">
              Book Consultation
            </PrimaryButton>
          </div>

          <button
            className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/10 p-2 text-white/90 backdrop-blur transition hover:bg-white/15 md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Open menu"
            aria-expanded={open}
          >
            <ChevronDown className={cx("h-5 w-5 transition-transform", open ? "rotate-180" : "rotate-0")} />
          </button>
        </div>

        <AnimatePresence>
          {open ? (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden"
            >
              <div className="mx-auto max-w-6xl px-4 pb-4 sm:px-6">
                <GlassCard className="p-3">
                  <div className="flex flex-col">
                    {NAV.map((n) => (
                      <a
                        key={n.hash}
                        href={n.hash}
                        onClick={() => setOpen(false)}
                        className="rounded-xl px-3 py-2 text-sm text-white/85 transition hover:bg-white/10"
                      >
                        {n.label}
                      </a>
                    ))}
                    <Divider />
                    <div className="mt-3 flex gap-2">
                      <SecondaryButton href={`mailto:${BRAND.email}`} className="flex-1 px-4 py-2">
                        Email
                      </SecondaryButton>
                      <PrimaryButton href="#/contact" className="flex-1 px-4 py-2">
                        Book
                      </PrimaryButton>
                    </div>
                  </div>
                </GlassCard>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}

// -----------------------------
// Home Page
// -----------------------------

function Home() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="space-y-16 pb-20">
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 sm:pt-14">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <div className="flex flex-wrap gap-2">
              <Pill>
                <Sparkles className="h-3.5 w-3.5" />
                Private Smile Design
              </Pill>
              <Pill>
                <ShieldCheck className="h-3.5 w-3.5" />
                Conservative-first planning
              </Pill>
              <Pill>
                <Calendar className="h-3.5 w-3.5" />
                Mon–Fri
              </Pill>
            </div>

            <h1 className="text-3xl font-semibold leading-tight text-white sm:text-4xl">
              Natural-looking cosmetic dentistry,
              <span className="text-white/80"> designed around your face.</span>
            </h1>

            <p className="max-w-xl text-sm leading-relaxed text-white/75">
              {BRAND.tagline} From alignment and whitening to bonding and veneers, every decision is guided
              by function, longevity, and a finish that looks unmistakably real.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <PrimaryButton href="#/contact" onClick={scrollToTop}>
                Book a Private Consultation
              </PrimaryButton>
              <SecondaryButton href="#/about" onClick={scrollToTop}>
                Meet Dr Brandon
              </SecondaryButton>
            </div>

            <div className="grid grid-cols-3 gap-3 max-w-lg">
              <Stat label="Conservative-first" value="Plan" />
              <Stat label="Natural layering" value="Finish" />
              <Stat label="Long-term" value="Outcome" />
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs text-white/70">
              <span className="inline-flex items-center gap-2">
                <Phone className="h-4 w-4" /> {BRAND.phone}
              </span>
              <span className="inline-flex items-center gap-2">
                <Mail className="h-4 w-4" /> {BRAND.email}
              </span>
            </div>
          </div>

          {/* 3D-inspired visual */}
          <div className="relative">
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
              animate={shouldReduceMotion ? false : { opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="relative"
            >
              <GlassCard className="relative overflow-hidden p-6">
                <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-white/15 blur-3xl" />
                <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

                <div className="relative space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="text-xs uppercase tracking-[0.22em] text-white/70">
                        Signature approach
                      </div>
                      <div className="text-lg font-semibold text-white">Facially-driven smile design</div>
                    </div>
                    <div className="rounded-2xl border border-white/15 bg-white/10 p-3">
                      <Star className="h-5 w-5 text-white/90" />
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {SERVICES.map((s) => {
                      const Icon = s.icon;
                      return (
                        <div
                          key={s.title}
                          className="group rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10"
                        >
                          <div className="flex items-start gap-3">
                            <div className="rounded-2xl border border-white/15 bg-white/10 p-2 shadow-sm">
                              <Icon className="h-5 w-5 text-white/90" />
                            </div>
                            <div className="space-y-1">
                              <div className="text-sm font-semibold text-white">{s.title}</div>
                              <div className="text-xs leading-relaxed text-white/70">{s.desc}</div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <Divider />

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="text-xs text-white/70">
                      Preferred pathway: Alignment → Whitening → Bonding (when appropriate)
                    </div>
                    <a
                      href="#/about"
                      onClick={scrollToTop}
                      className="inline-flex items-center gap-2 text-sm font-medium text-white/90 hover:text-white"
                    >
                      View methodology <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </GlassCard>

              {/* Tilted "3D" card */}
              <div className="pointer-events-none absolute -bottom-10 right-2 hidden md:block">
                <div className="relative rotate-2">
                  <GlassCard className="w-[280px] p-4">
                    <div className="flex items-center gap-3">
                      <div className="relative h-11 w-11 overflow-hidden rounded-2xl border border-white/15 bg-white/10">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),rgba(255,255,255,0)_55%)]" />
                        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.14),rgba(255,255,255,0.02))]" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white">Consultation-first</div>
                        <div className="text-xs text-white/70">
                          Clear plan, transparent options, clinically-led decisions.
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
          <SectionHeading
            eyebrow="Results that feel like you"
            title="A clinical plan built for longevity"
            subtitle="Aesthetic dentistry is most successful when function, biology, and artistry work together. We plan conservatively, communicate clearly, and execute precisely."
          />

          <GlassCard className="p-6">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-sm font-semibold text-white">Step 1</div>
                <div className="mt-1 text-xs leading-relaxed text-white/70">
                  Smile design consultation + records (photos, scans, diagnostics)
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-sm font-semibold text-white">Step 2</div>
                <div className="mt-1 text-xs leading-relaxed text-white/70">
                  Conservative pathway selection (alignment / whitening / restorations)
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-sm font-semibold text-white">Step 3</div>
                <div className="mt-1 text-xs leading-relaxed text-white/70">
                  Precision finish + aftercare plan for a stable, natural result
                </div>
              </div>
            </div>

            <Divider />

            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-xs text-white/70">Ready to discuss options for your smile?</div>
              <PrimaryButton href="#/contact" onClick={scrollToTop} className="px-4 py-2">
                Request a callback
              </PrimaryButton>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Patient experience"
          title="Subtle changes. Significant confidence."
          subtitle="Every plan is individual. These are representative experiences and do not guarantee outcomes."
          align="center"
        />

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {TESTIMONIALS.map((t, idx) => (
            <GlassCard key={idx} className="p-6 transition hover:bg-white/15">
              <div className="flex items-center gap-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-white/90" />
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-white/80">“{t.quote}”</p>
              <div className="mt-4 text-xs text-white/60">— {t.name}</div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* CTA strip */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <GlassCard className="p-6 sm:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <div className="text-xs uppercase tracking-[0.22em] text-white/70">Private dentistry</div>
              <div className="text-xl font-semibold text-white">Start with a consultation and a clear plan.</div>
              <div className="text-sm text-white/75">Call {BRAND.phone} or email {BRAND.email}.</div>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <SecondaryButton href={BRAND.instagram} className="px-4 py-2" target="_blank" rel="noreferrer">
                <Instagram className="h-4 w-4" />
                Instagram
              </SecondaryButton>
              <PrimaryButton href="#/contact" onClick={scrollToTop} className="px-4 py-2">
                Book now
              </PrimaryButton>
            </div>
          </div>
        </GlassCard>
      </section>
    </div>
  );
}

// -----------------------------
// About Page
// -----------------------------

function About() {
  return (
    <div className="space-y-12 pb-20">
      <section className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 sm:pt-14">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <SectionHeading
              eyebrow="About"
              title="Clinical precision with an artist’s eye"
              subtitle="Dr Charles Brandon focuses on smile design and the disciplines that support it—alignment, whitening, bonding, veneers, and gum aesthetics—delivered with conservative planning and meticulous finishing."
            />

            <GlassCard className="p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                {BRAND.highlights.map((h) => (
                  <div key={h} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 text-white/90" />
                    <div className="text-sm text-white/80">{h}</div>
                  </div>
                ))}
              </div>
              <Divider />
              <p className="mt-4 text-sm leading-relaxed text-white/75">
                The objective is consistency: a result that photographs beautifully, functions comfortably, and ages
                gracefully. Consultations prioritize clarity—what matters, what is optional, and what will best protect
                tooth structure.
              </p>
            </GlassCard>

            <div className="flex flex-col gap-3 sm:flex-row">
              <PrimaryButton href="#/contact" onClick={scrollToTop}>
                Discuss your goals
              </PrimaryButton>
              <SecondaryButton href="#/blog" onClick={scrollToTop}>
                Read insights
              </SecondaryButton>
            </div>
          </div>

          {/* “3D” portrait placeholder */}
          <div className="relative">
            <GlassCard className="overflow-hidden p-6">
              <div className="relative">
                <div className="absolute -right-16 -top-10 h-64 w-64 rounded-full bg-white/15 blur-3xl" />
                <div className="absolute -bottom-16 -left-12 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

                <div className="relative rounded-2xl border border-white/10 bg-white/5 p-5">
                  <div className="text-xs uppercase tracking-[0.22em] text-white/70">Profile</div>
                  <div className="mt-2 text-lg font-semibold text-white">{BRAND.name}</div>
                  <div className="text-sm text-white/75">{BRAND.role}</div>

                  <Divider />

                  <div className="mt-4 space-y-3 text-sm text-white/75">
                    <p>
                      Smile design is a blend of disciplines—orthodontics, restorative dentistry, and periodontal
                      aesthetics—aligned to facial dynamics.
                    </p>
                    <p>
                      When appropriate, conservative sequencing (alignment → whitening → bonding) reduces restoration
                      size and improves longevity.
                    </p>
                  </div>

                  <div className="mt-5 grid gap-3">
                    <a
                      href={`mailto:${BRAND.email}`}
                      className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/85 transition hover:bg-white/10"
                    >
                      <span className="inline-flex items-center gap-2">
                        <Mail className="h-4 w-4" /> {BRAND.email}
                      </span>
                      <ArrowRight className="h-4 w-4 opacity-70 transition group-hover:translate-x-0.5" />
                    </a>
                    <a
                      href={`tel:${BRAND.phone.replace(/\s/g, "")}`}
                      className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/85 transition hover:bg-white/10"
                    >
                      <span className="inline-flex items-center gap-2">
                        <Phone className="h-4 w-4" /> {BRAND.phone}
                      </span>
                      <ArrowRight className="h-4 w-4 opacity-70 transition group-hover:translate-x-0.5" />
                    </a>
                  </div>
                </div>

                {/* Decorative "3D" shard */}
                <div className="pointer-events-none absolute -right-8 bottom-6 hidden md:block">
                  <div className="h-24 w-24 rotate-12 rounded-3xl border border-white/15 bg-white/10 backdrop-blur-xl" />
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <GlassCard className="p-6">
            <SectionHeading
              eyebrow="Philosophy"
              title="Refine, don’t mask"
              subtitle="Aesthetic work should respect natural tooth anatomy, light behavior, and tissue health."
            />
            <div className="mt-5 space-y-4 text-sm leading-relaxed text-white/75">
              <p>
                The most compelling cosmetic results appear effortless. That typically means fewer irreversible steps,
                better sequencing, and meticulous finishing—particularly at the margins, surface texture, and polish.
              </p>
              <p>
                Planning is collaborative: we define objectives, evaluate trade-offs, and choose a pathway that aligns
                with your time horizon and maintenance preferences.
              </p>
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <SectionHeading
              eyebrow="What to expect"
              title="A calm, structured process"
              subtitle="Designed to reduce uncertainty and keep decisions clinically-led."
            />
            <div className="mt-5 grid gap-3">
              {[
                {
                  title: "Consultation",
                  desc: "Discuss goals, suitability, timelines, and options."
                },
                {
                  title: "Records & planning",
                  desc: "Photos/scans guide proportion, shade, and functional stability."
                },
                {
                  title: "Treatment & finish",
                  desc: "Precision execution with an aftercare plan to protect longevity."
                },
              ].map((i) => (
                <div key={i.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-sm font-semibold text-white">{i.title}</div>
                  <div className="mt-1 text-xs leading-relaxed text-white/70">{i.desc}</div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </section>
    </div>
  );
}

// -----------------------------
// Blog Page (list + single)
// -----------------------------

function Blog() {
  const [q, setQ] = useState("");
  const [tag, setTag] = useState("all");

  const tags = useMemo(() => {
    const t = new Set();
    BLOG_POSTS.forEach((p) => p.tags.forEach((x) => t.add(x)));
    return ["all", ...Array.from(t).sort((a, b) => a.localeCompare(b))];
  }, []);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return BLOG_POSTS.filter((p) => {
      const hitQ =
        !query ||
        p.title.toLowerCase().includes(query) ||
        p.excerpt.toLowerCase().includes(query) ||
        p.tags.some((t) => t.toLowerCase().includes(query));
      const hitT = tag === "all" || p.tags.includes(tag);
      return hitQ && hitT;
    }).sort((a, b) => (a.date < b.date ? 1 : -1));
  }, [q, tag]);

  return (
    <div className="space-y-12 pb-20">
      <section className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 sm:pt-14">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Blog"
            title="Clinical insights and planning principles"
            subtitle="Short reads designed to explain the thinking behind conservative, natural-looking cosmetic dentistry."
          />
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="relative">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search posts"
                className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/50 outline-none backdrop-blur focus:ring-2 focus:ring-white/30 sm:w-72"
              />
            </div>
            <select
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white outline-none backdrop-blur focus:ring-2 focus:ring-white/30"
            >
              {tags.map((t) => (
                <option key={t} value={t} className="bg-black">
                  {t === "all" ? "All topics" : t}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {filtered.map((p) => (
            <a key={p.slug} href={`#/blog/${p.slug}`} onClick={scrollToTop}>
              <GlassCard className="h-full p-6 transition hover:bg-white/15">
                <div className="flex items-center justify-between text-xs text-white/60">
                  <span>{new Date(p.date).toLocaleDateString()}</span>
                  <span>{p.readTime}</span>
                </div>
                <div className="mt-3 text-lg font-semibold text-white">{p.title}</div>
                <p className="mt-2 text-sm leading-relaxed text-white/75">{p.excerpt}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-white/75"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-white/90">
                  Read <ArrowRight className="h-4 w-4" />
                </div>
              </GlassCard>
            </a>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="mt-10 text-sm text-white/70">No posts match your search.</div>
        ) : null}
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <GlassCard className="p-6 sm:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <div className="text-xs uppercase tracking-[0.22em] text-white/70">Next step</div>
              <div className="text-xl font-semibold text-white">Prefer a direct conversation?</div>
              <div className="text-sm text-white/75">Book a private consultation to discuss options and sequencing.</div>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <SecondaryButton href={`mailto:${BRAND.email}`} className="px-4 py-2">
                Email
              </SecondaryButton>
              <PrimaryButton href="#/contact" onClick={scrollToTop} className="px-4 py-2">
                Book consultation
              </PrimaryButton>
            </div>
          </div>
        </GlassCard>
      </section>
    </div>
  );
}

function BlogPost({ slug }) {
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 sm:pt-14 pb-20">
        <GlassCard className="p-6">
          <div className="text-lg font-semibold text-white">Post not found</div>
          <p className="mt-2 text-sm text-white/75">The article may have been moved.</p>
          <div className="mt-5">
            <PrimaryButton href="#/blog" onClick={scrollToTop}>
              Back to Blog
            </PrimaryButton>
          </div>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-20">
      <section className="mx-auto max-w-3xl px-4 pt-10 sm:px-6 sm:pt-14">
        <a href="#/blog" onClick={scrollToTop} className="text-sm text-white/75 hover:text-white">
          ← Back to blog
        </a>
        <h1 className="mt-4 text-3xl font-semibold text-white">{post.title}</h1>
        <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-white/60">
          <span>{new Date(post.date).toLocaleDateString()}</span>
          <span>•</span>
          <span>{post.readTime}</span>
          <span>•</span>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((t) => (
              <span key={t} className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-white/75">
                {t}
              </span>
            ))}
          </div>
        </div>

        <GlassCard className="mt-6 p-6">
          <div className="space-y-4 text-sm leading-relaxed text-white/80">
            {post.content.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="mt-6 p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-sm font-semibold text-white">Discuss your own case</div>
              <div className="mt-1 text-xs text-white/70">Every smile is different—book a consultation for tailored advice.</div>
            </div>
            <PrimaryButton href="#/contact" onClick={scrollToTop} className="px-4 py-2">
              Book consultation
            </PrimaryButton>
          </div>
        </GlassCard>
      </section>
    </div>
  );
}

// -----------------------------
// Contact Page
// -----------------------------

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const isValid =
    form.name.trim().length >= 2 &&
    /.+@.+\..+/.test(form.email.trim()) &&
    form.message.trim().length >= 10;

  function update(k, v) {
    setForm((s) => ({ ...s, [k]: v }));
  }

  function onSubmit(e) {
    e.preventDefault();
    if (!isValid) return;
    setSubmitted(true);

    // Conversion-friendly: prepare a mailto draft (works without backend)
    const subject = encodeURIComponent("Private Consultation Request");
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\n\nMessage:\n${form.message}`
    );
    window.location.href = `mailto:${BRAND.email}?subject=${subject}&body=${body}`;
  }

  return (
    <div className="space-y-12 pb-20">
      <section className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 sm:pt-14">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div className="space-y-6">
            <SectionHeading
              eyebrow="Contact"
              title="Book a private consultation"
              subtitle="Share your goals and preferred timing. You will receive a response as soon as possible during business hours."
            />

            <GlassCard className="p-6">
              <div className="grid gap-3">
                <a
                  href={`tel:${BRAND.phone.replace(/\s/g, "")}`}
                  className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/85 transition hover:bg-white/10"
                >
                  <span className="inline-flex items-center gap-2">
                    <Phone className="h-4 w-4" /> {BRAND.phone}
                  </span>
                  <ArrowRight className="h-4 w-4 opacity-70 transition group-hover:translate-x-0.5" />
                </a>
                <a
                  href={`mailto:${BRAND.email}`}
                  className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/85 transition hover:bg-white/10"
                >
                  <span className="inline-flex items-center gap-2">
                    <Mail className="h-4 w-4" /> {BRAND.email}
                  </span>
                  <ArrowRight className="h-4 w-4 opacity-70 transition group-hover:translate-x-0.5" />
                </a>
                <a
                  href={BRAND.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/85 transition hover:bg-white/10"
                >
                  <span className="inline-flex items-center gap-2">
                    <Instagram className="h-4 w-4" /> Instagram
                  </span>
                  <ArrowRight className="h-4 w-4 opacity-70 transition group-hover:translate-x-0.5" />
                </a>
              </div>

              <Divider />

              <div className="mt-4 space-y-2 text-sm text-white/75">
                <div className="inline-flex items-center gap-2">
                  <Calendar className="h-4 w-4" /> Opening hours: {BRAND.hours}
                </div>
                <div className="inline-flex items-center gap-2">
                  <MapPin className="h-4 w-4" /> Location: Kent, England (private appointments)
                </div>
              </div>
            </GlassCard>
          </div>

          <GlassCard className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-lg font-semibold text-white">Consultation request</div>
                <div className="mt-1 text-xs text-white/70">Fields marked * are required.</div>
              </div>
              {submitted ? (
                <Pill>
                  <CheckCircle2 className="h-3.5 w-3.5" /> Sent
                </Pill>
              ) : null}
            </div>

            <form className="mt-5 grid gap-3" onSubmit={onSubmit}>
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Full name *">
                  <input
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/50 outline-none backdrop-blur focus:ring-2 focus:ring-white/30"
                    placeholder="Your name"
                    required
                  />
                </Field>
                <Field label="Email *">
                  <input
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/50 outline-none backdrop-blur focus:ring-2 focus:ring-white/30"
                    placeholder="name@email.com"
                    required
                  />
                </Field>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Phone (optional)">
                  <input
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/50 outline-none backdrop-blur focus:ring-2 focus:ring-white/30"
                    placeholder="+44 …"
                  />
                </Field>
                <Field label="Topic">
                  <select
                    className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white outline-none backdrop-blur focus:ring-2 focus:ring-white/30"
                    onChange={(e) => {
                      const topic = e.target.value;
                      if (!form.message.includes("Topic:")) {
                        update("message", `Topic: ${topic}\n\n${form.message}`.trim());
                      } else {
                        update("message", form.message.replace(/Topic:.*\n\n/, `Topic: ${topic}\n\n`));
                      }
                    }}
                    defaultValue="Smile design consultation"
                  >
                    <option className="bg-black">Smile design consultation</option>
                    <option className="bg-black">Composite bonding / veneers</option>
                    <option className="bg-black">Alignment / whitening</option>
                    <option className="bg-black">General enquiry</option>
                  </select>
                </Field>
              </div>

              <Field label="Message *">
                <textarea
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  className="min-h-[140px] w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/50 outline-none backdrop-blur focus:ring-2 focus:ring-white/30"
                  placeholder="Tell us what you'd like to change, any relevant timing, and whether you have a specific event/date in mind."
                  required
                />
              </Field>

              <div className="mt-1 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-xs text-white/60">
                  By submitting, you consent to being contacted regarding your enquiry.
                </div>
                <button
                  type="submit"
                  disabled={!isValid}
                  className={cx(
                    "inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 px-5 py-3 text-sm font-medium text-white shadow-sm backdrop-blur transition",
                    isValid ? "bg-white/15 hover:bg-white/20" : "bg-white/5 opacity-60 cursor-not-allowed"
                  )}
                >
                  Send request <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </form>
          </GlassCard>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <GlassCard className="p-6 sm:p-8">
          <div className="grid gap-6 md:grid-cols-3">
            {["Clear plan", "Conservative options", "Refined finish"].map((h) => (
              <div key={h} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="text-sm font-semibold text-white">{h}</div>
                <div className="mt-2 text-xs leading-relaxed text-white/70">
                  A structured consultation designed to reduce uncertainty and focus on longevity.
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </section>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="grid gap-2">
      <span className="text-xs text-white/70">{label}</span>
      {children}
    </label>
  );
}

// -----------------------------
// Footer
// -----------------------------

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/20 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-3">
            <div className="text-sm font-semibold text-white">{BRAND.name}</div>
            <div className="text-xs text-white/70">Private dentistry focused on natural-looking smile design.</div>
            <div className="flex flex-wrap gap-2">
              <Pill>
                <Phone className="h-3.5 w-3.5" /> {BRAND.phone}
              </Pill>
              <Pill>
                <Mail className="h-3.5 w-3.5" /> {BRAND.email}
              </Pill>
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-xs uppercase tracking-[0.22em] text-white/70">Pages</div>
            <div className="grid gap-2">
              {NAV.map((n) => (
                <a key={n.hash} href={n.hash} onClick={scrollToTop} className="text-sm text-white/80 hover:text-white">
                  {n.label}
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-xs uppercase tracking-[0.22em] text-white/70">Notes</div>
            <div className="text-xs leading-relaxed text-white/65">
              This site is a template. Replace placeholder testimonials, add clinic address and booking link, and connect
              the contact form to your preferred CRM (e.g., Webhook, Zapier, or a serverless endpoint).
            </div>
            <div className="flex gap-2">
              <SecondaryButton href={BRAND.instagram} className="px-4 py-2" target="_blank" rel="noreferrer">
                <Instagram className="h-4 w-4" /> Instagram
              </SecondaryButton>
            </div>
          </div>
        </div>

        <Divider />

        <div className="mt-6 flex flex-col gap-2 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <div>© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</div>
          <div className="text-white/45">Optimised for performance: minimal assets, CSS-first visuals, and motion that respects reduced-motion.</div>
        </div>
      </div>
    </footer>
  );
}

// -----------------------------
// App Shell + Router
// -----------------------------

function RouteView({ hash }) {
  // routes: #/ , #/about , #/contact , #/blog , #/blog/:slug
  const parts = (hash || "#/").replace(/^#\//, "").split("/").filter(Boolean);
  const page = parts[0] || "";

  if (page === "about") return <About />;
  if (page === "contact") return <Contact />;
  if (page === "blog" && parts.length >= 2) return <BlogPost slug={parts[1]} />;
  if (page === "blog") return <Blog />;
  return <Home />;
}

export default function App() {
  const hash = useHashRoute();
  const reduce = useReducedMotion();

  useEffect(() => {
    // Ensure default route
    if (!window.location.hash) window.location.hash = "#/";
  }, []);

  return (
    <div className="min-h-screen bg-[#07090f] text-white">
      <GlowBackdrop />
      <Navbar />

      <main className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={hash}
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={reduce ? false : { opacity: 1, y: 0 }}
            exit={reduce ? false : { opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <RouteView hash={hash} />
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
