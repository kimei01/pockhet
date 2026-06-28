import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PhoneShell } from "@/components/PhoneShell";
import { useState } from "react";
import {
  Sparkles,
  Check,
  ChevronDown,
  ChevronUp,
  Pencil,
  ShoppingBag,
  Utensils,
  Car,
  Home,
  Film,
  Zap,
  CreditCard,
  ArrowDownLeft,
} from "lucide-react";

export const Route = createFileRoute("/confirm")({
  head: () => ({
    meta: [
      { title: "Confirm Categories — Pockhet" },
      {
        name: "description",
        content: "Review how our AI categorized your transactions.",
      },
    ],
  }),
  component: Confirm,
});

type Txn = {
  merchant: string;
  amount: number;
  date: string;
  category: string;
  confidence: number;
};

const categories: {
  name: string;
  color: string;
  kind?: "income" | "expense";
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  txns: Txn[];
}[] = [
  {
    name: "Income",
    color: "oklch(0.72 0.15 145)",
    kind: "income",
    icon: ArrowDownLeft,
    txns: [
      { merchant: "Acme Corp — Payroll", amount: 3850.0, date: "Jun 01", category: "Income", confidence: 1 },
      { merchant: "Acme Corp — Payroll", amount: 3850.0, date: "Jun 15", category: "Income", confidence: 1 },
      { merchant: "Stripe Payout — Side gig", amount: 412.5, date: "Jun 18", category: "Income", confidence: 0.96 },
      { merchant: "Venmo from J. Lee", amount: 60.0, date: "Jun 09", category: "Income", confidence: 0.84 },
    ],
  },
  {
    name: "Bills & Utilities",
    color: "oklch(0.72 0.13 165)",
    icon: Zap,
    txns: [
      { merchant: "Pacific Gas & Electric", amount: 142.18, date: "Jun 02", category: "Bills & Utilities", confidence: 0.99 },
      { merchant: "Comcast Xfinity", amount: 89.99, date: "Jun 05", category: "Bills & Utilities", confidence: 0.98 },
      { merchant: "T-Mobile", amount: 65.0, date: "Jun 12", category: "Bills & Utilities", confidence: 0.99 },
    ],
  },
  {
    name: "Food & Dining",
    color: "oklch(0.78 0.14 75)",
    icon: Utensils,
    txns: [
      { merchant: "Whole Foods Market", amount: 87.42, date: "Jun 03", category: "Food & Dining", confidence: 0.97 },
      { merchant: "Sweetgreen", amount: 16.5, date: "Jun 07", category: "Food & Dining", confidence: 0.95 },
      { merchant: "Blue Bottle Coffee", amount: 6.25, date: "Jun 09", category: "Food & Dining", confidence: 0.93 },
      { merchant: "Trader Joe's", amount: 54.18, date: "Jun 14", category: "Food & Dining", confidence: 0.98 },
    ],
  },
  {
    name: "Shopping",
    color: "oklch(0.7 0.16 25)",
    icon: ShoppingBag,
    txns: [
      { merchant: "Amazon", amount: 42.99, date: "Jun 04", category: "Shopping", confidence: 0.88 },
      { merchant: "Uniqlo", amount: 78.0, date: "Jun 10", category: "Shopping", confidence: 0.96 },
    ],
  },
  {
    name: "Transport",
    color: "oklch(0.68 0.13 250)",
    icon: Car,
    txns: [
      { merchant: "Uber", amount: 18.4, date: "Jun 06", category: "Transport", confidence: 0.97 },
      { merchant: "Shell", amount: 52.1, date: "Jun 11", category: "Transport", confidence: 0.99 },
    ],
  },
  {
    name: "Entertainment",
    color: "oklch(0.65 0.18 310)",
    icon: Film,
    txns: [
      { merchant: "Netflix", amount: 15.49, date: "Jun 01", category: "Entertainment", confidence: 0.99 },
      { merchant: "Spotify", amount: 10.99, date: "Jun 08", category: "Entertainment", confidence: 0.99 },
    ],
  },
  {
    name: "Housing",
    color: "oklch(0.6 0.05 240)",
    icon: Home,
    txns: [
      { merchant: "Rent — Sterling Apts", amount: 2150.0, date: "Jun 01", category: "Housing", confidence: 1 },
    ],
  },
];

