'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Priority, WorkoutStatus } from '@/lib/types'

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '10px 14px',
  background: '#2c2c2e', border: '1px solid #3a3a3c',
  borderRadius: 12, color: '#fff', fontSize: 14,
  outline: 'none',
}

const labelStyle: React.CSSProperties = {
  display: 'block', color: '#8e8e93',
  fontSize: 11, fontWeight: 600,
  letterSpacing: '.06em', textTransform: 'uppercase',
  marginBottom: 6,
}

export default function WorkoutForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    title: '',
    description: '',
    priority: 'medium' as Priority,
    status: 'planned' as WorkoutStatus,
    date: new Date().toISOString().split('T')[0],
    duration_minutes: '',
    calories_burned: '',
    notes: '',
  })

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }))

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const payload = {
        ...form,
        duration_minutes: form.duration_minutes ? parseInt(form.duration_minutes) : null,
        calories_burned: form.calories_burned ? parseInt(form.calories_burned) : null,
      }
      const res = await fetch('/api/workouts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('Failed')
      router.push('/workouts')
      router.refresh()
    } catch {
      alert('Failed to create workout')
    } finally {
      setLoading(false)
    }
  }

  const PRIORITIES: Priority[] = ['low', 'medium', 'high', 'urgent']
  const STATUSES: WorkoutStatus[] = ['planned', 'in_progress', 'completed']

  const priorityColor: Record<Priority, string> = {
    low: '#636366', medium: '#30D158', high: '#FF9F0A', urgent: '#FF375F'
  }

  return (
    <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      {/* Title */}
      <div>
        <label style={labelStyle}>Workout Title *</label>
        <input
          required
          value={form.title}
          onChange={(e) => set('title', e.target.value)}
          placeholder="e.g. Morning HIIT Blast"
          style={inputStyle}
        />
      </div>

      {/* Description */}
      <div>
        <label style={labelStyle}>Description</label>
        <textarea
          value={form.description}
          onChange={(e) => set('description', e.target.value)}
          placeholder="What exercises are planned?"
          rows={3}
          style={{ ...inputStyle, resize: 'vertical' }}
        />
      </div>

      {/* Priority */}
      <div>
        <label style={labelStyle}>Priority</label>
        <div className="flex gap-2 flex-wrap">
          {PRIORITIES.map((p) => (
            <button
              type="button"
              key={p}
              onClick={() => set('priority', p)}
              style={{
                padding: '6px 16px', borderRadius: 100,
                border: `1.5px solid ${form.priority === p ? priorityColor[p] : '#3a3a3c'}`,
                background: form.priority === p ? `${priorityColor[p]}22` : 'transparent',
                color: form.priority === p ? priorityColor[p] : '#8e8e93',
                fontSize: 13, fontWeight: 600, textTransform: 'capitalize',
                transition: 'all .2s',
              }}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Status */}
      <div>
        <label style={labelStyle}>Status</label>
        <div className="flex gap-2 flex-wrap">
          {STATUSES.map((s) => (
            <button
              type="button"
              key={s}
              onClick={() => set('status', s)}
              style={{
                padding: '6px 16px', borderRadius: 100,
                border: `1.5px solid ${form.status === s ? '#00D9FF' : '#3a3a3c'}`,
                background: form.status === s ? 'rgba(0,217,255,.15)' : 'transparent',
                color: form.status === s ? '#00D9FF' : '#8e8e93',
                fontSize: 13, fontWeight: 600,
                transition: 'all .2s',
              }}
            >
              {s.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Date */}
      <div>
        <label style={labelStyle}>Date</label>
        <input
          type="date"
          value={form.date}
          onChange={(e) => set('date', e.target.value)}
          style={{ ...inputStyle, colorScheme: 'dark' }}
        />
      </div>

      {/* Duration & Calories */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label style={labelStyle}>Duration (min)</label>
          <input
            type="number"
            value={form.duration_minutes}
            onChange={(e) => set('duration_minutes', e.target.value)}
            placeholder="45"
            min={0}
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Calories (kcal)</label>
          <input
            type="number"
            value={form.calories_burned}
            onChange={(e) => set('calories_burned', e.target.value)}
            placeholder="400"
            min={0}
            style={inputStyle}
          />
        </div>
      </div>

      {/* Notes */}
      <div>
        <label style={labelStyle}>Notes</label>
        <textarea
          value={form.notes}
          onChange={(e) => set('notes', e.target.value)}
          placeholder="Any extra notes..."
          rows={2}
          style={{ ...inputStyle, resize: 'vertical' }}
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        style={{
          padding: '12px 24px', borderRadius: 12,
          background: loading ? '#3a3a3c' : '#A5F044',
          color: '#000', fontWeight: 700, fontSize: 15,
          border: 'none', transition: 'background .2s',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        }}
      >
        {loading ? <><span className="spinner" style={{ borderTopColor: '#000' }} /> Creating…</> : 'Create Workout'}
      </button>
    </form>
  )
}
