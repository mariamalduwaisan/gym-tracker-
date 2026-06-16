'use client'

interface RingProps {
  value:     number
  color:     string
  r:         number
  thickness: number
  cx:        number
  cy:        number
}

function Ring({ value, color, r, thickness, cx, cy }: RingProps) {
  const circ   = 2 * Math.PI * r
  const offset = circ * (1 - Math.min(value, 1))

  return (
    <g>
      <circle
        cx={cx} cy={cy} r={r}
        fill="none"
        stroke={color}
        strokeOpacity={0.18}
        strokeWidth={thickness}
      />
      {value > 0 && (
        <circle
          cx={cx} cy={cy} r={r}
          fill="none"
          stroke={color}
          strokeWidth={thickness}
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${cx} ${cy})`}
          style={{
            filter: `drop-shadow(0 0 7px ${color})`,
            animation: 'ring-fill 1.4s cubic-bezier(.4,0,.2,1)',
          }}
        />
      )}
    </g>
  )
}

interface ActivityRingsProps {
  move:     number  // 0–1
  exercise: number  // 0–1
  stand:    number  // 0–1
  size?:    number
}

export default function ActivityRings({ move, exercise, stand, size = 220 }: ActivityRingsProps) {
  const cx        = size / 2
  const cy        = size / 2
  const thickness = 22
  const gap       = 10

  const outerR  = cx - thickness / 2 - 4
  const middleR = outerR - thickness - gap
  const innerR  = middleR - thickness - gap

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{ overflow: 'visible' }}
    >
      <Ring value={move}     color="#FF375F" r={outerR}  thickness={thickness} cx={cx} cy={cy} />
      <Ring value={exercise} color="#A5F044" r={middleR} thickness={thickness} cx={cx} cy={cy} />
      <Ring value={stand}    color="#00D9FF" r={innerR}  thickness={thickness} cx={cx} cy={cy} />
    </svg>
  )
}
