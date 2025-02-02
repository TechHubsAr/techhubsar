export interface Member {
  name: string
  github?: string
  twitter?: string
  linkedin?: string;
}

export interface Community {
  id: string
  name: string
  shortDescription: string
  fullDescription: string
  location: {
    lat: number
    lng: number
  }
  province: string
  category: string
  website?: string
  twitter?: string
  members: Member[]
}

