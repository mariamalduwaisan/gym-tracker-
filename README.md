# ✨ AI Outfit Stylist

A beautiful, front-end-only AI personal stylist that generates three curated outfit suggestions based on your occasion, style, wardrobe items, preferred colors, weather, and personal notes — powered by [OpenRouter](https://openrouter.ai).

---

## 🚀 Getting Started

### 1. Get an OpenRouter API Key

1. Go to [https://openrouter.ai/keys](https://openrouter.ai/keys)
2. Sign up or log in
3. Click **Create Key** and copy it

### 2. Run the App

Since this is a pure front-end app (HTML + CSS + JS), you can run it in two ways:

**Option A — Open directly in browser:**
```
open index.html
```

**Option B — Serve locally (recommended to avoid CORS issues):**
```bash
# Using Python
python3 -m http.server 8080

# Using Node.js (npx)
npx serve .

# Then open: http://localhost:8080
```

### 3. Enter Your API Key in the App

When you first open the app, a modal will appear asking for your OpenRouter API key.  
Paste your key and click **Save & Continue**.  
Your key is stored in `localStorage` — it never leaves your browser except to call OpenRouter directly.

---

## 🔑 API Key Security

- Your key is stored **only in your browser's `localStorage`**
- It is sent **directly to `openrouter.ai`** — no intermediate server
- Never commit your API key to a repository
- You can update or clear your key at any time via the 🔑 button in the header

---

## ✨ Features

| Feature | Details |
|---|---|
| 🎨 AI Outfit Generation | 3 distinct outfit suggestions per request |
| 💾 Save Outfits | Save favourites to `localStorage` |
| 📋 Copy Outfit | Copy full outfit details to clipboard |
| 🔗 Share Link | Copy a URL pre-filled with your occasion & style |
| 🔄 Regenerate | Get fresh suggestions with one click |
| 🌙 Dark / Light Mode | Remembers your preference |
| 📱 Mobile Responsive | Works on any screen size |
| 🤖 Model Selector | Choose from GPT-4o, Claude, Gemini, Llama & more |

---

## 🧠 How It Works

1. Fill in your preferences (occasion, style, wardrobe, colors, weather, notes)
2. Click **Generate My Outfits**
3. The app sends a structured prompt to OpenRouter
4. OpenRouter returns a JSON response with 3 outfit objects
5. Each outfit includes: name, pieces, color palette, shoes, accessories, why it works, and a confidence score

---

## 🗂 Project Structure

```
STORY/
├── index.html   ← entire app (HTML + CSS + JS)
└── README.md    ← this file
```

---

## 🛠 Tech Stack

- Vanilla HTML, CSS, JavaScript (no frameworks, no build tools)
- [OpenRouter API](https://openrouter.ai/docs) for AI completions
- Google Fonts: Cormorant Garamond + DM Sans
- `localStorage` for saved outfits and theme preference

---

## 📦 Supported AI Models (via OpenRouter)

| Model | Notes |
|---|---|
| `openai/gpt-4o-mini` | ✅ Recommended — fast & affordable |
| `openai/gpt-4o` | Higher quality, higher cost |
| `anthropic/claude-3.5-haiku` | Fast Anthropic model |
| `anthropic/claude-3.5-sonnet` | Best Anthropic quality |
| `google/gemini-flash-1.5` | Fast Google model |
| `meta-llama/llama-3.1-8b-instruct:free` | Free tier option |

---

## 📄 License

MIT — free to use, modify, and share.
