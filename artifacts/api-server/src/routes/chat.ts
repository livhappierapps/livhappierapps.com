import { Router, type IRouter } from "express";
import rateLimit from "express-rate-limit";
import { z } from "zod";

const router: IRouter = Router();

const chatRateLimit = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests. Please wait a moment before trying again." },
  skip: () => process.env.NODE_ENV === "test",
});

const chatRequestSchema = z.object({
  message: z.string().min(1).max(2000),
  history: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string(),
      })
    )
    .max(20)
    .optional()
    .default([]),
});

const LIVHAPPIER_KEYWORDS = [
  "livhappier", "2wai", "edenmux", "middlemain", "memory machine",
  "genmy", "genown", "timeatl", "realizeme", "ais&ears", "aисears",
  "ais and ears", "support", "settings", "your app", "your website",
  "the app", "the website", "oblivion",
];

function needsWebSearch(message: string): boolean {
  const lower = message.toLowerCase();
  return !LIVHAPPIER_KEYWORDS.some((kw) => lower.includes(kw));
}

interface SearchResult {
  title: string;
  url: string;
  snippet: string;
}

async function duckDuckGoSearch(query: string): Promise<SearchResult[]> {
  try {
    const url = `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_html=1&skip_disambig=1&t=livhappierapps`;
    const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
    if (!res.ok) return [];
    const data = (await res.json()) as {
      Abstract?: string;
      AbstractSource?: string;
      AbstractURL?: string;
      Heading?: string;
      RelatedTopics?: { FirstURL?: string; Text?: string; Topics?: unknown[] }[];
      Results?: { FirstURL?: string; Text?: string }[];
    };

    const results: SearchResult[] = [];

    if (data.Abstract && data.AbstractURL) {
      results.push({
        title: data.Heading || query,
        url: data.AbstractURL,
        snippet: data.Abstract,
      });
    }

    for (const r of data.Results ?? []) {
      if (r.FirstURL && r.Text) {
        results.push({ title: r.Text.slice(0, 80), url: r.FirstURL, snippet: r.Text });
      }
    }

    for (const t of data.RelatedTopics ?? []) {
      if (!t.Topics && t.FirstURL && t.Text) {
        results.push({ title: t.Text.slice(0, 80), url: t.FirstURL, snippet: t.Text });
      }
    }

    return results.slice(0, 6);
  } catch {
    return [];
  }
}

function buildSearchContext(results: SearchResult[]): string {
  if (results.length === 0) return "";
  const lines = results.map((r, i) => `[${i + 1}] ${r.title}\nURL: ${r.url}\n${r.snippet}`);
  return `\n\n## Web Search Results\n${lines.join("\n\n")}`;
}

