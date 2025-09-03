"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import type { MotionProps, Transition } from "framer-motion";
import { Rocket, Shield, Workflow, ChevronDown } from "lucide-react";

const ease: Transition["ease"] = [0.22, 1, 0.36, 1];
const fadeUp: MotionProps = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease },
};

const DEFAULT_HERO_IMAGE = process.env.NEXT_PUBLIC_HERO_IMAGE_URL || "/rocket-hero.jpg";

export default function Home() {
  const [heroSrc, setHeroSrc] = React.useState<string>(`${DEFAULT_HERO_IMAGE}?v=1`);
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 1200], [0, 320]);
  return (
    <div>
      {/* New Rocket Hero */}
      <section className="relative isolate overflow-hidden">
        <motion.div className="absolute inset-0 -z-10" style={{ y: parallaxY }}>
          <Image
            src={heroSrc}
            alt="Rocket launch"
            fill
            priority
            className="object-cover"
            unoptimized={heroSrc.startsWith("http")}
            onError={() => setHeroSrc("/placeholder/hero.svg")}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/20 to-transparent" />
        </motion.div>
        <div className="container-page relative py-10 md:py-28 grid gap-10 md:grid-cols-2 md:items-center">
          <motion.div {...fadeUp} className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/20 px-3 py-1 text-white/90 backdrop-blur">
              <Rocket className="size-4" /> Your roadmap to AI adoption
            </span>
            <h1 className="display mt-6 text-5xl md:text-7xl font-extrabold tracking-tight text-white drop-shadow leading-[0.95] md:leading-[0.9]">
              <span>Big-firm</span><br />
              <span>consulting,</span><br />
              <span style={{ color: 'var(--accent-hex)' }}>scaled to fit</span><br />
              <span>your</span><br />
              <span>business.</span>
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-white/90">
              Ordera brings enterprise-grade AI strategy and compliance expertise to SMBs—without the bloated costs.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact" className="btn btn-primary px-5 py-2.5">Get Free Audit</Link>
              <Link href="/services" className="btn btn-outline px-5 py-2.5">Explore services</Link>
            </div>
          </motion.div>
        </div>
        {/* Scroll indicator */}
        <motion.a href="#services" className="absolute left-1/2 -translate-x-1/2 bottom-6 text-white/80 text-xs tracking-[0.2em] uppercase inline-flex items-center gap-2" aria-label="Scroll to explore"
          animate={{ y: [0, 4, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}>
          SCROLL TO EXPLORE <ChevronDown className="size-4 text-[var(--accent-hex)]" />
        </motion.a>
        <div className="md:absolute md:inset-x-0 md:top-48">
          <div className="container-page flex justify-end">
            <div className="pointer-events-auto w-[420px] max-w-full rounded-2xl border p-6 shadow-lg backdrop-blur-md mx-4 mt-6 mb-8 md:mx-0 md:mt-0 md:mb-0" style={{ background: 'var(--glass-bg)', borderColor: 'var(--glass-border)' }}>
              <div className="flex h-9 w-9 items-center justify-center rounded-full text-white text-xl" style={{ background: 'var(--accent-hex)' }}>→</div>
              <h3 className="mt-4 text-xl font-semibold" style={{ color: '#111' }}>Ordera Blog</h3>
              <p className="mt-2 text-[15px] leading-6" style={{ color: '#6b7280' }}>
                Insights on AI strategy, compliance, and scaling your business with cutting-edge automation.
              </p>
              <Link href="/blog" className="mt-3 inline-flex items-center gap-1 font-medium" style={{ color: 'var(--accent-hex)' }}>Read insights <span aria-hidden>→</span></Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="container-page py-16 md:py-24">
        <div className="flex items-end justify-between">
          <motion.h2 {...fadeUp} className="display text-4xl font-semibold tracking-tight">
            Services that <span className="block sm:inline">move the needle</span>
          </motion.h2>
          <motion.div {...fadeUp}>
            <Link href="/services" className="text-[var(--accent-hex)] hover:underline text-sm font-medium">View all</Link>
          </motion.div>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "AI Strategy", slug: "ai-strategy-roadmaps", icon: Rocket, desc: "Roadmaps and ROI modeling." },
            { title: "Automation", slug: "workflow-automation", icon: Workflow, desc: "RPA, intake, back-office." },
            { title: "Compliance", slug: "compliance-by-design", icon: Shield, desc: "PHIPA, SOC‑2, ISO‑9001 by design." },
          ].map((item) => (
            <motion.div key={item.title} {...fadeUp}>
              <Link href={`/services/${item.slug}`} className="card block p-6 hover:shadow-xl transition-all hover:-translate-y-0.5 static-glow">
                <item.icon className="size-6 text-[var(--accent-hex)]" />
                <h3 className="mt-4 text-xl font-semibold">{item.title}</h3>
                <p className="mt-2 text-muted-foreground">{item.desc}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Promo banner (moved above Newsletter) */}
      <section className="container-page pb-16">
        <motion.div {...fadeUp} className="card static-glow p-6 md:p-8 bg-gradient-to-r from-white to-[rgba(255,59,48,0.06)]">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex-1">
              <div className="text-sm text-[var(--accent-hex)] font-semibold">Limited offer</div>
              <h3 className="display mt-2 text-3xl">Claim your free AI and automation audit ($499 value, 10 spots only)</h3>
              <p className="mt-2 text-muted-foreground">Identify bottlenecks, reduce costs, and improve delivery speed in under 14 days.</p>
            </div>
            <form
              className="flex w-full md:w-auto items-center gap-3"
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.currentTarget as HTMLFormElement;
                const emailInput = form.querySelector("input[type=email]") as HTMLInputElement | null;
                const email = emailInput?.value || "";
                await fetch("/api/audit", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
                if (emailInput) emailInput.value = "";
                alert("Thanks! We'll reach out about your audit.");
              }}
            >
              <input type="email" placeholder="Work email" className="w-full md:w-80 rounded-xl border px-4 py-2.5" aria-label="Email" required />
              <button className="btn-primary btn-glow px-5 py-2.5 rounded-xl">Get my audit</button>
            </form>
          </div>
        </motion.div>
      </section>

      

      {/* Stats */}
      <section className="container-page pb-20">
        <motion.h2 {...fadeUp} className="display text-2xl font-semibold mb-4">Average output from our projects</motion.h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Lead time saved", value: "52%" },
            { label: "Ops cost reduction", value: "18%" },
            { label: "Throughput", value: "27%" },
            { label: "Manual steps", value: "−12" },
          ].map((s) => (
            <motion.div key={s.label} {...fadeUp} className="card p-6">
              <AnimatedNumber value={s.value} />
              <div className="mt-2 text-muted-foreground">{s.label}</div>
              <div className="mt-4 h-2 w-full rounded-full bg-muted">
                <div className="h-2 rounded-full bg-[var(--accent-hex)]" style={{ width: s.value.replace('%','') + '%' }} />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Newsletter (moved here between Stats and Testimonials; mobile-friendly form) */}
      <section className="container-page pb-24">
        <motion.div {...fadeUp} className="relative overflow-hidden rounded-2xl border static-glow">
          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(255,59,48,0.08)] to-white" />
          <div className="relative p-8 md:p-12 text-center">
            <h3 className="display text-3xl">Stay sharp with Ordera Brief</h3>
            <p className="mt-2 text-muted-foreground">Monthly insights on AI, automation, and compliance that actually matter.</p>
            <form
              className="mx-auto mt-6 flex w-full max-w-xl flex-col sm:flex-row items-center gap-3"
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.currentTarget as HTMLFormElement;
                const emailInput = form.querySelector("input[type=email]") as HTMLInputElement | null;
                const email = emailInput?.value || "";
                await fetch("/api/newsletter", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
                if (emailInput) emailInput.value = "";
                alert("Thanks for subscribing!");
              }}
            >
              <input type="email" placeholder="Work email" className="w-full sm:flex-1 rounded-xl border px-4 py-2.5" aria-label="Email" required />
              <button className="btn-primary btn-glow px-5 py-2.5 rounded-xl w-full sm:w-auto">
                Subscribe
              </button>
            </form>
          </div>
        </motion.div>
      </section>

      

      {/* Testimonials */}
      <section className="container-page pb-20">
        <motion.h2 {...fadeUp} className="display text-4xl font-semibold tracking-tight">What clients say</motion.h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {[
            { quote: "Ordera helped us automate intake while staying PHIPA-compliant.", name: "Maya Singh", title: "Clinic Director", company: "HealthCo" },
            { quote: "We shipped faster and cut ops costs in a month.", name: "Ethan Brooks", title: "Head of Engineering", company: "NorthPeak" },
            { quote: "They brought structure and warmth—rare combo.", name: "Lena Morales", title: "Operations Lead", company: "Atlas Manufacturing" },
          ].map((t, i) => (
            <motion.figure key={i} {...fadeUp} className="card p-6">
              <blockquote className="text-lg">“{t.quote}”</blockquote>
              <figcaption className="mt-4 text-sm text-muted-foreground">{t.name} · {t.title} · {t.company}</figcaption>
            </motion.figure>
          ))}
        </div>
      </section>

      

      {/* Contact on Home */}
      <section className="container-page pb-24">
        <motion.div {...fadeUp} className="relative overflow-hidden rounded-2xl border static-glow">
          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(255,59,48,0.07)] to-white" />
          <div className="relative p-8 md:p-12 text-center">
            <h3 className="display text-3xl">Contact</h3>
            <p className="mt-2 text-muted-foreground">We’ll help you decide if and how AI fits your roadmap.</p>
            <form
              className="mx-auto mt-6 w-full max-w-2xl grid gap-4"
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.currentTarget as HTMLFormElement;
                const name = (form.querySelector('input[name="name"]') as HTMLInputElement | null)?.value || "";
                const email = (form.querySelector('input[name="email"]') as HTMLInputElement | null)?.value || "";
                const message = (form.querySelector('textarea[name="message"]') as HTMLTextAreaElement | null)?.value || "";
                await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, email, message }) });
                form.reset();
                alert("Thanks! We'll be in touch.");
              }}
            >
              <input name="name" placeholder="Your name" className="w-full rounded-xl border px-5 py-3" />
              <input name="email" placeholder="Work email" type="email" className="w-full rounded-xl border px-5 py-3" />
              <textarea name="message" placeholder="What problem are you trying to solve?" className="w-full rounded-xl border px-5 py-3 min-h-36" />
              <button className="btn-primary btn-glow px-5 py-2.5 rounded-xl w-full">Send</button>
            </form>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

function AnimatedNumber({ value }: { value: string }) {
  const isPercent = value.includes("%");
  const numeric = parseInt(value.replace(/[^0-9-]/g, ""), 10);
  const sign = value.includes("−") || value.startsWith("-") ? -1 : 1;
  const target = numeric * sign;
  const [display, setDisplay] = React.useState(0);
  React.useEffect(() => {
    let frame: number;
    const start = performance.now();
    const duration = 900;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(target * eased));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target]);
  return (
    <div className="text-3xl font-semibold text-[var(--accent-hex)]">
      {sign < 0 ? "−" : ""}
      {Math.abs(display)}
      {isPercent ? "%" : ""}
    </div>
  );
}
