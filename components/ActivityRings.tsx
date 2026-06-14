'use client'

interface Ring {
  color: string
  label: string
  value: number
  max: number
  unit: string
}

interface Props {
  rings: Ring[]
  size?: number
}

export default function ActivityRings({ rings, size = 180 }: Props) {
  const center = size / 2
  const strokeWidth = 14
  const gap = 8
  const radii = rings.map((_, i) => center - strokeWidth / 2 - i * (strokeWidth + gap))

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        {rings.map((ring, i) => {
          const r = radii[i]
          const circumference = 2 * Math.PI * r
          const pct = Math.min(ring.value / ring.max, 1)
          const dashoffset = circumference * (1 - pct)

          return (
            <g key={ring.label}>
              {/* Track */}
              <circle
                cx={center} cy={center} r={r}
                fill="none"
                stroke={ring.color}
                strokeWidth={strokeWidth}
                opacity={0.15}
              />
              {/* Fill */}
              <circle
                cx={center} cy={center} r={r}
                fill="none"
                stroke={ring.color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={dashoffset}
                style={{ transition: 'stroke-dashoffset 1s cubic-bezier(.4,0,.2,1)' }}
              />
            </g>
          )
        })}
      </svg>

      {/* Center labels */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5">
        {rings.map((ring) => (
          <div key={ring.label} className="text-center leading-none">
            <span className="text-xs font-bold" style={{ color: ring.color }}>
              {ring.value}
              <span className="text-[10px] font-normal opacity-70">{ring.unit}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
