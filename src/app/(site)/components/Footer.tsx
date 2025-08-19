import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-24 border-t">
      <div className="container-page py-12 grid gap-8 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 font-semibold"><span className="inline-block size-3 rounded-full bg-rose-600"/> Ordera</div>
          <p className="mt-3 text-sm text-muted-foreground max-w-xs">AI consulting and automation for health, tech, and manufacturing. Clear. Compliant. ROI-focused.</p>
        </div>
        <div>
          <h3 className="font-semibold">Company</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link href="/services">Services</Link></li>
            <li><Link href="/compliance">Compliance</Link></li>
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold">Resources</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>Style Guide</li>
            <li>Mini Report</li>
            <li>Free Audit</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold">Legal</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>Privacy</li>
            <li>Terms</li>
          </ul>
        </div>
      </div>
      <div className="border-t py-6 text-center text-sm text-muted-foreground">© 2025 Ordera. All rights reserved.</div>
    </footer>
  );
}


