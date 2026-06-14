'use client'

import { Workout } from '@/lib/types'
import PriorityBadge from './PriorityBadge'
import StatusBadge from './StatusBadge'
import Link from 'next/link'

interface Props {
  workout: Workout
  onDelete?: (id: string) => void
  onStatusChange?: (id: string, status: Workout['status']) => void
}

const STATUS_NEXT: Record<Workout['status'], Workout['status']> = {
  planned: 'in_progress',
  in_progress: 'completed',
  completed: 'planned',
}

export default function WorkoutCard({ workout, onDelete, onStatusChange }: Props) {
  const date = new Date(workout.date)
  const isToday = new Date().toDateString() === date.toDateString()
  const dateStr = isToday
    ? 'Today'
    : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

  return (
    <div
      style={{
        background: '#1c1c1e',
        border: '1px solid #3a3a3c',
        borderRadius: 20,
        padding: '16px 18px',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        transition: 'border-color .2s, transform .2s',
        animation: 'up .4s ease both',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={e => {
        ;(e.currentTarget as HTMLElement).style.borderColor = '#555'
        ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={e => {
        ;(e.currentTarget as HTMLElement).style.borderColor = '#3a3a3c'
        ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
      }}
    >
      {/* Priority accent bar */}
      <div
        style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 3,
          background:
            workout.priority === 'urgent' ? '#FF375F'
            : workout.priority === 'high'   ? '#FF9F0A'
            : workout.priority === 'medium' ? '#30D158'
            : '#636366',
          borderRadius: '20px 20px 0 0',
        }}
      />

      {/* Header row */}
      <div className="flex items-start justify-between gap-2 pt-1">
        <Link
          href={`/workouts/${workout.id}`}
          style={{ color: '#fff', fontWeight: 600, fontSize: 15, lineHeight: 1.3, flex: 1 }}
        >
          {workout.title}
        </Link>
        <span style={{ color: '#8e8e93', fontSize: 12, whiteSpace: 'nowrap', flexShrink: 0 }}>
          {dateStr}
        </span>
      </div>

      {/* Description */}
      {workout.description && (
        <p style={{ color: '#8e8e93', fontSize: 13, lineHeight: 1.4 }}>
          {workout.description}
        </p>
      )}

      {/* Badges */}
      <div className="flex items-center gap-2 flex-wrap">
        <PriorityBadge priority={workout.priority} />
        <StatusBadge status={workout.status} />
      </div>

      {/* Stats row */}
      {(workout.duration_minutes || workout.calories_burned) && (
        <div className="flex gap-4">
          {workout.duration_minutes && (
            <span style={{ color: '#00D9FF', fontSize: 12 }}>
              ⏱ {workout.duration_minutes} min
            </span>
          )}
          {workout.calories_burned && (
            <span style={{ color: '#FF375F', fontSize: 12 }}>
              🔥 {workout.calories_burned} kcal
            </span>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-2 mt-1">
        {onStatusChange && workout.status !== 'completed' && (
          <button
            onClick={() => onStatusChange(workout.id, STATUS_NEXT[workout.status])}
            style={{
              flex: 1,
              padding: '6px 12px', borderRadius: 10,
              background: workout.status === 'planned' ? 'rgba(255,159,10,.15)' : 'rgba(165,240,68,.15)',
              color: workout.status === 'planned' ? '#FF9F0A' : '#A5F044',
              fontSize: 12, fontWeight: 600,
              border: 'none',
            }}
          >
            {workout.status === 'planned' ? 'Start Workout' : 'Mark Complete'}
          </button>
        )}
        <Link
          href={`/workouts/${workout.id}`}
          style={{
            padding: '6px 12px', borderRadius: 10,
            background: 'rgba(0,217,255,.1)',
            color: '#00D9FF',
            fontSize: 12, fontWeight: 600,
          }}
        >
          Details
        </Link>
        {onDelete && (
          <button
            onClick={() => onDelete(workout.id)}
            style={{
              width: 30, height: 30, borderRadius: '50%',
              background: 'rgba(255,55,95,.12)',
              color: '#FF375F',
              fontSize: 14, fontWeight: 600,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            ×
          </button>
        )}
      </div>
    </div>
  )
}
