import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-page py-20">
      <h1 className="text-4xl font-semibold tracking-tight">Page not found</h1>
      <p className="mt-2 text-muted-foreground">The page you’re looking for doesn’t exist. Go back to the home page or explore our services.</p>
      <div className="mt-6 flex gap-3">
        <Link href="/" className="btn btn-primary px-5 py-2.5">Home</Link>
        <Link href="/services" className="btn btn-outline px-5 py-2.5">Services</Link>
      </div>
    </div>
  );
}


