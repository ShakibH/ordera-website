"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import type { MotionProps, Transition } from "framer-motion";
import { Bot, Workflow, Layers, ShieldCheck, GraduationCap, Settings } from "lucide-react";

const ease: Transition["ease"] = [0.22, 1, 0.36, 1];
const fadeUp: MotionProps = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease },
};

export default function ServicesPage() {
  const services = [
    { title: "AI Strategy & Roadmaps", slug: "ai-strategy-roadmaps", icon: Layers, desc: "From discovery to prioritization and ROI modeling." },
    { title: "Model Selection & Tuning", slug: "model-selection-tuning", icon: Bot, desc: "Pick and fine‑tune models that match your risk profile." },
    { title: "Workflow Automation", slug: "workflow-automation", icon: Workflow, desc: "Intake, triage, RPA, and agentic back‑office tasks." },
    { title: "Data & Integrations", slug: "data-integrations", icon: Settings, desc: "Connect EHR/EMR, CRM, and ERP with secure patterns." },
    { title: "Enablement & Training", slug: "enablement-training", icon: GraduationCap, desc: "Playbooks and workshops your team actually uses." },
    { title: "Compliance by Design", slug: "compliance-by-design", icon: ShieldCheck, desc: "PHIPA, SOC‑2, ISO‑9001 baked into delivery." },
  ];

  return (
    <div className="container-page pt-10 md:pt-12 pb-16 md:pb-24">
      <motion.h1 {...fadeUp} className="text-4xl font-semibold tracking-tight md:text-5xl">Services</motion.h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">Designed for SMBs ready to capture value quickly—and safely.</p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <motion.article
            key={s.title}
            {...fadeUp}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
            className="card glow p-0 hover:shadow-xl overflow-hidden"
          >
            <Link href={`/services/${s.slug}`} className="block p-6 focus:outline-none focus:ring-2 focus:ring-[var(--accent-hex)]">
              <s.icon className="size-6 text-[var(--accent-hex)]" />
              <h2 className="mt-4 text-xl font-semibold">{s.title}</h2>
              <p className="mt-2 text-muted-foreground">{s.desc}</p>
            </Link>
          </motion.article>
        ))}
      </div>
    </div>
  );
}