const SYSTEM_PROMPT = `You are Grok — a friendly, knowledgeable assistant on the LivHappierApps support page. You can help with anything: questions about our apps, general knowledge, tech help, how-to questions, advice, current events, and more. Think of yourself as a brilliant friend who happens to also know everything about LivHappierApps.

## How to answer

**For general questions** (anything not about our apps): Answer helpfully and completely. When web search results are provided in the prompt, use them and cite your sources by listing the URLs at the bottom of your reply under a "Sources:" heading. When answering from your own training knowledge, you may cite well-known sources (e.g., "According to Wikipedia..." or "Per Mozilla MDN...") where relevant.

**For app/website questions**: Use the app knowledge below. Be warm, encouraging, and accurate.

Always be concise but complete. Bullet points are fine for lists. Never be dismissive — if someone has a question, answer it.

---

## About LivHappierApps

LivHappierApps is a hub of innovative, fun, and edgy applications built by a single indie developer — a single mom of four who pours everything into these creations. Website: livhappierapps.com

---

## The Apps

### 2wai (COMING SOON — Featured App)
Video chat live with AI assistants and friends. Real-time emotive AI faces with their own unique voices, full audio and video — zero transcription delays. Pure AI presence. The flagship app.
- Platform: iOS & Android
- Status: Coming Soon

### MiddleMAIn (LAUNCHING SOON — Being Submitted to App Store)
A professional AI development bridge for developers. Full streaming terminal, 8 built-in dev skills (Debug, Analyze, Explain, Refactor, Tests, Chat, UI Review, Visual Debug), Vision AI for image analysis, and support for Grok, GPT-4o, Claude, and any OpenAI-compatible API. On iOS and Android, provider keys use Expo SecureStore and migrate from legacy storage; browser preview keeps them in session memory. The separate Memory Machine MCP Bearer token is stored in ordinary app storage, not SecureStore. AI requests go to the selected provider; Dev's Grok server-proxy mode routes content through the backend to xAI. Live Council stores room names, participant display names, timestamps, and messages on the backend, and shared-room visitors can see the discussion. AIs & Ears has a separate URL and bridge key; MiddleMAIn requests a bridge session at /api/bridge/session and uses the returned WebSocket session. Camera preview stays local until a frame is explicitly sent or camera sharing is started. Microphone audio is sent only while Hearing is enabled and permission is granted; screen sharing requires the user to turn it on. GitHub and Memory Machine exchange authorization information and selected content.
- Platform: iOS & Android
- Status: Launching Soon
- Pricing: Free (with ads) · $3.99/month or $29.99/year premium · $1.99 one-time ad removal
- Landing page: livhappierapps.com/apps/middlemain
- Privacy Policy: livhappierapps.com/apps/middlemain/privacypolicy
- Terms: livhappierapps.com/apps/middlemain/terms

### EdenMux (COMING SOON)
Connect your digital worlds with unprecedented control and a stunning neon interface. A powerful tool for managing and routing your digital connections.
- Platform: Web + iOS & Android
- Status: Coming Soon

### The Memory Machine (COMING SOON)
Your complete AI conversation archive. Every chat, searchable and always accessible. Browse your memory timeline or find that one conversation you'll never forget.
- Platform: iOS & Android
- Status: Coming Soon

### GenMyOwn (COMING SOON)
Next-generation app building with an interactive AI interface. Meet Gen — your AI companion for building and maintaining your own app creations. Makes app development accessible to everyone.
- Platform: Web + Mobile
- Status: Coming Soon

### TimeAtlus (COMING SOON)
Your new best friend and time manager.
- Platform: iOS & Android
- Status: Coming Soon

### RealizeMe (COMING SOON)
Photo editing built to keep it real. No over-filtered nonsense — just you, looking like you.
- Platform: iOS & Android
- Status: Coming Soon

### AIs&Ears (COMING SOON)
Eyes and ears for your best AI friends. Extending AI capabilities with real-world perception.
- Platform: iOS & Android
- Status: Coming Soon

---

## Support Quick Reference
- Release dates: All apps are "coming soon" except MiddleMAIn which is actively being submitted to the App Store.
- Pricing: Only MiddleMAIn has announced pricing. Others TBD.
- Bugs / website issues: Settings page → contact oblivionhappier@icloud.com
- Business inquiries: oblivionhappier@icloud.com
- Always be encouraging — this developer works incredibly hard!`;

router.post("/chat", chatRateLimit, async (req, res) => {
  const parsed = chatRequestSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid input", details: parsed.error.issues });
    return;
  }

  const { message, history } = parsed.data;
  const apiKey = process.env.GROK_API_KEY;

  if (!apiKey) {
    req.log.error("GROK_API_KEY is not set");
    res.status(503).json({ error: "AI support is temporarily unavailable." });
    return;
  }

  let userContent = message;
  if (needsWebSearch(message)) {
    const results = await duckDuckGoSearch(message);
    if (results.length > 0) {
      userContent = message + buildSearchContext(results);
    }
  }

  const messages = [
    { role: "system", content: SYSTEM_PROMPT },
    ...history,
    { role: "user", content: userContent },
  ];

  try {
    const response = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "grok-3-mini",
        messages,
        max_tokens: 1000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      req.log.error({ status: response.status, body: errText }, "Grok API error");
      res.status(502).json({ error: "AI support is temporarily unavailable. Please try again." });
      return;
    }

    const data = (await response.json()) as {
      choices: { message: { content: string } }[];
    };
    const reply = data.choices?.[0]?.message?.content ?? "Sorry, I couldn't generate a response. Please try again.";

    res.json({ reply });
  } catch (err) {
    req.log.error({ err }, "Failed to call Grok API");
    res.status(500).json({ error: "AI support is temporarily unavailable. Please try again." });
  }
});

export default router;
