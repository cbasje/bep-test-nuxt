export enum Mood {
  COLD = 1,
  COOL = 2,
  NEUTRAL = 3,
  WARM = 4,
  HOT = 5,
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
