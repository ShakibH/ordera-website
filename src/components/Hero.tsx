import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const DEFAULT_HERO_IMAGE = process.env.NEXT_PUBLIC_HERO_IMAGE_URL || "/rocket-hero.jpg";

export default function Hero() {
  const [heroSrc, setHeroSrc] = React.useState<string>(`${DEFAULT_HERO_IMAGE}?v=1`);
  return (
    <section id="hero" className="relative isolate overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={heroSrc}
          alt="Rocket launch"
          fill
          priority
          className="object-cover"
          unoptimized={heroSrc.startsWith("http")}
          onError={() => setHeroSrc("/placeholder/hero.svg")}
        />
        {/* Legibility overlay: left-to-right dark fade */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/20 to-transparent" />
      </div>

      <div className="mx-auto max-w-7xl px-6 pt-24 pb-16 md:pt-28 md:pb-24">
        {/* Pill */}
        <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/20 px-4 py-2 backdrop-blur-md text-white/90">
          <span className="h-2 w-2 rounded-full" style={{ background: 'var(--accent-hex)' }}></span>
          <span>Your roadmap to AI adoption</span>
        </div>

        {/* Headline */}
        <h1 className="mt-6 text-5xl md:text-7xl font-extrabold text-white drop-shadow leading-[0.95] md:leading-[0.9] max-w-3xl">
          <span>Big-firm</span><br />
          <span>consulting,</span><br />
          <span style={{ color: 'var(--accent-hex)' }}>scaled to fit</span><br />
          <span>your business</span>
        </h1>

        {/* Subheadline */}
        <p className="mt-6 max-w-3xl text-lg md:text-xl text-white/90">
        Get expert support in product management, workflow automation, and compliance—tailored for lean teams ready to scale.
        </p>

        {/* CTAs */}
        <div className="mt-8 flex items-center gap-4">
          <Link href="/contact" className="btn btn-primary">Get Free Audit</Link>
          <Link href="/services" className="btn btn-outline">Explore Services</Link>
        </div>
      </div>

      {/* Blog Card (glassmorphism) */}
      <aside className="pointer-events-auto absolute right-6 top-40 w-[420px] max-w-[90vw] rounded-2xl border p-6 shadow-lg backdrop-blur-md md:right-12 md:top-48" style={{ background: 'var(--glass-bg)', borderColor: 'var(--glass-border)' }}>
        <div className="flex h-9 w-9 items-center justify-center rounded-full text-white text-xl" style={{ background: 'var(--accent-hex)' }}>→</div>
        <h3 className="mt-4 text-xl font-semibold" style={{ color: 'var(--text-hex)' }}>Ordera Blog</h3>
        <p className="mt-2 text-[15px] leading-6" style={{ color: 'var(--muted-hex)' }}>
          Insights on AI strategy, compliance, and scaling your business with cutting-edge automation.
        </p>
        <Link href="/blog" className="mt-3 inline-flex items-center gap-1 font-medium" style={{ color: 'var(--accent-hex)' }}>Read insights <span aria-hidden>→</span></Link>
      </aside>
    </section>
  )
}
