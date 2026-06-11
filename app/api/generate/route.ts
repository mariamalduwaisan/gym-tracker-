import { NextRequest, NextResponse } from 'next/server'

export const runtime     = 'nodejs'
export const maxDuration = 30

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { prompt, model } = body as { prompt: string; model: string }

    const key = process.env.OPENROUTER_API_KEY
    if (!key) {
      return NextResponse.json(
        { error: 'No API key configured. Add OPENROUTER_API_KEY to .env.local' },
        { status: 401 },
      )
    }

    const upstream = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000',
        'X-Title': 'OutfitAI',
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: 'system',
            content: 'You are an expert personal stylist AI. Always respond with valid JSON only — no markdown fences, no extra text.',
          },
          { role: 'user', content: prompt },
        ],
        temperature: 0.82,
        max_tokens: 1500,
      }),
    })

    if (!upstream.ok) {
      const err = await upstream.json().catch(() => ({})) as { error?: { message?: string } }
      return NextResponse.json(
        { error: err?.error?.message ?? `OpenRouter error ${upstream.status}` },
        { status: upstream.status },
      )
    }

    const data = await upstream.json()
    return NextResponse.json(data)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown server error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
