import { createFileRoute } from "@tanstack/react-router";
import { AppScreen } from "@/components/AppScreen";
import { useState } from "react";
import {
  Sparkles,
  TrendingUp,
  Calendar,
  Activity,
  AlertCircle,
  ChevronRight,
} from "lucide-react";

export const Route = createFileRoute("/intelligence")({
  head: () => ({
    meta: [{ title: "Intelligence — Pockhet" }],
  }),
  component: Intelligence,
});

const tabs = ["Spending", "Patterns", "Subscriptions", "Loans"] as const;

const trend = [38, 52, 41, 60, 48, 72, 55, 64, 49, 80, 58, 66];

const patterns = [
  { label: "Most frequent", value: "Coffee shops", sub: "18× this month", icon: Activity },
  { label: "Spending spike", value: "Saturday nights", sub: "+$210 avg", icon: TrendingUp },
  { label: "Weekend vs weekday", value: "63% weekends", sub: "Skewed toward dining", icon: Calendar },
];

const subs = [
  { name: "Netflix", logo: "N", color: "bg-[#E50914]", cat: "Entertainment", price: 19.99, next: "Jun 24", status: "active" },
  { name: "Spotify", logo: "S", color: "bg-[#1DB954]", cat: "Music", price: 10.99, next: "Jun 28", status: "active" },
  { name: "ChatGPT Plus", logo: "C", color: "bg-foreground", cat: "Productivity", price: 20.0, next: "Jul 02", status: "unused" },
  { name: "Adobe Creative", logo: "A", color: "bg-[#FA0F00]", cat: "Software", price: 54.99, next: "Jul 09", status: "active" },
];

const loans = [
  {
    creditor: "Chase Auto",
    type: "Auto loan",
    rate: 6.4,
    monthly: 412,
    balance: 18420,
    due: "Jul 15",
    health: "on-track",
  },
  {
    creditor: "Nelnet",
    type: "Student loan",
    rate: 4.8,
    monthly: 245,
    balance: 14_980,
    due: "Jul 03",
    health: "attention",
  },
];

function Intelligence() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Subscriptions");
  return (
    <AppScreen>
      <div className="px-6 pt-14">
        <p className="text-xs text-muted-foreground">Insights</p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight">
          Financial Intelligence
        </h1>

        <div className="no-scrollbar mt-6 flex gap-2 overflow-x-auto">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={
                "shrink-0 rounded-full px-4 py-2 text-xs font-medium transition " +
                (tab === t
                  ? "bg-foreground text-background"
                  : "bg-muted text-muted-foreground")
              }
            >
              {t}
            </button>
          ))}
        </div>

        {tab === "Spending" && <SpendingPanel />}
        {tab === "Patterns" && <PatternsPanel />}
        {tab === "Subscriptions" && <SubscriptionsPanel />}
        {tab === "Loans" && <LoansPanel />}

        <div className="my-6 h-6" />
      </div>
    </AppScreen>
  );
}

function AIRecommendation({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-6 rounded-3xl bg-foreground p-5 text-background">
      <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-background/60">
        <Sparkles className="size-3" strokeWidth={2.5} /> AI Recommendation
      </div>
      <p className="mt-3 text-[14px] leading-relaxed">{children}</p>
    </div>
  );
}

function SpendingPanel() {
  return (
    <div className="mt-6 space-y-4">
      <div className="rounded-3xl bg-card p-5 ring-1 ring-border">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-widest text-muted-foreground">
              Monthly trend
            </p>
            <p className="mt-1 text-2xl font-semibold tracking-tight">$3,420</p>
            <p className="text-[11px] text-accent">−12% vs May</p>
          </div>
          <p className="text-[10px] text-muted-foreground">Last 12 weeks</p>
        </div>
        <div className="mt-5 flex h-28 items-end gap-1.5">
          {trend.map((v, i) => (
            <div
              key={i}
              className={
                "flex-1 rounded-sm " +
                (i === trend.length - 1 ? "bg-accent" : "bg-muted")
              }
              style={{ height: `${v}%` }}
            />
          ))}
        </div>
      </div>
      <div className="rounded-3xl bg-card p-5 ring-1 ring-border">
        <p className="text-sm font-semibold">Forecast — July</p>
        <p className="mt-1 text-[12.5px] text-muted-foreground">
          Pockhet projects <span className="font-semibold text-foreground">$3,180</span>{" "}
          based on your last 90 days of behavior. Most of the savings come from
          reduced dining out.
        </p>
      </div>
      <AIRecommendation>
        Your weekend dining is up 24% YoY. Capping Saturday spend at $80 would
        save roughly $1,150/year without changing your weekday routine.
      </AIRecommendation>
    </div>
  );
}

