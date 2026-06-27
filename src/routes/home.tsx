import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AppScreen } from "@/components/AppScreen";
import { useEffect, useState } from "react";
import { isDemo, disableDemo } from "@/lib/demo";
import {
  Sparkles,
  TrendingUp,
  TrendingDown,
  Bell,
  Utensils,
  Car,
  ShoppingBag,
  Film,
  Receipt,
  MoreHorizontal,
  ArrowRight,
  Coffee,
  X,
} from "lucide-react";

export const Route = createFileRoute("/home")({
  head: () => ({
    meta: [
      { title: "Dashboard — Pockhet" },
      { name: "description", content: "Your AI-powered financial overview." },
    ],
  }),
  component: Dashboard,
});

const metrics = [
  { label: "Income", value: "$8,200", trend: "+4.2%", up: true },
  { label: "Spending", value: "$3,420", trend: "-12%", up: true },
  { label: "Savings rate", value: "22.4%", trend: "+2.1%", up: true },
  { label: "Subscriptions", value: "$84/mo", trend: "6 active", up: false },
];

const categories = [
  { name: "Food", icon: Utensils, amount: 820, pct: 28, tone: "bg-accent" },
  { name: "Transport", icon: Car, amount: 340, pct: 12, tone: "bg-foreground" },
  { name: "Shopping", icon: ShoppingBag, amount: 510, pct: 18, tone: "bg-foreground/70" },
  { name: "Entertainment", icon: Film, amount: 220, pct: 8, tone: "bg-foreground/55" },
  { name: "Bills", icon: Receipt, amount: 980, pct: 28, tone: "bg-foreground/40" },
  { name: "Other", icon: MoreHorizontal, amount: 150, pct: 6, tone: "bg-foreground/25" },
];

const tx = [
  { merchant: "Blue Bottle Coffee", cat: "Food", amount: -7.5, icon: Coffee, when: "Today, 8:42 AM" },
  { merchant: "Whole Foods", cat: "Groceries", amount: -86.4, icon: ShoppingBag, when: "Yesterday" },
  { merchant: "Uber", cat: "Transport", amount: -18.2, icon: Car, when: "Yesterday" },
];

