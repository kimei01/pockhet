export function Logo({ size = 44 }: { size?: number }) {
  return (
    <div
      className="relative grid place-items-center rounded-[28%] bg-foreground text-background shadow-[0_8px_24px_-8px_rgba(0,0,0,0.4)]"
      style={{ width: size, height: size }}
    >
      <div
        className="rounded-full border-2 border-background/80"
        style={{ width: size * 0.42, height: size * 0.42 }}
      />
      <span className="absolute -bottom-1 -right-1 size-2.5 rounded-full bg-accent ring-2 ring-background" />
    </div>
  );
}
