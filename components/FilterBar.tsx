'use client'

import { Priority, WorkoutStatus } from '@/lib/types'

interface Props {
  priority: string
  status: string
  onPriorityChange: (v: string) => void
  onStatusChange: (v: string) => void
}

const PRIORITIES: { value: string; label: string; color: string }[] = [
  { value: 'all',    label: 'All',     color: '#8e8e93' },
  { value: 'urgent', label: '🔴 Urgent', color: '#FF375F' },
  { value: 'high',   label: '🟠 High',   color: '#FF9F0A' },
  { value: 'medium', label: '🟢 Medium', color: '#30D158' },
  { value: 'low',    label: '⚫ Low',    color: '#636366' },
]

const STATUSES: { value: string; label: string; color: string }[] = [
  { value: 'all',         label: 'All',         color: '#8e8e93' },
  { value: 'planned',     label: 'Planned',     color: '#00D9FF' },
  { value: 'in_progress', label: 'In Progress', color: '#FF9F0A' },
  { value: 'completed',   label: 'Completed',   color: '#A5F044' },
]

function FilterGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string
  options: typeof PRIORITIES
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div>
      <p style={{ color: '#8e8e93', fontSize: 11, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase', marginBottom: 8 }}>
        {label}
      </p>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const active = value === opt.value
          return (
            <button
              key={opt.value}
              onClick={() => onChange(opt.value)}
              style={{
                padding: '5px 14px', borderRadius: 100,
                fontSize: 12, fontWeight: 600,
                border: `1px solid ${active ? opt.color : '#3a3a3c'}`,
                background: active ? `${opt.color}22` : 'transparent',
                color: active ? opt.color : '#8e8e93',
                transition: 'all .2s',
              }}
            >
              {opt.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default function FilterBar({ priority, status, onPriorityChange, onStatusChange }: Props) {
  return (
    <div
      style={{
        background: '#1c1c1e',
        border: '1px solid #3a3a3c',
        borderRadius: 16,
        padding: '14px 18px',
        display: 'flex',
        gap: 20,
        flexWrap: 'wrap',
      }}
    >
      <FilterGroup label="Priority" options={PRIORITIES} value={priority} onChange={onPriorityChange} />
      <div style={{ width: 1, background: '#3a3a3c' }} />
      <FilterGroup label="Status" options={STATUSES} value={status} onChange={onStatusChange} />
    </div>
  )
}
