"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const links = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/compliance", label: "Compliance" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Image src="/logo.png?v=1" alt="Ordera" width={28} height={28} className="rounded-full" />
          <span className="sr-only">Ordera</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 mx-auto">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm ${pathname === l.href ? "text-rose-600" : "hover:text-rose-600"}`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:block">
          <Link href="/contact" className="btn-primary btn-glow px-5 py-2 rounded-xl text-sm">Get Free Audit</Link>
        </div>
        <button className="md:hidden" aria-label="Menu" onClick={() => setOpen((s) => !s)}>
          <Menu />
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t bg-white">
          <div className="container-page flex flex-col py-3">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="px-2 py-2 hover:text-rose-600" onClick={() => setOpen(false)}>
                {l.label}
              </Link>
            ))}
            <Link href="/contact" className="btn-primary mt-2 px-4 py-2 w-max" onClick={() => setOpen(false)}>Get Free Audit</Link>
          </div>
        </div>
      )}
    </header>
  );
}


