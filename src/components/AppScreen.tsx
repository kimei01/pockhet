import type { ReactNode } from "react";
import { PhoneShell } from "./PhoneShell";
import { BottomNav } from "./BottomNav";

export function AppScreen({ children }: { children: ReactNode }) {
  return (
    <PhoneShell>
      <div className="flex flex-1 flex-col overflow-y-auto pb-4">{children}</div>
      <BottomNav />
    </PhoneShell>
  );
}
