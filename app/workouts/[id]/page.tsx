'use client'

import { useEffect, useState, use } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Workout, ExerciseLog } from '@/lib/types'
import PriorityBadge from '@/components/PriorityBadge'
import StatusBadge from '@/components/StatusBadge'
import ExerciseLogger from '@/components/ExerciseLogger'

interface WorkoutWithLogs extends Workout {
  exercise_logs: ExerciseLog[]
}

export default function WorkoutDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const [workout, setWorkout] = useState<WorkoutWithLogs | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/workouts/${id}`)
      .then((r) => r.json())
      .then((data) => { setWorkout(data); setLoading(false) })
  }, [id])

  async function cycleStatus() {
    if (!workout) return
    const next: Record<Workout['status'], Workout['status']> = {
      planned: 'in_progress', in_progress: 'completed', completed: 'planned',
    }
    const res = await fetch(`/api/workouts/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: next[workout.status] }),
    })
    const updated = await res.json()
    setWorkout((w) => w ? { ...updated, exercise_logs: w.exercise_logs } : null)
  }

  async function deleteWorkout() {
    if (!confirm('Delete this workout?')) return
    await fetch(`/api/workouts/${id}`, { method: 'DELETE' })
    router.push('/workouts')
  }

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="spinner" />
      </div>
    )
  }

  if (!workout) {
    return (
      <div style={{ minHeight: '100vh', background: '#000', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
        <p style={{ color: '#8e8e93' }}>Workout not found</p>
        <Link href="/workouts" style={{ color: '#00D9FF' }}>← Back to Workouts</Link>
      </div>
    )
  }

  const totalSets = workout.exercise_logs.length
  const totalReps = workout.exercise_logs.reduce((s, l) => s + (l.reps ?? 0), 0)
  const maxWeight = workout.exercise_logs.reduce((m, l) => Math.max(m, l.weight_kg ?? 0), 0)

  return (
    <div style={{ minHeight: '100vh', background: '#000', paddingBottom: 60 }}>
      {/* Header */}
      <div
        style={{
          position: 'sticky', top: 0, zIndex: 40,
          background: 'rgba(0,0,0,.85)', backdropFilter: 'blur(20px)',
          borderBottom: '1px solid #1c1c1e',
          padding: '12px 20px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}
      >
        <div className="flex items-center gap-3">
          <Link href="/workouts" style={{ color: '#8e8e93', fontSize: 22 }}>‹</Link>
          <h1 style={{ color: '#fff', fontSize: 17, fontWeight: 700 }} className="truncate max-w-[180px]">
            {workout.title}
          </h1>
        </div>
        <button onClick={deleteWorkout} style={{ color: '#FF375F', fontSize: 13, fontWeight: 600 }}>
          Delete
        </button>
      </div>

      <div style={{ maxWidth: 680, margin: '0 auto', padding: '16px' }}>
        {/* Workout header card */}
        <div
          style={{
            background: '#1c1c1e', border: '1px solid #3a3a3c',
            borderRadius: 20, padding: '18px', marginBottom: 16,
            position: 'relative', overflow: 'hidden',
          }}
        >
          {/* Priority bar */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 3,
            background: workout.priority === 'urgent' ? '#FF375F' : workout.priority === 'high' ? '#FF9F0A' : workout.priority === 'medium' ? '#30D158' : '#636366',
          }} />

          <div className="flex items-start justify-between gap-3 mt-1">
            <div style={{ flex: 1 }}>
              <h2 style={{ color: '#fff', fontSize: 20, fontWeight: 700, lineHeight: 1.2 }}>{workout.title}</h2>
              {workout.description && (
                <p style={{ color: '#8e8e93', fontSize: 14, marginTop: 6 }}>{workout.description}</p>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-3">
            <PriorityBadge priority={workout.priority} />
            <StatusBadge status={workout.status} />
            <span style={{ color: '#8e8e93', fontSize: 12, alignSelf: 'center' }}>
              {new Date(workout.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
            </span>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mt-4">
            {[
              { label: 'Duration', value: workout.duration_minutes ? `${workout.duration_minutes}m` : '—', color: '#00D9FF' },
              { label: 'Calories', value: workout.calories_burned ? `${workout.calories_burned}` : '—', color: '#FF375F' },
              { label: 'Sets', value: String(totalSets), color: '#A5F044' },
            ].map((s) => (
              <div key={s.label} style={{ background: '#2c2c2e', borderRadius: 12, padding: '10px', textAlign: 'center' }}>
                <p style={{ color: s.color, fontSize: 20, fontWeight: 700 }}>{s.value}</p>
                <p style={{ color: '#8e8e93', fontSize: 11 }}>{s.label}</p>
              </div>
            ))}
          </div>

          {/* Volume summary */}
          {totalSets > 0 && (
            <div className="flex gap-4 mt-3">
              {totalReps > 0 && (
                <p style={{ color: '#8e8e93', fontSize: 12 }}>
                  <span style={{ color: '#A5F044', fontWeight: 600 }}>{totalReps}</span> total reps
                </p>
              )}
              {maxWeight > 0 && (
                <p style={{ color: '#8e8e93', fontSize: 12 }}>
                  <span style={{ color: '#00D9FF', fontWeight: 600 }}>{maxWeight}kg</span> max weight
                </p>
              )}
            </div>
          )}

          {/* Status toggle */}
          {workout.status !== 'completed' && (
            <button
              onClick={cycleStatus}
              style={{
                width: '100%', marginTop: 14,
                padding: '10px', borderRadius: 12,
                background: workout.status === 'planned' ? 'rgba(255,159,10,.15)' : 'rgba(165,240,68,.15)',
                color: workout.status === 'planned' ? '#FF9F0A' : '#A5F044',
                fontWeight: 700, fontSize: 14, border: 'none',
              }}
            >
              {workout.status === 'planned' ? 'Start Workout' : 'Mark as Completed'}
            </button>
          )}
          {workout.status === 'completed' && (
            <div style={{
              width: '100%', marginTop: 14,
              padding: '10px', borderRadius: 12, textAlign: 'center',
              background: 'rgba(165,240,68,.1)', color: '#A5F044',
              fontWeight: 700, fontSize: 14,
            }}>
              ✓ Completed
            </div>
          )}
        </div>

        {/* Exercise logger */}
        <div style={{ background: '#1c1c1e', border: '1px solid #3a3a3c', borderRadius: 20, padding: '18px' }}>
          <h3 style={{ color: '#fff', fontSize: 16, fontWeight: 700, marginBottom: 16 }}>
            Exercise Log
          </h3>
          <ExerciseLogger
            workoutId={id}
            logs={workout.exercise_logs}
            onLogsChange={(logs) => setWorkout((w) => w ? { ...w, exercise_logs: logs } : null)}
          />
        </div>
      </div>
    </div>
  )
}