function PatternsPanel() {
  return (
    <div className="mt-6 space-y-3">
      {patterns.map((p) => (
        <div
          key={p.label}
          className="flex items-center gap-3 rounded-2xl bg-card p-4 ring-1 ring-border"
        >
          <div className="grid size-10 place-items-center rounded-xl bg-accent-soft text-accent">
            <p.icon className="size-4" />
          </div>
          <div className="flex-1">
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
              {p.label}
            </p>
            <p className="text-sm font-semibold">{p.value}</p>
            <p className="text-[11px] text-muted-foreground">{p.sub}</p>
          </div>
          <ChevronRight className="size-4 text-muted-foreground" />
        </div>
      ))}
      <AIRecommendation>
        You're 2.4× more likely to overspend after 8pm on weekends. A short
        nudge before checkout could materially reduce impulse spend.
      </AIRecommendation>
    </div>
  );
}

function SubscriptionsPanel() {
  const total = subs.reduce((s, x) => s + x.price, 0);
  return (
    <div className="mt-6 space-y-3">
      <div className="flex items-center justify-between rounded-2xl bg-muted px-4 py-3">
        <div>
          <p className="text-[11px] text-muted-foreground">Monthly subscription spend</p>
          <p className="text-base font-semibold tabular-nums">${total.toFixed(2)}</p>
        </div>
        <span className="rounded-full bg-accent-soft px-2.5 py-1 text-[10px] font-semibold text-accent">
          {subs.length} active
        </span>
      </div>

      {subs.map((s) => (
        <div
          key={s.name}
          className="flex items-center gap-3 rounded-2xl bg-card p-4 ring-1 ring-border"
        >
          <div
            className={
              "grid size-11 place-items-center rounded-xl text-sm font-bold text-white " +
              s.color
            }
          >
            {s.logo}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold">{s.name}</p>
              {s.status === "unused" && (
                <span className="rounded-full bg-warn-soft px-2 py-0.5 text-[9px] font-bold uppercase text-warn">
                  Unused
                </span>
              )}
            </div>
            <p className="text-[11px] text-muted-foreground">
              {s.cat} · Next charge {s.next}
            </p>
          </div>
          <p className="text-sm font-semibold tabular-nums">${s.price.toFixed(2)}</p>
        </div>
      ))}

      <AIRecommendation>
        You're spending ${total.toFixed(0)}/mo on subscriptions. Cancelling
        ChatGPT Plus (flagged as unused) could save you{" "}
        <span className="font-semibold">$240 annually</span>.
      </AIRecommendation>
    </div>
  );
}

function LoansPanel() {
  return (
    <div className="mt-6 space-y-3">
      <div className="rounded-3xl bg-card p-5 ring-1 ring-border">
        <p className="text-[11px] uppercase tracking-widest text-muted-foreground">
          Debt health score
        </p>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-4xl font-semibold tracking-tight">72</span>
          <span className="text-xs text-muted-foreground">/100</span>
        </div>
        <p className="mt-1 text-[11px] text-accent">Stable — keep pace</p>
      </div>

      {loans.map((l) => (
        <div key={l.creditor} className="rounded-3xl bg-card p-5 ring-1 ring-border">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-semibold">{l.creditor}</p>
              <p className="text-[11px] text-muted-foreground">{l.type}</p>
            </div>
            {l.health === "attention" ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-warn-soft px-2 py-1 text-[10px] font-semibold text-warn">
                <AlertCircle className="size-3" /> Due in 4 days
              </span>
            ) : (
              <span className="rounded-full bg-accent-soft px-2 py-1 text-[10px] font-semibold text-accent">
                On track
              </span>
            )}
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3 text-[11px]">
            <Field label="Rate" value={`${l.rate}%`} />
            <Field label="Monthly" value={`$${l.monthly}`} />
            <Field label="Balance" value={`$${l.balance.toLocaleString()}`} />
          </div>
          <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-foreground"
              style={{ width: l.creditor === "Chase Auto" ? "42%" : "67%" }}
            />
          </div>
          <p className="mt-2 text-[11px] text-muted-foreground">Due {l.due}</p>
        </div>
      ))}

      <AIRecommendation>
        Your Nelnet payment is due in 4 days and your checking balance is
        trending low. I can move $245 from savings on the 2nd to prevent a late
        fee — say the word.
      </AIRecommendation>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-muted-foreground">{label}</p>
      <p className="mt-0.5 text-sm font-semibold text-foreground">{value}</p>
    </div>
  );
}
