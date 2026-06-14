import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Transformation Journey',
  description: 'Your personal weight-loss mission. Log workouts, track calories burned, and watch your progress.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
