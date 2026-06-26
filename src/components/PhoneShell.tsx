import type { ReactNode } from "react";

/**
 * Mobile-first viewport wrapper.
 * On phones the app is full-bleed. On larger screens it sits in a centered
 * "phone canvas" with a soft surrounding plate so the prototype feels intentional.
 */
export function PhoneShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-muted/60 md:py-10">
      <div className="relative mx-auto flex min-h-screen w-full max-w-[440px] flex-col bg-background md:min-h-[860px] md:rounded-[44px] md:shadow-[0_30px_80px_-40px_rgba(0,0,0,0.35)] md:ring-1 md:ring-black/5 overflow-hidden">
        {children}
      </div>
    </div>
  );
}
