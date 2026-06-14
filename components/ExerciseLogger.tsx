'use client'

import { useState } from 'react'
import { ExerciseLog } from '@/lib/types'

interface Props {
  workoutId: string
  logs: ExerciseLog[]
  onLogsChange: (logs: ExerciseLog[]) => void
}

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '8px 12px',
  background: '#2c2c2e', border: '1px solid #3a3a3c',
  borderRadius: 10, color: '#fff', fontSize: 13,
  outline: 'none',
}

export default function ExerciseLogger({ workoutId, logs, onLogsChange }: Props) {
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    exercise_name: '',
    set_number: '1',
    reps: '',
    weight_kg: '',
    duration_seconds: '',
    notes: '',
  })

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }))

  async function addLog(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const payload = {
        workout_id: workoutId,
        exercise_name: form.exercise_name,
        set_number: parseInt(form.set_number) || 1,
        reps: form.reps ? parseInt(form.reps) : null,
        weight_kg: form.weight_kg ? parseFloat(form.weight_kg) : null,
        duration_seconds: form.duration_seconds ? parseInt(form.duration_seconds) : null,
        notes: form.notes || null,
      }
      const res = await fetch('/api/exercise-logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('Failed')
      const newLog = await res.json()
      onLogsChange([...logs, newLog])
      setForm({ exercise_name: '', set_number: String((parseInt(form.set_number) || 1) + 1), reps: '', weight_kg: '', duration_seconds: '', notes: '' })
    } catch {
      alert('Failed to log exercise')
    } finally {
      setLoading(false)
    }
  }

  async function deleteLog(id: string) {
    await fetch(`/api/exercise-logs?id=${id}`, { method: 'DELETE' })
    onLogsChange(logs.filter((l) => l.id !== id))
  }

  // Group logs by exercise name
  const grouped = logs.reduce<Record<string, ExerciseLog[]>>((acc, log) => {
    acc[log.exercise_name] = acc[log.exercise_name] ?? []
    acc[log.exercise_name].push(log)
    return acc
  }, {})

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Exercise log table */}
      {Object.keys(grouped).length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {Object.entries(grouped).map(([name, sets]) => (
            <div
              key={name}
              style={{ background: '#2c2c2e', borderRadius: 14, padding: '12px 14px' }}
            >
              <p style={{ color: '#fff', fontWeight: 600, fontSize: 14, marginBottom: 8 }}>{name}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {sets.map((s) => (
                  <div key={s.id} className="flex items-center gap-3">
                    <span style={{
                      width: 24, height: 24, borderRadius: '50%',
                      background: '#3a3a3c', color: '#8e8e93',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 11, fontWeight: 700, flexShrink: 0,
                    }}>
                      {s.set_number}
                    </span>
                    <div className="flex gap-3 flex-1 flex-wrap">
                      {s.reps != null && (
                        <span style={{ color: '#A5F044', fontSize: 13 }}>
                          <span style={{ color: '#8e8e93', fontSize: 11 }}>reps </span>{s.reps}
                        </span>
                      )}
                      {s.weight_kg != null && (
                        <span style={{ color: '#00D9FF', fontSize: 13 }}>
                          <span style={{ color: '#8e8e93', fontSize: 11 }}>kg </span>{s.weight_kg}
                        </span>
                      )}
                      {s.duration_seconds != null && (
                        <span style={{ color: '#FF9F0A', fontSize: 13 }}>
                          <span style={{ color: '#8e8e93', fontSize: 11 }}>sec </span>{s.duration_seconds}
                        </span>
                      )}
                      {s.notes && (
                        <span style={{ color: '#636366', fontSize: 12, fontStyle: 'italic' }}>{s.notes}</span>
                      )}
                    </div>
                    <button
                      onClick={() => deleteLog(s.id)}
                      style={{ color: '#FF375F', fontSize: 16, flexShrink: 0, opacity: .6 }}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ color: '#636366', fontSize: 13, textAlign: 'center', padding: '16px 0' }}>
          No exercises logged yet. Add your first set below.
        </p>
      )}

      {/* Add exercise form */}
      <form
        onSubmit={addLog}
        style={{
          background: '#1c1c1e', border: '1px solid #3a3a3c',
          borderRadius: 16, padding: '16px',
          display: 'flex', flexDirection: 'column', gap: 12,
        }}
      >
        <p style={{ color: '#8e8e93', fontSize: 11, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase' }}>
          Log Exercise Set
        </p>

        <input
          required
          value={form.exercise_name}
          onChange={(e) => set('exercise_name', e.target.value)}
          placeholder="Exercise name (e.g. Bench Press)"
          style={inputStyle}
        />

        <div className="grid grid-cols-2 gap-2">
          <input
            type="number" min={1}
            value={form.set_number}
            onChange={(e) => set('set_number', e.target.value)}
            placeholder="Set #"
            style={inputStyle}
          />
          <input
            type="number" min={0}
            value={form.reps}
            onChange={(e) => set('reps', e.target.value)}
            placeholder="Reps"
            style={inputStyle}
          />
          <input
            type="number" min={0} step={0.5}
            value={form.weight_kg}
            onChange={(e) => set('weight_kg', e.target.value)}
            placeholder="Weight (kg)"
            style={inputStyle}
          />
          <input
            type="number" min={0}
            value={form.duration_seconds}
            onChange={(e) => set('duration_seconds', e.target.value)}
            placeholder="Duration (sec)"
            style={inputStyle}
          />
        </div>

        <input
          value={form.notes}
          onChange={(e) => set('notes', e.target.value)}
          placeholder="Notes (optional)"
          style={inputStyle}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '9px 18px', borderRadius: 10,
            background: '#A5F044', color: '#000',
            fontWeight: 700, fontSize: 13,
            border: 'none', transition: 'opacity .2s',
            opacity: loading ? .5 : 1,
          }}
        >
          {loading ? 'Logging…' : '+ Log Set'}
        </button>
      </form>
    </div>
  )
}
