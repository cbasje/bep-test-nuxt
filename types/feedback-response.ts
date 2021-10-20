export enum Mood {
  WARMER = 3,
  NEUTRAL = 2,
  COLDER = 1,
}

export interface FeedbackResponse {
  id?: number
  user: number
  mood: Mood
  note: string
  temp: number
  solution?: number
  lat: number
  lng: number
  createdAt?: Date
}
