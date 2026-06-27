import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Sparkles, PieChart, Bot, Plus } from "lucide-react";

const items = [
  { to: "/home", label: "Home", icon: Home },
  { to: "/intelligence", label: "Analysis", icon: Sparkles },
  { to: "/budget", label: "Budget", icon: PieChart },
  { to: "/copilot", label: "Copilot", icon: Bot },
] as const;

export function BottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const left = items.slice(0, 2);
  const right = items.slice(2);
  return (
    <nav className="sticky bottom-0 z-20 mt-auto border-t border-border bg-background/85 px-2 py-3 backdrop-blur-xl">
      <div className="relative flex items-center justify-between px-2">
        {left.map((it) => (
          <NavItem key={it.to} {...it} active={pathname.startsWith(it.to)} />
        ))}

        <Link
          to="/upload"
          aria-label="Add transactions"
          className="flex flex-1 flex-col items-center gap-1.5"
        >
          <span className="grid size-12 -translate-y-3 place-items-center rounded-full bg-foreground text-background shadow-lg ring-4 ring-background transition-transform active:scale-95">
            <Plus className="size-5" strokeWidth={2.5} />
          </span>
          <span className="-mt-2 text-[10px] font-medium tracking-wide text-muted-foreground/80">
            Add
          </span>
        </Link>

        {right.map((it) => (
          <NavItem key={it.to} {...it} active={pathname.startsWith(it.to)} />
        ))}
      </div>
    </nav>
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
