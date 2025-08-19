import Image from "next/image";
import { notFound } from "next/navigation";

const posts = {
  "roi-from-ai": {
    title: "How SMBs get real ROI from AI",
    date: "2025-06-30",
    author: "Ordera Team",
    body: `
## Focus on value, not hype

Start with a small, high-ROI workflow. Measure lead-time and error-rate.

> Clear success metrics beat vague innovation goals.

### Playbook
1. Map the process
2. Pick a narrow slice
3. Ship within 30 days
4. Measure and iterate

![placeholder](/placeholder/hero.svg)
`,
  },
};

type Params = { slug: string };
type Props = { params: Promise<Params> };

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = (posts as Record<string, { title: string; date: string; author: string; body: string }>)[slug];
  if (!post) return notFound();

  return (
    <article className="container-page py-10 md:py-16">
      <div className="relative aspect-[16/7] overflow-hidden rounded-2xl">
        <Image src="/placeholder/hero.svg" alt="" fill className="object-cover" />
      </div>
      <h1 className="mt-8 text-4xl font-semibold tracking-tight md:text-5xl">{post.title}</h1>
      <div className="mt-2 text-sm text-muted-foreground">By {post.author} • {new Date(post.date).toLocaleDateString()}</div>
      <div className="prose prose-neutral mt-6" dangerouslySetInnerHTML={{ __html: markdownToHtml(post.body) }} />

      <hr className="my-10" />
      <h2 className="text-2xl font-semibold">Related articles</h2>
      <ul className="mt-3 list-disc pl-5">
        {Object.entries(posts).filter(([key]) => key !== slug).map(([key, p]) => (
          <li key={key}><a className="underline" href={`/blog/${key}`}>{(p as {title:string}).title}</a></li>
        ))}
      </ul>
    </article>
  );
}

// Tiny markdown renderer for demo purposes only
function markdownToHtml(md: string): string {
  return md
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>')
    .replace(/\n\n- (.*$)/gim, '<ul><li>$1</li></ul>')
    .replace(/^\d+\. (.*$)/gim, '<li>$1</li>')
    .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
    .replace(/\*(.*)\*/gim, '<em>$1</em>')
    .replace(/!\[(.*?)\]\((.*?)\)/gim, '<img alt="$1" src="$2" />')
    .replace(/\n/g, '<br />');
}


