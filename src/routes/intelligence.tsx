import { createFileRoute } from "@tanstack/react-router";
import { AppScreen } from "@/components/AppScreen";
import { useMemo, useState } from "react";
import {
  Sparkles,
  TrendingUp,
  Calendar,
  Activity,
  AlertCircle,
  ChevronRight,
  Search,
} from "lucide-react";

export const Route = createFileRoute("/intelligence")({
  head: () => ({
    meta: [{ title: "Analysis — Pockhet" }],
  }),
  component: Intelligence,
});

const tabs = ["Spending", "Trends", "Subscriptions", "Loans"] as const;

const trend = [38, 52, 41, 60, 48, 72, 55, 64, 49, 80, 58, 66];

// Mirrors the dashboard category breakdown derived from uploaded transactions.
const spendingCategories = [
  { name: "Bills", amount: 980, color: "var(--color-accent)" },
  { name: "Food", amount: 820, color: "oklch(0.55 0.13 160)" },
  { name: "Shopping", amount: 510, color: "oklch(0.42 0.04 250)" },
  { name: "Transport", amount: 340, color: "oklch(0.62 0.08 200)" },
  { name: "Entertainment", amount: 220, color: "oklch(0.72 0.10 80)" },
  { name: "Other", amount: 150, color: "oklch(0.78 0.02 250)" },
];

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
  const [tab, setTab] = useState<(typeof tabs)[number]>("Spending");
  return (
    <AppScreen>
      <div className="px-6 pt-14">
        <p className="text-xs text-muted-foreground">Insights</p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight">
          Financial Analysis
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
        {tab === "Trends" && <TrendsPanel />}
        {tab === "Subscriptions" && <SubscriptionsPanel />}
        {tab === "Loans" && <LoansPanel />}

        <div className="my-6 h-6" />
      </div>
    </AppScreen>
  );
}

function AIRecommendation({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-3xl bg-foreground p-5 text-background">
      <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-background/60">
        <Sparkles className="size-3" strokeWidth={2.5} /> AI Recommendation
      </div>
      <p className="mt-3 text-[14px] leading-relaxed">{children}</p>
    </div>
  );
}

