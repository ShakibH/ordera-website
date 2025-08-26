"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Enter a valid work email"),
  message: z.string().min(10, "Tell us a bit more"),
});

type FormValues = z.infer<typeof schema>;

export default function ContactPage() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(values: FormValues) {
    await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(values) });
    alert("Thanks! We'll be in touch.");
    reset();
  }

  return (
    <div className="bg-white">
      <div className="container-page py-16 md:py-24">
        <div className="mx-auto w-full max-w-2xl">
          <h1 className="display text-4xl font-semibold tracking-tight">Contact</h1>
          <p className="mt-3 text-muted-foreground">We’ll help you decide if and how AI fits your roadmap.</p>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
            <input placeholder="Your name" className="w-full rounded-xl border px-5 py-3" {...register("name")} aria-invalid={!!errors.name} />
            {errors.name && <p className="text-sm text-[var(--accent-hex)]">{errors.name.message}</p>}
            <input placeholder="Work email" type="email" className="w-full rounded-xl border px-5 py-3" {...register("email")} aria-invalid={!!errors.email} />
            {errors.email && <p className="text-sm text-[var(--accent-hex)]">{errors.email.message}</p>}
            <textarea placeholder="What problem are you trying to solve?" className="w-full rounded-xl border px-5 py-3 min-h-36" {...register("message")} />
            {errors.message && <p className="text-sm text-[var(--accent-hex)]">{errors.message.message}</p>}
            <button disabled={isSubmitting} className="btn-primary btn-glow px-5 py-2.5 rounded-xl w-full">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
}


