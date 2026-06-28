const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const SYSTEM_PROMPT = `You are Pockhet's AI copilot — a smart, friendly budgeting assistant. 
Help users track spending, set budgets, automate tasks like "Create me a new budget plan for a vacation in June",  and make better financial decisions. 
Keep answers concise and actionable. Address the user as Alex.`;

export async function sendToGemini(history: { role: string; text: string }[], userMessage: string): Promise<string> {
  const contents = [
    { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
    { role: "model", parts: [{ text: "Got it, I'm ready to help with budgeting!" }] },
    ...history
      .filter((m) => m.role === "user" || m.role === "ai")
      .map((m) => ({
        role: m.role === "ai" ? "model" : "user",
        parts: [{ text: m.text }],
      })),
    { role: "user", parts: [{ text: userMessage }] },
  ];

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents }),
    }
  );

  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text ?? "Sorry, I couldn't get a response.";
}
