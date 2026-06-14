export interface DailyLog {
  id: string
  date: string
  workout_name: string
  calories_burned: number
  notes: string | null
  created_at: string
}

export interface WeightLog {
  id: string
  date: string
  weight_kg: number
  created_at: string
}
