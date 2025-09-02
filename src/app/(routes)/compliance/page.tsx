"use client";
import { motion } from "framer-motion";
import type { MotionProps, Transition } from "framer-motion";

const ease: Transition["ease"] = [0.22, 1, 0.36, 1];
const fadeUp: MotionProps = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease },
};

const sections = [
  {
    title: "PHIPA for Clinics",
    bullets: ["PHI handling patterns", "Consent & logging", "Vendor due diligence"],
  },
  {
    title: "SOC-2 for SaaS",
    bullets: ["Controls mapped to workflows", "Evidence automation", "Runbooks & training"],
  },
  {
    title: "ISO-9001",
    bullets: ["Process quality & KPIs", "CAPA loops", "Audit readiness"],
  },
];

export default function CompliancePage() {
  return (
    <div className="container-page pt-10 md:pt-12 pb-16 md:pb-24">
      <motion.h1 {...fadeUp} className="text-4xl font-semibold tracking-tight md:text-5xl">Compliance</motion.h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">Build trust while you build automation. Controls and documentation integrated into delivery.</p>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {sections.map((sec) => (
          <motion.section key={sec.title} {...fadeUp} className="card p-6">
            <h2 className="text-xl font-semibold">{sec.title}</h2>
            <ul className="mt-4 list-disc pl-5 text-muted-foreground space-y-1">
              {sec.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </motion.section>
        ))}
      </div>
    </div>
  );
}


