import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PhoneShell } from "@/components/PhoneShell";
import { useEffect, useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { isDemo } from "@/lib/demo";

export const Route = createFileRoute("/processing")({
  head: () => ({ meta: [{ title: "Analyzing — Pockhet" }] }),
  component: Processing,
});

const steps = [
  "Categorizing transactions",
  "Detecting subscriptions",
  "Identifying spending patterns",
  "Creating personalized budget",
  "Building financial profile",
  "Preparing Financial Copilot",
];

function Processing() {
  const [active, setActive] = useState(0);
  const navigate = useNavigate();
  const fast = typeof window !== "undefined" && isDemo();
  const stepMs = fast ? 380 : 850;
  const finishMs = fast ? 300 : 600;

  useEffect(() => {
    if (active >= steps.length) {
      const t = setTimeout(() => navigate({ to: "/home" }), finishMs);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setActive((a) => a + 1), stepMs);
    return () => clearTimeout(t);
  }, [active, navigate, stepMs, finishMs]);

  const progress = Math.min(100, (active / steps.length) * 100);

  return (
    <PhoneShell>
      <div className="flex flex-1 flex-col px-7 pt-16 pb-10">
        <div className="flex items-center gap-2">
          <span className="size-2 animate-ai-pulse rounded-full bg-accent" />
          <span className="text-[11px] font-semibold uppercase tracking-widest text-accent">
            AI Engine Live
          </span>
        </div>

        <h1 className="mt-6 text-3xl font-semibold tracking-tight">
          Deep scan in progress
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Our agent is mapping your financial DNA.
        </p>

        <div className="mt-12 space-y-5">
          {steps.map((label, i) => {
            const isDone = i < active;
            const isActive = i === active;
            return (
              <div
                key={label}
                className={
                  "flex items-center gap-4 transition " +
                  (isDone || isActive ? "opacity-100" : "opacity-35")
                }
              >
                <div
                  className={
                    "grid size-9 place-items-center rounded-full transition " +
                    (isDone
                      ? "bg-accent text-accent-foreground"
                      : isActive
                        ? "bg-accent-soft text-accent"
                        : "bg-muted text-muted-foreground")
                  }
                >
                  {isDone ? (
                    <Check className="size-4" strokeWidth={2.5} />
                  ) : isActive ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <span className="size-1.5 rounded-full bg-current" />
                  )}
                </div>
                <span className="text-sm font-medium">{label}</span>
              </div>
            );
          })}
        </div>

        <div className="mt-auto">
          <div className="mb-3 flex items-center justify-between text-[11px] font-medium text-muted-foreground">
            <span>Progress</span>
            <span className="tabular-nums">{Math.round(progress)}%</span>
          </div>
          <div className="relative h-1.5 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-accent transition-all duration-700 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </PhoneShell>
  );
}
