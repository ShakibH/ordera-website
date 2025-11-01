import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compliance",
  description: "Compliance by design: PHIPA, SOC‑2, ISO‑9001 integrated into delivery.",
  alternates: { canonical: "/compliance" },
};

export default function ComplianceLayout({ children }: { children: React.ReactNode }) {
  return children;
}


