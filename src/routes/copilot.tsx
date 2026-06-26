import { createFileRoute } from "@tanstack/react-router";
import { AppScreen } from "@/components/AppScreen";
import { useState } from "react";
import { ArrowUp, Sparkles, Check, Plane } from "lucide-react";
import { Logo } from "@/components/Logo";

export const Route = createFileRoute("/copilot")({
  head: () => ({ meta: [{ title: "Copilot — Pockhet" }] }),
  component: Copilot,
});

type Msg =
  | { role: "ai"; text: string }
  | { role: "user"; text: string }
  | { role: "action"; title: string; subtitle: string; rows: { label: string; value: string }[] };

const suggested = [
  "Where did I spend the most this month?",
  "How much on food last week?",
  "Why am I spending more than usual?",
  "Can I afford this purchase?",
  "How much can I save this month?",
];

const initial: Msg[] = [
  {
    role: "ai",
    text: "Hey Alex — I've reviewed your June activity. Spending is down 12% and your savings rate ticked up to 22.4%. What would you like to explore?",
  },
  { role: "user", text: "Create a vacation budget for July." },
  {
    role: "ai",
    text: "I've created a new vacation budget plan and adjusted your discretionary spending target for July.",
  },
  {
    role: "action",
    title: "July Vacation Budget",
    subtitle: "Italian summer · 10 days",
    rows: [
      { label: "Flights & stay", value: "$1,800" },
      { label: "Food & experiences", value: "$900" },
      { label: "Buffer", value: "$300" },
    ],
  },
];

function Copilot() {
  const [messages, setMessages] = useState<Msg[]>(initial);
  const [input, setInput] = useState("");

  function send(text: string) {
    const t = text.trim();
    if (!t) return;
    setMessages((m) => [
      ...m,
      { role: "user", text: t },
      {
        role: "ai",
        text: "Got it — analyzing your data now. (Demo response — connect your AI provider to enable live replies.)",
      },
    ]);
    setInput("");
  }

  return (
    <AppScreen>
      <div className="flex flex-1 flex-col px-5 pt-12">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo size={36} />
            <div>
              <p className="text-base font-semibold leading-none">Copilot</p>
              <p className="mt-1 text-[11px] text-muted-foreground">
                <span className="mr-1 inline-block size-1.5 translate-y-[-1px] rounded-full bg-accent" />
                Online · grounded in your data
              </p>
            </div>
          </div>
          <button className="text-[11px] font-medium text-muted-foreground">
            New chat
          </button>
        </div>

        {/* Conversation */}
        <div className="mt-6 flex flex-col gap-4">
          {messages.map((m, i) => (
            <Bubble key={i} msg={m} />
          ))}
        </div>

        {/* Suggested prompts */}
        <div className="mt-7">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
            Suggested
          </p>
          <div className="no-scrollbar flex gap-2 overflow-x-auto pb-2">
            {suggested.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="shrink-0 rounded-full bg-muted px-3.5 py-2 text-[12px] font-medium text-foreground"
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Composer */}
        <div className="sticky bottom-2 mt-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2 rounded-2xl bg-card p-2 pl-4 shadow-lg shadow-black/[0.06] ring-1 ring-border"
          >
            <span className="size-1.5 shrink-0 rounded-full bg-accent" />
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Copilot anything…"
              className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
            <button
              type="submit"
              className="grid size-9 shrink-0 place-items-center rounded-xl bg-foreground text-background"
            >
              <ArrowUp className="size-4" strokeWidth={2.5} />
            </button>
          </form>
        </div>
      </div>
    </AppScreen>
  );
}

function Bubble({ msg }: { msg: Msg }) {
  if (msg.role === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[80%] rounded-2xl rounded-tr-md bg-foreground px-4 py-3 text-[13.5px] leading-relaxed text-background">
          {msg.text}
        </div>
      </div>
    );
  }
  if (msg.role === "ai") {
    return (
      <div className="flex gap-2.5">
        <div className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground">
          <Sparkles className="size-3.5" strokeWidth={2.5} />
        </div>
        <div className="max-w-[85%] text-[13.5px] leading-relaxed text-foreground">
          {msg.text}
        </div>
      </div>
    );
  }
  // action card
  return (
    <div className="flex gap-2.5">
      <div className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
        <Check className="size-3.5" strokeWidth={3} />
      </div>
      <div className="flex-1 rounded-2xl bg-card p-4 ring-1 ring-border">
        <div className="flex items-center gap-2">
          <div className="grid size-8 place-items-center rounded-lg bg-accent-soft text-accent">
            <Plane className="size-4" />
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              Action performed · Budget created
            </p>
            <p className="text-sm font-semibold">{msg.title}</p>
            <p className="text-[11px] text-muted-foreground">{msg.subtitle}</p>
          </div>
        </div>
        <div className="mt-4 space-y-2">
          {msg.rows.map((r) => (
            <div key={r.label} className="flex items-center justify-between text-[12.5px]">
              <span className="text-muted-foreground">{r.label}</span>
              <span className="font-semibold tabular-nums">{r.value}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 flex gap-2">
          <button className="flex-1 rounded-xl bg-foreground py-2 text-[11px] font-semibold text-background">
            Apply plan
          </button>
          <button className="flex-1 rounded-xl bg-muted py-2 text-[11px] font-semibold text-foreground">
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}
