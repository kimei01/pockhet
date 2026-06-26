import { createFileRoute } from "@tanstack/react-router";
import { AppScreen } from "@/components/AppScreen";
import { useState } from "react";
import { Sparkles, Wand2, Edit3, Check } from "lucide-react";

export const Route = createFileRoute("/budget")({
  head: () => ({ meta: [{ title: "Budget — Pockhet" }] }),
  component: Budget,
});

const profiles = [
  { id: "default", name: "Default", ratio: "50 / 30 / 20", desc: "Balanced" },
  { id: "stability", name: "Stability", ratio: "70 / 20 / 10", desc: "High needs" },
  { id: "wealth", name: "Wealth Builder", ratio: "20 / 30 / 50", desc: "Aggressive saver" },
  { id: "free", name: "Free Spirit", ratio: "80 / 20", desc: "Flexible" },
] as const;

function Budget() {
  const [active, setActive] = useState<(typeof profiles)[number]["id"]>("default");
  const [reduction, setReduction] = useState(15);

  return (
    <AppScreen>
      <div className="px-6 pt-14">
        <div className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1 text-[11px] font-medium text-accent">
          <Wand2 className="size-3" strokeWidth={2.5} />
          Auto-generated for you
        </div>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">
          Budget Plan Created For You
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Based on 1,240 transactions across the last 90 days, Pockhet matched
          you to the <span className="font-semibold text-foreground">Default 50/30/20</span> profile.
        </p>

        {/* Profile selector */}
        <div className="no-scrollbar mt-6 flex gap-2 overflow-x-auto">
          {profiles.map((p) => (
            <button
              key={p.id}
              onClick={() => setActive(p.id)}
              className={
                "shrink-0 rounded-2xl border px-4 py-3 text-left transition " +
                (active === p.id
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-card text-foreground")
              }
            >
              <p className="text-xs font-semibold">{p.name}</p>
              <p
                className={
                  "mt-0.5 text-[11px] " +
                  (active === p.id ? "text-background/70" : "text-muted-foreground")
                }
              >
                {p.ratio} · {p.desc}
              </p>
            </button>
          ))}
        </div>

        {/* Allocation visualization */}
        <div className="mt-6 rounded-3xl bg-card p-5 ring-1 ring-border">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold">Monthly allocation</p>
            <p className="text-sm font-semibold tabular-nums">$8,200</p>
          </div>
          <div className="mt-4 flex h-3 overflow-hidden rounded-full">
            <div className="bg-foreground" style={{ width: "50%" }} />
            <div className="bg-accent" style={{ width: "30%" }} />
            <div className="bg-accent/40" style={{ width: "20%" }} />
          </div>
          <div className="mt-4 space-y-3">
            <Allocation label="Needs" pct={50} amount={4100} dot="bg-foreground" />
            <Allocation label="Wants" pct={30} amount={2460} dot="bg-accent" />
            <Allocation label="Savings" pct={20} amount={1640} dot="bg-accent/40" />
          </div>

          <div className="mt-5 flex gap-3 rounded-2xl bg-accent-soft/60 p-3">
            <div className="grid size-7 shrink-0 place-items-center rounded-lg bg-accent text-accent-foreground">
              <Sparkles className="size-3.5" strokeWidth={2.5} />
            </div>
            <p className="text-[12.5px] leading-relaxed">
              <span className="font-semibold">Why this profile:</span> your
              fixed expenses sit near 48% of income with consistent
              discretionary patterns — 50/30/20 keeps you flexible without
              sacrificing savings velocity.
            </p>
          </div>
        </div>

        {/* Editable budget cards */}
        <h2 className="mt-7 mb-3 text-sm font-semibold">Category targets</h2>
        <div className="space-y-2">
          <BudgetCard category="Groceries" spent={520} target={650} />
          <BudgetCard category="Dining out" spent={410} target={300} over />
          <BudgetCard category="Transport" spent={140} target={250} />
          <BudgetCard category="Entertainment" spent={86} target={150} />
        </div>

        {/* Scenario simulator */}
        <div className="mt-7 rounded-3xl bg-foreground p-5 text-background">
          <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-background/60">
            <Sparkles className="size-3" strokeWidth={2.5} /> Scenario Simulator
          </div>
          <p className="mt-3 text-sm font-medium">
            What if I reduce food spending by{" "}
            <span className="text-accent">{reduction}%</span>?
          </p>
          <input
            type="range"
            min={0}
            max={40}
            value={reduction}
            onChange={(e) => setReduction(Number(e.target.value))}
            className="mt-4 w-full accent-accent"
          />
          <div className="mt-4 grid grid-cols-3 gap-3">
            <SimStat label="Monthly save" value={`$${Math.round((820 * reduction) / 100)}`} />
            <SimStat label="Annual" value={`$${(820 * reduction * 12 / 100).toFixed(0)}`} />
            <SimStat label="New savings rate" value={`${(22.4 + reduction * 0.15).toFixed(1)}%`} />
          </div>
          <p className="mt-4 text-[12px] leading-relaxed text-background/75">
            Projected over 12 months, you'd hit your emergency-fund goal{" "}
            <span className="font-semibold text-background">3 weeks sooner</span>.
          </p>
        </div>

        <div className="h-8" />
      </div>
    </AppScreen>
  );
}

function Allocation({
  label,
  pct,
  amount,
  dot,
}: {
  label: string;
  pct: number;
  amount: number;
  dot: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className={"size-2.5 rounded-full " + dot} />
      <p className="text-[13px] font-medium">{label}</p>
      <p className="ml-auto text-[12px] text-muted-foreground tabular-nums">{pct}%</p>
      <p className="w-16 text-right text-[13px] font-semibold tabular-nums">${amount.toLocaleString()}</p>
    </div>
  );
}

function BudgetCard({
  category,
  spent,
  target,
  over,
}: {
  category: string;
  spent: number;
  target: number;
  over?: boolean;
}) {
  const pct = Math.min(100, (spent / target) * 100);
  return (
    <div className="rounded-2xl bg-card p-4 ring-1 ring-border">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold">{category}</p>
        <button className="text-muted-foreground">
          <Edit3 className="size-3.5" />
        </button>
      </div>
      <div className="mt-1 flex items-baseline gap-1.5">
        <span className="text-base font-semibold tabular-nums">${spent}</span>
        <span className="text-[11px] text-muted-foreground">of ${target}</span>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
        <div
          className={"h-full rounded-full " + (over ? "bg-warn" : "bg-accent")}
          style={{ width: `${pct}%` }}
        />
      </div>
      {over && (
        <p className="mt-2 text-[11px] font-medium text-warn">
          AI suggests reducing by $110 next month
        </p>
      )}
    </div>
  );
}

function SimStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-background/10 px-3 py-2.5">
      <p className="text-[10px] uppercase tracking-wider text-background/60">{label}</p>
      <p className="mt-0.5 text-sm font-semibold tabular-nums">{value}</p>
    </div>
  );
}
