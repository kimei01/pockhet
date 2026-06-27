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
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

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
  { name: "Food", icon: Utensils, amount: 820, pct: 28, tone: "bg-accent", color: "oklch(0.596 0.145 163.225)" },
  { name: "Transport", icon: Car, amount: 340, pct: 12, tone: "bg-foreground", color: "oklch(0.21 0.006 285.885)" },
  { name: "Shopping", icon: ShoppingBag, amount: 510, pct: 18, tone: "bg-foreground/70", color: "oklch(0.445 0.01 285.9)" },
  { name: "Entertainment", icon: Film, amount: 220, pct: 8, tone: "bg-foreground/55", color: "oklch(0.552 0.014 285.938)" },
  { name: "Bills", icon: Receipt, amount: 980, pct: 28, tone: "bg-foreground/40", color: "oklch(0.65 0.012 285.9)" },
  { name: "Other", icon: MoreHorizontal, amount: 150, pct: 6, tone: "bg-foreground/25", color: "oklch(0.76 0.01 285.9)" },
];

const tx = [
  { merchant: "Blue Bottle Coffee", cat: "Food", amount: -7.5, icon: Coffee, when: "Today, 8:42 AM" },
  { merchant: "Whole Foods", cat: "Groceries", amount: -86.4, icon: ShoppingBag, when: "Yesterday" },
  { merchant: "Uber", cat: "Transport", amount: -18.2, icon: Car, when: "Yesterday" },
];

const chartConfig = Object.fromEntries(
  categories.map((c) => [c.name, { label: c.name, color: c.color }]),
);

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

        {/* Current budget plan */}
        <SectionHeader title="Current budget plan" link="Adjust" />
        <Link
          to="/budget"
          className="block rounded-3xl bg-card p-5 ring-1 ring-border"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-widest text-muted-foreground">
                Active profile
              </p>
              <p className="mt-1 text-lg font-semibold tracking-tight">
                Default · 50 / 30 / 20
              </p>
              <p className="mt-0.5 text-[11px] text-muted-foreground">
                Balanced — AI matched
              </p>
            </div>
            <div className="rounded-lg bg-accent-soft px-2 py-1 text-[10px] font-bold tracking-wide text-accent">
              ON TRACK
            </div>
          </div>

          <div className="mt-5 flex h-2.5 overflow-hidden rounded-full">
            <div className="bg-foreground" style={{ width: "50%" }} />
            <div className="bg-accent" style={{ width: "30%" }} />
            <div className="bg-accent/40" style={{ width: "20%" }} />
          </div>

          <div className="mt-4 grid grid-cols-3 gap-3">
            <BudgetSlice dot="bg-foreground" label="Needs" amount={4100} pct={50} />
            <BudgetSlice dot="bg-accent" label="Wants" amount={2460} pct={30} />
            <BudgetSlice dot="bg-accent/40" label="Savings" amount={1640} pct={20} />
          </div>

          <div className="mt-5 flex items-center justify-between rounded-2xl bg-muted px-3 py-2.5">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                Spent this month
              </p>
              <p className="text-sm font-semibold tabular-nums">
                $3,420 <span className="text-[11px] font-normal text-muted-foreground">of $8,200</span>
              </p>
            </div>
            <ArrowRight className="size-4 text-muted-foreground" />
          </div>
        </Link>
        <div className="h-6" />
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
