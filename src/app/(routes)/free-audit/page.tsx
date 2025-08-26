export default function FreeAuditPage() {
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const input = form.querySelector("input[type=email]") as HTMLInputElement | null;
    const email = input?.value || "";
    await fetch("/api/audit", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
    if (input) input.value = "";
    alert("Thanks! We'll reach out about your audit.");
  }

  return (
    <div className="container-page py-16 md:py-24">
      <h1 className="display text-4xl font-semibold tracking-tight">Free Audit</h1>
      <p className="mt-3 text-muted-foreground max-w-2xl">Get a quick assessment of where automation and AI can save time and cost in your workflows.</p>
      <form className="mt-6 flex w-full max-w-xl items-center gap-3" onSubmit={submit}>
        <input type="email" required placeholder="Work email" className="w-full rounded-xl border px-4 py-2.5" aria-label="Email" />
        <button className="btn-primary btn-glow px-5 py-2.5 rounded-xl">Request audit</button>
      </form>
    </div>
  );
}


