import { NextRequest, NextResponse } from 'next/server'

export const runtime    = 'nodejs'
export const maxDuration = 30

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { prompt, model, apiKey } = body as {
      prompt: string
      model: string
      apiKey?: string
    }

    // Server-side env var takes priority over client-supplied key
    const key = process.env.GROQ_API_KEY || apiKey

    if (!key) {
      return NextResponse.json(
        { error: 'No API key provided. Set GROQ_API_KEY in .env.local or enter your key in the app.' },
        { status: 401 },
      )
    }

    const upstream = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: 'system',
            content:
              'You are an expert personal stylist AI. Always respond with valid JSON only — no markdown fences, no extra text.',
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
        { error: err?.error?.message ?? `Groq error ${upstream.status}` },
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
