import { NextResponse } from 'next/server'

/** Tells the client whether a server-side API key is already configured. */
export async function GET() {
  return NextResponse.json({ hasEnvKey: !!process.env.GROQ_API_KEY })
}
