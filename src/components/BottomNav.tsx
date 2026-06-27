import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Sparkles, PieChart, Bot, User } from "lucide-react";

const items = [
  { to: "/home", label: "Home", icon: Home },
  { to: "/intelligence", label: "Analysis", icon: Sparkles },
  { to: "/budget", label: "Budget", icon: PieChart },
  { to: "/copilot", label: "Copilot", icon: Bot },
  { to: "/profile", label: "Profile", icon: User },
] as const;

export function BottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="sticky bottom-0 z-20 mt-auto border-t border-border bg-background/85 px-2 py-3 backdrop-blur-xl">
      <div className="flex items-center justify-between px-2">
        {items.map(({ to, label, icon: Icon }) => {
          const active = pathname.startsWith(to);
          return (
            <Link
              key={to}
              to={to}
              className="flex flex-1 flex-col items-center gap-1.5"
            >
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
        })}
      </div>
    </nav>
  );
}
