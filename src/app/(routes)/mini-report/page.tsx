"use client";
export default function MiniReportPage() {
  return (
    <div className="container-page py-16 md:py-24">
      <h1 className="display text-4xl font-semibold tracking-tight">Mini Report</h1>
      <p className="mt-3 text-muted-foreground max-w-2xl">A short monthly brief on AI, automation, and compliance. Join the list to receive it in your inbox.</p>
      <form className="mt-6 flex w-full max-w-xl items-center gap-3" onSubmit={async (e) => {
        e.preventDefault();
        const form = e.currentTarget as HTMLFormElement;
        const input = form.querySelector("input[type=email]") as HTMLInputElement | null;
        const email = input?.value || "";
        await fetch("/api/newsletter", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
        if (input) input.value = "";
        alert("Thanks for subscribing!");
      }}>
        <input type="email" required placeholder="Work email" className="w-full rounded-xl border px-4 py-2.5" aria-label="Email" />
        <button className="btn-primary btn-glow px-5 py-2.5 rounded-xl">Subscribe</button>
      </form>
    </div>
  );
}


