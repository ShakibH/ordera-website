import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Practical insights on AI strategy, automation, and compliance.",
  alternates: { canonical: "/blog" },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}


