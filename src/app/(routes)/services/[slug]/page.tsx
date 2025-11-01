import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ContactFormClient from "./ContactFormClient";

const services = [
  { title: "AI Strategy & Roadmaps", slug: "ai-strategy-roadmaps", desc: "From discovery to prioritization and ROI modeling." },
  { title: "Model Selection & Tuning", slug: "model-selection-tuning", desc: "Pick and fine‑tune models that match your risk profile." },
  { title: "Workflow Automation", slug: "workflow-automation", desc: "Intake, triage, RPA, and agentic back‑office tasks." },
  { title: "Data & Integrations", slug: "data-integrations", desc: "Connect EHR/EMR, CRM, and ERP with secure patterns." },
  { title: "Enablement & Training", slug: "enablement-training", desc: "Playbooks and workshops your team actually uses." },
  { title: "Compliance by Design", slug: "compliance-by-design", desc: "PHIPA, SOC‑2, ISO‑9001 baked into delivery." },
];

type Params = { slug: string };

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const svc = services.find((s) => s.slug === params.slug);
  if (!svc) return {};
  return {
    title: svc.title,
    description: svc.desc,
    alternates: { canonical: `/services/${svc.slug}` },
  };
}

export default function ServiceDetailPage({ params }: { params: Params }) {
  const svc = services.find((s) => s.slug === params.slug);
  if (!svc) return notFound();

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
          <h2 className="text-xl font-semibold">Contact</h2>
          <p className="mt-2 text-muted-foreground">We’ll help you decide if and how AI fits your roadmap.</p>
          <ContactFormClient />
        </div>
      </div>
    </div>
  );
}