function SpendingPieChart() {
  const total = spendingCategories.reduce((s, c) => s + c.amount, 0);
  const size = 180;
  const stroke = 28;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;

  let offset = 0;
  const segments = spendingCategories.map((cat) => {
    const frac = cat.amount / total;
    const dash = frac * c;
    const seg = (
      <circle
        key={cat.name}
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={cat.color}
        strokeWidth={stroke}
        strokeDasharray={`${dash} ${c - dash}`}
        strokeDashoffset={-offset}
      />
    );
    offset += dash;
    return seg;
  });

  return (
    <div className="rounded-3xl bg-card p-5 ring-1 ring-border">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-widest text-muted-foreground">
            By category
          </p>
          <p className="mt-1 text-sm font-semibold">Where your money goes</p>
        </div>
        <p className="text-[10px] text-muted-foreground">From uploaded data</p>
      </div>

      <div className="mt-4 flex items-center gap-5">
        <div className="relative shrink-0" style={{ width: size, height: size }}>
          <svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            style={{ transform: "rotate(-90deg)" }}
          >
            {segments}
          </svg>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
              Total
            </p>
            <p className="text-xl font-semibold tracking-tight tabular-nums">
              ${total.toLocaleString()}
            </p>
          </div>
        </div>

        <ul className="flex-1 space-y-2">
          {spendingCategories.map((cat) => {
            const pct = Math.round((cat.amount / total) * 100);
            return (
              <li key={cat.name} className="flex items-center gap-2">
                <span
                  className="size-2.5 shrink-0 rounded-sm"
                  style={{ background: cat.color }}
                />
                <span className="flex-1 text-[12px] font-medium">{cat.name}</span>
                <span className="text-[11px] text-muted-foreground tabular-nums">
                  {pct}%
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

function SpendingPanel() {
  const recent = [
    { merchant: "Blue Bottle Coffee", cat: "Food", amount: -7.5, when: "Today, 8:42 AM" },
    { merchant: "Whole Foods", cat: "Groceries", amount: -86.4, when: "Yesterday" },
    { merchant: "Uber", cat: "Transport", amount: -18.2, when: "Yesterday" },
    { merchant: "Amazon", cat: "Shopping", amount: -42.99, when: "Jun 24" },
    { merchant: "Shell", cat: "Transport", amount: -56.1, when: "Jun 23" },
    { merchant: "Chipotle", cat: "Food", amount: -14.75, when: "Jun 22" },
  ];

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(recent.map((t) => t.cat)))],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState<string>("All");

  const filtered = recent.filter((t) => {
    const matchesCat = activeCat === "All" || t.cat === activeCat;
    const q = query.trim().toLowerCase();
    const matchesQuery =
      !q || t.merchant.toLowerCase().includes(q) || t.cat.toLowerCase().includes(q);
    return matchesCat && matchesQuery;
  });

  return (
    <div className="mt-6 space-y-4">
      <AIRecommendation>
        Your weekend dining is up 24% YoY. Capping Saturday spend at $80 would
        save roughly $1,150/year without changing your weekday routine.
      </AIRecommendation>

      <div className="rounded-3xl bg-card p-5 ring-1 ring-border">
        <p className="text-sm font-semibold">Forecast — July</p>
        <p className="mt-1 text-[12.5px] text-muted-foreground">
          Pockhet projects <span className="font-semibold text-foreground">$3,180</span>{" "}
          based on your last 90 days of behavior. Most of the savings come from
          reduced dining out.
        </p>
      </div>

      <SpendingPieChart />

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

      <div>
        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm font-semibold">Recent transactions</p>
          <p className="text-[11px] text-muted-foreground">Last 7 days</p>
        </div>

        <div className="relative mb-3">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search merchant or category"
            className="w-full rounded-full bg-muted py-2.5 pl-9 pr-3 text-[12.5px] outline-none ring-1 ring-transparent placeholder:text-muted-foreground focus:ring-accent/40"
          />
        </div>

        <div className="no-scrollbar mb-3 flex gap-2 overflow-x-auto">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActiveCat(c)}
              className={
                "shrink-0 rounded-full px-3 py-1.5 text-[11px] font-medium transition " +
                (activeCat === c
                  ? "bg-foreground text-background"
                  : "bg-muted text-muted-foreground")
              }
            >
              {c}
            </button>
          ))}
        </div>

        <div className="space-y-2">
          {filtered.length === 0 ? (
            <p className="rounded-2xl bg-muted px-4 py-6 text-center text-[12px] text-muted-foreground">
              No transactions match your filters.
            </p>
          ) : (
            filtered.map((t) => (
              <div
                key={t.merchant}
                className="flex items-center gap-3 rounded-2xl bg-card px-4 py-3 ring-1 ring-border"
              >
                <div className="grid size-9 shrink-0 place-items-center rounded-xl bg-muted text-[11px] font-semibold">
                  {t.merchant.charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{t.merchant}</p>
                  <p className="text-[11px] text-muted-foreground">
                    {t.cat} · {t.when}
                  </p>
                </div>
                <p className="text-sm font-semibold tabular-nums">
                  ${t.amount.toFixed(2)}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}


function TrendsPanel() {
  return (
    <div className="mt-6 space-y-3">
      <AIRecommendation>
        You're 2.4× more likely to overspend after 8pm on weekends. A short
        nudge before checkout could materially reduce impulse spend.
      </AIRecommendation>
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
    </div>
  );
}

function SubscriptionsPanel() {
  const total = subs.reduce((s, x) => s + x.price, 0);
  return (
    <div className="mt-6 space-y-3">
      <AIRecommendation>
        You're spending ${total.toFixed(0)}/mo on subscriptions. Cancelling
        ChatGPT Plus (flagged as unused) could save you{" "}
        <span className="font-semibold">$240 annually</span>.
      </AIRecommendation>

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
    </div>
  );
}

function LoansPanel() {
  return (
    <div className="mt-6 space-y-3">
      <AIRecommendation>
        Your Nelnet payment is due in 4 days and your checking balance is
        trending low. I can move $245 from savings on the 2nd to prevent a late
        fee — say the word.
      </AIRecommendation>

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
