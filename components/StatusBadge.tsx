import { WorkoutStatus } from '@/lib/types'

const config: Record<WorkoutStatus, { label: string; color: string; bg: string }> = {
  planned:     { label: 'Planned',     color: '#00D9FF', bg: 'rgba(0,217,255,.12)'  },
  in_progress: { label: 'In Progress', color: '#FF9F0A', bg: 'rgba(255,159,10,.12)' },
  completed:   { label: 'Completed',   color: '#A5F044', bg: 'rgba(165,240,68,.12)' },
}

export default function StatusBadge({ status }: { status: WorkoutStatus }) {
  const c = config[status]
  return (
    <span
      style={{
        display: 'inline-flex', alignItems: 'center',
        padding: '3px 10px', borderRadius: 100,
        background: c.bg, color: c.color,
        fontSize: 11, fontWeight: 600,
      }}
    >
      {c.label}
    </span>
  )
}
