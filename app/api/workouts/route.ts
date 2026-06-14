import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const priority = searchParams.get('priority')
  const status = searchParams.get('status')

  let query = supabase
    .from('workouts')
    .select('*')
    .order('date', { ascending: false })
    .order('created_at', { ascending: false })

  if (priority && priority !== 'all') query = query.eq('priority', priority)
  if (status && status !== 'all') query = query.eq('status', status)

  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { data, error } = await supabase
    .from('workouts')
    .insert(body)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // Auto-create notification for urgent/high priority
  if (body.priority === 'urgent' || body.priority === 'high') {
    await supabase.from('notifications').insert({
      workout_id: data.id,
      message: `${body.priority === 'urgent' ? '🔴 URGENT' : '🟠 HIGH PRIORITY'}: "${data.title}" is scheduled for ${data.date}`,
      type: body.priority === 'urgent' ? 'warning' : 'reminder',
    })
  }

  return NextResponse.json(data, { status: 201 })
}
