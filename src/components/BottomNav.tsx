import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  Home,
  Sparkles,
  PieChart,
  Bot,
  Plus,
  FileText,
  Receipt,
  Landmark,
  Camera,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

const items = [
  { to: "/home", label: "Home", icon: Home },
  { to: "/intelligence", label: "Analysis", icon: Sparkles },
  { to: "/budget", label: "Budget", icon: PieChart },
  { to: "/copilot", label: "Copilot", icon: Bot },
] as const;

export function BottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const left = items.slice(0, 2);
  const right = items.slice(2);

  // Close sheet on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock background scroll while open + close on Escape
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <nav className="sticky bottom-0 z-20 mt-auto border-t border-border bg-background/85 px-2 py-3 backdrop-blur-xl">
        <div className="relative flex items-center justify-between px-2">
          {left.map((it) => (
            <NavItem key={it.to} {...it} active={pathname.startsWith(it.to)} />
          ))}

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Add"
            aria-expanded={open}
            className="flex flex-1 flex-col items-center gap-1.5"
          >
            <span
              className={
                "grid size-12 -translate-y-3 place-items-center rounded-full bg-foreground text-background shadow-lg ring-4 ring-background transition-transform active:scale-95 " +
                (open ? "rotate-45" : "")
              }
            >
              <Plus className="size-5" strokeWidth={2.5} />
            </span>
            <span className="-mt-2 text-[10px] font-medium tracking-wide text-muted-foreground/80">
              Add
            </span>
          </button>

          {right.map((it) => (
            <NavItem key={it.to} {...it} active={pathname.startsWith(it.to)} />
          ))}
        </div>
      </nav>

      <AddSheet open={open} onClose={() => setOpen(false)} />
    </>
  );
}

function NavItem({
  to,
  label,
  icon: Icon,
  active,
}: {
  to: string;
  label: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  active: boolean;
}) {
  return (
    <Link to={to} className="flex flex-1 flex-col items-center gap-1.5">
      <Icon
        className={
          "size-5 transition-colors " +
          (active ? "text-foreground" : "text-muted-foreground/60")
        }
        strokeWidth={active ? 2.25 : 1.75}
      />
      <span
        className={
          "text-[10px] font-medium tracking-wide transition-colors " +
          (active ? "text-foreground" : "text-muted-foreground/60")
        }
      >
        {label}
      </span>
      <span
        className={
          "size-1 rounded-full transition-all " +
          (active ? "bg-accent" : "bg-transparent")
        }
      />
    </Link>
  );
}

type AddAction = {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
  body: string;
  tone: "accent" | "muted";
  to?: string;
  soon?: boolean;
};

const actions: AddAction[] = [
  {
    icon: FileText,
    title: "Upload bank statement",
    body: "PDF or CSV — AI categorizes automatically",
    tone: "accent",
    to: "/upload",
  },
  {
    icon: Receipt,
    title: "Add a transaction",
    body: "Quick manual entry for cash or one-offs",
    tone: "muted",
    soon: true,
  },
  {
    icon: Landmark,
    title: "Connect a bank",
    body: "Securely link checking, savings, or cards",
    tone: "muted",
    soon: true,
  },
  {
    icon: Camera,
    title: "Scan a receipt",
    body: "Snap a photo — we extract line items",
    tone: "muted",
    soon: true,
  },
];

function AddSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const navigate = useNavigate();

  return (
    <div
      aria-hidden={!open}
      className={
        "pointer-events-none fixed inset-0 z-50 transition " +
        (open ? "pointer-events-auto" : "")
      }
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className={
          "absolute inset-0 bg-foreground/40 backdrop-blur-sm transition-opacity duration-200 " +
          (open ? "opacity-100" : "opacity-0")
        }
      />

      {/* Sheet */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Add to Pockhet"
        className={
          "absolute inset-x-0 bottom-0 rounded-t-3xl bg-background p-5 pb-7 shadow-2xl ring-1 ring-border transition-transform duration-300 ease-out " +
          (open ? "translate-y-0" : "translate-y-full")
        }
      >
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-muted-foreground/25" />

        <div className="mb-4 flex items-start justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-widest text-muted-foreground">
              Add to Pockhet
            </p>
            <p className="mt-0.5 text-base font-semibold tracking-tight">
              What would you like to add?
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="grid size-8 place-items-center rounded-full bg-muted text-muted-foreground"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="space-y-2">
          {actions.map((a) => {
            const disabled = !!a.soon;
            return (
              <button
                key={a.title}
                type="button"
                disabled={disabled}
                onClick={() => {
                  if (a.to) navigate({ to: a.to });
                  onClose();
                }}
                className={
                  "flex w-full items-center gap-3 rounded-2xl p-4 text-left ring-1 transition " +
                  (disabled
                    ? "bg-muted/50 ring-border opacity-70"
                    : "bg-card ring-border hover:bg-muted/60 active:scale-[0.99]")
                }
              >
                <div
                  className={
                    "grid size-10 shrink-0 place-items-center rounded-xl " +
                    (a.tone === "accent"
                      ? "bg-foreground text-background"
                      : "bg-muted text-foreground")
                  }
                >
                  <a.icon className="size-4" strokeWidth={2.25} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold">{a.title}</p>
                    {a.soon && (
                      <span className="rounded-full bg-muted px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-muted-foreground">
                        Soon
                      </span>
                    )}
                  </div>
                  <p className="text-[11.5px] text-muted-foreground">{a.body}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
