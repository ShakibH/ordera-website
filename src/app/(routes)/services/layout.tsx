import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description: "AI strategy, automation, and compliance services for SMBs.",
  alternates: { canonical: "/services" },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}


