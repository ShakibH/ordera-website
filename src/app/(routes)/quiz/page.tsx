"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Answer = {
  industry?: string;
  goal?: string;
  timeline?: string;
};

const steps = ["Your industry", "Your goal", "Timeline"] as const;

export default function QuizPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answer>({});
  const pct = Math.round(((step + 1) / steps.length) * 100);

  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  async function submit() {
    await fetch("/api/quiz", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(answers),
    });
    alert("Thanks! We’ll follow up with a tailored plan.");
  }

  return (
    <div className="container-page py-16 md:py-24">
      <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">Quick Plan Quiz</h1>
      <p className="mt-2 text-muted-foreground">3 quick questions. No fluff.</p>

      <div className="card mt-6 p-6">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div>Step {step + 1} of {steps.length}</div>
          <div>{pct}%</div>
        </div>
        <div className="mt-3 h-2 w-full rounded-full bg-muted">
          <div className="h-2 rounded-full bg-rose-500 transition-all" style={{ width: `${pct}%` }} />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
          >
            {step === 0 && (
              <div className="mt-6">
                <h2 className="text-2xl font-semibold">Your industry</h2>
                <div className="mt-4 grid gap-3">
                  {["Health", "Tech", "Manufacturing", "Other"].map((opt) => (
                    <button
                      key={opt}
                      className={`w-full rounded-xl border px-5 py-3 text-rose-700 bg-rose-50 hover:bg-rose-100 ${answers.industry === opt ? "ring-2 ring-rose-500" : ""}`}
                      onClick={() => setAnswers((a) => ({ ...a, industry: opt }))}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {step === 1 && (
              <div className="mt-6">
                <h2 className="text-2xl font-semibold">Your primary goal</h2>
                <div className="mt-4 grid gap-3">
                  {["Ship something in 30 days", "Cut ops cost", "Improve quality", "Explore"].map((opt) => (
                    <button
                      key={opt}
                      className={`w-full rounded-xl border px-5 py-3 hover:bg-muted ${answers.goal === opt ? "ring-2 ring-rose-500" : ""}`}
                      onClick={() => setAnswers((a) => ({ ...a, goal: opt }))}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {step === 2 && (
              <div className="mt-6">
                <h2 className="text-2xl font-semibold">Timeline</h2>
                <div className="mt-4 grid gap-3">
                  {["Now", "This quarter", "This year"].map((opt) => (
                    <button
                      key={opt}
                      className={`w-full rounded-xl border px-5 py-3 hover:bg-muted ${answers.timeline === opt ? "ring-2 ring-rose-500" : ""}`}
                      onClick={() => setAnswers((a) => ({ ...a, timeline: opt }))}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-6 flex justify-between">
          <button onClick={back} className="btn-outline px-5 py-2.5" disabled={step === 0}>Back</button>
          {step < steps.length - 1 ? (
            <button onClick={next} className="btn-primary px-6 py-2.5" disabled={(step===0 && !answers.industry) || (step===1 && !answers.goal)}>
              Next
            </button>
          ) : (
            <button onClick={submit} className="btn-primary px-6 py-2.5" disabled={!answers.timeline}>Submit</button>
          )}
        </div>
      </div>
    </div>
  );
}


