import { createFileRoute, useNavigate, useRouter } from "@tanstack/react-router";
import { PhoneShell } from "@/components/PhoneShell";
import { ArrowLeft, FileText, UploadCloud, Check } from "lucide-react";

export const Route = createFileRoute("/upload")({
  head: () => ({
    meta: [
      { title: "Upload Transactions — Pockhet" },
      { name: "description", content: "Securely upload your transaction history for AI analysis." },
    ],
  }),
  component: Upload,
});

const recent = [
  { name: "chase_checking_may.csv", size: "248 KB", when: "2 days ago" },
  { name: "amex_platinum_apr.pdf", size: "1.2 MB", when: "Last month" },
];

function Upload() {
  const navigate = useNavigate();
  const router = useRouter();
  return (
    <PhoneShell>
      <div className="flex flex-1 flex-col px-6 pt-14 pb-8">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => router.history.back()}
            aria-label="Go back"
            className="flex size-10 items-center justify-center rounded-full bg-muted text-foreground"
          >
            <ArrowLeft className="size-4" />
          </button>
          <span className="text-xs font-medium text-muted-foreground">Step 1 of 3</span>
        </div>

        <h1 className="mt-8 text-3xl font-semibold tracking-tight">
          Bring in your <br /> financial data
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Your data is processed privately. We never share with third parties.
        </p>

        <button className="mt-8 flex flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-subtle bg-surface px-6 py-10 text-center transition hover:bg-muted">
          <div className="grid size-12 place-items-center rounded-2xl bg-accent-soft text-accent">
            <UploadCloud className="size-5" />
          </div>
          <div>
            <p className="text-sm font-semibold">Drop files or tap to browse</p>
            <p className="mt-1 text-[11px] text-muted-foreground">
              CSV, OFX, QFX, PDF · up to 20MB
            </p>
          </div>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-1.5">
            {["CSV", "OFX", "QFX", "PDF"].map((f) => (
              <span
                key={f}
                className="rounded-md bg-muted px-2 py-0.5 text-[10px] font-medium tracking-wide text-muted-foreground"
              >
                {f}
              </span>
            ))}
          </div>
        </button>

        <div className="mt-8">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Recent uploads
          </h2>
          <div className="mt-3 space-y-2">
            {recent.map((r) => (
              <div
                key={r.name}
                className="flex items-center gap-3 rounded-2xl bg-card px-4 py-3 ring-1 ring-border"
              >
                <div className="grid size-9 place-items-center rounded-xl bg-muted">
                  <FileText className="size-4 text-muted-foreground" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{r.name}</p>
                  <p className="text-[11px] text-muted-foreground">
                    {r.size} · {r.when}
                  </p>
                </div>
                <Check className="size-4 text-accent" />
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => navigate({ to: "/processing" })}
          className="mt-auto flex h-14 items-center justify-center rounded-2xl bg-foreground text-[15px] font-medium text-background"
        >
          Analyze My Finances
        </button>
      </div>
    </PhoneShell>
  );
}
