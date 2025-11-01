import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quick Plan Quiz",
  description: "Answer three quick questions to get a tailored AI plan.",
  alternates: { canonical: "/quiz" },
};

export default function QuizLayout({ children }: { children: React.ReactNode }) {
  return children;
}


