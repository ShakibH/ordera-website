"use client";
import { useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

const services = [
  { title: "AI Strategy & Roadmaps", slug: "ai-strategy-roadmaps", desc: "From discovery to prioritization and ROI modeling." },
  { title: "Model Selection & Tuning", slug: "model-selection-tuning", desc: "Pick and fine‑tune models that match your risk profile." },
  { title: "Workflow Automation", slug: "workflow-automation", desc: "Intake, triage, RPA, and agentic back‑office tasks." },
  { title: "Data & Integrations", slug: "data-integrations", desc: "Connect EHR/EMR, CRM, and ERP with secure patterns." },
  { title: "Enablement & Training", slug: "enablement-training", desc: "Playbooks and workshops your team actually uses." },
  { title: "Compliance by Design", slug: "compliance-by-design", desc: "PHIPA, SOC‑2, ISO‑9001 baked into delivery." },
];

export default function ServiceDetailPage() {
  const params = useParams();
  const slug = String(params?.slug || "");
  const svc = useMemo(() => services.find((s) => s.slug === slug), [slug]);

  if (!svc) {
    return (
      <div className="container-page py-16 md:py-24">
        <h1 className="text-3xl font-semibold">Service not found</h1>
        <p className="mt-2 text-muted-foreground">Please go back to <Link href="/services" className="text-[var(--accent-hex)] underline">Services</Link>.</p>
      </div>
    );
  }

  return (
    <div className="container-page py-16 md:py-24">
      <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">{svc.title}</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">{svc.desc}</p>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="card p-6">
          <h2 className="text-xl font-semibold">What we include</h2>
          <ul className="mt-3 list-disc pl-5 text-muted-foreground">
            <li>Discovery, current-state assessment</li>
            <li>Prioritized roadmap with ROI and risk</li>
            <li>Recommended architecture and vendors</li>
          </ul>
        </div>
        <div className="card p-6">
          <h2 className="text-xl font-semibold">Get a free audit</h2>
          <form className="mt-3 flex gap-3" onSubmit={async (e) => {
            e.preventDefault();
            const form = e.currentTarget as HTMLFormElement;
            const input = form.querySelector("input[type=email]") as HTMLInputElement | null;
            const email = input?.value || "";
            await fetch("/api/audit", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
            if (input) input.value = "";
            alert("Thanks! We'll reach out about your audit.");
          }}>
            <input type="email" required placeholder="Work email" className="w-full rounded-xl border px-4 py-2.5" aria-label="Email" />
            <button className="btn-primary btn-glow px-5 py-2.5 rounded-xl">Request</button>
          </form>
        </div>
      </div>
    </div>
  );
}


