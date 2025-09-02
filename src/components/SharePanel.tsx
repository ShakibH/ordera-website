"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Link2, Twitter, Linkedin, Facebook, Mail } from "lucide-react";

type Props = {
  title: string;
};

export default function SharePanel({ title }: Props) {
  const [href, setHref] = React.useState<string>("/");
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setHref(window.location.href);
    }
  }, []);

  const open = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(href);
      alert("Link copied");
    } catch {
      /* no-op */
    }
  };

  const encodedUrl = encodeURIComponent(href);
  const encodedTitle = encodeURIComponent(title);

  return (
    <aside className="hidden md:block sticky top-24 self-start">
      <div className="flex flex-col gap-4 text-sm">
        <Link href="/blog" className="inline-flex items-center gap-2 hover:underline">
          <ArrowLeft className="size-4" /> All posts
        </Link>
        <div className="mt-2 text-muted-foreground">Share</div>
        <div className="flex flex-col gap-2">
          <button className="inline-flex items-center gap-2 hover:underline" onClick={() => open(`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`)} aria-label="Share on X">
            <Twitter className="size-4" /> X
          </button>
          <button className="inline-flex items-center gap-2 hover:underline" onClick={() => open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`)} aria-label="Share on LinkedIn">
            <Linkedin className="size-4" /> LinkedIn
          </button>
          <button className="inline-flex items-center gap-2 hover:underline" onClick={() => open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`)} aria-label="Share on Facebook">
            <Facebook className="size-4" /> Facebook
          </button>
          <button className="inline-flex items-center gap-2 hover:underline" onClick={() => open(`mailto:?subject=${encodedTitle}&body=${encodedUrl}`)} aria-label="Share via Email">
            <Mail className="size-4" /> Email
          </button>
          <button className="inline-flex items-center gap-2 hover:underline" onClick={onCopy} aria-label="Copy link">
            <Link2 className="size-4" /> Copy link
          </button>
        </div>
      </div>
    </aside>
  );
}


