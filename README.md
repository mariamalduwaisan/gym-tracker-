# ✨ AI Outfit Stylist — Next.js

A beautiful AI personal stylist that generates three curated outfit suggestions based on your occasion, style, wardrobe items, preferred colors, weather, and personal notes. Built with **Next.js 15**, **TypeScript**, and **Tailwind CSS**, powered by [OpenRouter](https://openrouter.ai).

---

## 🚀 Quick Start

### 1. Install Node.js

Download and install Node.js (v18 or later) from [nodejs.org](https://nodejs.org).

### 2. Install dependencies

```bash
cd /Users/mkd/Desktop/CODED/STORY
npm install
```

### 3. Set up your API key

**Option A — Environment variable (recommended for deployment):**

```bash
cp .env.local.example .env.local
```

Open `.env.local` and add your key:

```env
OPENROUTER_API_KEY=sk-or-v1-your-key-here
```

Get a free key at [openrouter.ai/keys](https://openrouter.ai/keys).

**Option B — Enter in the app UI:**

Leave `.env.local` empty. When you open the app, a modal will ask for your key. It's stored in your browser's `localStorage` — never sent anywhere except OpenRouter.

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 API Key Security

| Method | Where the key lives | Notes |
|---|---|---|
| `.env.local` (server) | Server only — never sent to browser | ✅ Best for deployment |
| Browser modal (localStorage) | Browser localStorage → sent to `/api/generate` → forwarded to OpenRouter | ✅ Fine for personal use |

- Never commit `.env.local` to git (it's in `.gitignore`)
- The `/api/generate` route is a Next.js **server-side API route** — it proxies calls to OpenRouter, so the key never appears in client-side JavaScript

---

## ✨ Features

| Feature | Details |
|---|---|
| 🎨 AI Outfit Generation | 3 distinct outfit suggestions per request via OpenRouter |
| 💾 Save Outfits | Saved to `localStorage`, persists between sessions |
| 📋 Copy Outfit | Full outfit details copied to clipboard |
| 🔗 Share Link | URL encodes occasion + style for easy sharing |
| 🔄 Regenerate | Fresh suggestions with one click |
| 🌙 Dark / Light Mode | Remembers your preference, no flash on load |
| 📱 Mobile Responsive | Works on any screen size |
| 🤖 Model Selector | GPT-4o, Claude 3.5, Gemini Flash, Llama & more |
| ⚡ Skeleton Loader | Shimmer cards while AI is thinking |
| ⚠️ Error Handling | Friendly error states with the API's message |

---

## 🗂 Project Structure

```
STORY/
├── app/
│   ├── layout.tsx              # Root layout — fonts, theme init, metadata
│   ├── page.tsx                # Home page (server component)
│   ├── globals.css             # CSS variables, design tokens, all custom styles
│   └── api/
│       ├── generate/route.ts   # POST — proxies to OpenRouter
│       └── key-status/route.ts # GET  — tells client if env key is set
├── components/
│   ├── OutfitApp.tsx           # Main client component — all state lives here
│   ├── ApiKeyModal.tsx         # API key entry modal
│   ├── OutfitCard.tsx          # Outfit result card
│   ├── SkeletonCard.tsx        # Loading skeleton
│   └── SavedOutfits.tsx        # Saved outfits grid
├── lib/
│   └── types.ts                # TypeScript interfaces (Outfit, SavedOutfit)
├── .env.local.example          # Copy to .env.local and fill in your key
├── next.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + CSS custom properties |
| Fonts | Google Fonts — Cormorant Garamond + DM Sans |
| AI | OpenRouter API (proxied through Next.js API route) |
| Storage | `localStorage` (saved outfits + theme preference) |

---

## 🤖 Supported AI Models

| Model ID | Notes |
|---|---|
| `openai/gpt-4o-mini` | ✅ Default — fast & affordable |
| `openai/gpt-4o` | Highest OpenAI quality |
| `anthropic/claude-3.5-haiku` | Fast Anthropic model |
| `anthropic/claude-3.5-sonnet` | Best Anthropic quality |
| `google/gemini-flash-1.5` | Fast Google model |
| `meta-llama/llama-3.1-8b-instruct:free` | Free tier |

---

## 📦 Deploy to Vercel

```bash
npm install -g vercel
vercel
```

Add `OPENROUTER_API_KEY` in the Vercel dashboard under **Project → Settings → Environment Variables**.

---

## 📄 License

MIT — free to use, modify, and share.
