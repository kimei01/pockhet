import { createFileRoute, Link } from "@tanstack/react-router";
import { AppScreen } from "@/components/AppScreen";
import {
  ChevronRight,
  Bell,
  Shield,
  CreditCard,
  Upload,
  Sliders,
  LogOut,
  Building2,
} from "lucide-react";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Profile — Pockhet" }] }),
  component: Profile,
});

const uploads = [
  { name: "chase_checking_jun.csv", when: "Today" },
  { name: "amex_platinum_jun.pdf", when: "3 days ago" },
  { name: "ally_savings_may.csv", when: "May 31" },
];

function Profile() {
  return (
    <AppScreen>
      <div className="px-6 pt-14">
        <h1 className="text-3xl font-semibold tracking-tight">Profile</h1>

        <div className="mt-6 flex items-center gap-4 rounded-3xl bg-card p-5 ring-1 ring-border">
          <div className="grid size-14 place-items-center rounded-full bg-foreground text-lg font-semibold text-background">
            A
          </div>
          <div className="flex-1">
            <p className="text-base font-semibold">Alex Morgan</p>
            <p className="text-[12px] text-muted-foreground">alex@pockhet.app</p>
            <p className="mt-1 inline-flex items-center gap-1 rounded-full bg-accent-soft px-2 py-0.5 text-[10px] font-semibold text-accent">
              Pro · since Mar 2025
            </p>
          </div>
        </div>

        <Section title="Account">
          <Row icon={Sliders} label="Financial preferences" hint="Risk · goals" />
          <Row icon={Bell} label="Notifications" hint="Weekly digest" />
          <Row icon={Shield} label="Privacy & security" />
        </Section>

        <Section title="Upload history">
          <div className="rounded-2xl bg-card ring-1 ring-border">
            {uploads.map((u, i) => (
              <div
                key={u.name}
                className={
                  "flex items-center gap-3 px-4 py-3 " +
                  (i !== uploads.length - 1 ? "border-b border-border" : "")
                }
              >
                <div className="grid size-8 place-items-center rounded-lg bg-muted">
                  <Upload className="size-3.5 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate text-[13px] font-medium">{u.name}</p>
                  <p className="text-[11px] text-muted-foreground">{u.when}</p>
                </div>
                <ChevronRight className="size-4 text-muted-foreground" />
              </div>
            ))}
          </div>
          <Link
            to="/upload"
            className="mt-3 flex h-11 items-center justify-center rounded-xl bg-muted text-[12px] font-semibold text-foreground"
          >
            Upload new file
          </Link>
        </Section>

        <Section title="Connected accounts">
          <div className="rounded-3xl bg-card p-5 ring-1 ring-border">
            <div className="flex items-start gap-3">
              <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
                <Building2 className="size-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold">Bank integrations</p>
                  <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
                    Coming soon
                  </span>
                </div>
                <p className="mt-1 text-[12px] text-muted-foreground">
                  Auto-sync with 12,000+ banks via Plaid. We'll notify you the
                  moment it's live.
                </p>
                <button className="mt-3 rounded-lg bg-foreground px-3 py-1.5 text-[11px] font-semibold text-background">
                  Join waitlist
                </button>
              </div>
            </div>
          </div>
        </Section>

        <Section title="Payment">
          <Row icon={CreditCard} label="Subscription" hint="Pro · $9/mo" />
        </Section>

        <button className="mt-6 mb-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-muted py-4 text-[13px] font-semibold text-muted-foreground">
          <LogOut className="size-4" /> Sign out
        </button>
      </div>
    </AppScreen>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-7">
      <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        {title}
      </h2>
      {children}
    </div>
  );
}

function Row({
  icon: Icon,
  label,
  hint,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  hint?: string;
}) {
  return (
    <button className="flex w-full items-center gap-3 rounded-2xl bg-card px-4 py-3.5 ring-1 ring-border mb-2 last:mb-0">
      <div className="grid size-9 place-items-center rounded-xl bg-muted">
        <Icon className="size-4 text-foreground" />
      </div>
      <div className="flex-1 text-left">
        <p className="text-[13px] font-medium">{label}</p>
        {hint && <p className="text-[11px] text-muted-foreground">{hint}</p>}
      </div>
      <ChevronRight className="size-4 text-muted-foreground" />
    </button>
  );
}
