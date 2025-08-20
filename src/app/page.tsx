"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { MotionProps, Transition } from "framer-motion";
import { Rocket, Shield, Workflow } from "lucide-react";

const ease: Transition["ease"] = [0.22, 1, 0.36, 1];
const fadeUp: MotionProps = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease },
};

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ backgroundColor: "#fbd8dd" }}>
        <div className="container-page relative py-20 md:py-28 grid gap-10 md:grid-cols-2 md:items-center">
          <motion.div {...fadeUp} className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-3 py-1 text-rose-600 ring-1 ring-rose-100">
              <Rocket className="size-4" /> Your roadmap to AI adoption
            </span>
            <h1 className="display mt-6 text-5xl font-semibold tracking-tight md:text-6xl">
              Big-firm consulting, scaled to fit your business.
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
              Ordera brings enterprise-grade AI strategy and compliance expertise to SMBs—without the bloated costs.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact" className="btn-primary btn-glow px-5 py-2.5">
                Get Free Audit
              </Link>
              <Link href="/services" className="btn-outline btn-glow px-5 py-2.5">
                Explore services
              </Link>
            </div>
          </motion.div>
          <motion.div {...fadeUp} className="relative aspect-[4/3] md:aspect-[16/10] overflow-hidden rounded-3xl shadow-lg">
            <Image src="/placeholder/hero.svg" alt="Hero" fill priority className="object-cover" />
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="container-page py-16 md:py-24">
        <div className="flex items-end justify-between">
          <motion.h2 {...fadeUp} className="display text-4xl font-semibold tracking-tight">
            Services that move the needle
          </motion.h2>
          <motion.div {...fadeUp}>
            <Link href="/services" className="text-rose-600 hover:underline text-sm font-medium">View all</Link>
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
                <item.icon className="size-6 text-rose-600" />
                <h3 className="mt-4 text-xl font-semibold">{item.title}</h3>
                <p className="mt-2 text-muted-foreground">{item.desc}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Newsletter (moved here) */}
      <section className="container-page pb-24">
        <motion.div {...fadeUp} className="relative overflow-hidden rounded-2xl border static-glow">
          <div className="absolute inset-0 bg-gradient-to-b from-rose-50/80 to-white" />
          <div className="relative p-8 md:p-12 text-center">
            <h3 className="display text-3xl">Stay sharp with Ordera Brief</h3>
            <p className="mt-2 text-muted-foreground">Monthly insights on AI, automation, and compliance that actually matter.</p>
            <form
              className="mx-auto mt-6 flex w-full max-w-xl items-center gap-3"
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
              <input type="email" placeholder="Work email" className="flex-1 rounded-xl border px-4 py-2.5" aria-label="Email" required />
              <button className="btn-primary btn-glow px-5 py-2.5 rounded-xl">
                Subscribe
              </button>
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
                <div className="h-2 rounded-full bg-rose-500" style={{ width: s.value.replace('%','') + '%' }} />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Promo banner (with updated copy) */}
      <section className="container-page pb-16">
        <motion.div {...fadeUp} className="card static-glow p-6 md:p-8 bg-gradient-to-r from-white to-rose-50/60">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex-1">
              <div className="text-sm text-rose-600 font-semibold">Limited offer</div>
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

      {/* Testimonials */}
      <section className="container-page pb-20">
        <motion.h2 {...fadeUp} className="display text-4xl font-semibold tracking-tight">What clients say</motion.h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {["Ordera helped us automate intake while staying PHIPA-compliant.", "We shipped faster and cut ops costs in a month.", "They brought structure and warmth—rare combo."].map((quote, i) => (
            <motion.figure key={i} {...fadeUp} className="card p-6">
              <blockquote className="text-lg">“{quote}”</blockquote>
              <figcaption className="mt-4 text-sm text-muted-foreground">Jane Park · Clinic Director · HealthCo</figcaption>
            </motion.figure>
          ))}
        </div>
      </section>

      

      {/* Contact on Home */}
      <section className="container-page pb-24">
        <motion.div {...fadeUp} className="relative overflow-hidden rounded-2xl border static-glow">
          <div className="absolute inset-0 bg-gradient-to-b from-rose-50/70 to-white" />
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
    <div className="text-3xl font-semibold text-rose-600">
      {sign < 0 ? "−" : ""}
      {Math.abs(display)}
      {isPercent ? "%" : ""}
    </div>
  );
}
