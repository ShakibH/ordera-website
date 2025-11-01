'use client';

export default function ContactFormClient() {
  return (
    <form
      className="mt-4 grid gap-3"
      onSubmit={async (e) => {
        e.preventDefault();
        const form = e.currentTarget as HTMLFormElement;
        const name = (form.querySelector('input[name="name"]') as HTMLInputElement | null)?.value || "";
        const email = (form.querySelector('input[name="email"]') as HTMLInputElement | null)?.value || "";
        const message = (form.querySelector('textarea[name="message"]') as HTMLTextAreaElement | null)?.value || "";
        await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, email, message }) });
        form.reset();
        alert("Thanks! We'll be in touch.");
      }}
    >
      <input name="name" placeholder="Your name" className="w-full rounded-xl border px-4 py-2.5" />
      <input name="email" placeholder="Work email" type="email" className="w-full rounded-xl border px-4 py-2.5" />
      <textarea name="message" placeholder="What problem are you trying to solve?" className="w-full rounded-xl border px-4 py-2.5 min-h-28" />
      <button className="btn-primary btn-glow px-5 py-2.5 rounded-xl w-full">Send</button>
    </form>
  );
}


