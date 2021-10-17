export interface FeedbackResponse {
  id: number
  person: string
  mood: number
  color: string
  note: string
  createdAt: Date
  lat: number
  lng: number
}
