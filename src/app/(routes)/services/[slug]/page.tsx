"use client";
import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

type Service = {
  title: string;
  summary: string;
  bullets: string[];
};

const services: Record<string, Service> = {
  "ai-strategy-roadmaps": {
    title: "AI Strategy & Roadmaps",
    summary: "From discovery to prioritization and ROI modeling—pragmatic plans your execs will sign off on.",
    bullets: [
      "Stakeholder discovery and use‑case inventory",
      "Prioritization matrix and ROI model",
      "Delivery roadmap with risks & controls",
    ],
  },
  "model-selection-tuning": {
    title: "Model Selection & Tuning",
    summary: "Select and fine‑tune models that match your risk profile and quality targets.",
    bullets: [
      "Model landscape and trade‑off analysis",
      "Fine‑tuning and evaluation pipeline",
      "Cost/performance guardrails",
    ],
  },
  "workflow-automation": {
    title: "Workflow Automation",
    summary: "Automate intake, triage, and back‑office tasks while preserving auditability.",
    bullets: [
      "Process mapping and quick‑win candidates",
      "RPA/agent architectures",
      "Runbooks and rollback patterns",
    ],
  },
  "data-integrations": {
    title: "Data & Integrations",
    summary: "Connect EHR/EMR, CRM, and ERP with secure, observable patterns.",
    bullets: [
      "Secure integration patterns",
      "Observability and lineage",
      "Data contracts and versioning",
    ],
  },
  "enablement-training": {
    title: "Enablement & Training",
    summary: "Playbooks and workshops your team actually uses, from builders to compliance.",
    bullets: [
      "Role‑based playbooks",
      "Hands‑on workshops",
      "Change management support",
    ],
  },
  "compliance-by-design": {
    title: "Compliance by Design",
    summary: "PHIPA, SOC‑2, ISO‑9001 controls integrated into delivery from day one.",
    bullets: [
      "Control mapping to workflows",
      "Evidence automation",
      "Audit‑ready documentation",
    ],
  },
};

export default function ServiceDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug as string;
  const service = services[slug];

  if (!service) {
    return (
      <div className="container-page py-16 md:py-24">
        <h1 className="text-2xl font-semibold">Service not found</h1>
        <p className="mt-2 text-muted-foreground">Please choose a service from the list.</p>
        <Link href="/services" className="btn-primary mt-6 inline-block px-5 py-2.5 rounded-xl">Back to Services</Link>
      </div>
    );
  }

  return (
    <div className="container-page py-16 md:py-24">
      <div className="max-w-3xl">
        <h1 className="display text-4xl font-semibold tracking-tight md:text-5xl">{service.title}</h1>
        <p className="mt-4 text-lg text-muted-foreground">{service.summary}</p>
        <ul className="mt-6 list-disc pl-6 space-y-2 text-muted-foreground">
          {service.bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      </div>

      {/* Contact form at bottom */}
      <div className="mt-16">
        <h2 className="text-2xl font-semibold">Ready to discuss {service.title}?</h2>
        <p className="mt-2 text-muted-foreground">We’ll help you decide if and how it fits your roadmap.</p>
        <form
          className="mt-6 grid gap-4 max-w-2xl"
          onSubmit={async (e) => {
            e.preventDefault();
            const form = e.currentTarget as HTMLFormElement;
            const name = (form.querySelector('input[name="name"]') as HTMLInputElement | null)?.value || "";
            const email = (form.querySelector('input[name="email"]') as HTMLInputElement | null)?.value || "";
            const message = (form.querySelector('textarea[name="message"]') as HTMLTextAreaElement | null)?.value || "";
            await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, email, message: `[${service.title}] ` + message }) });
            form.reset();
            alert("Thanks! We'll be in touch.");
          }}
        >
          <input name="name" placeholder="Your name" className="w-full rounded-xl border px-5 py-3" />
          <input name="email" placeholder="Work email" type="email" className="w-full rounded-xl border px-5 py-3" />
          <textarea name="message" placeholder="What problem are you trying to solve?" className="w-full rounded-xl border px-5 py-3 min-h-36" />
          <button className="btn-primary btn-glow px-5 py-2.5 rounded-xl w-full md:w-auto">Send</button>
        </form>
      </div>
    </div>
  );
}


