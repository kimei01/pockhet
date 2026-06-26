import { createFileRoute, Link } from "@tanstack/react-router";
import { PhoneShell } from "@/components/PhoneShell";
import { Logo } from "@/components/Logo";
import { ArrowUpRight, Play, Sparkles } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pockhet — Your AI Financial Copilot" },
      {
        name: "description",
        content:
          "Upload your transaction history and let Pockhet build your personalized wealth strategy with AI-driven insights.",
      },
      { property: "og:title", content: "Pockhet — Your AI Financial Copilot" },
      {
        property: "og:description",
        content:
          "AI-powered personal finance. Understand, manage, and optimize your money.",
      },
    ],
  }),
  component: Welcome,
});

function Welcome() {
  return (
    <PhoneShell>
      <div className="flex flex-1 flex-col px-7 pt-16 pb-10">
        <div className="flex items-center gap-2">
          <Logo size={32} />
          <span className="text-base font-semibold tracking-tight">Pockhet</span>
        </div>

        <div className="mt-24 flex flex-1 flex-col">
          <div className="inline-flex w-fit items-center gap-2 rounded-full bg-accent-soft px-3 py-1.5 text-[11px] font-medium text-accent">
            <Sparkles className="size-3" strokeWidth={2.5} />
            Powered by Pockhet Intelligence
          </div>
          <h1 className="mt-5 text-balance text-[2.6rem] font-semibold leading-[1.05] tracking-tight">
            Your AI Financial Copilot.
          </h1>
          <p className="mt-5 max-w-[34ch] text-pretty text-[15px] leading-relaxed text-muted-foreground">
            Upload your transaction history and let Pockhet build a
            personalized wealth strategy — categorized, analyzed and explained
            in plain language.
          </p>

          <div className="mt-10 grid grid-cols-3 gap-3">
            <Stat label="Insights" value="120+" />
            <Stat label="Saved / mo" value="$340" />
            <Stat label="Time" value="60s" />
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3">
          <Link
            to="/upload"
            className="group flex h-14 items-center justify-center gap-2 rounded-2xl bg-foreground text-[15px] font-medium text-background transition active:scale-[0.98]"
          >
            Upload Transactions
            <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <Link
            to="/home"
            className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-transparent text-[15px] font-medium text-foreground ring-1 ring-border"
          >
            <Play className="size-4" /> View Demo
          </Link>
        </div>
      </div>
    </PhoneShell>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-muted px-3 py-3">
      <p className="text-[11px] text-muted-foreground">{label}</p>
      <p className="mt-0.5 text-base font-semibold tracking-tight">{value}</p>
    </div>
  );
}
