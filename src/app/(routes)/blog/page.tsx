"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const posts = [
  {
    slug: "building-trust-in-ai",
    title: "Building Trust in AI - Why Ethical AI and Governance Matter for Your Company",
    excerpt:
      "Practical strategies for building trust in AI. Learn why ethical AI and governance matter, with steps to avoid bias, protect privacy, and meet compliance.",
    date: "2025-09-02",
    image: "/building trust in AI.png",
  },
  {
    slug: "safe-ai-adoption-five-rules",
    title: "Safe AI Adoption: Five Rules",
    excerpt:
      "Practical and safe AI adoption for small business owners. I share five golden rules with frameworks, examples, and a checklist for real-world use.",
    date: "2025-09-02",
    image: "/safe AI adoption.png",
  },
];

export default function BlogPage() {
  return (
    <div className="container-page pt-10 md:pt-12 pb-16 md:pb-24">
      <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">Blog</h1>
      <p className="mt-2 text-muted-foreground">Practical, no‑nonsense insights.</p>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {posts.map((p) => (
          <motion.article key={p.slug} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="card overflow-hidden">
            <Link href={`/blog/${p.slug}`} className="block">
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image src={p.image} alt={p.title} fill className="object-cover transition-transform duration-300 hover:scale-105" />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-semibold">{p.title}</h2>
                <p className="mt-2 text-muted-foreground">{p.excerpt}</p>
                <div className="mt-3 text-sm text-muted-foreground">{new Date(p.date).toLocaleDateString()}</div>
              </div>
            </Link>
          </motion.article>
        ))}
      </div>
    </div>
  );
}