function Confirm() {
  const navigate = useNavigate();
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const totalTxns = categories.reduce((s, c) => s + c.txns.length, 0);
  const avgConfidence =
    categories
      .flatMap((c) => c.txns)
      .reduce((s, t) => s + t.confidence, 0) / totalTxns;
  const totalIncome = categories
    .filter((c) => c.kind === "income")
    .flatMap((c) => c.txns)
    .reduce((s, t) => s + t.amount, 0);
  const totalExpenses = categories
    .filter((c) => c.kind !== "income")
    .flatMap((c) => c.txns)
    .reduce((s, t) => s + t.amount, 0);
  const net = totalIncome - totalExpenses;

  const handleContinue = () => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("pockhet:confirmed", "1");
    }
    navigate({ to: "/processing" });
  };

  return (
    <PhoneShell>
      <div className="flex flex-1 flex-col min-h-0">
        <div className="px-6 pt-12 pb-4">
          <div className="flex items-center gap-2">
            <span className="size-2 animate-ai-pulse rounded-full bg-accent" />
            <span className="text-[11px] font-semibold uppercase tracking-widest text-accent">
              Review &amp; confirm
            </span>
          </div>
          <h1 className="mt-4 text-[26px] font-semibold leading-tight tracking-tight">
            Here's how we sorted <br /> your transactions
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {totalTxns} transactions ·{" "}
            <span className="text-foreground">
              {Math.round(avgConfidence * 100)}% avg confidence
            </span>
            . Tap any category to review.
          </p>

          <div className="mt-4 grid grid-cols-3 gap-2">
            <div className="rounded-2xl bg-card p-3 ring-1 ring-border">
              <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                Income
              </p>
              <p className="mt-1 text-[13px] font-semibold tabular-nums text-emerald-600">
                +${totalIncome.toFixed(0)}
              </p>
            </div>
            <div className="rounded-2xl bg-card p-3 ring-1 ring-border">
              <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                Expenses
              </p>
              <p className="mt-1 text-[13px] font-semibold tabular-nums text-foreground">
                −${totalExpenses.toFixed(0)}
              </p>
            </div>
            <div className="rounded-2xl bg-card p-3 ring-1 ring-border">
              <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                Net
              </p>
              <p
                className={
                  "mt-1 text-[13px] font-semibold tabular-nums " +
                  (net >= 0 ? "text-emerald-600" : "text-red-600")
                }
              >
                {net >= 0 ? "+" : "−"}${Math.abs(net).toFixed(0)}
              </p>
            </div>
          </div>

          <div className="mt-4 flex items-start gap-3 rounded-2xl bg-accent-soft p-3 ring-1 ring-accent/20">
            <div className="grid size-8 shrink-0 place-items-center rounded-lg bg-accent text-accent-foreground">
              <Sparkles className="size-4" strokeWidth={2.25} />
            </div>
            <p className="text-[12.5px] leading-relaxed text-foreground/85">
              Our AI is highly confident on most items. Items below 90%
              confidence are flagged — feel free to adjust.
            </p>
          </div>
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto px-6 pb-4 space-y-2">
          {categories.map((cat, i) => {
            const open = openIdx === i;
            const total = cat.txns.reduce((s, t) => s + t.amount, 0);
            return (
              <div
                key={cat.name}
                className="rounded-2xl bg-card ring-1 ring-border"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(open ? null : i)}
                  className="flex w-full items-center gap-3 p-3.5 text-left"
                >
                  <div
                    className="grid size-9 shrink-0 place-items-center rounded-xl"
                    style={{ backgroundColor: `${cat.color}25`, color: cat.color }}
                  >
                    <cat.icon className="size-4" strokeWidth={2.25} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold">{cat.name}</p>
                    <p className="text-[11.5px] text-muted-foreground">
                      {cat.txns.length} transactions · ${total.toFixed(2)}
                    </p>
                  </div>
                  {open ? (
                    <ChevronUp className="size-4 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="size-4 text-muted-foreground" />
                  )}
                </button>
                {open && (
                  <div className="border-t border-border px-3.5 py-2">
                    {cat.txns.map((t) => {
                      const low = t.confidence < 0.9;
                      return (
                        <div
                          key={t.merchant + t.date}
                          className="flex items-center gap-3 py-2.5"
                        >
                          <div className="grid size-8 shrink-0 place-items-center rounded-lg bg-muted text-muted-foreground">
                            <CreditCard className="size-3.5" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-[13px] font-medium">
                              {t.merchant}
                            </p>
                            <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                              <span>{t.date}</span>
                              <span>·</span>
                              <span
                                className={
                                  low ? "text-amber-600" : "text-accent"
                                }
                              >
                                {Math.round(t.confidence * 100)}% sure
                              </span>
                            </div>
                          </div>
                          <span className="text-[13px] font-semibold tabular-nums">
                            ${t.amount.toFixed(2)}
                          </span>
                          <button
                            type="button"
                            aria-label="Edit category"
                            className="grid size-7 place-items-center rounded-md text-muted-foreground hover:bg-muted"
                          >
                            <Pencil className="size-3.5" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="border-t border-border bg-background/85 px-6 py-4 backdrop-blur-xl">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => navigate({ to: "/upload" })}
              className="flex h-12 flex-1 items-center justify-center rounded-2xl bg-muted text-[13.5px] font-medium text-foreground"
            >
              Re-upload
            </button>
            <button
              type="button"
              onClick={() => navigate({ to: "/home" })}
              className="flex h-12 flex-[1.6] items-center justify-center gap-2 rounded-2xl bg-foreground text-[13.5px] font-medium text-background"
            >
              <Check className="size-4" strokeWidth={2.5} />
              Looks good — continue
            </button>
          </div>
        </div>
      </div>
    </PhoneShell>
  );
}
