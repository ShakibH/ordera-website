export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO
  readMins: number;
  category: string;
  image: string;
  imageAlt: string;
};

export const allPosts: Post[] = [
  {
    slug: "rise-of-digital-co-workers",
    title: "The Rise of Digital Co-Workers: How Autonomous AI Agents Are Changing Enterprise Workflows",
    excerpt:
      "Autonomous AI agents are entering everyday SaaS. How 'digital co-workers' streamline workflows, raise productivity, and how to adopt them safely.",
    date: "2025-10-07",
    readMins: 8,
    category: "AI Operations",
    image: "/Rise of Digital Co-Workers.png",
    imageAlt: "Illustration of AI agents collaborating with workers across SaaS tools",
  },
  {
    slug: "ethical-ai-legal-by-design",
    title: "Ethical AI, Legal by Design: A Practical Playbook for Aligning AI with Privacy Laws",
    excerpt:
      "A practical playbook to align AI ethics with privacy and regulation using GDPR, DPIAs, NIST AI RMF, and ISO standards.",
    date: "2025-09-06",
    readMins: 9,
    category: "AI Ethics",
    image: "/Ethical AI, Blog 4.png",
    imageAlt: "Soft orange clouds representing ethical AI by design",
  },
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

export function getLatestPosts(count: number = 3): Post[] {
  return [...allPosts]
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))
    .slice(0, count);
}


