enum Mood {
  WARMER = 3,
  NEUTRAL = 2,
  COLDER = 1,
}

export interface FeedbackResponse {
  id: number
  person: string
  mood: Mood
  color: string
  note: string
  createdAt: Date
  lat: number
  lng: number
}
