"use client";

import React from "react";

export default function PostContactForm() {
  return (
    <section className="mt-10">
      <div className="relative overflow-hidden rounded-2xl border static-glow">
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(255,59,48,0.07)] to-white" />
        <div className="relative p-6 md:p-8">
          <h3 className="display text-2xl md:text-3xl text-center">Have a question about this topic?</h3>
          <p className="mt-2 text-muted-foreground text-center">Send a note and we'll follow up within 1 business day.</p>
          <form
            className="mx-auto mt-6 w-full max-w-2xl grid gap-4"
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
            <input name="name" placeholder="Your name" className="w-full rounded-xl border px-5 py-3" />
            <input name="email" placeholder="Work email" type="email" className="w-full rounded-xl border px-5 py-3" />
            <textarea name="message" placeholder="What would you like to discuss?" className="w-full rounded-xl border px-5 py-3 min-h-36" />
            <button className="btn-primary btn-glow px-5 py-2.5 rounded-xl w-full">Send</button>
          </form>
        </div>
      </div>
    </section>
  );
}


