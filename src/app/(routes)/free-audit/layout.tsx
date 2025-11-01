import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Audit",
  description: "Claim your free AI and automation audit to find quick wins.",
  alternates: { canonical: "/free-audit" },
};

export default function FreeAuditLayout({ children }: { children: React.ReactNode }) {
  return children;
}


