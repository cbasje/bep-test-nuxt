export interface Location {
  lat: number
  lng: number
}

export interface Square {
  id: number
  name: string
  createdAt: Date
  squareLatlngs: Location[]
  color: string
}
