"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, Tag } from "lucide-react";

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO
  readMins: number;
  category: string;
  image: string;
  imageAlt: string;
};

const allPosts: Post[] = [
  {
    slug: "empowering-employees-with-ai",
    title: "Empowering Employees with AI and Automations",
    excerpt:
      "Practical strategies to give teams more leverage with AI. Free people from repetitive tasks, improve accuracy, and build a culture of continuous improvement.",
    date: "2025-09-05",
    readMins: 7,
    category: "AI Adoption",
    image: "/Empowering Employees with AI.png",
    imageAlt: "Hands-on employee enablement with AI and automations",
  },
  {
    slug: "building-trust-in-ai",
    title: "Building Trust in AI - Why Ethical AI and Governance Matter for Your Company",
    excerpt:
      "Practical strategies for building trust in AI. Learn why ethical AI and governance matter, with steps to avoid bias, protect privacy, and meet compliance.",
    date: "2025-08-28",
    readMins: 8,
    category: "AI Ethics",
    image: "/building trust in AI.png",
    imageAlt: "Human and robot hands reaching toward each other over a starry sky",
  },
  {
    slug: "safe-ai-adoption-five-rules",
    title: "Safe AI Adoption: Five Rules",
    excerpt:
      "Navigate AI adoption safely with five proven rules. From risk assessment to governance, learn how to harness AI without compromising trust.",
    date: "2025-08-20",
    readMins: 6,
    category: "AI Strategy",
    image: "/safe AI adoption.png",
    imageAlt: "Rocket launching through clouds at sunrise",
  },
];

const featured = [...allPosts]
  .sort((a, b) => +new Date(b.date) - +new Date(a.date))
  .slice(0, 2);
const more = allPosts.filter((p) => !featured.some((f) => f.slug === p.slug));

export default function BlogPage() {
  return (
    <div className="container-page pt-10 md:pt-12 pb-20 md:pb-28">
      <header>
        <h1 className="display text-4xl font-semibold tracking-tight md:text-5xl">Blog</h1>
        <p className="mt-2 text-muted-foreground max-w-2xl">Practical, no‑nonsense insights on AI, automation, and compliance for modern businesses.</p>
      </header>

      {/* Featured Articles */}
      <section className="mt-8">
        <h2 className="text-xl font-semibold">Featured Articles</h2>
        <div className="mt-4 grid gap-6 md:grid-cols-2">
          {featured.map((p, i) => (
            <div key={p.slug} className="hover-glow group">
              <motion.article
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="card overflow-hidden hover:shadow-xl transition-all"
              >
                <Link href={`/blog/${p.slug}`} className="block group/image">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image src={p.image} alt={p.imageAlt} fill className="object-cover transition-transform duration-500 group-hover/image:scale-105 group-hover:scale-105" />
                    <div className="absolute left-3 top-3 rounded-full px-2 py-1 text-xs font-medium shadow" style={{ background: 'var(--accent-hex)', color: 'white' }}>{p.category}</div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground group-hover/image:scale-[1.01] transition-transform">
                      <span className="inline-flex items-center gap-1"><Calendar className="size-3" /> {new Date(p.date).toLocaleDateString()}</span>
                      <span className="inline-flex items-center gap-1"><Clock className="size-3" /> {p.readMins} min read</span>
                    </div>
                    <h3 className="mt-3 text-lg md:text-xl font-semibold transition-colors group-hover/image:text-[var(--accent-hex)]">{p.title}</h3>
                    <p className="mt-2 text-muted-foreground leading-6">{p.excerpt}</p>
                    <span className="mt-3 inline-flex items-center gap-1 text-[var(--accent-hex)] font-medium">Read Article <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></span>
                  </div>
                </Link>
              </motion.article>
            </div>
          ))}
        </div>
      </section>

      {/* More Articles */}
      {more.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-semibold">More Articles</h2>
          <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((p, i) => (
              <div key={p.slug} className="hover-glow group">
                <motion.article
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  className="card overflow-hidden hover:shadow-lg transition-all"
                >
                  <Link href={`/blog/${p.slug}`} className="block group/image">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image src={p.image} alt={p.imageAlt} fill className="object-cover transition-transform duration-500 group-hover/image:scale-105 group-hover:scale-105" />
                      <div className="absolute left-3 top-3 rounded-full px-2 py-1 text-xs font-medium shadow inline-flex items-center gap-1" style={{ background: 'var(--accent-hex)', color: 'white' }}><Tag className="size-3" /> {p.category}</div>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-4 text-xs text-muted-foreground transition-transform group-hover/image:scale-[1.01]">
                        <span className="inline-flex items-center gap-1"><Calendar className="size-3" /> {new Date(p.date).toLocaleDateString()}</span>
                        <span className="inline-flex items-center gap-1"><Clock className="size-3" /> {p.readMins} min read</span>
                      </div>
                      <h3 className="mt-2 text-base font-semibold leading-tight transition-colors group-hover/image:text-[var(--accent-hex)]">{p.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p>
                      <span className="mt-3 inline-flex items-center gap-1 text-[var(--accent-hex)] font-medium">Read Article <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></span>
                    </div>
                  </Link>
                </motion.article>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Newsletter CTA */}
      <section className="mt-16">
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="relative overflow-hidden rounded-2xl border static-glow">
          <div className="absolute inset-0 bg-newsletter" />
          <div className="absolute inset-0 bg-white/60" />
          <div className="relative p-8 md:p-12 text-center">
            <h3 className="display text-3xl">Subscribe to Ordera Brief</h3>
            <p className="mt-2 text-muted-foreground">Monthly insights on AI, automation, and compliance that actually matter.</p>
            <form
              className="mx-auto mt-6 flex w-full max-w-xl flex-col sm:flex-row items-center gap-3"
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.currentTarget as HTMLFormElement;
                const emailInput = form.querySelector("input[type=email]") as HTMLInputElement | null;
                const email = emailInput?.value || "";
                await fetch("/api/newsletter", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
                if (emailInput) emailInput.value = "";
                alert("Thanks for subscribing!");
              }}
            >
              <input type="email" placeholder="Work email" className="w-full sm:flex-1 rounded-xl border px-4 py-2.5" aria-label="Email" required />
              <button className="btn-primary btn-glow px-5 py-2.5 rounded-xl w-full sm:w-auto">Subscribe</button>
            </form>
          </div>
        </motion.div>
      </section>
    </div>
  );
}


