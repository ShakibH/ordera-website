import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mini Report",
  description: "A short monthly brief on AI, automation, and compliance.",
  alternates: { canonical: "/mini-report" },
};

export default function MiniReportLayout({ children }: { children: React.ReactNode }) {
  return children;
}