function Dashboard() {
  const navigate = useNavigate();
  const [demo, setDemo] = useState(false);
  useEffect(() => setDemo(isDemo()), []);
  return (
    <AppScreen>
      <div className="px-6 pt-14">
        {demo && (
          <div className="mb-4 flex items-center justify-between gap-3 rounded-2xl bg-accent-soft px-4 py-2.5 ring-1 ring-accent/20">
            <div className="flex items-center gap-2">
              <Sparkles className="size-3.5 text-accent" strokeWidth={2.5} />
              <p className="text-[12px] font-medium text-accent">
                Demo data loaded — explore freely
              </p>
            </div>
            <button
              type="button"
              aria-label="Exit demo"
              onClick={() => {
                disableDemo();
                setDemo(false);
                navigate({ to: "/" });
              }}
              className="grid size-6 place-items-center rounded-full text-accent/80 hover:bg-accent/10"
            >
              <X className="size-3.5" strokeWidth={2.5} />
            </button>
          </div>
        )}
        <header className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Good morning, Alex</p>
            <p className="text-lg font-semibold">Your money, calmly</p>
          </div>
          <button className="relative grid size-10 place-items-center rounded-full bg-muted">
            <Bell className="size-4" />
            <span className="absolute right-2.5 top-2.5 size-1.5 rounded-full bg-accent" />
          </button>
        </header>

        {/* Health score */}
        <div className="mt-6 rounded-3xl bg-card p-6 ring-1 ring-border">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                Financial Health
              </p>
              <div className="mt-1 flex items-baseline gap-1.5">
                <span className="text-5xl font-semibold tracking-tight text-accent">84</span>
                <span className="text-sm text-muted-foreground">/100</span>
              </div>
            </div>
            <div className="rounded-lg bg-accent-soft px-2 py-1 text-[10px] font-bold tracking-wide text-accent">
              +2% THIS WEEK
            </div>
          </div>

          <div className="mt-5 flex h-1.5 gap-1">
            <div className="h-full flex-[5] rounded-full bg-accent" />
            <div className="h-full flex-[3] rounded-full bg-accent/40" />
            <div className="h-full flex-[2] rounded-full bg-muted" />
          </div>

          <div className="mt-5 flex gap-3 rounded-2xl bg-accent-soft/60 p-3">
            <div className="grid size-7 shrink-0 place-items-center rounded-lg bg-accent text-accent-foreground">
              <Sparkles className="size-3.5" strokeWidth={2.5} />
            </div>
            <p className="text-[13px] leading-relaxed text-foreground">
              You spent <span className="font-semibold text-accent">12% less</span>{" "}
              this month. Food delivery remains your highest discretionary expense.
            </p>
          </div>
        </div>

        {/* Metric grid */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          {metrics.map((m) => (
            <div key={m.label} className="rounded-2xl bg-muted p-4">
              <p className="text-[11px] text-muted-foreground">{m.label}</p>
              <p className="mt-1 text-lg font-semibold tracking-tight">{m.value}</p>
              <p
                className={
                  "mt-1 flex items-center gap-1 text-[11px] font-medium " +
                  (m.up ? "text-accent" : "text-muted-foreground")
                }
              >
                {m.up ? (
                  <TrendingUp className="size-3" strokeWidth={2.5} />
                ) : (
                  <TrendingDown className="size-3" strokeWidth={2.5} />
                )}
                {m.trend}
              </p>
            </div>
          ))}
        </div>

        {/* AI Highlights */}
        <SectionHeader title="AI Highlights" badge="3 new" />
        <div className="space-y-2">
          <HighlightCard
            tone="warn"
            title="Subscription price increase"
            body="Netflix went up by $3.00/mo last week."
          />
          <HighlightCard
            tone="info"
            title="Unusual spending detected"
            body="Blue Bottle Coffee charged 4× this week (+$42)."
          />
          <HighlightCard
            tone="accent"
            title="Budget surplus"
            body="$450 remaining in Groceries — pace looks healthy."
          />
        </div>

        {/* Category breakdown */}
        <SectionHeader title="Spending by category" />
        <div className="rounded-3xl bg-card p-5 ring-1 ring-border">
          <div className="mb-5 flex h-2 overflow-hidden rounded-full">
            {categories.map((c) => (
              <div key={c.name} className={c.tone} style={{ width: `${c.pct}%` }} />
            ))}
          </div>
          <div className="space-y-3">
            {categories.map((c) => (
              <div key={c.name} className="flex items-center gap-3">
                <div className="grid size-8 place-items-center rounded-lg bg-muted">
                  <c.icon className="size-4 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-[13px] font-medium">{c.name}</p>
                </div>
                <p className="text-[13px] font-semibold tabular-nums">${c.amount}</p>
                <p className="w-10 text-right text-[11px] text-muted-foreground tabular-nums">
                  {c.pct}%
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent transactions */}
        <SectionHeader title="Recent transactions" link="View all" />
        <div className="space-y-2 pb-6">
          {tx.map((t) => (
            <div
              key={t.merchant}
              className="flex items-center gap-3 rounded-2xl bg-card px-4 py-3 ring-1 ring-border"
            >
              <div className="grid size-9 place-items-center rounded-xl bg-muted">
                <t.icon className="size-4 text-foreground" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{t.merchant}</p>
                <p className="text-[11px] text-muted-foreground">{t.cat} · {t.when}</p>
              </div>
              <p className="text-sm font-semibold tabular-nums">
                ${t.amount.toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </AppScreen>
  );
}

function SectionHeader({
  title,
  badge,
  link,
}: {
  title: string;
  badge?: string;
  link?: string;
}) {
  return (
    <div className="mb-3 mt-7 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <h2 className="text-sm font-semibold">{title}</h2>
        {badge && (
          <span className="rounded-full bg-accent-soft px-2 py-0.5 text-[10px] font-semibold text-accent">
            {badge}
          </span>
        )}
      </div>
      {link && (
        <Link to="/intelligence" className="flex items-center gap-1 text-[11px] font-medium text-muted-foreground">
          {link} <ArrowRight className="size-3" />
        </Link>
      )}
    </div>
  );
}

function HighlightCard({
  tone,
  title,
  body,
}: {
  tone: "warn" | "info" | "accent";
  title: string;
  body: string;
}) {
  const toneMap = {
    warn: { bg: "bg-warn-soft", dot: "border-warn" },
    info: { bg: "bg-info-soft", dot: "border-info" },
    accent: { bg: "bg-accent-soft", dot: "border-accent" },
  } as const;
  const t = toneMap[tone];
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-card p-4 ring-1 ring-border">
      <div className={"grid size-9 shrink-0 place-items-center rounded-xl " + t.bg}>
        <span className={"size-3 rounded-full border-2 " + t.dot} />
      </div>
      <div className="flex-1">
        <p className="text-[13px] font-semibold">{title}</p>
        <p className="text-[11.5px] text-muted-foreground">{body}</p>
      </div>
    </div>
  );
}
