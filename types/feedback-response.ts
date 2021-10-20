export enum Mood {
  WARMER = 3,
  NEUTRAL = 2,
  COLDER = 1,
}

export interface FeedbackResponse {
  id?: number
  person: string
  mood: Mood
  note: string
  temp: number
  createdAt?: Date
  lat: number
  lng: number
}
